import { getBookingDatesByRoom, getRoomBySlug } from '@/libs/api';
import { authOptions } from '@/libs/auth';
import { BookingDates } from '@/models/booking';
import { randomUUID } from 'crypto';
import { areIntervalsOverlapping } from 'date-fns';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
    apiVersion: '2024-06-20',
});

type ReqData = {
    checkInDate: string;
    checkOutDate: string;
    numAdults: number;
    numChildren: number;
    numDays: number;
    roomSlug: string;
    name: string;
};

export const POST = async (req: Request, res: Response) => {
    const {
        checkInDate,
        checkOutDate,
        numAdults,
        numChildren,
        numDays,
        roomSlug,
    }: ReqData = await req.json();

    if (!checkInDate || !checkOutDate || !numAdults || !numDays || !roomSlug) {
        return new NextResponse('Please ensure all fields are entered', {
            status: 400,
        });
    }

    const origin = req.headers.get('origin');
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const userId = session.user.id;
    const formattedCheckInDate = checkInDate.split('T')[0];
    const formattedCheckoutDate = checkOutDate.split('T')[0];

    try {
        const room = await getRoomBySlug(roomSlug);
        const bookedDates:
            | BookingDates[]
            | null = await getBookingDatesByRoom(room._id);

        // Backend validation of the booking dates to ensure no overlapping bookings
        const isBooked =
            bookedDates?.some((booking) => {
                return areIntervalsOverlapping(
                    {
                        start: new Date(checkInDate),
                        end: new Date(checkOutDate),
                    },
                    {
                        start: new Date(booking.checkInDate),
                        end: new Date(booking.checkOutDate),
                    }
                );
            }) ?? false;
        
        if (isBooked) {
            return new NextResponse('Room is already booked for the selected dates', {
                status: 400,
                statusText: 'Room is already booked for the selected dates',
            });
        }

        const finalPrice =
            room.price * (1 - room.discount / 100) * numDays * 100;
        
        const name = randomUUID().toString();

        // Stripe payment
        const stripeSession = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: [
                {
                    quantity: 1,
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: room.name,
                            images: [room.coverImage.url],
                        },
                        unit_amount: Math.round(finalPrice),
                    },
                },
            ],
            payment_method_types: ['card'],
            success_url: `${origin}/users/${userId}`,
            metadata: {
                checkInDate: formattedCheckInDate,
                checkOutDate: formattedCheckoutDate,
                numAdults,
                numChildren,
                numDays,
                room: room._id,
                user: userId,
                discount: room.discount,
                totalPrice: finalPrice / 100,
                name,
            },
        });

        return NextResponse.json(stripeSession, {
            status: 200,
            statusText: 'Payment session created',
        });
    } catch (error: any) {
        console.error(`Payment failed with error: ${error}`);
        return new NextResponse('Payment failed', { status: 500 });
    }
};

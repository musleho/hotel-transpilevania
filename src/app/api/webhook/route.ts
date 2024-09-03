import { createBooking } from '@/libs/api';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const CHECKOUT_SESSION_COMPLETED = 'checkout.session.completed';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-06-20',
});

export const POST = async (req: Request, res: Response) => {
    const body = await req.text();
    const sig = req.headers.get('stripe-signature') as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

    let event: Stripe.Event;

    try {
        if (!sig || !webhookSecret) return;
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, {
            status: 500,
        });
    }

    // Load event
    switch (event.type) {
        case CHECKOUT_SESSION_COMPLETED:
            const session = event.data.object as Stripe.Checkout.Session;
            // Handle checkout session completed
            const {
                //@ts-ignore
                metadata: {
                    // @ts-ignore
                    checkInDate, checkOutDate, numAdults, numChildren, numDays,
                    // @ts-ignore
                    room, user, discount, totalPrice,
                },
            } = session;

            const confirmationCode = randomUUID().toString();
            console.log('Creating booking with confirmation code:', confirmationCode);

            await createBooking({
                checkInDate,
                checkOutDate,
                name: confirmationCode,
                numAdults: Number(numAdults),
                numChildren: Number(numChildren),
                numDays: Number(numDays),
                room,
                user,
                discount: Number(discount),
                totalPrice: Number(totalPrice),
            });

            return NextResponse.json('Booking successful', {
                status: 200,
                statusText: 'Booking successful',
            });
        default:
            return new NextResponse('Unhandled event type', { status: 200 });
    }
};

'use client';

import { getStripe } from '@/libs/stripe';
import axios from 'axios';
import {
    add,
    areIntervalsOverlapping,
    compareAsc,
    differenceInCalendarDays,
} from 'date-fns';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';

interface BookRoomCtaProps {
    price: number;
    discount: number;
    specialNote?: string;
    slug: string;
    bookedDates: { checkInDate: string; checkOutDate: string }[];
}

const BookRoomCta: React.FC<BookRoomCtaProps> = ({
    price,
    discount,
    specialNote,
    slug,
    bookedDates,
}) => {
    const discountPrice = price * (1 - discount / 100);
    const dollarFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    const fPrice = dollarFormat.format(price);
    const fDiscountPrice = dollarFormat.format(discountPrice);

    const [checkInDate, setCheckInDate] = useState<Date | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
    const [adults, setAdults] = useState(1);
    const [numChildren, setNumChildren] = useState(0);
    const [isBooked, setIsBooked] = useState(false);

    const numDays = () => {
        if (checkInDate && checkOutDate) {
            return differenceInCalendarDays(checkOutDate, checkInDate);
        }
        return 0;
    };

    // Ensure we don't have a check-out date before or same day as check-in date
    useEffect(() => {
        if (checkInDate && checkOutDate) {
            if (compareAsc(checkInDate, checkOutDate) >= 0) {
                setCheckOutDate(null);
            }
        }
    }, [checkInDate]);

    // Check if room is booked for the selected dates
    useEffect(() => {
        if (checkInDate && checkOutDate) {
            const isBooked = bookedDates.some((booking) =>
                areIntervalsOverlapping(
                    { start: checkInDate, end: checkOutDate },
                    {
                        start: new Date(booking.checkInDate),
                        end: new Date(booking.checkOutDate),
                    }
                )
            );
            setIsBooked(isBooked);
        }
        else {
            setIsBooked(false);
        }
    }, [checkInDate, checkOutDate, bookedDates]);

    const bookButtonDisabled =
        isBooked || !checkInDate || !checkOutDate || numDays() <= 0;

    const handleBookRoom = async () => {
        const days = numDays();
        const stripe = await getStripe();

        // Stripe
        try {
            const { data: stripeSession } = await axios.post('/api/stripe', {
                checkInDate,
                checkOutDate,
                numAdults: adults,
                numChildren,
                numDays: days,
                roomSlug: slug,
            });

            if (stripe) {
                const result = await stripe.redirectToCheckout({
                    sessionId: stripeSession.id,
                });

                if (result.error) {
                    toast.error(
                        'An error ocurred while processing your payment. Please try again'
                    );
                    console.error(result.error.message);
                }
            }
        } catch (error: any) {
            console.error(error);
            toast.error('Something went wrong.');
        }
    };

    return (
        <div className='px-7 py-6'>
            <h3>
                <span
                    className={`${discount ? 'text-gray-400 line-through ' : ''}font-bold text-xl`}>
                    {fPrice}
                </span>
                {discount ? (
                    <span className='font-bold text-xl'>
                        &nbsp; | {discount}% off. Now{' '}
                        <span className='text-tertiary-dark'>
                            {fDiscountPrice}{' '}
                        </span>
                    </span>
                ) : (
                    ''
                )}
                <span className='text-xs'>&nbsp; per night</span>
            </h3>

            <div className='w-full border-b-2 border-b-secondary my-2' />
            <h4 className='my-4 break-words'>{specialNote ?? ''}</h4>

            <div className='flex'>
                <div className='w-1/2 pr-2'>
                    <label
                        htmlFor='check-in-date'
                        className='block text-sm font-medium text-gray-900 dark:text-green-400'>
                        Check-In Date
                    </label>
                    <DatePicker
                        selected={checkInDate}
                        portalId='root'
                        onChange={(date) => setCheckInDate(date)}
                        dateFormat='dd/MM/yyyy'
                        minDate={new Date()}
                        id='check-in-date'
                        className='w-full text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-purple-600'></DatePicker>
                </div>
                <div className='w-1/2 pl-2'>
                    <label
                        htmlFor='check-out-date'
                        className='block text-sm font-medium text-gray-900 dark:text-green-400'>
                        Check-Out Date
                    </label>
                    <DatePicker
                        selected={checkOutDate}
                        portalId='root'
                        onChange={(date) => setCheckOutDate(date)}
                        dateFormat='dd/MM/yyyy'
                        disabled={!checkInDate}
                        minDate={
                            checkInDate
                                ? add(checkInDate, { days: 1 })
                                : undefined
                        }
                        id='check-out-date'
                        className='w-full text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-purple-600'></DatePicker>
                </div>
            </div>

            <div className='flex mt-4'>
                <div className='w-1/2 pr-2'>
                    <label
                        htmlFor='adults'
                        className='block text-sm font-medium text-gray-900 dark:text-gray-400'>
                        Adults
                    </label>
                    <input
                        type='number'
                        name='adults'
                        id='adults'
                        className='w-full border border-gray-300 rounded-lg p-2.5'
                        step={1}
                        min={1}
                        max={5}
                        value={adults}
                        onChange={(e) => setAdults(+e.target.value)}
                    />
                </div>
                <div className='w-1/2 pr-2'>
                    <label
                        htmlFor='children'
                        className='block text-sm font-medium text-gray-900 dark:text-gray-400'>
                        Children
                    </label>
                    <input
                        type='number'
                        name='children'
                        id='children'
                        className='w-full border border-gray-300 rounded-lg p-2.5'
                        step={1}
                        min={0}
                        max={3}
                        value={numChildren}
                        onChange={(e) => setNumChildren(+e.target.value)}
                    />
                </div>
            </div>
            {numDays() > 0 ? (
                <p className='mt-3'>
                    Total: {dollarFormat.format(numDays() * discountPrice)}
                </p>
            ) : (
                <></>
            )}
            <button
                className={`${bookButtonDisabled ? 'btn-primary-disabled' : 'btn-primary'} w-full mt-6 disabled:bg-gray-500 disabled:cursor-not-allowed`}
                onClick={handleBookRoom}
                disabled={bookButtonDisabled}>
                {isBooked ? 'Booked' : 'Book Now'}
            </button>
        </div>
    );
};

export default BookRoomCta;

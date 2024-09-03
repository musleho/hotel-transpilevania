'use client';

import { Booking } from '@/models/booking';
import { compareAsc, differenceInCalendarDays } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface TableProps {
    bookingDetails: Booking[];
    toggleRatingModal: () => void;
    setRoomId: React.Dispatch<React.SetStateAction<string | null>>;
    setBookingId: React.Dispatch<React.SetStateAction<string | null>>;
}

const Table: React.FC<TableProps> = ({ bookingDetails, toggleRatingModal, setRoomId, setBookingId }) => {
    const router = useRouter();

    const calculateDaysLeft = (booking: Booking) => {
        const today = new Date();
        const checkInDate = new Date(booking.checkInDate);
        const checkOutDate = new Date(booking.checkOutDate);

        if (compareAsc(today, checkInDate) >= 0) {
            return Math.max(differenceInCalendarDays(checkOutDate, today), 0);
        }

        return differenceInCalendarDays(checkOutDate, checkInDate);
    };

    const isBookingCompleted = (booking: Booking) => {
        const today = new Date();
        const checkOutDate = new Date(booking.checkOutDate);

        return compareAsc(today, checkOutDate) >= 0;
    }

    const dollarFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <div className='overflow-x-auto max-w-[340px] rounded-lg mx-auto md:max-w-full shadow-md sm:rounded-lg'>
            <table className='w-full text-sm text-left text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                    <tr>
                        <th className='px-6 py-3'>Room name</th>
                        <th className='px-6 py-3'>Unit Price</th>
                        <th className='px-6 py-3'>Price</th>
                        <th className='px-6 py-3'>No. Days Booked</th>
                        <th className='px-6 py-3'>Days Left</th>
                        <th className='px-6 py-3'></th>
                    </tr>
                </thead>
                <tbody>
                    {bookingDetails.map((booking) => {
                        
                        // This is what should be done so users can't rate bookings they
                        // haven't actually stayed for, nor can they re-rate bookings (for now)
                        // const canRate = isBookingCompleted(booking) && !booking.isRated;
                        const canRate = true; // For testing purposes
                        
                        return (
                        <tr
                            key={booking._id}
                            className='bg-white border-b hover:bg-gray-50'>
                            <th
                                onClick={() =>
                                    router.push(
                                        `/rooms/${booking.room.slug.current}`
                                    )
                                }
                                className='px-6 underline text-blue-600 cursor-pointer py-4 font-medium whitespace-nowrap'>
                                {booking.room.name}
                            </th>
                            <td className='px-6 py-4'>
                                {dollarFormat.format(booking.room.price)}
                            </td>
                            <td className='px-6 py-4'>
                                {dollarFormat.format(booking.totalPrice)}
                            </td>
                            <td className='px-6 py-4'>{booking.numDays}</td>
                            <td className='px-6 py-4'>
                                {calculateDaysLeft(booking)}
                            </td>
                            <td className='px-6 py-4'>
                                <button
                                    onClick={() => {
                                        setRoomId(booking.room._id);
                                        setBookingId(booking._id);
                                        toggleRatingModal()
                                    }}
                                    disabled={!canRate}
                                    className={`font-medium ${ canRate ? 'text-blue-600 hover:underline' : 'text-gray-400'}`}>
                                    {canRate ? 'Rate' : 'Rate after check-out'}
                                </button>
                            </td>
                        </tr>
                    )})}
                </tbody>
            </table>
        </div>
    );
};

export default Table;

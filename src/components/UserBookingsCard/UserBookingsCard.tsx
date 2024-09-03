'use client';

import { Booking } from '@/models/booking';
import { useState } from 'react';
import { BsJournalBookmarkFill } from 'react-icons/bs';
import { GiMoneyStack } from 'react-icons/gi';
import Table from '../Table/Table';
import SpendChart from '../SpendChart/SpendChart';
import RatingsModal from '../RatingsModal/RatingsModal';
import Backdrop from '../Backdrop/Backdrop';

interface UserBookingsCardProps {
    bookings: Booking[];
}

const UserBookingsCard: React.FC<UserBookingsCardProps> = ({ bookings }) => {
    const [currentNav, setCurrentNav] = useState<
        'bookings' | 'amount' | 'ratings'
    >('bookings');
    const [isRatingVisible, setIsRatingVisible] = useState<boolean>(false);
    const [roomId, setRoomId] = useState<string | null>(null);
    const [bookingId, setBookingId] = useState<string | null>(null);

    const toggleRatingModal = () => {
        setIsRatingVisible((prevState) => !prevState);
    };

    return (
        <>
            <div className='md:col-span-8 lg:col-span-9'>
                <nav className='sticky top-0 px-2 w-fit mx-auto md:w-full md:px-5 py-3 mb-8 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 mt-7'>
                    <ol
                        className={`${
                            currentNav === 'bookings'
                                ? 'text-blue-600'
                                : 'text-gray-700'
                        } inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}>
                        <li
                            onClick={() => setCurrentNav('bookings')}
                            className='inline-flex items-center cursor-pointer'>
                            <BsJournalBookmarkFill />
                            <a className='inline-flex items-center mx-1 md:mx-3 text-xs md:text-sm font-medium'>
                                Current Bookings
                            </a>
                        </li>
                    </ol>
                    <ol
                        className={`${
                            currentNav === 'amount'
                                ? 'text-blue-600'
                                : 'text-gray-700'
                        } inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}>
                        <li
                            onClick={() => setCurrentNav('amount')}
                            className='inline-flex items-center cursor-pointer'>
                            <GiMoneyStack />
                            <a className='inline-flex items-center mx-1 md:mx-3 text-xs md:text-sm font-medium'>
                                Amount Spent
                            </a>
                        </li>
                    </ol>
                </nav>
                {currentNav === 'bookings' ? (
                    bookings && (
                        <Table
                            bookingDetails={bookings}
                            toggleRatingModal={toggleRatingModal}
                            setRoomId={setRoomId}
                            setBookingId={setBookingId}
                        />
                    )
                ) : (
                    <></>
                )}

                {currentNav === 'amount' ? (
                    bookings && <SpendChart userBookings={bookings} />
                ) : (
                    <></>
                )}
            </div>
            <RatingsModal isOpen={isRatingVisible} roomId={roomId} bookingId={bookingId}/>
            <Backdrop isOpen={isRatingVisible} toggleRatingModal={toggleRatingModal} />
        </>
    );
};

export default UserBookingsCard;

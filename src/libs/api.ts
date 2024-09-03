import { Room, CreateBookingDTO } from '@/models/room';
import sanityClient from './sanity';
import axios from 'axios';

import * as queries from './sanityQueries';
import { Booking, BookingDates } from '@/models/booking';
import { User } from '@/models/user';
import { CreateReviewDTO, Review } from '@/models/review';

export const getFeaturedRoom = async () => {
    const result = await sanityClient.fetch<Room>(
        queries.getFeaturedRoomQuery,
        {},
        {
            cache: 'no-cache',
            // next: { revalidate: 1800 }
        }
    );
    return result;
};

export const getAllRooms = async () => {
    const result = await sanityClient.fetch<Room[]>(
        queries.getAllRoomsQuery,
        {},
        {
            cache: 'no-cache',
            // next: { revalidate: 1800 }
        }
    );
    return result;
};

export const getRoomBySlug = async (slug: string) => {
    const result = await sanityClient.fetch<Room>(
        queries.getRoomBySlugQuery,
        { slug },
        {
            cache: 'no-cache',
            // next: { revalidate: 1800 }
        }
    );
    return result;
};

export const getBookingDatesByRoom = async (roomId: string) => {
    const result = await sanityClient.fetch<BookingDates[]>(
        queries.getBookingDatesByRoomQuery,
        { room: roomId },
        {
            cache: 'no-cache',
            // next: { revalidate: 1800 }
        }
    );
    return result;
};

export const createBooking = async ({
    user,
    room,
    name,
    checkInDate,
    checkOutDate,
    numDays,
    numAdults,
    numChildren,
    totalPrice,
    discount,
}: CreateBookingDTO) => {
    const mutation = {
        mutations: [
            {
                create: {
                    _type: 'booking',
                    name,
                    user: { _type: 'reference', _ref: user },
                    room: { _type: 'reference', _ref: room },
                    checkInDate,
                    checkOutDate,
                    numDays,
                    numAdults,
                    numChildren,
                    totalPrice,
                    discount,
                },
            },
        ],
    };

    const { data } = await axios.post(
        `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_PROJECT_DATASET}`,
        mutation,
        { headers: { Authorization: `Bearer ${process.env.SANITY_RW_TOKEN}` } }
    );

    return data;
};

// Included this code from the original tutorial for reference but this doesn't make sense.
// Booking a room for a set of dates should not exclude that room from being booked on other
// days, so an 'isBooked' boolean as a property of the room doesn't make much sense in this
// context.
export const bookHotelRoom = async (roomId: string) => {
    const mutation = {
        mutations: [
            {
                patch: {
                    id: roomId,
                    set: { isBooked: true },
                },
            },
        ],
    };

    const { data } = await axios.post(
        `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_PROJECT_DATASET}`,
        mutation,
        { headers: { Authorization: `Bearer ${process.env.SANITY_RW_TOKEN}` } }
    );

    return data;
};

export const getUserInfo = async (userId: string) => {
    const result = await sanityClient.fetch<User>(
        queries.getUserInfoQuery,
        { userId },
        { cache: 'no-cache' }
    );
    return result;
};

export const getUserBookings = async (userId: string) => {
    const result = await sanityClient.fetch<Booking[]>(
        queries.getUserBookingsQuery,
        { userId },
        {
            cache: 'no-cache',
            // next: { revalidate: 1800 }
        }
    );
    return result;
};

export const submitReview = async ({
    user,
    hotelRoom,
    text,
    userRating,
    bookingId,
}: CreateReviewDTO) => {
    const rating = await sanityClient.fetch<Review>(
        queries.getReivewByBookingQuery,
        { bookingId },
        { cache: 'no-cache' }
    );

    const createMutation = {
        mutations: [
            {
                create: {
                    _type: 'review',
                    user: { _type: 'reference', _ref: user },
                    hotelRoom: {
                        _type: 'reference',
                        _ref: hotelRoom,
                    },
                    text: text,
                    userRating: userRating,
                    booking: { _type: 'reference', _ref: bookingId },
                },
            },
        ],
    };

    const patchMutation = {
        mutations: [
            {
                patch: {
                    id: rating?._id ?? '',
                    set: {
                        text: text,
                        userRating: userRating,
                    },
                },
            },
        ],
    };

    console.log('rating:', rating);

    const mutation = rating ? patchMutation : createMutation;

    console.log('mutation:', mutation);

    const { data } = await axios.post(
        `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_PROJECT_DATASET}`,
        mutation,
        { headers: { Authorization: `Bearer ${process.env.SANITY_RW_TOKEN}` } }
    );

    return data;
};

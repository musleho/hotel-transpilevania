import { groq } from "next-sanity";

export const getFeaturedRoomQuery = groq`*[_type == "room" && isFeatured == true][0] {
    _id,
    description,
    discount,
    images,
    isFeatured,
    name,
    price,
    slug,
    coverImage
}`;

export const getAllRoomsQuery = groq`*[_type == "room"] {
    _id,
    coverImage,
    description,
    dimensions,
    isFeatured,
    isBooked,
    name,
    price,
    slug,
    type
}`;

export const getRoomBySlugQuery = groq`*[_type == "room" && slug.current == $slug][0] {
    _id,
    roomNumber,
    coverImage,
    description,
    dimensions,
    discount,
    images,
    isFeatured,
    isBooked,
    name,
    numBeds,
    offeredAmenities,
    price,
    slug,
    specialNote,
    type
}`;

export const getBookingDatesByRoomQuery = groq`*[_type == "booking" && room._ref == $room] {
    checkInDate,
    checkOutDate
}`;

export const getBookingByIdQuery = groq`*[_type == "booking" && _id == $bookingId][0] {
    isRated
}`;

export const getUserBookingsQuery = groq`*[_type == "booking" && user._ref == $userId] {
    _id,
    checkInDate,
    checkOutDate,
    name,
    numAdults,
    numChildren,
    numDays,
    room -> {
        _id,
        name,
        slug,
        price
    },
    totalPrice,
    isRated
}`;

export const getUserInfoQuery = groq`*[_type == "user" && _id == $userId][0] {
    _id,
    name,
    email,
    about,
    isAdmin,
    image,
    _createdAt,
}`;

export const getReivewByBookingQuery = groq`*[_type == "review" && booking._ref == $bookingId][0] {
    _id,
    text,
    userRating
}`;
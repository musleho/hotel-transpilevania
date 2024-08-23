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
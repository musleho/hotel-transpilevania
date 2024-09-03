export type Review = {
    _id: string;
    user: string;
    hotelRoom: string;
    text: string;
    userRating: number;
}

export type CreateReviewDTO = {
    user: string;
    hotelRoom: string;
    text: string;
    userRating: number;
    bookingId: string;
}
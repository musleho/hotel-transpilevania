export type Booking = {
    _id: string;
    checkInDate: string;
    checkOutDate: string;
    name: string;
    numAdults: number;
    numChildren: number;
    numDays: number;
    room: {
        _id: string;
        name: string;
        slug: { current: string };
        price: number;
    },
    totalPrice: number;
    isRated: boolean;
};

export type BookingDates = {
    checkInDate: string;
    checkOutDate: string;
};
import { defineField } from "sanity";

const booking = {
    name: 'booking',
    title: 'Booking',
    type: 'document',
    fields: [
        defineField({
            name: 'user',
            title: 'User',
            type: 'reference',
            to: [{ type: 'user' }]
        }),
        defineField({
            name: 'room',
            title: 'Room',
            type: 'reference',
            to: [{ type: 'room' }],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'checkInDate',
            title: 'Check-In Date',
            type: 'date',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'checkOutDate',
            title: 'Check-Out Date',
            type: 'date',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'numDays',
            title: 'Number of Days',
            type: 'number',
            initialValue: 1,
            validation: Rule => Rule.required().min(1),
        }),
        defineField({
            name: 'discount',
            title: 'Discount',
            type: 'number',
            initialValue: 0,
            validation: Rule => Rule.required().min(0).max(100),
        }),
        defineField({
            name: 'numAdults',
            title: 'Number of Adults',
            type: 'number',
            initialValue: 1,
            validation: Rule => Rule.required().min(1),
        }),
        defineField({
            name: 'numChildren',
            title: 'Number of Children',
            type: 'number',
            initialValue: 0,
            validation: Rule => Rule.required().min(0),
        }),
        defineField({
            name: 'totalPrice',
            title: 'Price',
            type: 'number',
            validation: Rule => Rule.required().min(0),
        }),
    ]
};

export default booking;

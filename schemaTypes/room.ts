import { defineField, ValidationContext } from 'sanity';

enum RoomType {
    basic = 'Basic',
    luxury = 'Luxury',
    suite = 'Suite',
}

function idcmp(id1?: string, id2?: string) {
    if (!id1 || !id2) return false;
    const a = id1.trim().replace('drafts.', '');
    const b = id2.trim().replace('drafts.', '');
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

// A pretty heady method, so to break it down, it tries to find any room that matches the
// specified room number but is NOT the room in question. In order to do this properly with
// the Sanity.io schema, we need to do a few hacks. Firstly, no matter how much I try to
// align the types and trim the strings, the _id of the document vs the _id of the room are
// always 'unequal' for some reason. So I instead use the idcmp function to prove that each
// character is different. We also remove the 'drafts.' prefix from the _id so that you won't
// run into an error when editing an existing record or when an unpublished document is
// potentially blocking the given room number.
const getRoomWithNumber = async (
    roomNumber: number | undefined,
    ctx: ValidationContext
): Promise<any> => {
    if (!roomNumber) {
        return false;
    }
    const client = ctx.getClient({ apiVersion: '2021-10-21' });
    const rooms = await client.fetch(
        `*[_type == 'room' && roomNumber == $roomNumber]`,
        { roomNumber },
    );
    const matchingRooms = rooms.filter(
        (room: any) =>
            room.roomNumber === roomNumber &&
            !idcmp(room?._id, ctx.document?._id)
    );
    return matchingRooms[0];
};

const room = {
    name: 'room',
    title: 'Room',
    type: 'document',
    fields: [
        defineField({
            name: 'roomNumber',
            title: 'Room Number',
            type: 'number',
            validation: (Rule) =>
                Rule.required()
                    .integer()
                    .min(101)
                    .max(2520)
                    .error('Room number must be between 101 and 2520')
                    .custom(async (roomNumber, context) => {
                        const room = await getRoomWithNumber(
                            roomNumber,
                            context
                        );
                        return room
                            ? { message: 'Room number must be unique' }
                            : true;
                    }).custom(roomNumber => {
                        if (!roomNumber) return true;
                        const finalDigits = roomNumber % 100
                        if (finalDigits >= 1 && finalDigits <= 20) {
                            return true
                        }
                        return {message: 'Room number must end with values between 01 and 20'};
                    }),
        }),
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            description: 'Name of the room',
            validation: (Rule) =>
                Rule.required()
                    .max(50)
                    .error('Name must not be more than 50 characters'),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: (doc) => `${doc.roomNumber} ${doc.name}`,
                slugify: (input) =>
                    input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: (Rule) =>
                Rule.required()
                    .min(100)
                    .error('Description must be at least 100 characters'),
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: 'discount',
            title: 'Discount',
            type: 'number',
            validation: (Rule) => Rule.required().min(0).max(100),
            initialValue: 0,
        }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'url', type: 'url', title: 'URL' },
                        { name: 'file', type: 'file', title: 'File' },
                    ],
                },
            ],
            validation: (Rule) =>
                Rule.required()
                    .min(3)
                    .max(10)
                    .error('Must have between 3 and 10 images'),
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'object',
            fields: [
                { name: 'url', type: 'url', title: 'URL' },
                { name: 'file', type: 'file', title: 'File' },
            ],
            validation: (Rule) =>
                Rule.required().error('Cover image is required'),
        }),
        defineField({
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: Object.values(RoomType),
            },
            initialValue: RoomType.basic,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'specialNote',
            title: 'Special Note',
            type: 'text',
            description: 'Any special note about the room',
            validation: (Rule) => Rule.required(),
            initialValue:
                'Please check-in on or after 12:00 PM of your check-in date and be sure to check out by 11:00 AM of your checkout date. Contact the front desk if you have any questions or concerns.',
        }),
        defineField({
            name: 'dimensions',
            title: 'Dimensions',
            type: 'object',
            fields: [
                { name: 'area', type: 'number', title: 'Area' },
                {
                    name: 'units',
                    type: 'string',
                    title: 'Units',
                    options: { list: ['m2', 'sqft'] },
                },
            ],
        }),
        defineField({
            name: 'numBeds',
            title: 'Number of Beds',
            type: 'number',
            validation: (Rule) => Rule.required().min(1).max(5),
            initialValue: 1,
        }),
        defineField({
            name: 'offeredAmenities',
            title: 'Offered Amenities',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'icon', type: 'string', title: 'Icon' },
                        { name: 'amenity', type: 'string', title: 'Amenity' },
                    ],
                },
            ],
            initialValue: [
                { icon: 'fa-bed-front', amenity: 'Queen Bed' },
                { icon: 'fa-wifi', amenity: 'Free Wi-Fi' },
                { icon: 'fa-coffee-pot', amenity: 'Coffee Maker' },
            ]
        }),
        defineField({
            name: 'isBooked',
            title: 'Is Booked',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'isFeatured',
            title: 'Is Featured',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'reviews',
            title: 'Reviews',
            type: 'array',
            of: [{ type: 'review' }],
        }),
    ],
};

export default room;

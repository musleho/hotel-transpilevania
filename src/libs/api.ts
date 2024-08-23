import { Room } from '@/models/room';
import sanityClient from './sanity';

import * as queries from './sanityQueries';

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
}

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
}
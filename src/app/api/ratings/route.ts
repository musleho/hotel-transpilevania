import { submitReview } from "@/libs/api";
import { authOptions } from "@/libs/auth"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const userId = session.user.id;

    const { room, userRating, text, bookingId } = await req.json();


    if (!userRating || !text || !bookingId || !room) {
        return new NextResponse('Missing required fields', { status: 400 });
    }

    try {
        const data = await submitReview({ user: userId, hotelRoom: room, userRating, text, bookingId });
        return new NextResponse(data, { status: 200, statusText: 'Successful' });
    }
    catch (error: any) {
        console.error('Error when updating review', error);
        return new NextResponse('Unable to create review', { status: 500 });
    }
}
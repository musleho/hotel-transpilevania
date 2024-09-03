import UserBookingsCard from '@/components/UserBookingsCard/UserBookingsCard';
import UserInfoCard from '@/components/UserInfoCard/UserInfoCard';
import { getUserBookings, getUserInfo } from '@/libs/api';

interface UserPageProps {
    params: { id: string };
}

const UserPage: React.FC<UserPageProps> = async ({ params }) => {
    const userId = params.id;

    const [u, b] = await Promise.allSettled([
        getUserInfo(userId),
        getUserBookings(userId),
    ]);

    if (u.status === 'rejected') {
        throw new Error('User not found');
    }

    if (b.status === 'rejected') {
        throw new Error('Error getting user bookings');
    }

    const user = u.value;
    const bookings = b.value;

    return (
        <div className='container mx-auto px-2 md:px-4 py-10'>
            <div className='grid md:grid-cols-12 gap-10'>
                <UserInfoCard user={user} />
                <UserBookingsCard bookings={bookings} />
            </div>
        </div>
    );
};

export default UserPage;

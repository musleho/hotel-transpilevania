import RoomCard from '@/components/RoomCard/RoomCard';
import Search from '@/components/Search/Search';
import { getAllRooms } from '@/libs/api';

interface RoomsProps {
    searchParams: { [key: string]: string | undefined };
};

const Rooms: React.FC<RoomsProps> = async ({ searchParams }) => {
    const roomTypeFilter = searchParams.roomType || 'all';
    const searchTerm = searchParams.searchQuery || '';

    const rooms = await getAllRooms();

    const filteredRooms = rooms.filter((room) => {
        return (
            (roomTypeFilter !== '' && roomTypeFilter.toLowerCase() !== 'all'
                ? room.type.toLowerCase() === roomTypeFilter.toLowerCase()
                : true) &&
            (searchTerm !== ''
                ? room.name.toLowerCase().includes(searchTerm.toLowerCase())
                : true)
        );
    });

    return <div className='container mx-auto pt-10'>
            <Search 
                roomTypeFilter={roomTypeFilter}
                searchQuery={searchTerm}
            />
            <div className="flex mt-20 justify-between flex-wrap">
                {filteredRooms.map((room) => <RoomCard key={room._id} room={room} />)}
            </div>
        </div>;
};

export default Rooms;

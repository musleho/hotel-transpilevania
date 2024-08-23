import { Room } from '@/models/room';
import Image from 'next/image';
import Link from 'next/link';

interface RoomCardProps {
    room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
    const { coverImage, name, price, type, description, slug, isBooked } = room;
    const dollarFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <div className='rounded-xl w-72 mb-10 mx-auto md:mx-0 overflow-hidden text-black'>
            <div className='h-60 overflow-hidden'>
                <Image
                    src={coverImage.url}
                    alt={name}
                    width={250}
                    height={250}
                    className='img scale-animation'
                />
            </div>

            <div className='p-4 bg-white'>
                <div className='flex justify-between pt-4'>
                    <h3 className='text-xl font-semibold'>{name}</h3>
                </div>
                <div className="flex justify-between text-xs items-baseline">
                    <span>{type} Room</span>
                    <span>{dollarFormat.format(price)} per night</span>
                </div>
                
                <p className='pt-3 pb-6'>{description.length <= 100 ? description : `${description.slice(0, 100)}...`}</p>
                <Link
                    href={`/rooms/${slug.current}`}
                    className='bg-primary inline-block text-center w-full py-4 rounded-xl text-white text-xl font-bold hover:-translate-y-2 hover:shadow-lg transition-all duration-500'>
                    {isBooked ? 'BOOKED' : 'Book Now'}
                </Link>
            </div>
        </div>
    );
};

export default RoomCard;

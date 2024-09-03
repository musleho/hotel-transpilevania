import { Room } from '@/models/room';
import Image from 'next/image';
import Link from 'next/link';

interface FeaturedRoomProps {
    room: Room;
}

const FeaturedRoom: React.FC<FeaturedRoomProps> = ({ room }) => {
    const { name, price, description, discount, coverImage, images, slug } =
        room;

    const fPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits:0,
        maximumFractionDigits: 0,
    }).format(price);

    const fDiscount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(discount);

    return (
        <section className='flex md:flex-row flex-col py-10 items-center justify-evenly gap12 container mx-auto'>
            <div className='md:grid gap-8 grid-cols-1'>
                <div className='rounded-2xl overflow-hidden h-48 mb-4 md:mb-0'>
                    <Image
                        className='img scale-animation'
                        src={coverImage.url}
                        alt={name}
                        width={300}
                        height={300}
                    />
                </div>
                <div className='grid grid-cols-2 gap-8 h-48'>
                    {images.splice(1, 2).map((image) => (
                        <div
                            key={image._key}
                            className='rounded-2xl overflow-hidden'>
                            <Image
                                className='img scale-animation'
                                src={image.url}
                                alt={image._key}
                                width={350}
                                height={350}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className='md:py-10 md:w-1/2 text-left pl-5'>
                <h3 className='font-heading mb-12'>{name}</h3>
                <p className='font-normal max-w-md'>{description}</p>
                <div className='flex flex-col md:flex-row md:items-end justify-between mt-5'>
                    <div className='flex mb-3 md:mb-0'>
                        <div className='flex gap-3 flex-col items-center justify-center mr-4'>
                            <p className='text-xs lg:text-xl text-center'>
                                Starting From
                            </p>
                            <p className='md:font-bold flex font-medium text-lg xl:text-5xl'>
                                {fPrice} <span className='text-xs font-normal'>&nbsp;per night</span>
                            </p>
                        </div>
                        <div className='flex gap-3 flex-col items-center justify-center mr-4'>
                            <p className='text-xs lg:text-xl text-center'>
                                Discount:
                            </p>
                            <p className='md:font-bold flex font-medium text-lg xl:text-5xl'>
                                {discount === 0 ? '$0' : fDiscount}
                            </p>
                        </div>
                    </div>
                    <Link
                    href={`/rooms/${slug.current}`}
                    className='border h-fit text-center border-tertiary-dark text-tertiary-dark px-3 py-2 lg:py-5 lg:px-7 rounded-2xl font-bold lg:text-xl'>
                        More Details
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedRoom;

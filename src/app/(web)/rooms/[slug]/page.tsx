import RoomPhotoGallery from '@/components/RoomPhotoGallery/RoomPhotoGallery';
import { getRoomBySlug } from '@/libs/api';
import { MdOutlineCleaningServices } from 'react-icons/md';
import { LiaFireExtinguisherSolid as LiaFire } from 'react-icons/lia';
import { AiOutlineMedicineBox } from 'react-icons/ai';
import { GiSmokeBomb } from 'react-icons/gi';

interface RoomDetailsProps {
    params: { slug: string };
}

const RoomDetails: React.FC<RoomDetailsProps> = async ({ params }) => {
    const { slug } = params;
    const room = await getRoomBySlug(slug);

    if (!room) {
        throw new Error('Room not found');
    }

    return (
        <div>
            <RoomPhotoGallery images={room.images} />

            <div className='container mx-auto mt-4'>
                <div className='md:grid mid:grid-cols-12 gap-10 px-3'>
                    <div className='md:col-span-8 md:w-full'>
                        <div>
                            <h2 className='font-bold text-left text-lg md:text-2xl'>
                                {room.name} ({room.dimensions.area}{' '}
                                {room.dimensions.units})
                            </h2>

                            <div className='flex my-11'>
                                {room.offeredAmenities.map((amenity) => (
                                    <div
                                        key={amenity._key}
                                        className='md:w-44 w-fit text-center px-2 md:px-0 h-20 md:h-40 mr-3 bg-[#eff0f2] dark:bg-gray-800 rounded-lg grid place-content-center'>
                                        <i
                                            className={`fa-solid ${amenity.icon} md:text-2xl`}></i>
                                        <p className='text-xs md:text-base pt-3'>
                                            {amenity.amenity}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="mb-11">
                              <h2 className="font-bold text-3xl mb-2">
                                  Description
                              </h2>
                              <p>{room.description}</p>
                            </div>
                            <div className="mb-11">
                              <h2 className="font-bold text-3xl mb-2">
                                  Safety & Hygiene
                              </h2>
                             <div className="grid grid-cols-2">
                              <div className="flex items-center my-1 md:my-0">
                                <MdOutlineCleaningServices />
                                <p className='ml-2 md:text-base text-xs'>Daily Cleaning</p>
                              </div>
                              <div className="flex items-center my-1 md:my-0">
                                <LiaFire />
                                <p className='ml-2 md:text-base text-xs'>Fire Extinguisher</p>
                              </div>
                              <div className="flex items-center my-1 md:my-0">
                                <AiOutlineMedicineBox />
                                <p className='ml-2 md:text-base text-xs'>First Aid Kit</p>
                              </div>
                              <div className="flex items-center my-1 md:my-0">
                                <GiSmokeBomb />
                                <p className='ml-2 md:text-base text-xs'>Smoke Detector</p>
                              </div>
                             </div>
                            </div>
                        </div>
                    </div>

                    <div className='md:col-span-4 md:w-full rounded=xl shadow-lg dark:shadow dark:shadow-white sticky top-10 h-fit overflow-auto'>
                        {/* BOOK ROOM CTA */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;

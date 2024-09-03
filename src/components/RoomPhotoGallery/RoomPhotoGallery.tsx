'use client';

import LoadingSpinner from '@/app/(web)/loading';
import { Image as Img } from '@/models/room';
import Image from 'next/image';
import { Suspense, useState } from 'react';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';

interface RoomPhotoGalleryProps {
    images: Img[];
}

const RoomPhotoGallery: React.FC<RoomPhotoGalleryProps> = ({ images }) => {
    const [currentImage, setCurrentImage] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);

    const openModal = (index: number) => {
        setCurrentImage(index);
        setShowModal(true);
    };

    const handlePrevious = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const maxVisImages = Math.min(images.length, 4);
    const displayImages = images.slice(1, maxVisImages);

    const hiddenImgCount = images.length - maxVisImages;

    return (
        <div className='container mx-auto'>
            <div className='grid md:grid-cols-2 relative gap-5 px-3'>
                <div className='h-[540px] relative rounded-2xl overflow-hidden'>
                    <div className='hidden md:flex justify-center items-center w-full h-full'>
                        <Suspense fallback={<LoadingSpinner />}>
                            <Image
                                src={images[0].url}
                                alt={images[0]._key}
                                className='img scale-animation cursor-pointer'
                                width={150}
                                height={150}
                                onClick={openModal.bind(this, 0)}
                                priority
                            />
                        </Suspense>
                    </div>

                    <div className='md:hidden flex justify-center items-center w-full h-full'>
                        <Image
                            src={images[currentImage].url}
                            alt={images[currentImage]._key}
                            className='img'
                            width={150}
                            height={150}
                            onClick={openModal.bind(this, 0)}
                            priority
                        />
                    </div>
                </div>
                <div className='md:hidden flex justify-between items-center'>
                    <div className='flex space-x-2'>
                        <FaArrowLeft
                            className='cursor-pointer'
                            onClick={handlePrevious}
                        />
                        <FaArrowRight
                            className='cursor-pointer'
                            onClick={handleNext}
                        />
                    </div>
                    <span>
                        {currentImage + 1} / {images.length}
                    </span>
                </div>
                <div className='hidden md:grid grid-cols-2 h-full gap-5'>
                    {displayImages.map((image, index) => (
                        <div
                            key={index}
                            className='cursor-pointer h-64 rounded-2xl overflow-hidden'>
                            <Suspense fallback={<LoadingSpinner />}>
                                <Image
                                    src={image.url}
                                    alt={image._key}
                                    className='img scale-animation cursor-pointer'
                                    width={150}
                                    height={150}
                                    onClick={openModal.bind(this, index + 1)}
                                    priority
                                />
                            </Suspense>
                        </div>
                    ))}
                    {hiddenImgCount > 0 && (
                        <div
                            className='cursor-pointer relative h-64 rounded-2xl overflow-hidden'
                            onClick={openModal.bind(this, maxVisImages)}>
                            <Image
                                width={150}
                                height={150}
                                src={images[maxVisImages - 1].url}
                                alt={`Room Photo ${maxVisImages}`}
                                className='img scale-animation cursor-pointer'
                            />
                            <div className='absolute cursor-pointer text-white inset-0 flex justify-center bg-[rgba(0,0,0,0.5)] items-center text-2xl'>
                                + {hiddenImgCount}
                            </div>
                        </div>
                    )}
                </div>

                {showModal && (
                    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-90 z-[55]'>
                        <div className='h-[75vh] w-[320px] md:w-[700px] relative'>
                            <Image
                                src={images[currentImage].url}
                                alt={`Room Photo ${currentImage + 1}`}
                                width={150}
                                height={150}
                                className='img'
                            />
                            <div className='flex justify-between items-center py-3'>
                                <div className='flex space-x-2 items-center text-white'>
                                    <FaArrowLeft
                                        className='cursor-pointer'
                                        onClick={handlePrevious}
                                    />
                                    <FaArrowRight
                                        className='cursor-pointer'
                                        onClick={handleNext}
                                    />
                                </div>
                                <span className='text-white text-sm'>
                                    {currentImage + 1} / {images.length}
                                </span>
                            </div>
                            <button
                                className='absolute top-2 right-2 text-white text-lg'
                                onClick={() => setShowModal(false)}>
                                <MdCancel className='font-medium text-2xl text-tertiary-dark' />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoomPhotoGallery;

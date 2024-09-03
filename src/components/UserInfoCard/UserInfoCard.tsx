'use client';

import { User } from '@/models/user';

import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { FaSignOutAlt } from 'react-icons/fa';

interface UserInfoCardProps {
    user: User;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ user }) => {
    return (
        <>
            <div className='hidden md:block md:col-span-4 lg:col-span-3 shadow-lg h-fit sticky top-10 bg-[#EFF0F2] text-black rounded-lg px-6 py-4'>
                <div className='w-38 md:w-[143px] h-28 md:h-[143px] mx-auto mb-5 rounded-full overflow-hidden'>
                    <Image
                        src={user.image}
                        alt={`${user.name}'s Profile Image`}
                        width={100}
                        height={100}
                        className='img scale-animation rounded-full'
                    />
                </div>
                <div className='w-full flex flex-col justify-center items-center'>
                    <h6 className='text-xl font-bold'>{user.name}</h6>
                    <p className='text-xs font-medium'>
                        Member since {new Date(user._createdAt).getFullYear()}
                    </p>
                </div>
                <div className='font-normal py-4 text-left'>
                    <h6 className='text-xl font-bold pb-3'>About</h6>
                    <p className='text-sm'>{user.about ?? ''}</p>
                </div>

                <div className='flex w-full items-center justify-end'>
                    <p className='mx-2'>Sign Out</p>
                    <FaSignOutAlt
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className='text-3xl cursor-pointer'
                    />
                </div>
            </div>

            <div className='md:hidden lg:hidden col-span-8'>
                <div className='flex flex-col items-center justify-center w-full'>
                    <div className='w-14 h-14 rounded-l-full overflow-hidden'>
                        <Image
                            src={user.image}
                            alt={`${user.name}'s Profile Image`}
                            width={55}
                            height={55}
                            className='img scale-animation rounded-full'
                        />
                    </div>
                    <h5 className='text-2xl font-bold pt-2'>
                        Hello, {user.name}
                    </h5>
                    <p className='text-xs font-medium pb-3'>
                        Member since {new Date(user._createdAt).getFullYear()}
                    </p>
                    <p className='block w-fit text-sm py-2'>
                        {user.about ?? ''}
                    </p>
                    <div className='flex w-[80vw] items-center justify-end pt-2'>
                        <p className='mx-2'>Sign Out</p>
                        <FaSignOutAlt
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className='text-3xl cursor-pointer'
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserInfoCard;

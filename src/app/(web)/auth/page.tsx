'use client';

import { useEffect, useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import { signUp } from 'next-auth-sanity/client';
import { signIn, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface LoginFormData {
    name: string;
    email: string;
    password: string;
}

const DEFAULT_FORM_DATA: LoginFormData = {
    name: '',
    email: '',
    password: '',
};

const Auth = () => {
    const [formData, setFormData] = useState<LoginFormData>(DEFAULT_FORM_DATA);
    const { data: session } = useSession();
    const router = useRouter();
    
    useEffect(() => {
        if (session) {
            router.push('/');
        }
    }, [session, router]);

    console.log(session);

    const handleLogin = async () => {
        try {
            await signIn();
        }
        catch (e) {
            console.log(e);
            toast.error("Something went wrong.");
        }
    };

    const inputStyles =
        'border border-gray-300 sm:text-sm text-black rounded-lg block w-full p-2.5 focus:outline-none';

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const user = await signUp(formData);
            if (user) {
                toast.success("Success. Please sign in to continue.");
            }
            else {
                toast.error("Something went wrong. Please try again.");
            }
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setFormData(DEFAULT_FORM_DATA);
        }
    };

    return (
        <section className='container mx-auto'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8 w-80 md:w-[70%] mx-auto'>
                <div className='flex mb-8 flex-col md:flex-row items-center justify-between'>
                    <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl'>
                        Create an Account
                    </h1>
                    <p>OR</p>
                    <span className='inline-flex items-center'>
                        <AiFillGithub onClick={handleLogin} className='mr-3 text-4xl cursor-pointer text-black dark:text-white' />
                        <FcGoogle onClick={handleLogin} className='ml-3 text-4xl cursor-pointer' />
                    </span>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className='space-y-4 md:space-y-6'>
                    <input
                        type='text'
                        name='name'
                        placeholder='Enter your Name'
                        required
                        className={inputStyles}
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type='email'
                        name='email'
                        placeholder='Email'
                        required
                        className={inputStyles}
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        required
                        className={inputStyles}
                        value={formData.password}
                        onChange={handleInputChange}
                    />

                    <button
                        type='submit'
                        className='w-full bg-tertiary-dark focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                        Sign Up
                    </button>
                </form>

                <button onClick={handleLogin} className='text-blue-700 underline'>Log In</button>
            </div>
        </section>
    );
};

export default Auth;

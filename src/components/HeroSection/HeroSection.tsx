import Image from 'next/image';
import CountUpNumber from '../CountUpNumber/CountUpNumber';

const HeroSection = () => {
    return (
        <section className='flex px-4 items-center gap-12 container mx-auto'>
            <div className='py-10 h-full'>
                <h1 className='font-heading mb-6'>
                    Explore Our Exquisite Hotel
                </h1>
                <p className='text-[#4a4a4a] dark:text-[#ffffffea] mb-12 max-w-lg'>
                    Wow this hotel looked type-safe just a moment ago!
                </p>
                <button className='btn-primary'>Get Started</button>
                <div className='flex justify-between mt-12'>
                <div className='flex gap-3 flex-col items-center justify-center w-full'>
                        <p className='text-xs lg:text-xl text-center'>
                            Basic Rooms
                        </p>
                        <CountUpNumber duration={800} endValue={101} delay={2000}/>
                    </div>
                    <div className='flex gap-3 flex-col items-center justify-center w-full'>
                        <p className='text-xs lg:text-xl text-center'>
                            Luxury Rooms
                        </p>
                        <CountUpNumber duration={800} endValue={30} delay={2000}/>
                    </div>
                    <div className='flex gap-3 flex-col items-center justify-center w-full'>
                        <p className='text-xs lg:text-xl text-center'>Suites</p>
                        <CountUpNumber duration={800} endValue={10} delay={2000}/>
                    </div>
                </div>
            </div>
            <div className='md:grid hidden gap-8 grid-cols-1'>
                <div className='rounded-2xl overflow-hidden h-48'>
                    <Image
                        src='/images/hero-1.jpeg'
                        alt='Hero Image'
                        width={300}
                        height={300}
                        className='img scale-animation'
                    />
                </div>
                <div className='grid grid-cols-2 gap-8 h-48'>
                    <div className='rounded-2xl overflow-hidden'>
                        <Image
                            src='/images/hero-2.jpeg'
                            alt='Hero Image'
                            width={300}
                            height={300}
                            className='img scale-animation'
                        />
                    </div>
                    <div className='rounded-2xl overflow-hidden'>
                        <Image
                            src='/images/hero-3.jpeg'
                            alt='Hero Image'
                            width={300}
                            height={300}
                            className='img scale-animation'
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

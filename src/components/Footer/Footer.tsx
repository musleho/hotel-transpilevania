import Link from 'next/link';
import {
    BsFillSendFill,
    BsGeoAltFill,
    BsTelephoneOutbound,
} from 'react-icons/bs';
import { BiMessageDetail } from 'react-icons/bi';

const Footer: React.FC = () => {
    return (
        <footer className='mt-8 pb-2 bg-tertiary-light'>
            <div className='container mx-auto px-4 pt-5'>
                <Link href='/' className='font-black text-primary'>
                    Hotel TranspileVania
                </Link>
                <h4 className='font-semibold text-[20px] py-3'>Contact</h4>
                <div className='flex flex-wrap gap-16 items-center justify-between'>
                    <div className='flex-1'>
                        <div className='flex items-center'>
                            <BsGeoAltFill />
                            <p className='ml-2'>666 Static Street</p>
                        </div>
                        <div className='flex items-center py-4'>
                            <BsFillSendFill />
                            <p className='ml-2'>Hotel Management</p>
                        </div>
                        <div className='flex items-center'>
                            <BsTelephoneOutbound />
                            <p className='ml-2'>123-456-7890</p>
                        </div>
                        <div className='flex items-center py-4'>
                            <BiMessageDetail />
                            <p className='ml-2'>Hotel Management</p>
                        </div>
                    </div>

                    <div className='flex-1 md:text-right'>
                        <p className='pb-4'>Our Story</p>
                        <p className='pb-4'>Get In Touch</p>
                        <p className='pb-4'>Our Privacy Commitment</p>
                        <p className='pb-4'>Terms of Service</p>
                        <p>Customer Service</p>
                    </div>

                    <div className='flex-1 md:text-right'>
                        <p className='pb-4'>Dining Experience</p>
                        <p className='pb-4'>Wellness</p>
                        <p className='pb-4'>Fitness</p>
                        <p className='pb-4'>Business Center</p>
                        <p>Events</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

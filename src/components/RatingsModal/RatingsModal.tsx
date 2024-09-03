import axios from 'axios';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { BsStarFill } from 'react-icons/bs';

interface RatingsModalProps {
    isOpen: boolean;
    bookingId: string | null;
    roomId: string | null;
}

const RatingsModal: React.FC<RatingsModalProps> = ({
    isOpen,
    bookingId,
    roomId,
}) => {
    const starVals = [1, 2, 3, 4, 5];
    const [rating, setRating] = useState<number>(0);
    const comments = useRef<HTMLTextAreaElement>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const submitReview = async () => {
        if (rating < 1 || !comments.current || comments.current?.value === '') {
            return toast.error('Please fill in all fields.');
        }

        setIsSubmitting(true);

        try {
            await axios.post('/api/ratings', {
                room: roomId,
                text: comments.current.value,
                userRating: rating,
                bookingId,
            });
            toast.success('Review submitted successfully. Thanks!');
        } catch (error: any) {
            console.error('Error submitting review', error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className={`fixed z-[61] inset-0 flex items-center justify-center ${isOpen ? 'opacity-100 pointer-events-none' : 'hidden'}`}>
            <div className='bg-white w-96 p-4 rounded-lg shadow-lg pointer-events-auto'>
                <h2 className='text-xl dark:text-gray-800 font-semibold mb-2'>
                    Rate Your Experience
                </h2>
                <div className='mb-4'>
                    <label
                        htmlFor='rating'
                        className='block text-sm font-medium text-black'>
                        Rating
                    </label>
                    <div className='flex items-center'>
                        {starVals.map((val) => (
                            <button
                                key={val}
                                onClick={() => setRating(val)}
                                className={`w-6 h-6 ${rating >= val ? 'text-yellow-500' : 'text-gray-600'}`}>
                                <BsStarFill />
                            </button>
                        ))}
                    </div>
                </div>

                <div className='mb-4'>
                    <label
                        htmlFor='comments'
                        className='block text-sm font-medium text-black'>
                        Comments
                    </label>
                    <textarea
                        name='comments'
                        id='comments'
                        rows={5}
                        ref={comments}
                        className='w-full px-2 py-3 border rounded-md text-sm'
                    />
                </div>
                <div className='flex justify-end'>
                    <button
                        className={`px-4 py-2 rounded-md ${rating > 0 ? 'bg-primary text-white rounded-md hover:scale-105 duration-200' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                        onClick={submitReview}
                        disabled={rating === 0 || isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RatingsModal;

'use client';

import { FC, useEffect, useState } from 'react';

type CountUpNumberProps = {
    endValue: number;
    duration: number;
    delay?: number;
};

const CountUpNumber: FC<CountUpNumberProps> = ({ endValue, duration, delay }) => {
    const [count, setCount] = useState(0);

    const hold = delay ? Math.max(delay, 0) : 0;

    useEffect(() => {
        let startTime: number;
        let animationFrameId: number;

        const updateCount = (timestamp: number) => {
            if (!startTime || startTime <= hold) startTime = timestamp;
                const elapsedTime = timestamp - startTime;

                if (elapsedTime < duration) {
                    setCount(
                        Math.min(endValue, (elapsedTime / duration) * endValue)
                    );
                    animationFrameId = requestAnimationFrame(updateCount);
                } else {
                    setCount(endValue);
                }
        };

        animationFrameId = requestAnimationFrame(updateCount);
        return () => cancelAnimationFrame(animationFrameId);
    }, [endValue, duration, hold]);

    return (
        <p className='md:font-bold font-medium text-lg xl:text-5xl'>
            {count === 0 ? '-' : count <= 100 ? Math.round(count) : "100+"}
        </p>
    );
};

export default CountUpNumber;

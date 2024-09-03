'use client';

import {
    Chart,
    Tooltip,
    CategoryScale,
    LinearScale,
    BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { Booking } from '@/models/booking';

Chart.register(Tooltip, CategoryScale, LinearScale, BarElement);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Your Spending',
        },
    },
};

interface SpendChartProps {
    userBookings: Booking[];
}

const SpendChart: React.FC<SpendChartProps> = ({ userBookings }) => {
    const labels = userBookings.map((booking) => booking.room.name);
    const amountSpent = userBookings.map((booking) => booking.totalPrice);

    return (
        <Bar
            options={options}
            data={{
                labels,
                datasets: [
                    {
                        label: 'Amount spent',
                        data: amountSpent,
                        borderWidth: 1,
                        backgroundColor: '#F27405',
                        hoverBackgroundColor: '#F2C641',
                    },
                ],
            }}
        />
    );
};

export default SpendChart;

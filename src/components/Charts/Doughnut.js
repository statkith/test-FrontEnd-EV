import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const data = {
    labels: ['Slovenia', 'EU countries', 'Pakistan', 'Mali', 'Sri Lanka'],
    datasets: [
        {
            label: '# Green Iguana sitings',
            data: [126, 25, 25, 15, 34, 5],
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const DoughnutChart = () => (
    <>
        <div style={{ padding: 50, background: 'white' }}>
            <h2>Green Iguana Number Of Examined</h2>
            <Doughnut data={data} />
        </div>
    </>
);

export default DoughnutChart;
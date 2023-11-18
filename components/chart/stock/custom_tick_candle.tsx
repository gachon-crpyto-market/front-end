import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from "@faker-js/faker";

type CandleStickProps = {
    width: number | undefined;
    height: number | undefined;
    date: string[];
    name: string[];
    line: number[];
    price: number[];
  };
  
export const CustomTickCandle: React.FC<CandleStickProps> =({
    width,
    height,
    date,
    name,
    line,
    price,
})=>{

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        // 옵션 (1)
        responsive: false,
        // 옵션 (2)
        interaction: {
            mode: "index" as const,
            intersect: false,
        },
        // 옵션 (3)
        scales: {
            x: {
                grid: {
                    color: "#404040",                },
            },
            y: {
                grid: {
                    color: "#404040",
                },
            },
        },
    };

    const labels = Array.from({ length: 24 }, (_, index) => index + 1);

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            // {
            //     label: 'Dataset 2',
            //     data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
            //     borderColor: 'rgb(53, 162, 235)',
            //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
            // },
        ],
    };

    return (
        <Line options={options} data={data} width="894px" height="320px" />
    );
}
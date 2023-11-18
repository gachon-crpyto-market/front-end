import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { CustomTickChart } from './custom_tick_chart';
import { type } from 'os';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface CandleData {
    name: string;
    type: string;
    data: [Date, number, number, number, number][]
}

interface BarData {
    name: string;
    type: string;
    data: [Date, number][]
}

type ChartProps = {
    isCandleClicked: boolean;
};


export const CustomCandleChart: React.FC<ChartProps> = ({
    isCandleClicked
}) => {

    var highest = 0;
    var lowest = 1000;

    const today = new Date(); // 오늘 날짜
    const startDate = new Date(today.getTime() - 20 * 24 * 60 * 60 * 1000); // 20일 전 날짜


    // Function to generate random numbers between 10 and 90 for candlestick chart
    const generateCandlestickData = (length: number): [Date, number, number, number, number][] => {
        const data: [Date, number, number, number, number][] = [];
        let prevClose = 30;

        var currentHighest = 0;
        var currentLowest = 1000;


        for (let i = 0; i < length; i++) {
            const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000); // 현재 날짜 계산

            const open = prevClose + Math.floor(Math.random() * 21) - 10;
            const close = open + Math.floor(Math.random() * 21) - 10;
            const high = Math.max(open, close) + Math.floor(Math.random() * 6);
            const low = Math.min(open, close) - Math.floor(Math.random() * 6);

            if (high > currentHighest) {
                currentHighest = high;
            }
            if (low < currentLowest) {
                currentLowest = low;
            }

            data.push([currentDate, open, high, low, close]);

            prevClose = close;
        }

        //highest = currentHighest;
        //lowest = currentLowest;


        return data;
    };

    const generateAverageData = (length: number): [Date, number][] => {
        const data: [Date, number][] = [];

        const originData = candleSeriesData[0].data;



        for (let i = 2; i < length - 2; i++) {
            const averageData = (
                originData[i - 2][4] +
                originData[i - 1][4] +
                originData[i][4] +
                originData[i + 1][4] +
                originData[i + 2][4]
            ) / 5;

            data.push([originData[i][0], averageData]);
        }
        return data;
    }

    const generateAverage10Data = (length: number): [Date, number][] => {
        const data: [Date, number][] = [];

        const originData = candleSeriesData[0].data;



        for (let i = 4; i < length - 5; i++) {
            const averageData = (
                originData[i - 4][4] +
                originData[i - 3][4] +
                originData[i - 2][4] +
                originData[i - 1][4] +
                originData[i][4] +
                originData[i + 1][4] +
                originData[i + 2][4] +
                originData[i + 3][4] +
                originData[i + 4][4] +
                originData[i + 5][4]
                ) / 10;

            data.push([originData[i][0], averageData]);
        }
        return data;
    }

    const generateAverage20Data = (length: number): [Date, number][] => {
        const data: [Date, number][] = [];

        const originData = candleSeriesData[0].data;



        for (let i = 9; i < length - 10; i++) {
            const averageData = (
                originData[i - 9][4] +
                originData[i - 8][4] +
                originData[i - 7][4] +
                originData[i - 6][4] +
                originData[i - 5][4] +
                originData[i - 4][4] +
                originData[i - 3][4] +
                originData[i - 2][4] +
                originData[i - 1][4] +
                originData[i][4] +
                originData[i + 1][4] +
                originData[i + 2][4] +
                originData[i + 3][4] +
                originData[i + 4][4] +
                originData[i + 5][4] +
                originData[i + 6][4] +
                originData[i + 7][4] +
                originData[i + 8][4] +
                originData[i + 9][4] +
                originData[i + 10][4]
                ) / 20;

            data.push([originData[i][0], averageData]);
        }
        return data;
    }

    // Function to generate random numbers between 10 and 90 for bar chart
    const generateRandomNumbers = (length: number): [Date, number][] => {
        const data: [Date, number][] = [];
        let prevValue = 30;


        for (let i = 0; i < length; i++) {
            const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000); // 현재 날짜 계산

            const randomValue =  Math.floor(Math.random() * 100) + 100;
            data.push([currentDate, randomValue]);
            prevValue = randomValue;
        }

        return data;
    };

    const [candleSeriesData, setCandleSeriesData] = useState<CandleData[]>([
        {
            name: "Price day",
            type: "candlestick",
            data: generateCandlestickData(50) // 초기 데이터 생성
        }
    ]);

    const [barSeriesData, setBarSeriesData] = useState<BarData[]>([
        {
            name: "Volume",
            type: "bar",
            data: generateRandomNumbers(50) // 초기 데이터 생성
        }
    ]);

    const [averageSeriesData, setAverageSeriesData] = useState<BarData[]>([
        {
            name: "Average",
            type: "line",
            data: generateAverageData(50) // 초기 데이터 생성
        }
    ]);


    const [count, setCount] = useState(0);
    const countUp = () => setCount(count + 1);

    useEffect(() => {

        // candleSeriesData의 마지막 index의 값을 랜덤으로 수정
        const newData = [...candleSeriesData[0].data]; // 기존 데이터 복제
        const lastIndex = newData.length - 1;


        const date = newData[lastIndex][0];

        const open = newData[lastIndex][1];
        const close = newData[lastIndex][4] + Math.floor(Math.random() * 10) - 5;

        var high = newData[lastIndex][2];
        var low = newData[lastIndex][3];
        if (close > high) {
            high = close;
        }
        if (close < low) {
            low = close;
        }


        newData[lastIndex] = [date, open, high, low, close]; // 마지막 데이터 수정

        setCandleSeriesData(prevData => ([
            {
                ...prevData[0],
                data: newData
            }
        ]));

        const newBarData = [...barSeriesData[0].data]; // 기존 데이터 복제
        const lastBarIndex = newBarData.length - 1;
        const barDate = newBarData[lastBarIndex][0];
        const barValue = newBarData[lastBarIndex][1] + Math.floor(Math.random() * 5);
        newBarData[lastBarIndex] = [barDate, barValue]; // 마지막 데이터 수정

        setBarSeriesData(prevData => ([
            {
                ...prevData[0],
                data: newBarData
            }
        ]));


    }, [count]);

    var chartHeight = 600;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // 브라우저에서만 실행되는 코드
            chartHeight = window.innerHeight;
            // ...
        }
    },);

    const barXAxisLabels = barSeriesData[0].data.map(item => item[0]); // Bar 차트의 x축 라벨을 생성

    const series = [
        {
            name: 'Price Candle Stick',
            type: 'candlestick',
            data: candleSeriesData[0].data,
        },
        {
            // name: 'Average 5 days',
            name: '5 Period SMA',
            type: 'line',
            data: averageSeriesData[0].data,
        },
        {
            // name: 'Average 10 days',
            name: '10 Period SMA',
            type: 'line',
            data: generateAverage10Data(50),
        },
        {
            // name: 'Average 20 days',
            name: '20 Period SMA',
            type: 'line',
            data: generateAverage20Data(50),
        },

        // Additional series if needed
        // ...
    ];
    return (
        <div className="h-full">
            {/* Candlestick chart */}
            {/* <button className="text-white" onClick={countUp}>Click Me</button> */}

            <div className="">
                {!isCandleClicked ?
                    <div>
                        <Chart
                            options={{
                                chart: {
                                    id: 'candles',
                                    toolbar: {
                                        autoSelected: 'pan',
                                        show: false
                                    },
                                    zoom: {
                                        enabled: false
                                    },
                                },
                                grid: {
                                    show: true,
                                    borderColor: '#202020',
                                    position: 'back',
                                    xaxis: {
                                        lines: {
                                            show: true
                                        }
                                    },
                                    yaxis: {
                                        lines: {
                                            show: true
                                        }
                                    },
                                },
                                stroke: {
                                    width: [1,1.5,1.5,1.5],
                                    colors: ['#fff', '#2196F3','#2157F3', '#2A21F3'],
                                },
                                plotOptions: {
                                    candlestick: {
                                        colors: {
                                            upward: '#22C55E',
                                            downward: '#E33F64'
                                        }
                                    }
                                },
                                colors : ['#22C55E', '#2196F3','#2157F3', '#2A21F3'],
                                legend: {
                                    labels:{
                                        colors: ['#22C55E', '#2196F3','#2157F3', '#2A21F3']
                                    }
                                },
                                xaxis: {
                                    type: 'datetime',
                                    labels: {
                                        style: {
                                            colors: '#9CA3AF'
                                        },
                                        show: false,
                                    },

                                },
                                yaxis: {
                                    labels: {
                                        formatter: function (value: number) {
                                            return Math.round(value).toString(); // 소수점 제거하고 정수로 변환하여 반환
                                        },
                                        style: {
                                            colors: '#9CA3AF'
                                        }
                                    },
                                    tooltip: {
                                        enabled: true
                                    },
                                    tickAmount: 6,
                                },
                                tooltip: {
                                    enabled: true,
                                    shared: true,
                                    intersect: false,
                                    theme: 'dark',
                                    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                                        return (
                                            '<div class="bg-neutral-800 w-48 text-white justify-around p-1 flex">' +
                                            '<span class="w-1/5"> O ' +
                                            w.globals.seriesCandleO[seriesIndex][dataPointIndex] +
                                            '</span>' +
                                            '<span class="w-1/5">  H ' +
                                            w.globals.seriesCandleH[seriesIndex][dataPointIndex] +
                                            '</span>' +
                                            '<span class="w-1/5">  L ' +
                                            w.globals.seriesCandleL[seriesIndex][dataPointIndex] +
                                            '</span>' +
                                            '<span class="w-1/5">  C ' +
                                            w.globals.seriesCandleC[seriesIndex][dataPointIndex] +
                                            '</span>' +
                                            '</div>'
                                        );
                                    },


                                    y: {
                                        formatter: function (value) {
                                            return value + " USD";
                                        }
                                    },
                                    x: {
                                        show: true
                                    },
                                    fixed: {
                                        enabled: true,
                                        position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                                        offsetX: 50,
                                        offsetY: 0,
                                    },
                                }
                            }}
                            series={series}
                            type="candlestick"
                            height={260}
                        />
                    </div>
                    :
                    <CustomTickChart />
                }
            </div>
            {/* Bar chart */}
            <div className="">
                <Chart
                    options={{
                        chart: {
                            brush: {
                                enabled: true,
                                target: 'candles'
                            },
                            selection: {
                                enabled: true,
                                fill: {
                                    color: '#ff0000',
                                    opacity: 0.4
                                },
                                stroke: {
                                    color: '#0D47A1',
                                }
                            },
                        },
                        dataLabels: {
                            enabled: false
                        },
                        plotOptions: {
                            bar: {
                                columnWidth: '80%',
                                colors: {
                                    ranges: [
                                        {
                                            from: -1000,
                                            to: 0,
                                            color: '#F15B46'
                                        },
                                        {
                                            from: 1,
                                            to: 10000,
                                            color: '#FEB019'
                                        }
                                    ],
                                },
                            }
                        },
                        stroke: {
                            width: 0
                        },
                        grid: {
                            show: true,
                            borderColor: '#404040',
                            position: 'back',
                            strokeDashArray: 10,
                        },
                        xaxis: {
                            type: 'datetime',
                            labels: {
                                style: {
                                    colors: '#9CA3AF'
                                },
                                rotate: -45,
                            },
                            axisBorder: {
                                offsetX: 13
                            },
                            categories: barXAxisLabels,

                        },
                        yaxis: {
                            labels: {
                                style: {
                                    colors: '#9CA3AF'
                                }
                            },
                            tickAmount: 3,
                        },
                        tooltip: {
                            enabled: true,
                            shared: true,
                            intersect: false,
                            fillSeriesColor: false,
                            theme: 'dark',
                            y: {
                                formatter: function (value) {
                                    return value;
                                }
                            },
                            x: {
                                show: true
                            },
                            marker: {
                                show: false
                            }

                        }
                    }}
                    series={barSeriesData}
                    type="bar"
                    height={(chartHeight * 0.2)}
                />
            </div>
        </div>
    );
};

export default CustomCandleChart;

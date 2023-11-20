import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { CustomTickChart } from './custom_tick_chart';
import { type } from 'os';
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { io } from "socket.io-client";
import axios from "axios";
import { useSocketContext } from '../../../components/SocketContext';


const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface CandleData {
    name: string;
    type: string;
    data: [Date, number, number, number, number][]
}

interface CandlePriceData {
    "open": number;
    "high": number;
    "low": number;
    "close": number;
}
interface SeriesData {
    name: string;
    type: string;
    data: [Date, number, number, number, number][] | [Date, number][];
}

interface BarData {
    name: string;
    type: string;
    data: [Date, number][]
}
interface BarVolumeData {
    "volume": number;
}
type ChartProps = {
    isCandleClicked: boolean;
};


export const CustomCandleChart: React.FC<ChartProps> = ({
    isCandleClicked
}) => {
    const socket = useSocketContext();

    var highest = 0;
    var lowest = 1000;

    const today = new Date(); // 오늘 날짜
    const startDate = new Date(today.getTime() - 20 * 24 * 60 * 60 * 1000); // 20일 전 날짜


    // Function to generate random numbers between 10 and 90 for candlestick chart
    const generateCandlestickData = (originData: CandlePriceData[]): [Date, number, number, number, number][] => {
        const data: [Date, number, number, number, number][] = [];
        var currentHighest = 0;
        var currentLowest = 10000;
        const length = originData.length; // originData 배열의 길이를 length 변수로 사용

        for (let i = 0; i < length; i++) {
            const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000); // 현재 날짜 계산
            const high = originData[i].high;
            const low = originData[i].low;

            if (high > currentHighest) {
                currentHighest = high;
            }
            if (low < currentLowest) {
                currentLowest = low;
            }
            data.push([currentDate, originData[i].open, high, low, originData[i].close]);
        }
        console.log("generate candlestickData"+data.toString());
        return data;
    };

    const generateAverageData = (length: number, candlestickData: [Date, number, number, number, number][]): [Date, number][] => {

        console.log("average :" + candleSeriesData[0].toString());

        const data: [Date, number][] = [];
        const originData = candlestickData;
        if (originData.length < 5) {
            return data;
        }
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
        console.log("average :" + data.toString());
        return data;
    }

    const generateAverage10Data = (length: number, candlestickData: [Date, number, number, number, number][]): [Date, number][] => {
        const data: [Date, number][] = [];
        const originData = candlestickData;
        if (originData.length < 5) {
            return data;
        }
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

    const generateAverage20Data = (length: number, candlestickData: [Date, number, number, number, number][]): [Date, number][] => {
        const data: [Date, number][] = [];
        const originData = candlestickData;
        if (originData.length < 5) {
            return data;
        }
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
    const generateBarData = (originData: BarVolumeData[]): [Date, number][] => {

        console.log("generate barData"+originData.toString());
        const data: [Date, number][] = [];
        for (let i = 0; i < originData.length; i++) {
            const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000); // 현재 날짜 계산
            data.push([currentDate, originData[i].volume]);
        }
        console.log("generate barData"+data.toString());
        return data;
    };

    const [candleSeriesData, setCandleSeriesData] = useState<CandleData[]>([
        {
            name: "Price day",
            type: "candlestick",
            data: [] // 초기 데이터 생성
        }
    ]);
    const [barSeriesData, setBarSeriesData] = useState<BarData[]>([
        {
            name: "Volume day",
            type: "bar",
            data: [] // 초기 데이터 생성
        }
    ]);

    const [count, setCount] = useState(0);
    const countUp = () => setCount(count + 1);
    const countDown = () => setCount(count - 1);

    // useEffect(() => {

    //     // candleSeriesData의 마지막 index의 값을 랜덤으로 수정
    //     const newData = [...candleSeriesData[0].data]; // 기존 데이터 복제
    //     const lastIndex = newData.length - 1;


    //     const date = newData[lastIndex][0];

    //     const open = newData[lastIndex][1];
    //     const close = newData[lastIndex][4] + Math.floor(Math.random() * 1) - 0.5;

    //     var high = newData[lastIndex][2];
    //     var low = newData[lastIndex][3];
    //     if (close > high) {
    //         high = close;
    //     }
    //     if (close < low) {
    //         low = close;
    //     }
    //     newData[lastIndex] = [date, open, high, low, close]; // 마지막 데이터 수정
    //     setCandleSeriesData(prevData => ([
    //         {
    //             ...prevData[0],
    //             data: newData
    //         }
    //     ]));

    //     const newBarData = [...barSeriesData[0].data]; // 기존 데이터 복제
    //     const lastBarIndex = newBarData.length - 1;
    //     const barDate = newBarData[lastBarIndex][0];
    //     const barValue = newBarData[lastBarIndex][1] + Math.floor(Math.random() * 1);
    //     newBarData[lastBarIndex] = [barDate, barValue]; // 마지막 데이터 수정

    //     setBarSeriesData(prevData => ([
    //         {
    //             ...prevData[0],
    //             data: newBarData
    //         }
    //     ]));


    // }, [count]);


    const [prevCandleData, setPrevCandleData] = useState<CandlePriceData[]>([])
    const [prevBarData, setPrevBarData] = useState<BarVolumeData[]>([])
    const [series, setSeries] = useState<SeriesData[]>([
        {
            name: "Price day",
            type: "candlestick",
            data: [] // 초기 데이터 생성
        },
        {
            name: "5 Period SMA",
            type: "line",
            data: [] // 초기 데이터 생성
        },
        {
            name: "10 Period SMA",
            type: "line",
            data: [] // 초기 데이터 생성
        },
        {
            name: "20 Period SMA",
            type: "line",
            data: [] // 초기 데이터 생성
        },
    ]);
    var chartHeight = 600;
    const barXAxisLabels = barSeriesData[0]?.data.map(item => item[0]); // Bar 차트의 x축 라벨을 생성

    // ...

    useEffect(() => {
        const fetchData = async () => {
            try {
                const candleResponse = await axios.get<CandlePriceData[]>('https://www.gachonmail.shop/api/histories/il-bong');
                const barResponse = await axios.get<BarVolumeData[]>('https://www.gachonmail.shop/api/histories/il-bong-volume');

                if (candleResponse.status === 200 && barResponse.status === 200) {
                    setPrevCandleData(candleResponse.data);
                    setPrevBarData(barResponse.data);
                    console.log(candleResponse.data);
                    console.log(barResponse.data);

                    const apiCandleData = candleResponse.data;
                    const apiBarData = barResponse.data;

                    console.log(apiCandleData);
                    console.log(apiBarData);

                    const candlestickData = generateCandlestickData(candleResponse.data);
  
                    const barData = generateBarData(barResponse.data);

                    console.log(candlestickData.length);
                    const averageData = generateAverageData(candlestickData.length, candlestickData);
                    const average10Data = generateAverage10Data(candlestickData.length, candlestickData);
                    const average20Data = generateAverage20Data(candlestickData.length, candlestickData);
                
                    console.log(candlestickData.toString());

                    const updatedSeries = [
                        {
                            name: 'Price Candle Stick',
                            type: 'candlestick',
                            data: candlestickData,
                        },
                        {
                            name: '5 Period SMA',
                            type: 'line',
                            data: averageData,
                        },
                        {
                            name: '10 Period SMA',
                            type: 'line',
                            data: average10Data,
                        },
                        {
                            name: '20 Period SMA',
                            type: 'line',
                            data: average20Data,
                        },
                    ];

                    setSeries(updatedSeries);
                    setBarSeriesData([
                        {
                            name: 'Volume day',
                            type: 'bar',
                            data: barData,
                        },
                    ]);

                    console.log(barData.toString())
                } else {
                    console.error('Failed to fetch data');
                } 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className="h-full">


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
                                    width: [1, 1.5, 1.5, 1.5],
                                    colors: ['#fff', '#2196F3', '#2157F3', '#2A21F3'],
                                },
                                plotOptions: {
                                    candlestick: {
                                        colors: {
                                            upward: '#22C55E',
                                            downward: '#E33F64'
                                        }
                                    }
                                },
                                colors: ['#22C55E', '#2196F3', '#2157F3', '#2A21F3'],
                                legend: {
                                    labels: {
                                        colors: ['#22C55E', '#2196F3', '#2157F3', '#2A21F3']
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

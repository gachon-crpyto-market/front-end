import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


interface CandleData {
    x: number;
    y: number;
}

export const CustomTickChart = () => {
    const [candleSeriesData, setCandleSeriesData] = useState<CandleData[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            // 0에서 100 사이의 임의의 값 생성
            const newValue = Math.floor((Math.random() * 10 % 4) * 10 + 80);

            setCandleSeriesData(prevData => [
                ...prevData,
                {
                    x: new Date().getTime(),
                    y: newValue
                }
            ]);
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    return (
        <div >
            <Chart
                options={
                    {
                        chart: {
                            id: 'realtime',
                            type: 'line',
                            animations: {
                                enabled: true,
                                easing: 'linear',
                                dynamicAnimation: {
                                    speed: 1000
                                }
                            },
                            toolbar: {
                                show: false
                            },
                            zoom: {
                                enabled: false
                            }
                        },
                        stroke: {
                            curve: 'stepline',
                            width: 2,
                        },
                        fill: {
                            colors: ["#0fbcf9"], // line 색상 설정
                            type: "solid", // 영역 채우기 유형
                            opacity: 0.9, // 투명도 설정
                        },
                        dataLabels: {
                            enabled: false
                        },
                        colors: ["#0fbcf9"],
                        
                        title: {
                            align: 'left'
                        },
                        markers: {
                            size: 0
                        },
                        grid: {
                            show: true,
                            borderColor: '#404040',
                            position: 'back',
                            strokeDashArray: 10,
                        },
                        xaxis: {
                            type: "datetime",
                            range: 20000,
                            labels:{
                                style: {
                                    colors: '#9CA3AF'
                                }
                            }
                        },
                        yaxis: {
                            max: 130,
                            min: 70,
                            labels: {
                                formatter: function (value: number) {
                                    return Math.round(value).toString(); // 소수점 제거하고 정수로 변환하여 반환
                                },
                                style: {
                                    colors: '#9CA3AF'
                                }
                            }
                        },
                        legend: {
                            show: false
                        },
                        tooltip: {
                            enabled: true,
                            shared: true,
                            intersect: false,
                            theme: 'dark',
                            y: {
                                formatter: function (value) {
                                    return value + " USD";
                                }
                            },
                            x : {
                                format: 'HH : mm : ss',
                                formatter: undefined,
                            },
                            z : {
                                title : 'Time'
                            }
                        }
                    }
                }
                series={[{name: 'Price', data: candleSeriesData }]}
                type="line"
                height={260}

            />
        </div>
    );
};


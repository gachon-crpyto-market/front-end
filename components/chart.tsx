import { randomBytes } from "crypto";
import React from "react";
import Chart from "react-apexcharts";

const ChartComponent: React.FC = () => {
    const options = {
        chart: {
            width: 500,
            background: "transparent",
        },
    };

    const series: { name: string; data: number[] }[] = [
        { name: "Price - 1 day", data: [] },
    ];
    
    const price1day : number[] = [30];
    var preNumber = 30;
// 2에서 50까지의 랜덤값을 생성하여 배열에 추가
for (let i = 0; i < 49; i++) { // 예시로 10개의 랜덤값을 생성
    const randomValue = preNumber + Math.floor(Math.random() * (20) - 9); // 2부터 50까지의 랜덤 정수 생성
    preNumber = randomValue;
    price1day.push(randomValue); // 배열에 추가
}
price1day.push(90);

series[0].data = price1day;

    return (
        <div className="h-full w-full">
            <Chart 
            height="100%"
            options={options} 
            series={series} 
            type="line" />
        </div>
    );
};

export default ChartComponent;

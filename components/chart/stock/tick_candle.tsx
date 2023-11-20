import React from "react";
import { scaleLinear } from "d3-scale";

type CandleStickProps = {
  width: number | undefined;
  height: number | undefined;
  date: string[];
  name: string[];
  line: number[];
  price: number[];  
};

export const TickCandle: React.FC<CandleStickProps> = ({
  width,
  height,
  date,
  name,
  line,
  price,
}) => {
  let SVG_CHART_WIDTH = typeof width === "number" ? width * 1 : 0;
  let SVG_CHART_HEIGHT = typeof height === "number" ? height * 0.5 : 0;

  const xForPrice = 75;
  const xAxisLength = SVG_CHART_WIDTH - xForPrice;
  const yAxisLength = SVG_CHART_HEIGHT * 0.94;
  const x0 = 0;
  const y0 = 0;

  // const xAxisY = y0 + yAxisLength;
  const priceArray: [number, number][] = [];

  const dataArray: [
    string,
    number,
    number[]
  ][] = [];
  for (let i = 0; i < date.length; i++) {
    priceArray.push([price[i], price[i + 1] == undefined ? price[i] : price[i + 1]]);
    dataArray.push([
      date[i],
      line[i],
      priceArray[i],
    ]);
  }

  const dataYMax = dataArray.reduce(
    (max, [_, line]) => Math.max(max, line+10),
    -Infinity
  );
  const dataYMin = dataArray.reduce(
    (min, [_, line]) => Math.min(min, line-10),
    +Infinity
  );

  // const dateMax = dataArray.reduce(
  //   (max, [date, open, close, high, low]) => Math.max(max, parseInt(date)),
  //   -Infinity
  // );
  // const dateMin = dataArray.reduce(
  //   (min, [date, open, close, high, low]) => Math.min(min, parseInt(date)),
  //   +Infinity
  // );

  const dataYRange = dataYMax - dataYMin;
  const numYTicks = 7;
  const barPlothWidth = xAxisLength / dataArray.length;

  const numXTicks = 12;

  const xValue: string[] = [];
  const generateDate = () => {
    for (let i = 0; i < 12; i++) {
      xValue.push(date[Math.round(date.length / 12) * i]);
    }
    // xValue.reverse();
    // console.log(xValue);
    return xValue;
  };
  generateDate();
  return (
    <div className="w-full h-full">
      <svg width={SVG_CHART_WIDTH} height={SVG_CHART_HEIGHT}>
        <line
          x1={x0}
          y1={yAxisLength}
          x2={xAxisLength}
          y2={yAxisLength}
          stroke="gray"
        />
        <line
          x1={xAxisLength}
          y1={y0}
          x2={xAxisLength}
          y2={yAxisLength}
          stroke="gray"
        />
        <text
          x={x0 + 15}
          y={y0 + yAxisLength * 0.06}
          fontSize={
            SVG_CHART_WIDTH > 700
              ? SVG_CHART_WIDTH * 0.01
              : SVG_CHART_WIDTH * 0.02
          }
        >
          {name[name.length - 1]}
        </text>
        {/* 세로선 작성 */}
        {Array.from({ length: numXTicks }).map((_, index) => {
          const x = x0 + index * (xAxisLength / numXTicks) + 10;

          return (
            <g key={index}>
              <line
                className="bg-black"
                x1={x}
                x2={x}
                y1={yAxisLength}
                y2={y0}
              ></line>
              <text
                x={x}
                y={SVG_CHART_HEIGHT}
                textAnchor="middle"
                fontSize={SVG_CHART_WIDTH < 800 ? 6 : 10}
              >
                {xValue[index]}
              </text>
            </g>
          );
        })}
        {/* 가로선 작성(css name => lineLight) */}
        {Array.from({ length: numYTicks }).map((_, index) => {
          const y = y0 + index * (yAxisLength / numYTicks);
          const yValue = Math.round(
            dataYMax - index * (dataYRange / numYTicks)
          );
          return (
            <g key={index}>
              <line
                className="lineLight"
                x1={xAxisLength}
                x2={x0}
                y1={y}
                y2={y}
              ></line>
              <text x={SVG_CHART_WIDTH - 60} y={y + 10} fontSize="12">
                {yValue.toLocaleString()} ￦
              </text>
            </g>
          );
        })}
        {/* 캔들 구현 */}
        {dataArray.map(
          (
            [
              day,
              line,
              price,
            ],
            index
          ) => {
            // 캔들 & 이동평균선
            const x = x0 + index * barPlothWidth;
            const xX = x0 + (index + 1) * barPlothWidth;
            const sidePadding = xAxisLength * 0.0015;
            const max = line-15;
            const min = line+20;
            // ** 여기도 나중에 real data가 오면 필요 없음
            // const bolGap =
            //********
            const scaleY = scaleLinear()
              .domain([dataYMin, dataYMax])
              .range([y0, yAxisLength]);
            const fill = "#4AFA9A";
            // console.log(scaleY(max));
            // console.log(scaleY(min));
            return (
              <g key={index}>
                {/* 선행스팬 후행스팬 구름형성에 필요한 빗금 */}
                {/* <line
                    stroke="red"
                    x1={x + (barPlothWidth - sidePadding) / 2}
                    x2={xX + (barPlothWidth - sidePadding) / 2}
                    y1={yAxisLength - scaleY(price)}
                    y2={yAxisLength - scaleY(price)}
                  /> */}


                {price[0] > dataYMin && price[0] != price[1] ? (
                  <line
                    stroke="green"
                    x1={x + (barPlothWidth - sidePadding) / 2}
                    x2={xX + (barPlothWidth - sidePadding) / 2}
                    y1={yAxisLength - scaleY(price[0])}
                    y2={yAxisLength - scaleY(price[1])}
                  />
                ) : null}

                {/* <line
                  x1={x + (barPlothWidth - sidePadding) / 2}
                  x2={x + (barPlothWidth - sidePadding) / 2}
                  y1={yAxisLength - scaleY(low)}
                  y2={yAxisLength - scaleY(high)}
                  stroke={open > close ? "red" : "green"}
                /> */}
                <rect
                  {...{ fill }}
                  x={x}
                  width={barPlothWidth - sidePadding}
                  y={yAxisLength - scaleY(max)}
                  // 시가 종가 최대 최소값의 차
                  height={scaleY(max) - scaleY(min)}
                ></rect>
              </g>
            );
          }
        )}
      </svg>
    </div>
  );
};

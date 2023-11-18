import React, { useEffect, useState } from "react";
import { StockChart } from "../containers/stock/stockchart";
import { useWindowSize } from "../functions/usewindowsize";

interface Size {
    width: number | undefined;
    height: number | undefined;
}

export const Stocks: React.FC = () => {
    //const size: Size = useWindowSize();
    // console.log(size.width, size.height);

    return (
        <div className=" bg-chartGray-default w-full h-full flex-col flex">
            <div>
                <StockChart width={720} height={440} />
            </div>
        </div>
    );
};
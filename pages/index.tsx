// MyApp.tsx
import React, { useState } from 'react';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import Link from 'next/link';
import { TbWorld, TbDownload, TbMoon } from 'react-icons/tb';
import { BiSearch } from 'react-icons/bi';
// import ChartComponent from './components/chart';
// import dynamic from 'next/dynamic';
// import { HandmadeChart } from './components/handmade-chart';
import { Stocks } from '../components/stock';
import { CustomTickCandle } from '../components/chart/stock/custom_tick_candle';
import { CustomCandleChart } from '../components/chart/stock/custom_candle_chart';
import { CustomTickChart } from '../components/chart/stock/custom_tick_chart';
import { NavBar } from '../components/NavBar';

// const DynamicChart = dynamic(() => import('./components/chart'), {
//   ssr: false, // 서버 측에서 로드하지 않도록 설정
// });

type CategoriesProps = {
  label: string;
  isActive: String;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;

}

const Categories = ({ label, isActive, onClick }: CategoriesProps) => {
  return (
    <button className={`h-full whitespace-nowrap
    px-3 mt-1 items-center justify-evenly bg-transparent font-medium text-sm border-b-2 ${isActive == label ? 'border-yellow-500 text-yellow-500' : 'border-transparent text-white'} hover:text-yellow-500`} onClick={onClick}>
      {label}
    </button>
  );
}

interface ButtonProps {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isActive: boolean;
  color?: string;
  textSize?: string;
}

const Button = ({ label, onClick, isActive, color, textSize }: ButtonProps) => {
  const buttonClicked = isActive
    ? `${color ? color : 'bg-gray-600'} text-white`
    : 'bg-neutral-800 text-stone-400';

  return (
    <button className={`w-1/2 h-8 rounded font-semibold text-sm ${textSize ? textSize : ' '} ${buttonClicked} transition-all ease-in-out duration-300`} onClick={onClick}>{label}</button>
  );
}

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  sideText?: string;
}

const Input = ({ label, type, placeholder, value, sideText }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className=" mt-3">
      <p className="text-gray-400 text-xs">{label}</p>
      <div className="w-full relative mt-1.5 mb-4">
        <input
          type="text"
          name={label}
          id={value}
          className={`
    block h-10 w-full rounded border-0 p-3 pr-20 text-white bg-neutral-800 text-sm
    border-[1px] border-transparent hover:border-gray-600 transition-all ease-in-out ${isFocused ? 'duration-0' : 'duration-300'}
    focus:outline-none focus:border-yellow-500 caret-yellow-500
  `}
          onClick={() => setIsFocused(true)}
          onMouseOver={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onMouseOut={() => setIsFocused(false)}

        />
        <p className="text-white absolute right-3 bottom-3 font-semibold text-xs"> {sideText}</p>
      </div>
    </div>
  )
}



const Index = () => {
  const [isCategoryClicked, setIsCategoryClicked] = useState(3);
  const [isTradeClicked, setIsTradeClicked] = useState(true);
  const [isMyInfoClicked, setIsMyInfoClicked] = useState(false);
  const [isBuyClicked, setIsBuyClicked] = useState(true);
  const [isSellClicked, setIsSellClicked] = useState(false);
  const [isSpotClicked, setIsSpotClicked] = useState(true);
  const [isMarginClicked, setIsMarginClicked] = useState(false);
  const [isOptionClicked, setIsOptionClicked] = useState(0);

  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  const [isLogInClicked, setIsLogInClicked] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const [isDownloadClicked, setIsDownloadClicked] = useState(false);
  const [isLanguageClicked, setIsLanguageClicked] = useState(false);
  const [isDarkModeClicked, setIsDarkModeClicked] = useState(true);
  const [isDownloadHovered, setIsDownloadHovered] = useState(false);
  const [isLanguageHovered, setIsLanguageHovered] = useState(false);

  const [isOrderBookClicked, setIsOrderBookClicked] = useState(true);
  const [isRecentTradesClicked, setIsRecentTradesClicked] = useState(false);

  const [isTradeOptionClicked, setIsTradeOptionClicked] = useState(0);

  const [isTickChartClicked, setIsTickChartClicked] = useState(false);

  const categories = ["Deposit", "Markets", "Derivatives", "Trade", "Rewards Hub"]
  const handleCategoryClick = (index: number) => {
    setIsCategoryClicked(index);
  }

  const bottomCategories = ["Spot Pairs", "Order Type", "Direction", "Order Value",
    "Order Price", "Order Qty", "Filled Qty", "Unfilled Qty", "Order Time", "Order ID", "Action"];


  const handleTradeClick = () => {
    setIsTradeClicked(true);
    setIsMyInfoClicked(false);
  };

  const handleMyInfoClick = () => {
    setIsTradeClicked(false);
    setIsMyInfoClicked(true);
  };

  const handleBuyClick = () => {
    setIsBuyClicked(true);
    setIsSellClicked(false);
  };

  const handleSellClick = () => {
    setIsBuyClicked(false);
    setIsSellClicked(true);
  };

  const handleSpotClick = () => {
    setIsSpotClicked(true);
    setIsMarginClicked(false);
  };

  const handleMarginClick = () => {
    setIsSpotClicked(false);
    setIsMarginClicked(true);
  };

  const handleOptionClick = (index: number) => {
    setIsOptionClicked(index);
  }

  const handleSignUpClick = () => {
    setIsSignUpClicked(true);
  }

  const handleLogInClick = () => {
    setIsLogInClicked(true);
  }

  const handleSearchClick = () => {
    setIsSearchClicked(true);
  }

  const handleDownloadClick = () => {
    setIsDownloadClicked(true);
  }

  const handleLanguageClick = () => {
    setIsLanguageClicked(true);
  }

  const handleDarkModeClick = () => {
    setIsDarkModeClicked(!isDarkModeClicked);
  }

  const handleOrderBookClick = () => {
    setIsOrderBookClicked(true);
    setIsRecentTradesClicked(false);
  }

  const handleRecentTradesClick = () => {
    setIsOrderBookClicked(false);
    setIsRecentTradesClicked(true);
  }

  const handleTradeOptionClick = (index: number) => {
    setIsTradeOptionClicked(index);
  }

  const handleTickChartClick = () => {
    setIsTickChartClicked(true);
  }
  
  const handleStandardChartClick = () => {
    setIsTickChartClicked(false);
  }


  interface tradePriceProps {
    price: string;
    qty: string;
    total: string;
    mode: string;
  }
  const TradePrice = ({ price, qty, total, mode }: tradePriceProps) => {

    return (
      <div className="w-full h-6 flex flex-grow flex-row text-white">
        <p className={`flex grow 1  ${mode === 'buy' ? 'text-red-400' : 'text-green-400'} `}> {price}</p>
        <p className="w-1/4"> {qty}</p>
        <p className="w-1/4 pr-2"> {total}</p>
      </div>

    );
  }

  interface tradeTimestampProps {
    price: string;
    qty: string;
    total: string;
    mode: string;
    timestamp: string;
  }
  const TradeTimestamp = ({ price, qty, total, mode, timestamp }: tradeTimestampProps) => {

    return (
      <div className="w-full h-6 flex flex-grow flex-row text-white">
        <p className={`flex grow 1  ${mode === 'buy' ? 'text-red-400' : 'text-green-400'} `}> {price}</p>
        <p className="w-1/4"> {qty}</p>
        <p className="w-1/4 pr-2"> {timestamp}</p>
      </div>

    );
  }


  const generateBuyRandomData = () => {
    const randomPrice = Math.floor(Math.random() * 100) + 50; // 50부터 149까지의 랜덤 가격 생성
    const randomQty = Math.floor(Math.random() * 10) + 1; // 1부터 10까지의 랜덤 수량 생성
    const total = randomPrice * randomQty;
    const modes = ['buy'];

    return { price: randomPrice, qty: randomQty, total, mode: modes };
  };

  // 랜덤 데이터를 담을 배열
  const randomBuyDataArray = Array.from({ length: 7 }, generateBuyRandomData); // 5개의 랜덤 데이터 생성

  const generateSellRandomData = () => {
    const randomPrice = Math.floor(Math.random() * 100) + 50; // 50부터 149까지의 랜덤 가격 생성
    const randomQty = Math.floor(Math.random() * 10) + 1; // 1부터 10까지의 랜덤 수량 생성
    const total = randomPrice * randomQty;

    return { price: randomPrice, qty: randomQty, total, mode: 'sell' };
  };

  // 랜덤 데이터를 담을 배열
  const randomSellDataArray = Array.from({ length: 7 }, generateSellRandomData); // 5개의 랜덤 데이터 생성

  const generateTimestampRandomData = () => {
    const randomPrice = Math.floor(Math.random() * 100) + 50; // 50부터 149까지의 랜덤 가격 생성
    const randomQty = Math.floor(Math.random() * 10) + 1; // 1부터 10까지의 랜덤 수량 생성
    const total = randomPrice * randomQty;
    const date = new Date();
    // hh:mm:ss로 변환
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const timestamp = `${hours}:${minutes}:${seconds}`;

    //mode 랜덤
    const modes = ['buy', 'sell'];
    const randomMode = Math.floor(Math.random() * 2);
    const mode = modes[randomMode];


    return { price: randomPrice, qty: randomQty, total, mode: mode, timestamp: timestamp};
  };

  // 랜덤 데이터를 담을 배열
  const randomTimestampDataArray = Array.from({ length: 12 }, generateTimestampRandomData); 

  





  return (
    <div className="min-w-[72rem]">
      <div className={`flex w-full h-10 items-center px-4 ${isDarkModeClicked ? 'bg-mainBg-default' : 'bg-white'} text-white border-y-4 border-black text-gray-400 text-sm`}>
        GCC/USDT
      </div>
      {/* 
        <div className="w-full bg-yellow-100">
          BTC
        </div> */}
      <div className="w-full h-[calc(100vh-7rem)] bg-black gap-1 flex">
        <div className="h-full flex-grow flex flex-col">
          <div className="w-full h-[4.3rem] bg-mainBg-default border-b-[3px] border-black text-white p-4 ">
            GCC
          </div>
          <div className="w-full flex-grow 1 flex">

            <div className="w-full h-full flex-col pr-5">
              <div className="flex h-10 items-center text-gray-400 text-xs font-semibold p-5 gap-4" >
                <p className="flex-grow 1 text-white">Chart</p>
                <p onClick={handleStandardChartClick} className={`${!isTickChartClicked ? 'text-yellow-400' : 'text-gray-400'}`}>Standard</p>
                <p onClick={handleTickChartClick} className={`${isTickChartClicked ? 'text-yellow-500' : 'text-gray-400'}`}>Tick</p>
                <p>TradingView</p>
              </div>
              {/* <Stocks/> */}
              <div className="">
                <CustomCandleChart isCandleClicked={isTickChartClicked} />
              </div>

              {/* <CustomTickCandle width={undefined} height={undefined} date={[]} name={[]} line={[]} price={[]}/> */}
            </div>

            <div className="w-2/5 flex-grow flex flex-col">
              <div className="w-full h-11 flex text-gray-400 text-sm font-semibold py-0.5 gap-5" >
                <button onClick={handleOrderBookClick} className={`h-10 border-b-[2px] text-sm ${isOrderBookClicked ? 'text-white border-yellow-500' : 'transition-all ease-in-out duration-500 text-gray-400 border-black hover:text-white'} `}>
                  Order Book </button>
                <button onClick={handleRecentTradesClick} className={`h-10 border-b-[2px] text-sm ${isRecentTradesClicked ? 'text-white border-yellow-500' : 'transition-all ease-in-out duration-500 text-gray-400 border-black hover:text-white'} `}>
                  Recent Trade </button>
              </div>
              {isOrderBookClicked ?
                <div className="bg-gray-400 h-full w-full text-xs flex-grow font-semibold text-gray-400">
                  <div className="w-full h-1/2 px-2 pt-3 flex-grow 1">
                    <div className="w-full h-6 flex flex-grow flex-row">
                      <p className="flex grow 1"> Price(USDT)</p>
                      <p className="w-1/4"> Qty(BTC)</p>
                      <p className="w-1/4"> Total(USDT)</p>
                    </div>
                    <div>
                      {randomBuyDataArray.map((data, index) => (
                        <TradePrice key={index} price={data.price.toString()} qty={data.qty.toString()} total={data.total.toString()} mode={data.mode.toString()} />
                      ))}

                    </div>

                  </div>

                  <div className="w-full h-1/2  px-2 flex-grow flex-grow 1">
                    <div className="w-full h-8 flex flex-grow flex-row ">
                      <p className="text-base h-full font-bold text-green-400 mr-6 text-center"> 36,777.77</p>
                      <p className="flex grow 1 h-full pt-1 text-center text- "> ~ 36.670USD</p>
                    </div>
                    {randomSellDataArray.map((data, index) => (
                      <TradePrice key={index} price={data.price.toString()} qty={data.qty.toString()} total={data.total.toString()} mode={data.mode.toString()} />
                    ))}
                  </div>
                  <div>

                  </div>

                </div> : <div className="bg-gray-400 h-full w-full text-xs flex-grow font-semibold text-gray-400">
                  <div className="w-full h-full px-2 pt-3 flex-grow 1">
                    <div className="w-full h-6 flex flex-grow flex-row">
                      <p className="flex grow 1"> Price(USDT)</p>
                      <p className="w-1/4"> Qty(BTC)</p>
                      <p className="w-1/4"> Timestamp</p>
                    </div>
                    <div>
                      {randomTimestampDataArray.map((data, index) => (
                        <TradePrice key={index} price={data.price.toString()} qty={data.qty.toString()} total={data.total.toString()} mode={data.mode.toString()} />
                      ))}

                    </div>

                  </div>


                  <div>

                  </div>

                </div>
              }
            </div>
          </div>
          <div className="w-full h-15 flex gap-5 px-4 pt-5 text-sm text-gray-400 font-semibold">
            <div className={`h-10 text-sm text-yellow-500 flex items-center justify-center border-b-[2px] border-transparent `}>
              Trade </div>
            <button onClick={() => handleTradeOptionClick(0)} className={`h-10 flex items-center gap-1 border-b-[2px] text-sm ${isTradeOptionClicked == 0 ? 'text-white border-yellow-500' : 'text-gray-400 border-black hover:text-white'} `}>
              Current Orders <p className="text-yellow-500"> 0</p> </button>
            <button onClick={() => handleTradeOptionClick(1)} className={`h-10 flex items-center gap-1 border-b-[2px] text-sm ${isTradeOptionClicked == 1 ? 'text-white border-yellow-500' : 'text-gray-400 border-black hover:text-white'} `}>
              Order History </button>
            <button onClick={() => handleTradeOptionClick(2)} className={`h-10 flex items-center gap-1 border-b-[2px] text-sm ${isTradeOptionClicked == 2 ? 'text-white border-yellow-500' : 'text-gray-400 border-black hover:text-white'} `}>
              Trade History </button>
            <button onClick={() => handleTradeOptionClick(3)} className={`h-10 flex items-center gap-1 border-b-[2px] text-sm ${isTradeOptionClicked == 3 ? 'text-white border-yellow-500' : 'text-gray-400 border-black hover:text-white'} `}>
              Subscription & Redemption History </button>
          </div>
          <div className="w-full h-16 flex gap-5 px-4 pt-4 text-xs text-gray-400 font-semibold">
            <p className={`rounded p-1 ${true ? 'bg-zinc-800 text-white' : ''}`}> Limit & Market Orders</p>
            <p className={`rounded p-1 ${false ? 'bg-zinc-800 text-white' : ''}`}> TP/SL Order</p>
            <p className={`rounded p-1 ${false ? 'bg-zinc-800 text-white' : ''}`}> Conditional Order</p>
          </div>
          <div className="w-full h-10 whitespace-nowrap justify-between flex place-content-evenly  px-4 pt-4 text-xs text-gray-500 font-normal">

            {bottomCategories.map((category, index) => (
              <p key={index} className={``}> {category}</p>
            ))}</div>


        </div>
        <div className={`w-80 h-full ${isDarkModeClicked ? 'bg-mainBg-default' : 'bg-white'} flex flex-col items-center`}>
          <div className="flex w-full gap-0 bg-transparent p-3.5">
            <Button label="Trade" onClick={handleTradeClick} isActive={isTradeClicked} textSize="text-xs" />
            <Button label="MyInfo" onClick={handleMyInfoClick} isActive={isMyInfoClicked} textSize="text-xs" />
          </div>
          {isTradeClicked ?
            <div className="flex w-full flex-col border-t-[1px] border-gray-800 pl-4 pr-4 pt-1 gap-3 bg-transparent">

              <div className="w-full h-9 flex gap-4 font-semibold bg-transparent">
                <button onClick={handleSpotClick} className={`h-full border-b-[2px] text-sm ${isSpotClicked ? 'text-white border-yellow-500' : 'transition-all ease-in-out duration-500 text-gray-400 border-black hover:text-white'} `}>
                  Spot
                </button>
                <button onClick={handleMarginClick} className={`h-full border-b-[2px] text-sm ${isMarginClicked ? 'text-white border-yellow-500' : 'transition-all ease-in-out duration-500 text-gray-400 border-black hover:text-white'} `}>
                  Margin 10X
                </button>
              </div>
              <div className="flex w-full gap-0 bg-transparent mt-1">
                <Button label={isSpotClicked ? 'Buy' : 'Long'} onClick={handleBuyClick} isActive={isBuyClicked} color="bg-green-500" />
                <Button label={isSpotClicked ? 'Sell' : 'Short'} onClick={handleSellClick} isActive={isSellClicked} color="bg-red-500" />
              </div>
              <div className="w-full h-8 flex gap-4 font-semibold ">
                <button onClick={() => handleOptionClick(0)} className={`h-full text-sm hover:text-yellow-500 ${isOptionClicked == 0 ? 'text-yellow-500' : 'text-gray-400'} `}>
                  Limit
                </button>
                <button onClick={() => handleOptionClick(1)} className={`h-full text-sm hover:text-yellow-500 ${isOptionClicked == 1 ? 'text-yellow-500' : 'text-gray-400'} `}>
                  Market
                </button>
                <button onClick={() => handleOptionClick(2)} className={`h-full text-sm hover:text-yellow-500 ${isOptionClicked == 2 ? 'text-yellow-500' : 'text-gray-400'} `}>
                  TP/SL
                </button>
              </div>
              <div className="w-full">
                <div className="flex">
                  <p className="text-gray-400 text-xs">Available Balance</p>
                  <p className="flex-grow 1 text-white text-xs text-right font-semibold">-- UDST</p>
                </div>
                <Input label="Order Price" value="Order Price" sideText="USDT" />
                <Input label="Qty" value="Qty" sideText="BTC" />
                <Input label="Order value" value="Order Value" sideText="USDT" />

                <p className="text-gray-500 text-xs text-right col-span-2"> -- USD</p>

                <nav>

                  <Link href="/register"><button className={`mt-4 w-full h-10 p-3 rounded font-bold text-sm text-black bg-yellow-500 hover:bg-yellow-300`} onClick={handleSignUpClick}>Sign Up</button></Link>
                  <Link href="/login"><button className={`mt-3 w-full h-10 p-3 rounded font-bold text-sm text-white bg-gray-700 hover:bg-gray-600`} onClick={handleLogInClick}>Log In</button></Link>
                </nav>

                <p className="mt-4 mb-4 text-yellow-500 col-span-2 text-center text-xs"> Demo Trading</p>



              </div>

            </div> :
            <div className="flex w-full flex-col border-t-[1px] border-gray-800 pl-4 pr-4 pt-1 gap-3 bg-transparent">

              <div className="w-full h-9 flex gap-4 font-semibold bg-transparent">
                <button onClick={handleSpotClick} className={`h-full border-b-[2px] text-sm ${isSpotClicked ? 'text-white border-yellow-500' : 'transition-all ease-in-out duration-500 text-gray-400 border-black hover:text-white'} `}>
                  Account
                </button>
                <button onClick={handleMarginClick} className={`h-full border-b-[2px] text-sm ${isMarginClicked ? 'text-white border-yellow-500' : 'transition-all ease-in-out duration-500 text-gray-400 border-black hover:text-white'} `}>
                  Cancel
                </button>
              </div>
              {isSpotClicked ? <div className="w-full">


                <div className=" mt-3">
                  <p className="text-gray-400 text-xs">Email</p>
                  <div className="w-full relative mt-1.5 mb-4">
                    <p
                      className={`
    block h-10 w-full rounded border-0 p-2 pl-4 pr-20 text-white bg-neutral-700 text-sm
    border-[1px] border-transparent hover:border-gray-600 transition-all ease-in-out
    focus:outline-none focus:border-yellow-500 caret-yellow-500
  `}
                    >gachon@gmail.com</p>
                  </div>
                </div>











              </div>
                : <div className="w-full">
                  <div className="bg-gray-400 h-full w-full text-xs flex-grow font-semibold text-gray-400">
                    <div className="w-full h-1/2 px-2 pt-3 flex-grow 1">
                      <div className="w-full h-6 flex flex-grow flex-row">
                        <p className="flex grow 1"> Price(USDT)</p>
                        <p className="w-1/4"> Qty(BTC)</p>
                        <p className="w-1/4"> Total(USDT)</p>
                      </div>
                      <div>
                        {randomBuyDataArray.map((data, index) => (
                          <TradePrice key={index} price={data.price.toString()} qty={data.qty.toString()} total={data.total.toString()} mode={data.mode.toString()} />
                        ))}

                      </div>

                    </div>

                    <div className="w-full h-1/2  px-2 flex-grow flex-grow 1">
                      <div className="w-full h-8 flex flex-grow flex-row ">
                        <p className="text-base h-full font-bold text-green-400 mr-6 text-center"> 36,777.77</p>
                        <p className="flex grow 1 h-full pt-1 text-center text- "> ~ 36.670USD</p>
                      </div>
                      {randomSellDataArray.map((data, index) => (
                        <TradePrice key={index} price={data.price.toString()} qty={data.qty.toString()} total={data.total.toString()} mode={data.mode.toString()} />
                      ))}
                    </div>
                    <div>

                    </div>

                  </div>
                </div>}

            </div>}
        </div>
      </div>

    </div>
  );
}

export default Index;
// MyApp.tsx
import React, { useState } from 'react';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import Link from 'next/link';
import "../styles/globals.css";
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



function MyApp({ Component, pageProps }: AppProps) {
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






  return (
      <div className="h-screen">
        <NavBar />        
        <Component {...pageProps} />
      </div>
  );
}

export default MyApp;

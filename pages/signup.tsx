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
import CustomInput from '../components/CustomInput';
import Image from 'next/image';
//import muhan from '../public/assets/muhan_3';

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




const SignUp = () => {
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
    <div className="min-w-[72rem] h-[calc(100vh-7rem)] bg-gray-100 flex place-items-center justify-center">

      <div className="w-1/3 h-2/3 bg-white rounded-lg m-4">
        <div className="w-full p-4 bg-white rounded-t-lg border-b-[1px] border-gray-200">
          <p className="text-xl font-bold w-full ">Create Account</p>
        </div>
        <div className="p-5 bg-white rounded-b-lg">
          <button className={` whitespace-nowrap px-0 mb-5 mt-1 mb-1 items-center justify-evenly bg-transparent font-medium text-sm border-b-2 ${true ? 'border-yellow-500' : 'border-transparent text-white'} hover:text-yellow-500`}>
            Email
          </button>
          <CustomInput label="" value="Email" sideText="Email" />
          <CustomInput label="" value="Password" sideText="Password" />
          <p className="w-full text-left pr-1 text-xs mb-3 text-black">Referral Code</p>
          <CustomInput label="" value="Code" sideText="" />
          <button className={`mt-3 w-full mt-5 h-12 p-3 rounded-lg font-bold text-base text-black bg-yellow-500 hover:bg-yellow-400`} onClick={handleLogInClick}>Create Account</button>
          <Link href="/" ><p className="w-full text-center mt-8 text-xs text-gray-400">You want to know the value of Gachon? <span className="text-yellow-500 cursor-pointer" onClick={handleSignUpClick}>Try it</span></p></Link>

        </div>

      </div>


      <div className="w-1/4 h-2/3 p-8 bg-white rounded-lg m-4">
        <p className="text-xl mt-4 mb-5 text-yellow-500 font-bold w-full ">Starter Rewards
        </p>
        <p className="text-base"> Get Up to 5,000 UDST When You Register, Deposit and Trade!</p>
        <div className="flex justify-center bg-transparent mt-5">
        <Image src="/muhan_4.png" alt="congratulation" width={250} height={250} />

        </div>

      </div>


    </div>
  );
}

export default SignUp;
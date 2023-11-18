// MyApp.tsx
import React, { useState } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link';
import { TbWorld, TbDownload, TbMoon } from 'react-icons/tb';
import { BiSearch } from 'react-icons/bi';

type CategoriesProps = {
    label: string;
    isActive: String;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;

}

const Categories = ({ label, isActive, onClick }: CategoriesProps) => {
    return (
        <button className={`h-full whitespace-nowrap
    px-3 mt-1 mb-1 items-center justify-evenly bg-transparent font-medium text-sm border-b-2 ${isActive == label ? 'border-yellow-500 text-yellow-500' : 'border-transparent text-white'} hover:text-yellow-500`} onClick={onClick}>
            {label}
        </button>
    );
}





export const NavBar = () => {
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

    const router = useRouter();

    const link :string[] = ['deposit', 'markets', 'derivative', '', 'rewards hub'];
    return (
        <nav className="flex w-full h-12 pl-4 bg-zinc-900 gap-1 items-center">
            <Link href="/">
                <p className="text-yellow-500 font-bold mx-4">TEAM 씨쁠</p>  </Link>

            {categories.map((category, index) => (
                <Link href={`/${link[index]}`} key={index} className="h-full pb-1">
                    <Categories key={index} label={category} onClick={() => handleCategoryClick(index)} isActive={categories[isCategoryClicked]} />
                </Link>
            ))}
            <div className="flex w-48  whitespace-nowrap text-stone-500 text-xs gap-2 items-center rounded-full p-2 bg-neutral-800 border-[1px] border-transparent  hover:border-yellow-500 transition ease-in-out duration-300 cursor-pointer font-semibold">
                <BiSearch size="14" color="#737373" />
                Search Coin

            </div>

            <div className="flex flex-grow 1 bg-transparent justify-end gap-0 h-full items-center">
                <div className="flex bg-transparent">
                    <Link href="/login">
                        <button className="flex h-full w-20 items-center justify-evenly bg-transparent px-3 py-1.5 rounded text-white text-sm font-bold hover:bg-gray-800 hover:text-yellow-500"> Log In
                        </button>
                    </Link>
                    <Link href="/signup">
                        <button className="flex w-24 items-center justify-evenly bg-yellow-500 px-5 py-1.5 rounded text-black text-sm font-bold"> Sign Up
                        </button>
                    </Link>
                </div>

                <Link href="/download">
                    <div className="h-full group bg-transparent hover:bg-neutral-800 px-3 flex items-center"
                        onMouseOver={() => setIsDownloadHovered(true)}
                        onMouseOut={() => setIsDownloadHovered(false)}
                    >
                        <TbDownload size="25" color={isDownloadHovered ? `#eaad08` : `#FFFFFF`} />
                    </div>
                </Link>

                <Link href="/language">
                    <div className="h-full group bg-transparent hover:bg-neutral-800 px-3 flex items-center"
                        onMouseOver={() => setIsLanguageHovered(true)}
                        onMouseOut={() => setIsLanguageHovered(false)}
                    >
                        <TbWorld size="25" color={isLanguageHovered ? `#eaad08` : `#FFFFFF`} />
                    </div>
                </Link>
                <div className="h-full group bg-transparent hover:bg-neutral-800 px-3 flex items-center"
                >
                    <TbMoon size="25" color="#FFFFFF" />
                </div>
            </div>
        </nav>)
}
const colors = require("tailwindcss/colors");

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}", // 적용할 js파일 경로 지정
        "./components/**/*.{js,ts,jsx,tsx}", // 적용할 js파일 경로 지정
    ],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        // colors:{
        //     'main': '#ed8936',
        //     transparent: 'transparent',
        //     current: 'currentColor',
        //     'white': '#ffffff',
        //     'purple': '#3f3cbb',
        //     'midnight': '#121063',
        //     'metal': '#565584',
        //     'tahiti': '#3ab7bf',
        //     'silver': '#ecebff',
        //     'bubble-gum': '#ff77e9',
        //     'bermuda': '#78dcca',
        // },
        extend: {
            colors: {
                cyan: colors.cyan,
                chartGray: { default: "#17181e" },
                chartLightGray: { default: "#8b8b8e" },
                mainBg: { default: "#101014" },
            },
        },
    },
    variants: {
        extend: { opacity: ["disabled"] },
    },
    plugins: [],
};
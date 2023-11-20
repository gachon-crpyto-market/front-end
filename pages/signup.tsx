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
import axios from 'axios';
import { useRouter } from 'next/router';
import { sign } from 'crypto';


// 모달 컴포넌트
const SuccessModal = ({ onClose, Id }) => {
  const router = useRouter();

  const handleCloseModal = () => {
    onClose();
    router.push('/login'); // 원하는 라우트로 변경
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-transparent flex justify-center items-center z-50">
      <div className="absolute bg-black opacity-20 w-full h-full" onClick={handleCloseModal}></div>
      <div className="relative mb-40 w-96 font-bold text-lg text-center flex-col justify-center bg-white rounded-lg p-8 text-black z-50">
        <p>Get the Rewards!</p>
        <div className="bg-transparent flex justify-center">
        <Image src="/assets/muhan_mudang.png" alt="try" width={250} height={250} className="mt-8 " />
        </div>
        <Link href="/login">
        <button onClick={onClose} className="mt-8 bg-yellow-500 text-white px-8 py-2 rounded-lg hover:bg-yellow-400">Login</button>
        </Link>
      </div>
    </div>
  );
};
const SignUp = () => {
 
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  
  const handleSignUpClick = () => {
    setIsSignUpClicked(true);
    sendDataToServer();
  }


  const [isLogInClicked, setIsLogInClicked] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);


  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');

// 서버로 데이터를 전송하는 함수
const sendDataToServer = async () => {
  console.log(studentId + name);
  try {
    const response = await axios.post('https://www.gachonmail.shop/api/user/signUp', {
      "studentId": studentId,
      "name": name
    });
    console.log(response);
    if (response.status === 201) {
      console.log('Data sent successfully!');
      // 성공적으로 데이터를 전송한 후의 작업을 수행할 수 있습니다.
      setShowSuccessModal(true);
    } else {
      console.error('Failed to send data to the server');
    }
  } catch (error) {
    console.error('Error sending data:', error);
  }
};

  return (
    <div className="min-w-[72rem] h-[calc(100vh-7rem)] bg-gray-100 flex place-items-center justify-center">

      <div className="w-1/3 h-2/3 bg-white rounded-lg m-4">
        <div className="w-full p-4 bg-white rounded-t-lg border-b-[1px] border-gray-200">
          <p className="text-xl font-bold w-full ">Create Account</p>
        </div>
        <div className="p-5 bg-white rounded-b-lg">
          <button className={` whitespace-nowrap px-0 mb-5 mt-1 mb-1 items-center justify-evenly bg-transparent font-medium text-sm border-b-2 ${true ? 'border-yellow-500' : 'border-transparent text-white'} hover:text-yellow-500`}>
            StudentId
          </button>
          <CustomInput label="" value={studentId} sideText="StudentId" onChange={setStudentId}/>
          <button className={` whitespace-nowrap px-0 mb-5 mt-1 mb-1 items-center justify-evenly bg-transparent font-medium text-sm border-b-2 ${true ? 'border-yellow-500' : 'border-transparent text-white'} hover:text-yellow-500`}>
            Name
          </button>
          <CustomInput label="" value={name} sideText="Name" onChange={setName}/>
          <p className="w-full text-left pr-1 text-xs mb-3 text-black">Referral Code</p>
          {/* <CustomInput label="" value="Code" sideText="" /> */}
          <button className={`mt-3 w-full mt-5 h-12 p-3 rounded-lg font-bold text-base text-black bg-yellow-500 hover:bg-yellow-400`} onClick={handleSignUpClick}>Create Account</button>
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

    { showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} Id={studentId} />}
    </div>
  );
}

export default SignUp;
import React, { useState } from 'react';
import Link from 'next/link';
import CustomInput from '../components/CustomInput';
import Image from 'next/image';
import axios from 'axios';
import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import {loggedInUserIdState} from '../src/recoil/atoms';
import {loggedInUserNameState} from '../src/recoil/atoms';
import { useRouter } from 'next/router';


// 모달 컴포넌트
const SuccessModal = ({ onClose,name }) => {
  const router = useRouter();

  const handleCloseModal = () => {
    onClose();
    router.push('/'); // 원하는 라우트로 변경
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-transparent flex justify-center items-center z-50">
      <div className="absolute bg-black opacity-20 w-full h-full" onClick={handleCloseModal}></div>
      <div className="relative mb-40 w-96 font-bold text-lg text-center flex-col justify-center bg-white rounded-lg p-8 text-black z-50">
        <p>Welcome {name}!</p>
        <div className="bg-transparent flex justify-center">
        <Image src="/assets/muhan_1.png" alt="try" width={250} height={250} className="mt-8 " />
        </div>
        <Link href="/">
        <button onClick={onClose} className="mt-8 bg-yellow-500 text-white px-8 py-2 rounded-lg hover:bg-yellow-400">Close</button>
        </Link>
      </div>
    </div>
  );
};



const Login = () => {
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  const [isLogInClicked, setIsLogInClicked] = useState(false);

  const setLoggedInUserId = useSetRecoilState(loggedInUserIdState);
  const loggedInUserId = useRecoilState(loggedInUserIdState);

  const setLoggedInUserName = useSetRecoilState(loggedInUserNameState);
  const loggedInUserName= useRecoilState(loggedInUserNameState);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpClicked(true);
  }

  const handleLogInClick = () => {
    setIsLogInClicked(true);
    sendDataToServer();
  }
  const handleCloseModal = () => {
    setShowSuccessModal(false);
  
  };

  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');

// 서버로 데이터를 전송하는 함수
const sendDataToServer = async () => {
  console.log(studentId + name);
  try {
    const response = await axios.post('https://www.gachonmail.shop/api/user/signIn', {
      "studentId": studentId,
    });

    console.log(response.data.data.id);
    if (response.status === 200) {
      console.log('Data sent successfully!');
      setLoggedInUserId(response.data.data.id);
      setLoggedInUserName(response.data.data.name);
      
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
          <p className="text-xl font-bold w-full ">Welcom to GANANCE</p>
        </div>
        <div className="p-5 bg-white">
          <button className={` whitespace-nowrap px-0 mb-5 mt-1 mb-1 items-center justify-evenly bg-transparent font-medium text-sm border-b-2 ${true ? 'border-yellow-500' : 'border-transparent text-white'} hover:text-yellow-500`}>
            StudentId
          </button>
          <CustomInput label="" value={studentId} sideText="StudentId"onChange={setStudentId}/>
          <CustomInput label="" value={name} sideText="Name" onChange={setName}/>
          <p className="w-full text-right pr-1 text-xs text-yellow-500 cursor-pointer ">Forgot StudentId</p>
          <button className={`mt-3 w-full mt-5 h-12 p-3 rounded-lg font-bold text-base text-black bg-yellow-500 hover:bg-yellow-400`} onClick={handleLogInClick}>Log In</button>
          <p className="w-full text-center mt-8 text-xs text-gray-400">Don't have an account? 
          <Link href="/signup" > <span className="text-yellow-500 cursor-pointer" onClick={handleSignUpClick}>Sign Up</span></Link></p>

        </div>

      </div>


      <div className="w-1/4 h-2/3 p-8 bg-white rounded-lg m-4">
        <p className="text-xl mt-4 mb-5 text-yellow-500 font-bold w-full ">Invest in the value of Gachon
        </p>
        <p className="text-base"> You are the pride of Gachon Univ!</p>
        <div className="flex justify-center bg-transparent mt-5">
        <Image src="/muhan_3.png" alt="try" width={250} height={250} />

        </div>

      </div>

      {showSuccessModal && <SuccessModal onClose={handleCloseModal} name={loggedInUserName}/>}

    </div>
  );
}

export default Login;
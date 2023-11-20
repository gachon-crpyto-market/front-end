// MyApp.tsx
import React from 'react';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { SocketProvider } from '../components/SocketContext'; // assuming you have a file for socket context
import {NavBar} from '../components/NavBar'; // assuming NavBar component imports socket context
import '../styles/globals.css';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SocketProvider> SocketProvider wraps the app to provide the socket context
        <div className="h-screen">
          <NavBar />
          <Component {...pageProps} />
        </div>
      </SocketProvider>
    </RecoilRoot>
  );
}

export default MyApp;

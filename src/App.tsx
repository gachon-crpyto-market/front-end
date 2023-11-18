import React from 'react';

import {useMediaQuery} from 'react-responsive';

interface MobileProps {
  children : React.ReactNode;
}

export const Mobile: React.FC<MobileProps> = ({children}) => {
  const isMobile = useMediaQuery({
    query : "(max-width:768px)"
  });

  return <>{isMobile && children}</>
};

interface PCProps {
  children : React.ReactNode;
}

export const PC: React.FC<PCProps> = ({children}) => {
  const isPc = useMediaQuery({
    query : "(min-width:769px)"
  });

  return <>{isPc && children}</>
};

const App: React.FC = () => {
  return (
    <>
      <PC>PC 버전</PC>
      <Mobile>Mobile</Mobile>
    </>
  );
};

export default App;

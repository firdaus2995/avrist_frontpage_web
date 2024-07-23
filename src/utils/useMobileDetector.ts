import { useState, useEffect } from 'react';

const useMobileDetector = (breakpoint = 640) => {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobileDevice(window.innerWidth < breakpoint);
    };

    if (typeof window !== 'undefined') {
      setIsMobileDevice(window.innerWidth < breakpoint);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [breakpoint]);

  return isMobileDevice;
};

export default useMobileDetector;

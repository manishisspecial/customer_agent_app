import { useState, useEffect } from 'react';
import { breakpoints } from '../styles/theme';

export const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < parseInt(breakpoints.md));
      setIsTablet(width >= parseInt(breakpoints.md) && width < parseInt(breakpoints.lg));
      setIsDesktop(width >= parseInt(breakpoints.lg));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile, isTablet, isDesktop };
};

export const useBreakpoint = (breakpoint) => {
  const [isAbove, setIsAbove] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsAbove(width >= parseInt(breakpoints[breakpoint]));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isAbove;
}; 
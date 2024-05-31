import { useState, useEffect, useRef } from 'react';

export const useHeaderState = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  const headerRef = useRef<HTMLElement | null>(null);

  const handleNavToggle = () => setIsNavOpen((prev) => !prev);

  useEffect(() => {
    const header = headerRef.current;

    if (header) {
      const computedStyle = window.getComputedStyle(header);
      const height =
        header.offsetHeight +
        parseInt(computedStyle.marginTop) +
        parseInt(computedStyle.marginBottom);
      setHeaderHeight(height);

      header.style.height = `${height}px`;
    }
  }, [headerRef.current]);

  return {
    isNavOpen,
    handleNavToggle,
    headerHeight,
    headerRef,
  };
};

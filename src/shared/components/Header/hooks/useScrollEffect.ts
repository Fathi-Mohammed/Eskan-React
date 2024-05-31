import { useEffect, useState, useRef } from 'react';
import styles from '../styles.module.scss';

export const useScrollEffect = (headerHeight: number) => {
  const [lastScroll, setLastScroll] = useState(0);
  const FixedHeaderRef = useRef<any>(null);

  const handleScroll = () => {
    const currentScroll = document.documentElement.scrollTop;
    const FixedHeader = FixedHeaderRef.current;

    if (FixedHeader) {
      if (currentScroll < lastScroll && currentScroll > headerHeight + 400) {
        FixedHeader.classList.add(styles.activeMenu);
        FixedHeader.classList.remove(styles.notActiveMenu);
      } else if (
        currentScroll > lastScroll &&
        currentScroll > headerHeight + 400
      ) {
        if (FixedHeader.classList.contains(styles.activeMenu)) {
          FixedHeader.classList.remove(styles.activeMenu);
          FixedHeader.classList.add(styles.notActiveMenu);
        }
      } else if (currentScroll <= headerHeight + 400) {
        FixedHeader.classList.remove(styles.activeMenu);
        FixedHeader.classList.remove(styles.notActiveMenu);
      }
    }

    setLastScroll(currentScroll);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScroll, headerHeight]);

  return {
    FixedHeaderRef,
  };
};

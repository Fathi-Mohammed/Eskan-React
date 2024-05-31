import React, { useEffect, useRef } from 'react';
import styles from './styles.module.scss';
// import ImagePlaceholder from '@/assets/images/shapes/imagePlaceholder.png';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  asp?: number;
  center?: boolean;
}

export const Image: React.FC<ImageProps> = ({ src, alt, asp, center }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const options = {
      // threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target === imgRef.current) {
          const img = entry.target as HTMLImageElement;
          img.src = src;
          img.onload = () => {
            img.style.opacity = '1';
            img.style.filter = 'blur(0px)';
            img.parentElement?.classList.remove(styles.loading);
            img.parentElement?.classList.add(styles.loaded);
          };
          observer.unobserve(img);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  return (
    <figure
      className={`${styles.figure} ${asp ? styles.asp : ''} ${styles.loading} ${center ? styles.center : ''}`}
      style={asp ? { paddingBottom: `${asp}%` } : {}}
    >
      <img ref={imgRef} alt={alt} />
    </figure>
  );
};

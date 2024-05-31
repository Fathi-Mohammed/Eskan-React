import { useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import ImagePlaceholder from '@/assets/images/imagePlaceholder.png';

interface ImageProps extends React.HTMLProps<HTMLVideoElement> {
  src: string;
  asp?: number;
  center?: boolean;
}

export const Video: React.FC<ImageProps> = ({
  src,
  asp,
  center,
  ...props
}: ImageProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const options = {};

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target === videoRef.current) {
          const img = entry.target as HTMLImageElement;
          img.src = src === '' ? ImagePlaceholder : src;
          img.parentElement?.classList.remove('loading');
          img.parentElement?.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [src]);

  return (
    <figure
      className={`${styles.figure__} ${asp ? styles.asp__ : ''} loading ${center ? styles.center : ''}`}
      style={asp ? { paddingBottom: `${asp}%` } : {}}
    >
      <video ref={videoRef} {...props} />
    </figure>
  );
};

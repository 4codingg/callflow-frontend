import React, {
  CSSProperties,
  useEffect,
  useState,
  lazy,
  Suspense,
} from 'react';

const Lottie = lazy(() => import('lottie-react'));

interface LottieWrapperProps {
  animationData: any;
  loop?: boolean;
  style?: CSSProperties;
}

const LottieWrapper: React.FC<LottieWrapperProps> = ({
  animationData,
  loop = true,
  style,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Suspense fallback={<div>Loading animation...</div>}>
      <Lottie animationData={animationData} loop={loop} style={style} />
    </Suspense>
  );
};

export default LottieWrapper;

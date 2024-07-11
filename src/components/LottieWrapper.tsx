import dynamic from 'next/dynamic';
import { CSSProperties } from 'react';

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
});

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
  if (typeof window === 'undefined') {
    return null;
  }

  return <Lottie animationData={animationData} loop={loop} style={style} />;
};

export default LottieWrapper;

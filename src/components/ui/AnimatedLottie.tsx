'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Lottie-react is client side only, so we import it dynamically
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface AnimatedLottieProps {
  animationPath: string; // path to JSON in public folder e.g., '/lottie/envelope.json'
  className?: string;
  loop?: boolean;
}

export default function AnimatedLottie({ animationPath, className = "w-12 h-12", loop = true }: AnimatedLottieProps) {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch(animationPath)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.log('Lottie load error:', err));
  }, [animationPath]);

  if (!animationData) {
    return <div className={`animate-pulse bg-neutral-200 rounded-full ${className}`} />;
  }

  return (
    <div className={className}>
      <Lottie animationData={animationData} loop={loop} autoplay={true} />
    </div>
  );
}

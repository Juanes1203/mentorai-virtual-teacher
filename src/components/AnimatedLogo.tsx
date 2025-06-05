import { useLottie } from "lottie-react";
import brainAnimation from "../assets/brain-animation.json";

export const AnimatedLogo = () => {
  const { View } = useLottie({
    animationData: brainAnimation,
    loop: true,
    style: {
      width: 80,
      height: 80,
    },
    autoplay: true,
  });

  return (
    <div className="relative">
      {View}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-primary">MentorAI</span>
      </div>
    </div>
  );
}; 
import React from 'react';
import { motion } from 'motion/react';

interface AnimatedLogoProps {
  className?: string;
  containerClassName?: string;
  iconClassName?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  className = '',
  containerClassName = 'w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600 text-white shadow-lg shadow-blue-950/60 border border-blue-400/30',
  iconClassName = 'w-5 h-5 text-blue-100',
}) => {
  return (
    <motion.div
      className={`flex items-center justify-center shrink-0 relative overflow-hidden ${containerClassName} ${className}`}
      animate={{
        y: [0, -1.5, 0.4, -0.6, 0.2, 0],
        rotate: [0, -0.8, 0.6, -0.3, 0.1, 0],
        scale: [1, 1.02, 0.99, 1.01, 0.995, 1],
      }}
      transition={{
        duration: 2.2,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={iconClassName}
      >
        {/* Top layer (cuadrito 1) - Gentle upward float without hitting the ceiling */}
        <motion.path
          d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"
          animate={{
            y: [0, -1.1, 0.2, -0.4, 0.1, 0],
            scale: [1, 1.02, 0.99, 1.01, 0.995, 1],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ originX: '12px', originY: '6px' }}
        />

        {/* Middle layer (cuadrito 2) - Subtle intermediate floating */}
        <motion.path
          d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"
          animate={{
            y: [0, -0.6, 0.25, -0.2, 0.08, 0],
            scaleX: [1, 1.015, 0.99, 1.008, 0.996, 1],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ originX: '12px', originY: '14px' }}
        />

        {/* Bottom layer (cuadrito 3) - Micro compression and soft return */}
        <motion.path
          d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"
          animate={{
            y: [0, 0.45, -0.3, 0.18, -0.08, 0],
            scaleX: [1, 0.985, 1.01, 0.992, 1.004, 1],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ originX: '12px', originY: '19px' }}
        />
      </svg>
    </motion.div>
  );
};

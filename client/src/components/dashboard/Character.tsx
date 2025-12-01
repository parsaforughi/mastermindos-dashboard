import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import orbImage from "@assets/generated_images/cute_3d_colorful_ai_orb_character.png";

export function Character() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Bouncier spring config for cuteness
  const springConfig = { damping: 15, stiffness: 200, mass: 0.8 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Transform mouse position into eye movement (limited range)
  const eyeX = useTransform(x, [-window.innerWidth / 2, window.innerWidth / 2], [-25, 25]);
  const eyeY = useTransform(y, [-window.innerHeight / 2, window.innerHeight / 2], [-25, 25]);

  // Tilt effect based on mouse position
  const rotateX = useTransform(y, [-window.innerHeight / 2, window.innerHeight / 2], [10, -10]);
  const rotateY = useTransform(x, [-window.innerWidth / 2, window.innerWidth / 2], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[300px]" ref={ref}>
      {/* Soft Pastel Glow */}
      <motion.div 
        className="absolute w-64 h-64 bg-gradient-to-br from-cyan-400/30 to-purple-400/30 rounded-full blur-[60px]"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5] 
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Orb Container with Tilt */}
      <motion.div 
        className="relative w-72 h-72"
        style={{ rotateX, rotateY, perspective: 1000 }}
      >
        {/* The Orb Image - Bouncing gently */}
        <motion.img 
          src={orbImage} 
          alt="Cute AI Character"
          className="w-full h-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
          animate={{ 
            y: [0, -15, 0],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />

        {/* Interactive Eyes Layer */}
        {/* We simulate the "gaze" by moving a subtle highlight/reflection */}
        <motion.div 
          className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ x: eyeX, y: eyeY }}
        >
           {/* Eye highlights */}
           <div className="absolute top-[40%] left-[35%] w-3 h-3 bg-white rounded-full blur-[1px] opacity-80" />
           <div className="absolute top-[40%] right-[35%] w-3 h-3 bg-white rounded-full blur-[1px] opacity-80" />
        </motion.div>
        
        {/* Cute floating elements */}
        <motion.div 
            className="absolute -top-4 right-10 text-2xl"
            animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
        >
            ✨
        </motion.div>
        <motion.div 
            className="absolute bottom-10 -left-4 text-xl"
            animate={{ y: [0, -8, 0], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
            💫
        </motion.div>
      </motion.div>

      {/* Status Bubble */}
      <motion.div 
        className="absolute bottom-8 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white shadow-lg"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Hi! I'm listening... 🎧
      </motion.div>
    </div>
  );
}

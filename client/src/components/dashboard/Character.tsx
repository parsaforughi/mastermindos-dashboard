import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import orbImage from "@assets/generated_images/glowing_futuristic_ai_orb_character.png";

export function Character() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for the "look" direction
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Transform mouse position into eye movement (limited range)
  const eyeX = useTransform(x, [-window.innerWidth / 2, window.innerWidth / 2], [-15, 15]);
  const eyeY = useTransform(y, [-window.innerHeight / 2, window.innerHeight / 2], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate position relative to the center of the screen/component
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
      {/* Ambient Glow Behind */}
      <motion.div 
        className="absolute w-64 h-64 bg-primary/20 rounded-full blur-[80px]"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3] 
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Orb Container */}
      <div className="relative w-64 h-64">
        {/* The Orb Image */}
        <motion.img 
          src={orbImage} 
          alt="AI Character"
          className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(124,58,237,0.5)]"
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />

        {/* The "Pupil" / Eye Interaction Layer */}
        {/* We overlay a glowing dot that moves to simulate looking */}
        <motion.div 
          className="absolute top-1/2 left-1/2 w-24 h-24 -ml-12 -mt-12 rounded-full bg-white/5 mix-blend-overlay blur-md pointer-events-none"
          style={{ x: eyeX, y: eyeY }}
        />
        
        {/* Digital Rings (Decorations) */}
        <div className="absolute inset-0 border border-primary/20 rounded-full scale-125 opacity-30 animate-spin-slow" />
        <div className="absolute inset-0 border-t border-b border-secondary/30 rounded-full scale-110 opacity-40 animate-reverse-spin" />
      </div>

      {/* Status Text */}
      <motion.div 
        className="absolute bottom-10 px-4 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-xs font-mono text-primary-foreground/80"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ONLINE • LISTENING
      </motion.div>
    </div>
  );
}

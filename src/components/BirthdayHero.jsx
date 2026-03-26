import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import confetti from 'canvas-confetti';
import { config } from '../data/siteConfig';

const BirthdayHero = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [hasFiredConfetti, setHasFiredConfetti] = useState(false);

    useEffect(() => {
        if (isInView && !hasFiredConfetti) {
            setHasFiredConfetti(true);

            // Confetti Rain
            const duration = 3000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: [config.theme.primary, config.theme.secondary]
                });
                confetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: [config.theme.secondary, config.theme.accent]
                });
                if (Date.now() < end) requestAnimationFrame(frame);
            };

            frame();
        }
    }, [isInView, hasFiredConfetti]);

    // Generate some random balloons
    const balloons = Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 80 + 10}%`,
        animationDuration: `${Math.random() * 2 + 3}s`,
        delay: `${Math.random() * 2}s`,
        size: Math.random() * 20 + 40, // 40px - 60px
        emoji: ['🎈', '🎈', '✨', '🎈'][Math.floor(Math.random() * 4)]
    }));

    const handleScrollToMemories = () => {
        const memoriesSection = document.getElementById('memories');
        if (memoriesSection) {
            memoriesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section ref={ref} className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg py-20">
            {/* Background Balloons */}
            {balloons.map((balloon) => (
                <motion.div
                    key={balloon.id}
                    className="absolute bottom-0 opacity-60 text-4xl"
                    initial={{ y: "100vh", x: 0 }}
                    animate={{
                        y: "-120vh",
                        x: [0, Math.random() * 50 - 25, 0] // subtle sway
                    }}
                    transition={{
                        y: {
                            duration: parseFloat(balloon.animationDuration) * 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: parseFloat(balloon.delay)
                        },
                        x: {
                            duration: parseFloat(balloon.animationDuration),
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: parseFloat(balloon.delay)
                        }
                    }}
                    style={{
                        left: balloon.left,
                        fontSize: `${balloon.size}px`
                    }}
                >
                    {balloon.emoji}
                </motion.div>
            ))}

            {/* Profile Picture */}
            <motion.div
                className="relative mb-8 z-20"
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.5, rotate: -10 }}
                transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.4 }}
            >
                <div className="relative w-48 h-48 md:w-56 md:h-56 p-2 rounded-full bg-gradient-to-tr from-primary via-secondary to-accent animate-spin-slow">
                    <div className="w-full h-full rounded-full bg-white p-1 backdrop-blur-sm">
                        <img
                            src={config.profilePic}
                            alt={config.recipientName}
                            className="w-full h-full rounded-full object-cover shadow-inner"
                            onError={(e) => {
                                e.target.src = "https://ui-avatars.com/api/?name=" + config.recipientName + "&background=e63946&color=fff&size=512";
                            }}
                        />
                    </div>
                </div>

                {/* Decorative Elements around image */}
                <motion.div
                    className="absolute -top-2 -right-2 text-4xl"
                    animate={{ rotate: [0, 15, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    👑
                </motion.div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl">
                    ✨
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="relative z-10 text-center px-4 max-w-3xl mx-auto flex flex-col items-center">
                <motion.h1
                    className="text-5xl md:text-7xl font-heading text-heading mb-4 drop-shadow-sm leading-tight"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Happy Birthday, <br />
                    <span className="text-primary">{config.recipientName}!</span> 🎂
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl text-text font-medium mb-12"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    Celebrating {config.age} incredible years
                </motion.p>

                <motion.button
                    onClick={handleScrollToMemories}
                    className="mt-8 text-secondary font-semibold hover:text-heading transition-colors"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="flex flex-col items-center gap-2">
                        <span>Let's Relive the Memories</span>
                        <motion.div
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            ↓
                        </motion.div>
                    </div>
                </motion.button>
            </div>
        </section>
    );
};

export default BirthdayHero;

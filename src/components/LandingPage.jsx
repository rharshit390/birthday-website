import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { config } from '../data/siteConfig';

const LandingPage = ({ onOpen }) => {
    const handleOpenGift = () => {
        // Confetti burst
        confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 },
            colors: [config.theme.primary, config.theme.secondary, config.theme.accent, '#ff69b4', '#ffffff']
        });

        // Advance to next section after slight delay for confetti effect
        setTimeout(() => {
            onOpen();
        }, 800);
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className="text-center px-6 max-w-lg mx-auto">
                {/* Bouncing Gift Icon */}
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="text-8xl md:text-9xl mb-8 select-none"
                >
                    🎁
                </motion.div>

                <motion.h1
                    className="text-3xl md:text-5xl font-heading text-heading mb-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {config.landingTeaser}
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl text-text opacity-80 mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    Hey {config.recipientName}, are you ready?
                </motion.p>

                <motion.button
                    onClick={handleOpenGift}
                    className="bg-primary text-white font-semibold text-lg py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                        boxShadow: [
                            "0px 0px 0px 0px rgba(230,57,70,0)",
                            "0px 0px 20px 5px rgba(230,57,70,0.5)",
                            "0px 0px 0px 0px rgba(230,57,70,0)"
                        ]
                    }}
                    transition={{
                        boxShadow: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                >
                    Open Your Gift ✨
                </motion.button>
            </div>
        </motion.div>
    );
};

export default LandingPage;

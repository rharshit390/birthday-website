import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { finalMessage } from '../data/finalMessageData';
import { config } from '../data/siteConfig';

const FinalMessage = ({ isUnlocked }) => {

    useEffect(() => {
        if (isUnlocked) {
            setTimeout(() => {
                confetti({
                    particleCount: 200,
                    spread: 160,
                    scalar: 1.4,
                    origin: { y: 0.8 },
                    colors: [config.theme.primary, config.theme.secondary, config.theme.accent, '#ff69b4', '#ffffff']
                });
            }, 2000); // fire at peak of message reveal
        }
    }, [isUnlocked]);

    if (!isUnlocked) {
        return (
            <section id="finale" className="min-h-[50vh] flex flex-col items-center justify-center bg-rose-50 border-t border-rose-200">
                <div className="text-6xl mb-4 opacity-50 grayscale">🔒</div>
                <p className="text-gray-400 font-medium">Win the mini-game to unlock your final message...</p>
            </section>
        );
    }

    return (
        <section id="finale" className="min-h-screen relative flex items-center justify-center py-20 overflow-hidden bg-gradient-to-b from-bg to-rose-50">
            {/* Background Floating Hearts */}
            {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-5xl opacity-10 pointer-events-none"
                    initial={{ y: "100vh", x: `${Math.random() * 100}vw` }}
                    animate={{ y: "-20vh", x: `${Math.random() * 100}vw` }}
                    transition={{
                        duration: Math.random() * 10 + 15,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5
                    }}
                >
                    💖
                </motion.div>
            ))}

            <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
                <motion.h2
                    className="text-4xl md:text-5xl font-heading text-heading mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    My Dearest {config.recipientName},
                </motion.h2>

                <div className="space-y-8 text-lg md:text-xl text-text leading-relaxed font-medium">
                    {finalMessage.map((paragraph, pIndex) => (
                        <motion.p key={pIndex} className="flex flex-wrap justify-center gap-[0.25em]">
                            {paragraph.split(" ").map((word, wIndex) => (
                                <motion.span
                                    key={wIndex}
                                    initial={{ opacity: 0, filter: "blur(4px)" }}
                                    animate={{ opacity: 1, filter: "blur(0px)" }}
                                    transition={{
                                        duration: 0.4,
                                        delay: 0.8 + (pIndex * 0.5) + (wIndex * 0.05)
                                    }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.p>
                    ))}
                </div>

                <motion.div
                    className="mt-16 text-2xl font-heading text-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 4 }}
                >
                    With all my love, <br />
                    {config.senderName} ❤️
                </motion.div>

                {/* Optional restart button */}
                <motion.button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="mt-20 px-6 py-2 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-colors text-sm uppercase tracking-widest font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 5 }}
                >
                    Play it again
                </motion.button>
            </div>
        </section>
    );
};

export default FinalMessage;

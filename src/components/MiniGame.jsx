import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { gameConfig } from '../data/gameConfig';

const MiniGame = ({ onStart, onWin }) => {
    const [score, setScore] = useState(0);
    const [hearts, setHearts] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameWon, setGameWon] = useState(false);

    const containerRef = useRef(null);
    const heartIdCounter = useRef(0);
    const spawnIntervalRef = useRef(null);

    const startGame = () => {
        setGameStarted(true);
        setScore(0);
        setHearts([]);
        setGameWon(false);
        if (onStart) onStart();
    };

    useEffect(() => {
        if (gameStarted && !gameWon) {
            spawnIntervalRef.current = setInterval(() => {
                setHearts(prev => {
                    // clean up old hearts
                    const currentHearts = prev.filter(h => !h.caught && Date.now() - h.createdAt < 6000);

                    const newHeartsCount = Math.floor(Math.random() * (gameConfig.maxHeartsPerWave - gameConfig.minHeartsPerWave + 1)) + gameConfig.minHeartsPerWave;
                    const newHearts = Array.from({ length: newHeartsCount }).map(() => ({
                        id: heartIdCounter.current++,
                        x: Math.random() * 80 + 10, // 10% to 90%
                        speed: (Math.random() * (gameConfig.maxFallDuration - gameConfig.minFallDuration) + gameConfig.minFallDuration) - (score * gameConfig.speedIncreasePerScore), // gets faster
                        createdAt: Date.now(),
                        caught: false,
                        emoji: ['💕', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 5)]
                    }));

                    return [...currentHearts, ...newHearts];
                });
            }, gameConfig.spawnInterval);
        } else {
            if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
        }

        return () => {
            if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
        };
    }, [gameStarted, gameWon, score]);

    const catchHeart = (id) => {
        if (gameWon) return;

        setHearts(prev => prev.map(h => h.id === id ? { ...h, caught: true } : h));
        const newScore = score + 1;
        setScore(newScore);

        if (newScore >= gameConfig.targetScore && !gameWon) {
            setGameWon(true);
            if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);

            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.5 },
                zIndex: 100
            });
        }
    };

    const scrollToFinale = () => {
        onWin(); // trigger unlock
        setTimeout(() => {
            const finale = document.getElementById('finale');
            if (finale) finale.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <section id="game" className="py-24 bg-rose-100 relative overflow-hidden h-[800px] flex flex-col items-center select-none" ref={containerRef}>
            <div className="relative z-10 text-center mb-8 px-4">
                <h2 className="text-4xl md:text-5xl font-heading text-heading mb-2">Catch the Hearts 💕</h2>
                <p className="text-text font-medium">
                    Score: <span className="text-primary text-2xl font-bold">{score}</span> / {gameConfig.targetScore}
                </p>
            </div>

            {!gameStarted ? (
                <motion.div
                    className="absolute inset-0 flex items-center justify-center z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <button
                        onClick={startGame}
                        className="bg-heading text-white px-8 py-4 rounded-full font-bold text-xl hover:scale-105 active:scale-95 transition-transform shadow-lg"
                    >
                        Start Game 🎮
                    </button>
                </motion.div>
            ) : (
                <div className="absolute inset-0 top-32 overflow-hidden pointer-events-none">
                    <AnimatePresence>
                        {!gameWon && hearts.map(heart => !heart.caught && (
                            <motion.div
                                key={heart.id}
                                className="absolute text-4xl pointer-events-auto cursor-pointer flex items-center justify-center w-12 h-12"
                                style={{ left: `${heart.x}%` }}
                                initial={{ y: -50, opacity: 0, scale: 0 }}
                                animate={{ y: 800, opacity: 1, scale: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{
                                    y: { duration: Math.max(1, heart.speed), ease: "linear" },
                                    opacity: { duration: 0.2 },
                                    scale: { duration: 0.2 }
                                }}
                                onClick={() => catchHeart(heart.id)}
                                whileTap={{ scale: 1.5 }}
                            >
                                {heart.emoji}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Win Screen Overlay */}
            <AnimatePresence>
                {gameWon && (
                    <motion.div
                        className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-rose-50/90 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.h3
                            className="text-4xl font-heading text-primary mb-6"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                        >
                            You did it! 🎉
                        </motion.h3>
                        <motion.button
                            onClick={scrollToFinale}
                            className="bg-primary text-white px-8 py-4 rounded-full font-bold text-xl hover:scale-105 active:scale-95 transition-transform shadow-lg hover:shadow-primary/50"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Unlock Your Special Message 💖
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default MiniGame;

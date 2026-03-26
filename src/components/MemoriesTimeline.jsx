import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { memories } from '../data/memoriesData';

const QuizCard = ({ memory, onCorrect, onIncorrect, isAnswered, selectedAnswer }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-2xl mx-auto bg-white/30 backdrop-blur-md p-8 rounded-3xl border border-white/40 shadow-2xl"
        >
            <div className="text-center mb-8">
                <span className="text-5xl mb-4 block">❓</span>
                <h3 className="text-2xl font-bold text-heading mb-2">{memory.question}</h3>
                <p className="text-text/70 text-sm italic">Choose the correct answer to reveal a memory!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {memory.options.map((option, index) => {
                    const isCorrect = option === memory.correctAnswer;
                    const isSelected = selectedAnswer === option;

                    let buttonClass = "p-4 rounded-xl border transition-all duration-300 text-left font-medium ";
                    if (isAnswered) {
                        if (isSelected && isCorrect) {
                            buttonClass += "bg-rose-500/40 border-rose-400 text-heading shadow-[0_0_15px_rgba(225,29,72,0.4)]";
                        } else {
                            buttonClass += "bg-white/10 border-white/10 text-heading/40";
                        }
                    } else {
                        buttonClass += "bg-white/40 border-white/20 text-heading hover:bg-white/60 hover:border-white/40 hover:scale-[1.02] active:scale-[0.98]";
                    }

                    return (
                        <button
                            key={index}
                            disabled={isAnswered}
                            onClick={() => isCorrect ? onCorrect(option) : onIncorrect(option)}
                            className={buttonClass}
                        >
                            <span className="mr-3 text-heading/50">{String.fromCharCode(65 + index)}.</span>
                            {option}
                        </button>
                    );
                })}
            </div>
        </motion.div>
    );
};

const MemoryCard = ({ memory }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, rotateY: -10 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            className="w-full max-w-2xl mx-auto"
        >
            <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-rose-200 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />

                <div className="flex flex-col items-center text-center">
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className="text-6xl mb-6"
                    >
                        {memory.emoji}
                    </motion.span>

                    <div className="flex gap-2 items-baseline mb-4">
                        {memory.year && <span className="text-2xl font-bold text-heading">{memory.year}</span>}
                        <span className="text-sm font-medium text-secondary">{memory.date}</span>
                    </div>

                    <p className="text-text text-lg leading-relaxed mb-6 italic">
                        "{memory.caption}"
                    </p>

                    {memory.tag && (
                        <span className="px-4 py-1.5 bg-rose-100 text-primary text-xs font-bold rounded-full uppercase tracking-widest border border-rose-200">
                            {memory.tag}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const Bouquet = () => {
    return (
        <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.2
            }}
            className="relative mb-8 flex justify-center"
        >
            <div className="text-8xl relative z-10 filter drop-shadow-2xl animate-bounce-slow">
                💐
            </div>

            {/* Animated Heart Particles */}
            {[...Array(6)].map((_, i) => (
                <motion.span
                    key={i}
                    className="absolute text-2xl"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.2, 0.8],
                        x: (i % 2 === 0 ? 1 : -1) * (Math.random() * 60 + 20),
                        y: -(Math.random() * 100 + 50)
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "easeOut"
                    }}
                >
                    ❤️
                </motion.span>
            ))}

            {/* Sparkle effects */}
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={`sparkle-${i}`}
                    className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                    animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 0.8, 0],
                        x: (i < 2 ? 1 : -1) * (Math.random() * 80),
                        y: (i % 2 === 0 ? 1 : -1) * (Math.random() * 80),
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.3
                    }}
                />
            ))}
        </motion.div>
    );
};

const MemoriesTimeline = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showMemory, setShowMemory] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const handleCorrect = (option) => {
        setIsAnswered(true);
        setSelectedAnswer(option);
        setTimeout(() => {
            setShowMemory(true);
        }, 800);
    };

    const handleIncorrect = (option) => {
        setIsAnswered(true);
        setSelectedAnswer(option);
        setTimeout(() => {
            setIsAnswered(false);
            setSelectedAnswer(null);
        }, 1500);
    };

    const nextMemory = () => {
        if (currentIndex < memories.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setIsAnswered(false);
            setSelectedAnswer(null);
            setShowMemory(false);
        } else {
            setQuizCompleted(true);
        }
    };

    const currentMemory = memories[currentIndex];

    return (
        <section id="memories" className="relative w-full py-24 bg-gradient-to-b from-bg to-rose-50 overflow-hidden min-h-[700px] flex flex-col justify-center">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-secondary rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto px-4 relative z-10 w-full">
                <div className="text-center mb-12">
                    <motion.h2
                        className="text-4xl md:text-5xl font-heading text-heading mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {quizCompleted ? "A Gift for You! 🌹" : "Memory Quiz Time! 🧠"}
                    </motion.h2>
                    <AnimatePresence mode="wait">
                        {!quizCompleted && (
                            <motion.p
                                key="quiz-progress"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-text opacity-70"
                            >
                                Question {currentIndex + 1} of {memories.length}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>

                <div className="relative min-h-[450px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {!quizCompleted ? (
                            !showMemory ? (
                                <QuizCard
                                    key={`quiz-${currentIndex}`}
                                    memory={currentMemory}
                                    onCorrect={handleCorrect}
                                    onIncorrect={handleIncorrect}
                                    isAnswered={isAnswered}
                                    selectedAnswer={selectedAnswer}
                                />
                            ) : (
                                <div key={`memory-container-${currentIndex}`} className="w-full flex flex-col items-center gap-8">
                                    <MemoryCard memory={currentMemory} />
                                    <motion.button
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        onClick={nextMemory}
                                        className="px-8 py-3 bg-primary text-white rounded-full font-bold shadow-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
                                    >
                                        {currentIndex === memories.length - 1 ? "Complete Quiz" : "Next Question"}
                                    </motion.button>
                                </div>
                            )
                        ) : (
                            <motion.div
                                key="victory"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center bg-white/40 backdrop-blur-lg p-12 rounded-[2rem] border border-white/40 shadow-2xl max-w-2xl mx-auto"
                            >
                                <Bouquet />

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <h3 className="text-3xl font-bold text-heading mb-6">You Remember It All!</h3>
                                    <p className="text-text text-xl leading-relaxed mb-10 italic font-medium">
                                        "Bas itne hi memories hai abhi ke liye toh par agey aur banani hai. Here's a small bouquet for the most beautiful person I know. Happy Birthday! ❤️"
                                    </p>

                                    <button
                                        onClick={() => document.getElementById('gifts')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="group relative px-10 py-4 bg-primary text-white rounded-full font-bold text-lg shadow-xl overflow-hidden transition-all hover:-translate-y-1 active:translate-y-0"
                                    >
                                        <span className="relative z-10">Continue the Surprise 🎁</span>
                                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                                    </button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default MemoriesTimeline;

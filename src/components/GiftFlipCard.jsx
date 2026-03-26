import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const GiftFlipCard = ({ gift, onFlip }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const audioRef = useRef(gift.audio ? new Audio(gift.audio) : null);

    const handleCardClick = () => {
        if (isFlipped) return; // one-way state
        setIsFlipped(true);
        onFlip(gift.id);

        if (audioRef.current) {
            audioRef.current.play().catch(e => console.warn("Audio play failed:", e));
        }
    };

    return (
        <div className="relative w-full aspect-[3/4] cursor-pointer group" onClick={handleCardClick}>
            <motion.div
                className="w-full h-full relative"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 w-full h-full rounded-2xl shadow-md border-2 bg-white flex flex-col items-center justify-center p-6 backface-hidden"
                    style={{ borderColor: gift.accentColor, backfaceVisibility: 'hidden' }}
                >
                    <motion.div
                        className="text-6xl mb-4 group-hover:scale-110 transition-transform"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        🎁
                    </motion.div>
                    <h3 className="text-xl font-heading text-heading text-center">{gift.title}</h3>
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 w-full h-full rounded-2xl shadow-md p-6 flex flex-col items-center justify-center text-center backface-hidden"
                    style={{
                        backgroundColor: gift.accentColor,
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    <div className="text-5xl mb-4">{gift.icon}</div>
                    <p className="text-white text-lg font-medium leading-snug drop-shadow-sm">
                        {gift.message}
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default GiftFlipCard;

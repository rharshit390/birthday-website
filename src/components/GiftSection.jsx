import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { gifts } from '../data/giftsData';
import GiftFlipCard from './GiftFlipCard';

const GiftSection = () => {
    const [flippedCardIds, setFlippedCardIds] = useState(new Set());

    const handleFlip = (id) => {
        const newFlipped = new Set(flippedCardIds);
        newFlipped.add(id);
        setFlippedCardIds(newFlipped);

        // If all cards are flipped
        if (newFlipped.size === gifts.length) {
            setTimeout(() => {
                confetti({
                    particleCount: 150,
                    spread: 80,
                    origin: { y: 0.5 },
                    zIndex: 100
                });
            }, 500); // slight delay after flip finishes
        }
    };

    return (
        <section id="gifts" className="py-24 bg-gradient-to-b from-rose-50 to-bg relative">
            <div className="max-w-5xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-4xl md:text-5xl font-heading text-heading mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Open Your Gifts 💝
                    </motion.h2>
                    <motion.p
                        className="text-lg text-text opacity-80"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Tap on each card to reveal what's inside...
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {gifts.map((gift, index) => (
                        <motion.div
                            key={gift.id}
                            className="w-full max-w-[280px]"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                        >
                            <GiftFlipCard gift={gift} onFlip={handleFlip} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GiftSection;

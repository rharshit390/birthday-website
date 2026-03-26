import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MusicController = ({ isGameStarted }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        // Look for the local song in the public folder first, fallback to external if needed
        const localSong = '/birthday-song.mp3';
        const fallbackSong = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

        audioRef.current = new Audio(localSong);
        audioRef.current.loop = true;
        audioRef.current.volume = 0.2; // 20% volume

        // Verify if local song exists, if not, switch to fallback
        audioRef.current.onerror = () => {
            if (audioRef.current && audioRef.current.src.includes(localSong)) {
                console.log("Local song not found, using fallback.");
                audioRef.current.src = fallbackSong;
            }
        };

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // Effect to start music when game starts
    useEffect(() => {
        if (isGameStarted && audioRef.current && !isPlaying) {
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(err => console.log("Playback failed or blocked:", err));
        }
    }, [isGameStarted]);

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(err => {
                console.warn("Audio playback failed.", err);
            });
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <motion.button
            onClick={toggleMusic}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-primary hover:scale-105 active:scale-95 transition-transform"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 1 }}
            aria-label={isPlaying ? "Pause music" : "Play music"}
        >
            {isPlaying ? (
                <div className="flex items-end gap-[3px] h-6">
                    <motion.div animate={{ height: ["40%", "100%", "40%"] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-1.5 bg-primary rounded-t-sm" />
                    <motion.div animate={{ height: ["80%", "30%", "80%"] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} className="w-1.5 bg-primary rounded-t-sm" />
                    <motion.div animate={{ height: ["50%", "90%", "50%"] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }} className="w-1.5 bg-primary rounded-t-sm" />
                </div>
            ) : (
                <div className="text-2xl opacity-70">
                    🎵
                </div>
            )}
        </motion.button>
    );
};

export default MusicController;

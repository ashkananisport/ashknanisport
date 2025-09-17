// src/components/FloatingVideo.tsx

import React, { useState, useEffect, useRef } from 'react';

interface FloatingVideoProps {
    videoUrl: string;
    thumbnailUrl?: string;
    autoPlay?: boolean;
    muted?: boolean;
    controls?: boolean;
    width?: number;
    height?: number;
}

const FloatingVideo: React.FC<FloatingVideoProps> = ({
    videoUrl,
    thumbnailUrl,
    autoPlay = true,
    muted = false,
    controls = false,
    width = 160,  // تقليل العرض الافتراضي
    height = 120  // تقليل الارتفاع الافتراضي
}) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.play().catch(error => {
                    console.error("Auto-play failed:", error);
                    setIsPlaying(false);
                });
            } else {
                videoRef.current.pause();
            }
        }
    }, [isPlaying]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const closeVideo = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="floating-video-container">
            <div className="floating-video">
                <video
                    ref={videoRef}
                    src={videoUrl}
                    poster={thumbnailUrl}
                    width={width}
                    height={height}
                    muted={muted}
                    controls={controls}
                    loop
                    playsInline
                    onClick={togglePlay}
                />
                <div className="floating-video-controls">
                    <button className="play-pause-btn" onClick={togglePlay}>
                        {isPlaying ? '⏸' : '▶'}
                    </button>
                    <button className="close-btn" onClick={closeVideo}>
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FloatingVideo;
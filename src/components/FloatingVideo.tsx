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
    width = 160,
    height = 120
}) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isMuted, setIsMuted] = useState(true); // دائماً يبدأ كتم الصوت
    const [hasInteracted, setHasInteracted] = useState(false);
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

    useEffect(() => {
        // دالة التعامل مع التفاعل الأول
        const handleFirstInteraction = async () => {
            if (!hasInteracted && videoRef.current) {
                setHasInteracted(true);
                
                // احفظ حالة التشغيل الحالية
                const wasPlaying = !videoRef.current.paused;
                
                // فك الكتم أولاً
                videoRef.current.muted = false;
                setIsMuted(false);
                
                // إذا كان الفيديو شاغلاً، استمر في التشغيل مع الصوت
                if (wasPlaying) {
                    try {
                        await videoRef.current.play();
                        setIsPlaying(true);
                    } catch (error) {
                        console.error("Failed to play with sound:", error);
                        // إذا فشل التشغيل، حاول مرة أخرى بعد فترة قصيرة
                        setTimeout(() => {
                            if (videoRef.current) {
                                videoRef.current.play()
                                    .then(() => setIsPlaying(true))
                                    .catch(e => console.error("Retry failed:", e));
                            }
                        }, 100);
                    }
                }
                
                // إزالة مستمعي الأحداث بعد التفاعل الأول
                document.removeEventListener('click', handleFirstInteraction);
                document.removeEventListener('scroll', handleFirstInteraction);
                document.removeEventListener('touchstart', handleFirstInteraction);
                document.removeEventListener('keydown', handleFirstInteraction);
            }
        };

        // إضافة مستمعي الأحداث للصفحة بأكملها
        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('scroll', handleFirstInteraction);
        document.addEventListener('touchstart', handleFirstInteraction);
        document.addEventListener('keydown', handleFirstInteraction);

        return () => {
            // تنظيف مستمعي الأحداث
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('scroll', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
            document.removeEventListener('keydown', handleFirstInteraction);
        };
    }, [hasInteracted]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch(error => console.error("Play failed:", error));
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
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
                    muted={isMuted}
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
                {!hasInteracted && (
                    <div className="sound-indicator">
                        <span>🔇</span>
                        <p>انقر أو مرر لتفعيل الصوت</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FloatingVideo;
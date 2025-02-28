import React, { useState, useCallback, useRef } from 'react';
import styles from './App.module.scss';

const SLIDES_COUNT = 6;
const AUTO_PLAY_DURATION = 5000;

const IMAGES = [
    'https://i.imgur.com/lgfpi72.jpeg',
    'https://i.imgur.com/pZSdKba.jpeg',
    'https://i.imgur.com/FeupvAh.jpeg',
    'https://i.imgur.com/N6RlxBr.jpeg',
    'https://i.imgur.com/ar7z0Zb.jpeg',
    'https://i.imgur.com/CaX7ra4.jpeg',
];

const App = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isManuallyPaused, setIsManuallyPaused] = useState(false);
    const [isMouseInCarousel, setIsMouseInCarousel] = useState(false);
    const progressBarRef = useRef(null);

    const handleProgressBarEnd = useCallback(() => {
        if (!isPaused) {
            setCurrentIndex((currentIndex + 1) % SLIDES_COUNT);
        }
    }, [isPaused, currentIndex]);

    const handleMouseEnterCarousel = () => {
        setIsMouseInCarousel(true);
        if (!isManuallyPaused) {
            setIsPaused(true);
        }
    };

    const handleMouseLeaveCarousel = () => {
        setIsMouseInCarousel(false);
        if (!isManuallyPaused) {
            setIsPaused(false);
        }
    };

    const handleMouseEnterProgressWrapper = () => {
        if (!isManuallyPaused) {
            setIsPaused(false);
        }
    };

    const handleMouseLeaveProgressWrapper = () => {
        if (!isManuallyPaused && isMouseInCarousel) {
            setIsPaused(true);
        }
    };

    const togglePause = () => {
        setIsManuallyPaused(!isManuallyPaused);
        setIsPaused(!isPaused);
    };

    return (
        <div className={styles.content}>
            <h2>Карусель в стиле Samsung</h2>
            <div className={styles.settingsProfile}>
                <div
                    className={styles.carousel}
                    onMouseEnter={handleMouseEnterCarousel}
                    onMouseLeave={handleMouseLeaveCarousel}
                >
                    <div className={styles.carouselInner}>
                        {IMAGES.map((image, index) => (
                            <div
                                key={index}
                                className={`${styles.carouselItem} ${currentIndex === index ? styles.active : ''
                                    } ${currentIndex === index ? styles.enter : styles.exit
                                    }`}
                            >
                                <img src={image} alt={`Slide ${index + 1}`} />
                                <span>{index + 1}</span>
                                <div
                                    className={styles.progressWrapper}
                                    onMouseEnter={handleMouseEnterProgressWrapper}
                                    onMouseLeave={handleMouseLeaveProgressWrapper}
                                >
                                    <div className={styles.progressContainer}>
                                        {[...Array(SLIDES_COUNT)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`${styles.progressBar} ${currentIndex === i ? styles.active : ''
                                                    }`}
                                            >
                                                <div className={styles.progressBackground} />
                                                {currentIndex === i && (
                                                    <div
                                                        key={currentIndex}
                                                        ref={progressBarRef}
                                                        className={styles.progressFill}
                                                        onAnimationEnd={handleProgressBarEnd}
                                                        style={{
                                                            animationDuration: `${AUTO_PLAY_DURATION}ms`,
                                                            animationPlayState: isPaused ? 'paused' : 'running',
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.controls}>
                                        {isPaused ? (
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                onClick={togglePause}
                                            >
                                                <path d="M8 5V19L19 12L8 5Z" fill="white" />
                                            </svg>
                                        ) : (
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                onClick={togglePause}
                                            >
                                                <path d="M6 19H10V5H6V19ZM14 5V19H18V5H14Z" fill="white" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div
                        className={`${styles.carouselControl} ${styles.prev}`}
                        onClick={() => setCurrentIndex((currentIndex - 1 + SLIDES_COUNT) % SLIDES_COUNT)}
                    >
                        <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div
                        className={`${styles.carouselControl} ${styles.next}`}
                        onClick={() => setCurrentIndex((currentIndex + 1) % SLIDES_COUNT)}
                    >
                        <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
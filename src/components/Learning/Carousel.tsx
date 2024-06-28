import React, { ReactNode, useState } from 'react';
import { OpenArrow } from '../Common/Arrow';
import styles from './Carousel.module.css';

export const Carousel = ({ children }: {children: ReactNode}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 4;
    const totalItems = React.Children.count(children);
    const maxIndex = totalItems - itemsPerPage

    const goLeft = () => {
        setCurrentIndex(currentIndex === 0 ? maxIndex : currentIndex - 1);
    };

    const goRight = () => {
        setCurrentIndex(currentIndex === maxIndex ? 0 : currentIndex + 1);
    }

    return (
        <div className={styles['carousel-container']}>
            <button onClick={goLeft}>
                <OpenArrow isOpen={true} direction="left" />
            </button>
            <div className={styles['carousel-content-wrapper']}>
                <div id="videoCarousel" className={styles['carousel-content']} style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}>
                    {children}
                </div>
            </div>
            <button onClick={goRight}>
                <OpenArrow isOpen={false} direction="right" />
            </button>
        </div>
    );
};
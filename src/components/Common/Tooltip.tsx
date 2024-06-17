import { useState, useRef, useEffect } from 'react';
import Portal from './Portal'; // Import your Portal component

export const Tooltip = ({ children, content, verticalOffset = 12 }) => {
    const [show, setShow] = useState(false);
    const [position, setPosition] = useState({});
    const tooltipRef = useRef(null);
    const contentRef = useRef(null); // Ref for the tooltip content

    useEffect(() => {
        if (tooltipRef.current && contentRef.current && show) {
            const targetRect = tooltipRef.current.getBoundingClientRect();
            const tooltipRect = contentRef.current.getBoundingClientRect();
            
            let left = targetRect.left + window.scrollX + (targetRect.width / 2); // Center align
            const top = targetRect.bottom + window.scrollY + verticalOffset;

            // Check if the tooltip is going off the right side of the screen
            if (left + tooltipRect.width > window.innerWidth) {
                left = window.innerWidth - tooltipRect.width / 2 - 10; // Adjust to keep it on screen
            }
            // Check if the tooltip is going off the left side of the screen
            if (left - tooltipRect.width / 2 < 0) {
                left += 10; // Adjust to keep it on screen
            }

            setPosition({
                top: top,
                left: left,
                position: 'absolute'
            });
        }
    }, [show, content, verticalOffset]); // Added 'content' to dependencies array

    return (
        <span className="tooltip-wrapper" 
             onMouseEnter={() => setShow(true)} 
             onMouseLeave={() => setShow(false)}
             ref={tooltipRef}>
            {children}
            {show && (
              <Portal>
                <div className={`tooltip-box ${show ? 'show' : ''}`} ref={contentRef} style={position}>
                    <div className="tooltip-arrow" />
                    <div style={{ whiteSpace: 'pre-line' }}>{content}</div>
                </div>
              </Portal>
            )}
        </span>
    );
};
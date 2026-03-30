import { useState, useRef, useEffect, CSSProperties } from 'react';
import Portal from './Portal'; // Import your Portal component

export const Tooltip = ({ children, content, verticalOffset = 12, position: positionProp }: Tooltip) => {
    const [show, setShow] = useState<boolean>(false);
    const [position, setPosition] = useState<CSSProperties>({});
    const tooltipRef = useRef(null);
    const contentRef = useRef(null); // Ref for the tooltip content

    useEffect(() => {
        if (tooltipRef.current && contentRef.current && show) {
            // Use requestAnimationFrame to ensure tooltip is rendered and measured correctly
            requestAnimationFrame(() => {
                if (tooltipRef.current && contentRef.current) {
                    const targetRect = tooltipRef.current.getBoundingClientRect();
                    const tooltipRect = contentRef.current.getBoundingClientRect();
                    
                    let left: number;
                    let top: number;

                    // If position prop is 'right', position to the right of the element
                    if (positionProp === 'right') {
                        left = targetRect.right + window.scrollX + verticalOffset;
                        top = targetRect.top + window.scrollY + (targetRect.height / 2) - (tooltipRect.height / 2);

                        // Check if the tooltip is going off the right side of the screen
                        if (left + tooltipRect.width > window.innerWidth + window.scrollX) {
                            // If it goes off right, position it to the left of the element instead
                            left = targetRect.left + window.scrollX - tooltipRect.width - verticalOffset;
                        }
                    } else {
                        // Default: position tooltip below the element (centered)
                        left = targetRect.left + window.scrollX + (targetRect.width / 2);
                        top = targetRect.bottom + window.scrollY + verticalOffset;

                        // Check if the tooltip is going off the right side of the screen
                        if (left + tooltipRect.width / 2 > window.innerWidth + window.scrollX) {
                            left = window.innerWidth + window.scrollX - tooltipRect.width / 2 - 10;
                        }
                        // Check if the tooltip is going off the left side of the screen
                        if (left - tooltipRect.width / 2 < window.scrollX) {
                            left = window.scrollX + tooltipRect.width / 2 + 10;
                        }
                    }

                    // Check if the tooltip is going off the top of the screen
                    if (top < window.scrollY) {
                        top = window.scrollY + 10;
                    }
                    // Check if the tooltip is going off the bottom of the screen
                    if (top + tooltipRect.height > window.innerHeight + window.scrollY) {
                        top = window.innerHeight + window.scrollY - tooltipRect.height - 10;
                    }

                    setPosition({
                        top: top,
                        left: left,
                        position: 'absolute',
                        // For default positioning (below), center using transform
                        transform: positionProp === 'right' ? 'none' : 'translateX(-50%)'
                    });
                }
            });
        }
    }, [show, content, verticalOffset, positionProp]);

    return (
        <span className="tooltip-wrapper"
             onMouseEnter={() => setShow(true)} 
             onMouseLeave={() => setShow(false)}
             ref={tooltipRef}>
            {children}
            {show && (
              <Portal>
                <div className={`tooltip-box ${show ? 'show' : ''} ${positionProp === 'right' ? 'arrow-left' : ''}`} ref={contentRef} style={position}>
                    <div className="tooltip-arrow" />
                    <div style={{ whiteSpace: 'pre-line' }}>{content}</div>
                </div>
              </Portal>
            )}
        </span>
    );
};
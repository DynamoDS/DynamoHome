import { useState, useRef, useEffect, CSSProperties } from 'react';
import Portal from './Portal'; // Import your Portal component

export const Tooltip = ({ children, content, verticalOffset = 12, position: positionProp = 'below' }: Tooltip) => {
  const [show, setShow] = useState<boolean>(false);
  const [position, setPosition] = useState<CSSProperties>({});
  const tooltipRef = useRef<HTMLSpanElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!tooltipRef.current || !contentRef.current || !show) {
      return;
    }

    const updatePosition = () => {
      if (!tooltipRef.current || !contentRef.current) {
        return;
      }

      const targetRect = tooltipRef.current.getBoundingClientRect();
      const tooltipRect = contentRef.current.getBoundingClientRect();

      let left: number;
      let top: number;

      if (positionProp === 'right') {
        left = targetRect.right + window.scrollX + verticalOffset;
        top = targetRect.top + window.scrollY + (targetRect.height / 2) - (tooltipRect.height / 2);

        if (left + tooltipRect.width > window.innerWidth + window.scrollX) {
          left = targetRect.left + window.scrollX - tooltipRect.width - verticalOffset;
        }
      } else {
        left = targetRect.left + window.scrollX + (targetRect.width / 2);
        top = targetRect.bottom + window.scrollY + verticalOffset;

        if (left + tooltipRect.width / 2 > window.innerWidth + window.scrollX) {
          left = window.innerWidth + window.scrollX - tooltipRect.width / 2 - 10;
        }

        if (left - tooltipRect.width / 2 < window.scrollX) {
          left = window.scrollX + tooltipRect.width / 2 + 10;
        }
      }

      if (top < window.scrollY) {
        top = window.scrollY + 10;
      }

      if (top + tooltipRect.height > window.innerHeight + window.scrollY) {
        top = window.innerHeight + window.scrollY - tooltipRect.height - 10;
      }

      setPosition({
        top: top,
        left: left,
        position: 'absolute',
        transform: positionProp === 'right' ? 'none' : 'translateX(-50%)'
      });
    };

    if (window.requestAnimationFrame) {
      const animationFrame = window.requestAnimationFrame(updatePosition);
      return () => window.cancelAnimationFrame?.(animationFrame);
    }

    updatePosition();
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
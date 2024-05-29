import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomDropDown.module.css';
import { OpenArrow } from '../Common/Arrow';

export const CustomDropdown = ({ id, selectedValue, options, onSelect, placeholder, onSelectionChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [lastSelected, setLastSelected] = useState(options[0]);
    const dropdownRef = useRef(null);
    const arrowColor = isOpen ? "rgba(56,171,223,0.35)" : "#949494";

    const toggleDropdown = () => setIsOpen(!isOpen);

    /** Peforms the selected action type when used as a Drop-down */
    const handleOptionSelect = (option) => {
        setIsOpen(false);
        if (onSelectionChange) {
            onSelectionChange(option.value); 
        }
    };

    /** Peforms the selected action type when used as a Button */
    const handleDefaultAction = () => {
        if (onSelectionChange) {
            onSelectionChange(lastSelected.value);
        }
    };

    /** Handles navigate away from the drop-down control */
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className={`${styles['custom-dropdown']} ${isOpen ? styles.open : ''}`} ref={dropdownRef}>
            <div className={styles['dropdown-selected']} onClick={handleDefaultAction}>
                <span>{placeholder}</span>  
                <span className={styles['vertical-line']}></span>
                <div className={styles['arrow-container']} onClick={(e) => {
                    e.stopPropagation(); 
                    toggleDropdown();
                }}>
                    <OpenArrow isOpen={isOpen} color={arrowColor} />
                </div>
            </div>
            <div className={`${styles['dropdown-options']} ${isOpen ? styles.open : ''}`}>
                {options.map((option, index) => (
                    <div id={`${id}-${index}`} key={index} className={styles['dropdown-option']} onClick={() => handleOptionSelect(option)}>
                        {option.label}
                    </div>
                ))}
            </div>
        </div>
    );
};
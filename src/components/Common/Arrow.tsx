import styles from './Arrow.module.css';

export const ClosedArrow = ({ isOpen, direction, color }: Arrow) => {
    let arrowClasses = [styles.closedArrow]; // Start with an array of classes
    if (isOpen) arrowClasses.push(styles.open);
    if (direction === 'left') arrowClasses.push(styles.left);
    if (direction === 'right') arrowClasses.push(styles.right);

    // Join the classes with a space to form the className string
    const arrowClassString = arrowClasses.join(' ');

    return (
        <svg
            className={arrowClassString}
            width="8"
            height="4"
            viewBox="0 0 8 4"
        >
            <path
                d="M4 4L7.5 0H0.5L4 4Z"
                fill={color || "#949494"}
            />
        </svg>
    );
};

export const OpenArrow = ({ isOpen, direction, color }: Arrow) => {
    let arrowClasses = [styles.openArrow]; // Start with an array of classes
    if (isOpen) arrowClasses.push(styles.open);
    if (direction === 'left') arrowClasses.push(styles.left);
    if (direction === 'right') arrowClasses.push(styles.right);

    // Join the classes with a space to form the className string
    const arrowClassString = arrowClasses.join(' ');

    return (
        <svg
            className={arrowClassString}
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <path
                d="M8 10l4 4 4-4"
                stroke={color || "#949494"}
                strokeWidth="2"
                fill="none"
            />
        </svg>
    );
};
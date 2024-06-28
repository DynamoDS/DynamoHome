import ReactDOM from 'react-dom';
import styles from './ModalItem.module.css';

const ModalItem = ({ isOpen, onClose, children }:  ModalItem) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <>
            <div className={styles.overlay} onClick={onClose} />
            <div className={styles.modal} >
            <div className={styles['iframe-wrapper']} >
                {children}
            </div>
            <button className={styles.closeButton} onClick={onClose} aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 16 16" width="16px" height="16px"><path d="M 2.75 2.042969 L 2.042969 2.75 L 2.398438 3.101563 L 7.292969 8 L 2.042969 13.25 L 2.75 13.957031 L 8 8.707031 L 12.894531 13.605469 L 13.25 13.957031 L 13.957031 13.25 L 13.605469 12.894531 L 8.707031 8 L 13.957031 2.75 L 13.25 2.042969 L 8 7.292969 L 3.101563 2.398438 Z"/></svg>
            </button>
            </div>
        </>,
        document.getElementById('modal-root') as HTMLElement// Ensure you have a div with this id in your index.html
    );
};

export default ModalItem;
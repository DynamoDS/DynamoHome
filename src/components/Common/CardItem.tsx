import { Tooltip } from './Tooltip';
import styles from './CardItems.module.css';

export const CardItem = ({ imageSrc, onClick, tooltipContent, titleText, subtitleText }: CardItem) => {
    return (
        <div className={styles['graph-container']}>
            <a className={styles['graph-link']} onClick={onClick}>
                <div className={styles['clipped-image-container']}>
                    <img src={imageSrc} className={styles['clipped-image']}/>
                </div>
                {tooltipContent
                    ?
                    <Tooltip content={tooltipContent}>
                        <div className={styles['custom-container']}>
                            <p className={`${styles['graph-item-title-text']} ${styles['graph-card-text-item']}`}>{titleText}</p>
                            <p className={`${styles['graph-item-subtitle-text']} ${styles['graph-card-text-item']}`}>{subtitleText}</p>
                        </div>
                    </Tooltip>
                    :
                    <div className={styles['custom-container']}>
                        <p className={`${styles['graph-item-title-text']} ${styles['graph-card-text-item']}`}>{titleText}</p>
                        <p className={`${styles['graph-item-subtitle-text']} ${styles['graph-card-text-item']}`}>{subtitleText}</p>
                    </div>
                }
            </a>
        </div>
    );
};
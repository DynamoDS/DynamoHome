import { useState } from 'react';
import ModalItem from './ModalItem'; // Import your Modal component
import { Tooltip } from '../Common/Tooltip';
import styles from './VideoCarouselItem.module.css';

export function VideoCarouselItem({ id, title, videoId, description }: VideoCarouselItem) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`; // Added autoplay query parameter
    const tooltip = <div>
        <strong>{title}</strong>
        <br/><br/>
        {description}
    </div>;

    const handleVideoClick = () => {
        setIsModalOpen(true); // Open the modal on click
    };

    return (
        <div className={styles['video-container']}>
            <div className={styles['clipped-video-container']} onClick={handleVideoClick}>
                { !isModalOpen && <div className={styles['video-overlay']} /> }
                <iframe 
                    src={youtubeEmbedUrl}
                    className={styles['clipped-video']}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                </iframe>
            </div>
            <ModalItem isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <iframe 
                    src={youtubeEmbedUrl}
                    className={styles['expanded-video']}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                </iframe>
            </ModalItem>
            <div className={styles['custom-video-container']}>
                <p className={`${styles['video-item-title-text']} ${styles['video-card-text-item']}`}>{title}</p>
                <Tooltip verticalOffset={20} content={tooltip}>
                    <p className={`${styles['video-item-subtitle-text']} ${styles['video-card-text-item']}`}>
                        {description}
                    </p>
                </Tooltip>
            </div>
        </div>
    );
}
import { useState, useEffect } from 'react';
import { VideoCarouselItem } from './VideoCarouselItem';
import { Carousel } from "./Carousel";
import { GuideGridItem } from "./GuideGridItem";
import { FormattedMessage } from 'react-intl';

export function LearningPage(){
    // Set a placeholder for the guides, and videos which will be used differently during dev and prod 
    let initialGuides: Guide[] = [];
    let initialVideos: VideoCarouselItem[] = [];

    // If we are under development, we will load the graphs from the local asset folder
    if (process.env.NODE_ENV === 'development') {
        initialGuides = require('../../assets/learning').guides;
        initialVideos = require('../../assets/learning').videos;
    }

    const [guides, setGuides] = useState<Guide[]>(initialGuides);    
    const [videos, setVideos] = useState<VideoCarouselItem[]>(initialVideos);    

    // A method exposed to the backend used to set the interactive guides data coming from Dynamo
    const receiveInteractiveGuidesDataFromDotNet = (jsonData: any) => {
        try {
            // jsonData is already an object, so no need to parse it
            const data = jsonData;
            setGuides(data);
        } catch (error) {
            console.error('Error processing guides data:', error);
        }
    };

    // A method exposed to the backend used to set the training video data coming from Dynamo
    const receiveTrainingVideoDataFromDotNet = (jsonData) => {
        try {
            // jsonData is already an object, so no need to parse it
            const data = jsonData;
            setVideos(data);
        } catch (error) {
            console.error('Error processing videos data:', error);
        }
    };

    useEffect(() => {
        // If we are under production, we will override the graphs with the actual data sent from Dynamo
        if (process.env.NODE_ENV !== 'development') {
            window.receiveInteractiveGuidesDataFromDotNet = receiveInteractiveGuidesDataFromDotNet;
            window.receiveTrainingVideoDataFromDotNet = receiveTrainingVideoDataFromDotNet;
        }

        // Cleanup function (optional)
        return () => {
            if (process.env.NODE_ENV !== 'development') {
                delete window.receiveInteractiveGuidesDataFromDotNet;
                delete window.receiveTrainingVideoDataFromDotNet;
            }
        };
    }, []); 

    return(
        <div>
            <div className='drop-shadow-2xl'>
                <p className='title-paragraph'><FormattedMessage id="learning.title.text.learning" /></p>  
            </div>
            <div>
                <div className='drop-shadow-2xl'>
                    <p className='title-paragraph'><FormattedMessage id="learning.title.text.guides" /></p>  
                </div>
                <div className="guides-graph-grid" id="guidesContainer">
                    {guides.map(guide => (
                        <GuideGridItem key={guide.id} {...guide} />
                    ))}
                </div>
            </div>
            <br/>
            <div>
                <div className='drop-shadow-2xl'>
                    <p className='title-paragraph'><FormattedMessage id="learning.title.text.videos" /></p>  
                </div>
                <Carousel>
                    {videos.map(video => (
                        <div className="video-container" key={video.id}>
                            <VideoCarouselItem {...video} />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}
import { useState, useEffect } from 'react';
import { VideoCarouselItem } from './VideoCarouselItem';
import { videos } from '../../assets/learning';
import { Carousel } from "./Carousel";
import { GuideGridItem } from "./GuideGridItem";
import { FormattedMessage } from 'react-intl';

export function LearningPage(){
    // Set a placeholder for the guides which will be used differently during dev and prod 
    let initialGuides: Guide[] = [];

    // If we are under development, we will load the graphs from the local asset folder
    if (process.env.NODE_ENV === 'development') {
        initialGuides = require('../../assets/learning').guides;
    }

    const [guides, setGuides] = useState(initialGuides);    

    // A method exposed to the backend used to set the interactive guides data coming from Dynamo
    const receiveInteractiveGuidesDataFromDotNet = (jsonData: any) => {
        try {
            // jsonData is already an object, so no need to parse it
            const data = jsonData;
            setGuides(data);
        } catch (error) {
            console.error('Error processing data:', error);
        }
    };

    useEffect(() => {
        // If we are under production, we will override the graphs with the actual data sent from Dynamo
        if (process.env.NODE_ENV !== 'development') {
            window.receiveInteractiveGuidesDataFromDotNet = receiveInteractiveGuidesDataFromDotNet;
        }


        // Cleanup function (optional)
        return () => {
            if (process.env.NODE_ENV !== 'development') {
                delete window.receiveInteractiveGuidesDataFromDotNet;
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
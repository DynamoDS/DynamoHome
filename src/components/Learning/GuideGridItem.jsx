import React from 'react';
import { img } from '../../assets/home.js';
import { startGuidedTour } from '../../functions/utility';
import { CardItem } from '../Common/CardItem.jsx';

export function GuideGridItem({ id, Name, Description, Type, Thumbnail }) {
    const triggerStartGuidedTourCommand = () => {
        startGuidedTour(Type);
    };

    return (
        <CardItem 
            imageSrc={Thumbnail || img} 
            onClick={triggerStartGuidedTourCommand} 
            tooltipContent={Description} 
            titleText={Name} 
            subtitleText={Description} 
        />
    );
}
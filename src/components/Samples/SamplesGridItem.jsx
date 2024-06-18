import React from 'react';
import { img } from '../../assets/home.js';
import { openFile } from '../../functions/utility.js';
import { CardItem } from '../Common/CardItem.jsx';

export function SamplesGridItem({ FileName, FilePath, Description, DateModified, Thumbnail }) {
    const handleClick = (e) => {
        e.preventDefault();
        openFile(FilePath);
    };

    console.log(Description);

    return (
        <CardItem 
            imageSrc={Thumbnail || img} 
            onClick={handleClick} 
            tooltipContent={Description} 
            titleText={FileName} 
            subtitleText={DateModified} 
        />
    );
}


import React from 'react';
import { img } from '../../assets/home.js';
import { openFile } from '../../functions/utility.js';
import { CardItem } from '../Common/CardItem.jsx';

export function SamplesGridItem({ FileName, FilePath }) {
    const handleClick = (e) => {
        e.preventDefault();
        openFile(FilePath);
    };

    return (
        <CardItem 
            imageSrc={img} 
            onClick={handleClick} 
            tooltipContent={FilePath} 
            titleText={FileName} 
            subtitleText={FilePath} 
        />
    );
}
import { img } from '../../assets/home';
import { openFile } from '../../functions/utility';
import { CardItem } from '../Common/CardItem';

export const SamplesGridItem = ({ FileName, FilePath, Description, DateModified, Thumbnail }: Samples) => {
    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        openFile(FilePath);
    };

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


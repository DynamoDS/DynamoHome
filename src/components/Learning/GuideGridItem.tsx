import { img } from '../../assets/home';
import { startGuidedTour } from '../../functions/utility';
import { CardItem } from '../Common/CardItem';

export const GuideGridItem = ({ id, Name, Description, Type, Thumbnail }: Guide) => {
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
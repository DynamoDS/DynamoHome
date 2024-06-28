import { img } from '../../assets/home';
import { openFile } from '../../functions/utility';
import { CardItem } from '../Common/CardItem';

export const GraphGridItem = ({ id, Caption, ContextData, Description, DateModified, Thumbnail, setIsDisabled }: GraphItem) => {
    const handleClick = (e:MouseEvent) => {
        // freezes the UI 
        setIsDisabled(true);

        e.preventDefault();
        openFile(ContextData);
    };

    return (
        <CardItem 
            imageSrc={Thumbnail || img} 
            onClick={handleClick} 
            tooltipContent={Description} 
            titleText={Caption} 
            subtitleText={DateModified} 
        />
    );
}
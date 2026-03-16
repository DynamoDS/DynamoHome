import { getPlaceholderImage } from '../../functions/placeholder';
import { openFile } from '../../functions/utility';
import { CardItem } from '../Common/CardItem';
import { img } from '../../assets/home';

export const GraphGridItem = ({ id, Caption, ContextData, Description, DateModified, Thumbnail, setIsDisabled }: GraphItem) => {
    const handleClick = (e:MouseEvent) => {
        // freezes the UI 
        setIsDisabled(true);

        e.preventDefault();
        openFile(ContextData);
    };

    // Use placeholder if Thumbnail is empty, null, undefined, or the default img
    const hasCustomThumbnail = Thumbnail && Thumbnail !== img && Thumbnail.trim() !== '';
    const imageSrc = hasCustomThumbnail ? Thumbnail : getPlaceholderImage(ContextData);

    return (
        <CardItem 
            imageSrc={imageSrc} 
            onClick={handleClick} 
            tooltipContent={
                <>
                <div>{Caption}</div>
                <div>{ContextData}</div>
                <div>{Description}</div>
                </>
                } 
            titleText={Caption} 
            subtitleText={DateModified} 
        />
    );
};
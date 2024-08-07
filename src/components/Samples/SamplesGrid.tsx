import { SamplesGridItem } from "./SamplesGridItem";
import styles from './SamplesGrid.module.css';

const renderSample = (sample: Samples, keyPrefix: string | number) => {
    if (sample.Children && sample.Children.length > 0) {
        // Separate the children into leaf nodes and nested nodes
        const leafNodes = sample.Children.filter(child => !child.Children || child.Children.length === 0);
        const nestedNodes = sample.Children.filter(child => child.Children && child.Children.length > 0);

        return (
            <div key={keyPrefix} className={styles["sample-container"]}>
                <div className='drop-shadow-2xl'>
                    <p className='title-paragraph'>{sample.FileName}</p>
                </div>
                <div className={styles["graphs-grid"]}>
                    {leafNodes.map((child: Samples, index: number) => (
                        <SamplesGridItem key={child.FileName || index} 
                                         FileName={child.FileName} 
                                         FilePath={child.FilePath} 
                                         Thumbnail={child.Thumbnail} 
                                         Description={child.Description}
                                         DateModified={child.DateModified}/>
                    ))}
                </div>
                {nestedNodes.map((nested, nestedIndex) => renderSample(nested, nested.FileName || nestedIndex))}
            </div>
        );
    } else {
        // Render a SamplesGridItem for leaf nodes
        return (
            <div key={keyPrefix} className={styles["sample-container"]}>
                <div className={styles["graphs-grid"]}>
                    <SamplesGridItem key={keyPrefix} 
                                     FileName={sample.FileName} 
                                     FilePath={sample.FilePath} 
                                     Thumbnail={sample.Thumbnail} 
                                     Description={sample.Description}
                                     DateModified={sample.DateModified}/>
                </div>
            </div>
        );
    }
};

export const SamplesGrid = ({ data }:{ data: Samples[]}) => {
    const rootChildren = data[0]?.Children || [];
    return (
        <div id="samplesContainer">
            {rootChildren.map((sample: Samples, index) => renderSample(sample, sample.FileName || index))}
        </div>
    );
};
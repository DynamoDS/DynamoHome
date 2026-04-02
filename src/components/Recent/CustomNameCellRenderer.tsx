import { getPlaceholderImage } from '../../functions/placeholder';
import { Tooltip } from '../Common/Tooltip';
import styles from './CustomCellRenderer.module.css';
import cardStyles from '../Common/CardItems.module.css';
import { img } from '../../assets/home';


/**
 * Exports a custom cell renderer for the first column of the table view.
 * @param value - the name of the graph
 * @param row - the data associate with this row containing all the information for the graph
 */
export const CustomNameCellRenderer = ({ value, row }: CellParams) => {
  // Use placeholder if Thumbnail is empty, null, undefined, or the default img
  const thumbnail = row.original.Thumbnail;
  const hasCustomThumbnail = thumbnail && thumbnail !== img && thumbnail.trim() !== '';
  const imgSrc = hasCustomThumbnail ? thumbnail : getPlaceholderImage(row.original.ContextData);
  const description = row.original.Description;
  return (
    <div className={styles["title-cell"]}>
      <a className={`${styles['graph-link']} ${styles['row-img']}`}>
        <div className={`${cardStyles['clipped-image-container']} ${styles['row-img-container']}`}>
          <img src={imgSrc} className={cardStyles['clipped-image']} />
        </div>
      </a>
        <div>
          {description
            ? <Tooltip content={description}>{value}</Tooltip>
            : value
          }
        </div>
    </div>
  );
};

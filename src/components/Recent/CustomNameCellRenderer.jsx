import React from "react";
import { img } from '../../assets/home.js';
import { Tooltip } from '../Common/Tooltip.jsx';
import styles from './CustomCellRenderer.module.css';
import cardStyles from '../Common/CardItems.module.css';


/**
 * Exports a custom cell renderer for the first column of the table view.
 * @param value - the name of the graph
 * @param row - the data associate with this row containing all the information for the graph
 */
export const CustomNameCellRenderer = ({ value, row }) => {
  const imgSrc = row.original.thumbnail || img;
  const Caption = value;

  return (
    <div className={styles["title-cell"]}>
      <a className={`${styles['graph-link']} ${styles['row-img']}`}>
        <div className={`${cardStyles['clipped-image-container']} ${styles['row-img-container']}`}>
          <img src={imgSrc} className={cardStyles['clipped-image']} />
        </div>
      </a>
        <div>
          <Tooltip content={Caption}>
            {Caption}
          </Tooltip>
        </div>
    </div>
  );
};

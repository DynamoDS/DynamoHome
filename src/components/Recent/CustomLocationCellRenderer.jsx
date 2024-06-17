import React from "react";
import { Tooltip } from '../Common/Tooltip';
import styles from './CustomCellRenderer.module.css';

/**
 * Exports a custom cell renderer for the location column of the table view.
 * @param value - the location of the graph on the system
 */
export const CustomLocationCellRenderer = ({ value }) => {
  const Caption = value;

  return (
    <div className={styles["title-cell"]}>
        <div>
          <Tooltip content={Caption}>
            {Caption}
          </Tooltip>
        </div>
    </div>
  );
};

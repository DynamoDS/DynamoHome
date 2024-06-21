import React from "react";
import { Tooltip } from '../Common/Tooltip';
import styles from './CustomCellRenderer.module.css';

/**
 * Exports a custom cell renderer for the location column of the table view.
 * @param caption - the location of the graph on the system
 */
export const CustomLocationCellRenderer = ({ caption }: { caption: string }) => {

  return (
    <div className={styles["title-cell"]}>
        <div>
          <Tooltip content={caption}>
            {caption}
          </Tooltip>
        </div>
    </div>
  );
};

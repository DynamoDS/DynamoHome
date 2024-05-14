import React from "react";
import { FormattedMessage, useIntl } from 'react-intl';
import { Tooltip } from '../Common/Tooltip.jsx';
import { QuestionMarkIcon } from '../Common/CustomIcons.jsx';
import styles from './CustomCellRenderer.module.css';


/**
 * Exports a custom cell renderer for the author cell.
 * @param value - the name of the graph
 * @param row - the data associate with this row containing all the information for the graph
 */
export const CustomAuthorCellRenderer = ({ value, row }) => {
  const intl = useIntl();
  const author = value;
  const isOldFormat = author === intl.formatMessage({ id: 'recent.item.old.format' });

  return (
    <div className={styles["title-cell"]}>
        <p>{author}</p>
        {isOldFormat && 
            <Tooltip content={<FormattedMessage id="recent.item.old.format.tooltip" />}>
                <QuestionMarkIcon />
            </Tooltip>}
    </div>
  );
};

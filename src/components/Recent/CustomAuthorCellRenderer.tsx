import { FormattedMessage, useIntl } from 'react-intl';
import { Tooltip } from '../Common/Tooltip';
import { QuestionMarkIcon } from '../Common/CustomIcons';
import styles from './CustomCellRenderer.module.css';


/**
 * Exports a custom cell renderer for the author cell.
 * @param value - the name of the graph
 * @param row - the data associate with this row containing all the information for the graph
 */
export const CustomAuthorCellRenderer = ({ value }: CellParams) => {
  const intl = useIntl();
  const isOldFormat = value === intl.formatMessage({ id: 'recent.item.old.format' });

  return (
    <div className={styles["title-cell"]}>
        <p>{value}</p>
        {isOldFormat && 
            <Tooltip content={<FormattedMessage id="recent.item.old.format.tooltip" />}>
                <QuestionMarkIcon />
            </Tooltip>}
    </div>
  );
};

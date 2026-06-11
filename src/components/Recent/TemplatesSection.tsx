import { FormattedMessage } from 'react-intl';
import { GraphGridItem } from './GraphGridItem';
import { GraphTable } from './GraphTable';
import { GridViewIcon, ListViewIcon, QuestionMarkIcon } from '../Common/CustomIcons';
import { Tooltip } from '../Common/Tooltip';

type TemplateItem = Graph & {
  Author: string;
  Description: string;
};

interface TemplatesSectionProps {
  columns: Column[];
  templates: TemplateItem[];
  templatesViewMode: string;
  setTemplatesViewMode: (viewMode: string) => void;
  onRowClick: (row: Row) => void;
  setIsDisabled: (disable: boolean) => void;
}

export const TemplatesSection = ({
  columns,
  templates,
  templatesViewMode,
  setTemplatesViewMode,
  onRowClick,
  setIsDisabled,
}: TemplatesSectionProps) => {
  return (
    <>
      <div className='drop-shadow-2xl' style={{ display: 'flex', alignItems: 'center' }}>
        <p className='title-paragraph' style={{ display: 'inline-block', width: 'fit-content' }}>
          <FormattedMessage id="title.text.templates"/>
        </p>
        <Tooltip
          content={<FormattedMessage id="recent.templates.tooltip" />}
          position="right"
          tooltipClassName="template-info-tooltip">
          <QuestionMarkIcon />
        </Tooltip>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom:'10px' }}>
        <button
          className={`viewmode-button ${templatesViewMode === 'grid' ? 'active' : ''}`}
          onClick={() => setTemplatesViewMode('grid')}
          disabled={templatesViewMode === 'grid'}
          data-testid="templates-view-toggle-grid">
          <Tooltip content={<FormattedMessage id="tooltip.text.grid.view.button" />}>
            <GridViewIcon/>
          </Tooltip>
        </button>
        <button
          className={`viewmode-button ${templatesViewMode === 'list' ? 'active' : ''}`}
          onClick={() => setTemplatesViewMode('list')}
          disabled={templatesViewMode === 'list'}
          data-testid="templates-view-toggle-list">
          <Tooltip content={<FormattedMessage id="tooltip.text.list.view.button" />}>
            <ListViewIcon/>
          </Tooltip>
        </button>
      </div>
      <div style={{ marginRight: '20px', paddingBottom: '35px' }}>
        {templatesViewMode === 'list' && (
          <GraphTable columns={columns} data={templates} onRowClick={onRowClick}/>
        )}
        {templatesViewMode === 'grid' && (
          <div className="main-graph-grid" id="templatesContainer">
            {templates.map(template => (
              <GraphGridItem
                key={template.id}
                {...template}
                setIsDisabled={setIsDisabled}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

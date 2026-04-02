import React from "react";
import { useState, useEffect, useLayoutEffect } from 'react';
import { GraphGridItem } from './GraphGridItem';
import { CustomNameCellRenderer } from './CustomNameCellRenderer';
import { CustomLocationCellRenderer } from './CustomLocationCellRenderer';
import { CustomAuthorCellRenderer } from "./CustomAuthorCellRenderer";
import { GraphTable } from './GraphTable';
import { GridViewIcon, ListViewIcon, QuestionMarkIcon } from '../Common/CustomIcons';
import { openFile } from '../../functions/utility';
import { templateDateDisplay } from '../../functions/templateUtils';
import { FormattedMessage } from 'react-intl';
import { Tooltip } from '../Common/Tooltip';
import { useSettings } from '../SettingsContext';
import { useTemplates } from '../TemplatesContext';

export const RecentPage = ({ setIsDisabled, recentPageViewMode, templatesPageViewMode: templatesPageViewModeProp }: RecentPage) => {    
    const { updateAndSaveSettings } = useSettings();
    const [viewMode, setViewMode] = useState(recentPageViewMode); 
    const [templatesViewMode, setTemplatesViewMode] = useState(templatesPageViewModeProp);
    const [initialized, setInitialized] = useState<boolean>(false);

    // Set a placeholder for the graphs which will be used differently during dev and prod 
    let initialGraphs = [];
    
    // If we are under development, we will load the graphs from the local asset folder
    if (process.env.NODE_ENV === 'development') {
        initialGraphs = require('../../assets/home').graphs;
    }

    const [graphs, setGraphs] = useState(initialGraphs);

    // A method exposed to the backend used to set the graph data coming from Dynamo
    const receiveGraphDataFromDotNet = (jsonData) => {
        try {
          // jsonData is already an object, so no need to parse it
          const data = jsonData;
          setGraphs(data);
        } catch (error) {
          console.error('Error processing data:', error);
        }
    };

    // Get templates from context 
    const templates = useTemplates();

    useEffect(() => {
        // If we are under production, we will override the graphs with the actual data sent from Dynamo
        if (process.env.NODE_ENV !== 'development') {
            window.receiveGraphDataFromDotNet = receiveGraphDataFromDotNet;
        }

        // Cleanup function (optional)
        return () => {
            if (process.env.NODE_ENV !== 'development') {
                delete window.receiveGraphDataFromDotNet;
            }
        };
    }, []); 

    // Sync from context before paint so we do not flash the default grid while settings load.
    useLayoutEffect(() => {
        setViewMode(recentPageViewMode);
    }, [recentPageViewMode]);

    useLayoutEffect(() => {
        setTemplatesViewMode(templatesPageViewModeProp);
    }, [templatesPageViewModeProp]);

    // Persist when the user changes view mode (this effect only lists [viewMode] on purpose).
    // Do not add recentPageViewMode to the dependency array: when Dynamo loads saved settings, that
    // prop can change in a render before local viewMode state is updated, and saving here would
    // write the wrong mode (for example grid) to stored settings.
    useEffect(() => {
        if (initialized || recentPageViewMode !== viewMode) {
            setInitialized(true);
            updateAndSaveSettings({ recentPageViewMode: viewMode });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally only on viewMode; see above
    }, [viewMode]);

    // Same idea as recent graphs: persist when local mode differs from host-backed prop. Do not require
    // settings.templatesPageViewMode to exist first,  that blocked the first save when the key was missing.
    useEffect(() => {
        if (templatesViewMode !== templatesPageViewModeProp) {
            updateAndSaveSettings({ templatesPageViewMode: templatesViewMode });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- only persist on local toggle; see recent graphs effect
    }, [templatesViewMode]);

    // This variable defins the table structure displaying the graphs
    const columns: Column[] = React.useMemo(() => [
        {
          Header: 'Title',
          accessor: 'Caption',
          width: 300,
          resizable: true, 
          Cell: CustomNameCellRenderer,
        },
        {
          Header: 'Author',
          accessor: 'Author',
          resizable: true,
          Cell: CustomAuthorCellRenderer,
        },
        {
          Header: 'Date Modified',
          accessor: 'DateModified',
          resizable: true,
        },
        {
          Header: 'Location',
          accessor: 'ContextData',
          resizable: true,
          Cell: CustomLocationCellRenderer,
        }
      ], []);

    // Handles mouse click over each row (Recent and Templates list views share the same behaviour)
    const handleRowClick = (row: Row) => {
        // freezes the UI   
        setIsDisabled(true);   
        
        const contextData = row.original.ContextData;  
        openFile(contextData);
    };

    // Map templates to match Graph structure for table view (DateModified column;'date'required on Graph)
    const templatesForTable = templates.map(template => ({
        ...template,
        date: template.date || templateDateDisplay(template),
        DateModified: templateDateDisplay(template),
        Author: template.Author || '',
        Description: template.Description || ''
    }));

    return(
        <div>
            {/* Recent Section */}
            <div className='drop-shadow-2xl'>
                <p className='title-paragraph'><FormattedMessage id="title.text.recent"/></p>  
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom:"10px" }}>
                <button 
                    className={`viewmode-button ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    disabled={viewMode === 'grid'}>
                    <Tooltip content={<FormattedMessage id="tooltip.text.grid.view.button" />}>
                            <GridViewIcon/>
                    </Tooltip>
                </button>
                <button 
                    className={`viewmode-button ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                    disabled={viewMode === 'list'}>
                    <Tooltip content={<FormattedMessage id="tooltip.text.list.view.button" />}>
                        <ListViewIcon/>
                    </Tooltip>
                </button>
            </div>
            <div style={{ marginRight: "20px", paddingBottom: "35px" }}>
                {viewMode === 'list' && (
                    <GraphTable columns={columns} data={graphs} onRowClick={handleRowClick}/>
                )}                
                {viewMode === 'grid' && (
                    <div className="main-graph-grid" id="graphContainer">
                        {graphs.map(graph => (
                            <GraphGridItem key={graph.id} {...graph} setIsDisabled={setIsDisabled} />
                        ))}
                    </div>
                )}
            </div>

            {/* Templates Section */}
            <div className='drop-shadow-2xl' style={{ display: 'flex', alignItems: 'center' }}>
                <p className='title-paragraph' style={{ display: 'inline-block', width: 'fit-content' }}>
                    <FormattedMessage id="title.text.templates"/>
                </p>
                <Tooltip content={<FormattedMessage id="tooltip.text.templates" />} position="right">
                    <QuestionMarkIcon />
                </Tooltip>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom:"10px" }}>
                <button 
                    className={`viewmode-button ${templatesViewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setTemplatesViewMode('grid')}
                    disabled={templatesViewMode === 'grid'}>
                    <Tooltip content={<FormattedMessage id="tooltip.text.grid.view.button" />}>
                            <GridViewIcon/>
                    </Tooltip>
                </button>
                <button 
                    className={`viewmode-button ${templatesViewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setTemplatesViewMode('list')}
                    disabled={templatesViewMode === 'list'}>
                    <Tooltip content={<FormattedMessage id="tooltip.text.list.view.button" />}>
                        <ListViewIcon/>
                    </Tooltip>
                </button>
            </div>
            <div style={{ marginRight: "20px", paddingBottom: "35px" }}>
                {templatesViewMode === 'list' && (
                    <GraphTable columns={columns} data={templatesForTable} onRowClick={handleRowClick}/>
                )}                
                {templatesViewMode === 'grid' && (
                    <div className="main-graph-grid" id="templatesContainer">
                        {templates.map(template => (
                            <GraphGridItem 
                                key={template.id} 
                                {...template} 
                                DateModified={templateDateDisplay(template)}
                                Description={template.Description || ''}
                                setIsDisabled={setIsDisabled} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
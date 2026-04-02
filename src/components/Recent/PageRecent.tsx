import React from "react";
import { useState, useEffect } from 'react';
import { GraphGridItem } from './GraphGridItem';
import { CustomNameCellRenderer } from './CustomNameCellRenderer';
import { CustomLocationCellRenderer } from './CustomLocationCellRenderer';
import { CustomAuthorCellRenderer } from "./CustomAuthorCellRenderer";
import { GraphTable } from './GraphTable';
import { GridViewIcon, ListViewIcon } from '../Common/CustomIcons';
import { openFile, saveHomePageSettings } from '../../functions/utility';
import { FormattedMessage } from 'react-intl';
import { Tooltip } from '../Common/Tooltip';
import { useSettings } from '../SettingsContext';

export const RecentPage = ({ setIsDisabled, recentPageViewMode }: RecentPage) => {    
    const { settings, updateSettings } = useSettings();
    const [viewMode, setViewMode] = useState(recentPageViewMode); 
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

    useEffect(() => {
        // Set the viewMode based on the HomePage preferences
        setViewMode(recentPageViewMode);
    }, [recentPageViewMode]); 

    useEffect(() => {
        if (initialized || recentPageViewMode !== viewMode) {
            setInitialized(true);
            updateSettings({ recentPageViewMode: viewMode });
            
            // Send settings to Dynamo to save
            saveHomePageSettings({ ...settings, recentPageViewMode: viewMode });
        } 
    }, [viewMode]);

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

    // Handles mouse click over each row
    const handleRowClick = (row: Row) => {
        // freezes the UI   
        setIsDisabled(true);   
        
        const contextData = row.original.ContextData;  
        openFile(contextData);
    };

    return(
        <div>
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
        </div>
    )
}
import { useState } from 'react';
import { MainContent } from './MainContent';
import { Sidebar } from './Sidebar/Sidebar';
import SplitPane from 'react-split-pane';

export const LayoutContainer = ({id}:{id?:string}) => {
    // State to track the selected sidebar item
    const sideBarWidth = 300;
    const [selectedSidebarItem, setSelectedSidebarItem] = useState<SidebarItem>('Recent');

    // Event handler for sidebar item click
    const handleSidebarItemClick = (item: SidebarItem) => {
        setSelectedSidebarItem(item);
    }
    
    return (
        <div className='main-container'>
          <div className='main-flex-container'>

            <SplitPane 
              className='split-pane'
              split="vertical"
              minSize={50}
              maxSize={600}
              defaultSize={sideBarWidth}>

              {/* Sidebar */}
              <Sidebar 
                onItemSelect={handleSidebarItemClick}
                selectedSidebarItem={selectedSidebarItem}
              />
              
              {/* Main Body */}
              <MainContent selectedSidebarItem={selectedSidebarItem}/>
              
            </SplitPane>
          </div>
        </div>
    )
}

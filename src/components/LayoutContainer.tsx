import { useEffect, useState } from 'react';
import { MainContent } from './MainContent';
import { Sidebar } from './Sidebar/Sidebar';
import SplitPane from 'react-split-pane';
import { useSettings } from './SettingsContext';
import { saveHomePageSettings } from '../functions/utility';

export const LayoutContainer = ({ id }: { id?: string }) => {
  const defaultMinSize = 250;
  const defaultMaxSize = 500;
  const defaultBarWidth = 300;

  const { settings, updateSettings } = useSettings();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [selectedSidebarItem, setSelectedSidebarItem] = useState<SidebarItem>('Recent');
  const [sideBarWidth, setSideBarWidth] = useState<number | null>(null);

  const setShowStartPageChanged = (showStartPage: boolean) => {
    setIsDisabled(!showStartPage);
  };

  // Event handler for sidebar item click
  const handleSidebarItemClick = (item: SidebarItem) => {
    setSelectedSidebarItem(item);
  };

  // Event handler for sidebar drag resize
  const handleSplitPaneResize = (size: number) => {
    setSideBarWidth(size);

    // Persist the new sidebar width in settings
    updateSettings({ sideBarWidth: size.toString() });
  };

  useEffect(() => {
    if (settings?.sideBarWidth) {
      setSideBarWidth(parseInt(settings.sideBarWidth, 10));
    } else {
      setSideBarWidth(defaultBarWidth);
    }
  }, [settings?.sideBarWidth]);

  useEffect(() => {
    if (sideBarWidth !== null && settings) {
      saveHomePageSettings({ ...settings, sideBarWidth: sideBarWidth.toString() });
    }
  }, [sideBarWidth]);

  const setHomePageSettings = (settingsJson: string) => {
    try {
      if (settingsJson) {
        const settingsObject = JSON.parse(settingsJson);
        updateSettings(settingsObject);
      } else {
        console.log(`Received null or empty settings`);
      }
    } catch (exception) {
      console.log(`Failed to set the HomePage settings with the following error ${exception}`);
    }
  };

  useEffect(() => {
    // Set global functions
    window.setShowStartPageChanged = setShowStartPageChanged;
    window.setHomePageSettings = setHomePageSettings;

    return () => {
      delete window.setShowStartPageChanged;
      delete window.setHomePageSettings;
    };
  }, [isDisabled, settings]);

  const parseOrDefault = (value: string | undefined, defaultValue: number) => {
    const parsed = parseInt(value ?? '', 10);
    return Number.isNaN(parsed) ? defaultValue : parsed;
  };

  return (
    <div className="main-container">
      <div className="main-flex-container">
        <SplitPane
          className="split-pane"
          split="vertical"
          minSize={defaultMinSize}
          maxSize={defaultMaxSize}
          defaultSize={parseOrDefault(settings?.sideBarWidth, defaultBarWidth)}
          onDragFinished={handleSplitPaneResize}
        >
          {/* Sidebar */}
          <Sidebar
            onItemSelect={handleSidebarItemClick}
            selectedSidebarItem={selectedSidebarItem}
          />

          {/* Main Body */}
          <MainContent
            selectedSidebarItem={selectedSidebarItem}
            settings={settings}
            isDisabled={isDisabled}
            setIsDisabled={setIsDisabled}
          />
        </SplitPane>
      </div>
    </div>
  );
};

import { useState, useEffect } from 'react';
import { RecentPage } from './Recent/PageRecent';
import { SamplesPage } from './Samples/PageSamples';
import { LearningPage } from './Learning/PageLearning';
import { FormattedMessage } from 'react-intl';

export const MainContent = ({ selectedSidebarItem }) => {
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [settings, setSettings] = useState<HomePageSetting | null>(null);

    const setShowStartPageChanged = (showStartPage: boolean) => {
        setIsDisabled(!showStartPage);
    };

    const setHomePageSettings = (settingsJson: string) => {
        try {
            if (settingsJson) {
                const settingsObject = JSON.parse(settingsJson);
                setSettings(settingsObject);
            } else {
                console.log(`Received null or empty settings`);
            }
        } catch (exception) {
            console.log(`Failed to set the HomePage settings with the following error ${exception}`);
        }
    }

    useEffect(() => {
        // Set global functions
        window.setShowStartPageChanged = setShowStartPageChanged;
        window.setHomePageSettings = setHomePageSettings;

        return () => {
            delete window.setShowStartPageChanged;
            delete window.setHomePageSettings;
        };
    }, [isDisabled, settings]);

    return (
        <>
            <div className={`main-body-container`}>
                {isDisabled && (
                    <div className="loading-overlay">
                        <div className="spinner"></div>
                        <div className="loading-text"><FormattedMessage id="main.page.loading.text" /></div>
                    </div>
                )}

                <div className={`page-container ${selectedSidebarItem === 'Recent' ? '' : 'hidden'}`}>
                    <RecentPage setIsDisabled={setIsDisabled} recentPageViewMode={settings?.recentPageViewMode || "grid"} />
                </div>
                <div className={`page-container ${selectedSidebarItem === 'Samples' ? '' : 'hidden'}`}>
                    <SamplesPage samplesViewMode={settings?.samplesViewMode || "grid"} />
                </div>
                <div className={`page-container ${selectedSidebarItem === 'Learning' ? '' : 'hidden'}`}>
                    <LearningPage />
                </div>
            </div>
        </>
    )
}
import React, { useState, useEffect } from 'react';
import { RecentPage } from './Recent/PageRecent.jsx';
import { SamplesPage } from './Samples/PageSamples.jsx';
import { LearningPage } from './Learning/PageLearning.jsx';
import { FormattedMessage } from 'react-intl';

export function MainContent({ selectedSidebarItem }){
    const [isDisabled, setIsDisabled] = useState(false);
    const [settings, setSettings] = useState(null);

    const setShowStartPageChanged = (showStartPage) => {
        setIsDisabled(!showStartPage);
    };

    const setHomePageSettings = (settingsJson) => {
        try{
            if (settingsJson) {
                const settingsObject = JSON.parse(settingsJson);
                setSettings(settingsObject);
            } else {
                console.log(`Received null or empty settings`);
            }
        }catch(exeption){
            console.log($`Failed to set the HomePage settings with the following error ${exception}`);
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
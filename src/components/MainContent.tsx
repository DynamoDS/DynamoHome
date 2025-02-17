import { useState, useEffect } from 'react';
import { RecentPage } from './Recent/PageRecent';
import { SamplesPage } from './Samples/PageSamples';
import { LearningPage } from './Learning/PageLearning';
import { FormattedMessage } from 'react-intl';

export const MainContent = ({ selectedSidebarItem, settings, isDisabled, setIsDisabled }: MainContentProps) => {

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
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { CustomDropdown } from './CustomDropDown.jsx';
import { FormattedMessage } from 'react-intl';
import { Tooltip } from '../Common/Tooltip.jsx';
import { sideBarCommand } from '../../functions/utility.js';
import styles from './Sidebar.module.css';

export function Sidebar({ onItemSelect, selectedSidebarItem })
{
    const [selectedFile, setSelectedFile] = useState('');
    const [selectedNew, setSelectedNew] = useState('');

    const isSelected = (item) => selectedSidebarItem === item;

    /**Trigger the backend command based on the drop-down value */ 
    const setSelectedValue = (value) => {
        sideBarCommand(value);
    };

    return (
        
        <div className={'sidebar-container'}>
            <div className={styles['sidebar-grid-container']}>
                <div className={styles.cell}>
                    <p className={styles['dynamo-logo']}>Dynamo</p>
                    {/* Files Dropdown */}
                    <CustomDropdown 
                        id="openDropdown"
                        selectedValue={selectedFile}
                        onSelect={setSelectedFile}
                        placeholder={<FormattedMessage id="button.title.text.open" />}
                        onSelectionChange={setSelectedValue}
                        options={[
                            { label: <FormattedMessage id="button.title.text.open.file" />, value: 'open-file' },
                            { label: <FormattedMessage id="button.title.text.open.template" />, value: 'open-template' },
                            { label: <FormattedMessage id="button.title.text.backup.locations" />, value: 'open-backup-locations' }
                        ]}
                    />

                    {/* New Dropdown */}
                    <CustomDropdown 
                        id="newDropdown"
                        selectedValue={selectedNew}
                        onSelect={setSelectedNew}
                        placeholder={<FormattedMessage id="button.title.text.new" />}
                        onSelectionChange={setSelectedValue}
                        options={[
                            { label: <FormattedMessage id="button.title.text.workspace" />, value: 'workspace' },
                            { label: <FormattedMessage id="button.title.text.custom.node" />, value: 'custom-node' }
                        ]}
                    />

                    <div className={styles['sidebar-items-container']}>
                        <div className={`${styles['sidebar-link-container']} ${isSelected('Recent') ? styles.selected : ''}`} onClick={() => onItemSelect('Recent')}>
                            <Tooltip content={<FormattedMessage id="tooltip.text.recent" />}>  
                                <span className={styles['sidebar-text']}>
                                    <FormattedMessage id="title.text.recent" />
                                </span>
                            </Tooltip>
                        </div>
                        <div className={`${styles['sidebar-link-container']} ${isSelected('Samples') ? styles.selected : ''}`} onClick={() => onItemSelect('Samples')}>
                            <Tooltip content={<FormattedMessage id="tooltip.text.samples" />}>  
                                <span className={styles['sidebar-text']}>
                                    <FormattedMessage id="title.text.samples" />
                                </span>
                            </Tooltip>
                        </div>
                        <div className={`${styles['sidebar-link-container']} ${isSelected('Learning') ? styles.selected : ''}`} onClick={() => onItemSelect('Learning')}>
                            <Tooltip content={<FormattedMessage id="tooltip.text.learning" />}>  
                                <span className={styles['sidebar-text']}>
                                    <FormattedMessage id="title.text.learning" />
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div className={styles.cell}>
                    <hr className={styles.separator}/>
                </div>
                <div className={`${styles['link-container']} ${styles.cell}`}>
                    <a className={styles['sidebar-link']} target="_blank" rel="noopener noreferrer" href="https://forum.dynamobim.com/">Discussion Forum</a>
                    <a className={styles['sidebar-link']} target="_blank" rel="noopener noreferrer" href="https://dynamobim.org/">Dynamo Website</a>
                    <a className={styles['sidebar-link']} target="_blank" rel="noopener noreferrer" href="https://primer2.dynamobim.org/">Dynamo Primer</a>
                    <a className={styles['sidebar-link']} target="_blank" rel="noopener noreferrer" href="https://github.com/dynamods">Github Repository</a>
                    <a className={styles['sidebar-link']} target="_blank" rel="noopener noreferrer" href="https://github.com/DynamoDS/Dynamo/issues">Send Issues</a>
                </div>
            </div>
        </div>
    )
}
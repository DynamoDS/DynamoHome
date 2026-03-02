import { CustomDropdown } from './CustomDropDown';
import { FormattedMessage } from 'react-intl';
import { Tooltip } from '../Common/Tooltip';
import { openFile, sideBarCommand, newWorkspaceWithTemplate } from '../../functions/utility';
import { useTemplates } from '../TemplatesContext';
import styles from './Sidebar.module.css';

export const Sidebar = ({ onItemSelect, selectedSidebarItem }: Sidebar) => {
    const isSelected = (item: string) => selectedSidebarItem === item;
    
    // Get templates from context 
    const realTemplates = useTemplates();
    
    // Hardcoded template options (just for UI display)
    const templateOptions: option[] = [
        { label: 'Template 1', value: 'sidebar-template-1', kind: 'item' as const },
        { label: 'Template 2', value: 'sidebar-template-2', kind: 'item' as const },
    ];
    const newDropdownOptions: option[] = [
        { label: <FormattedMessage id="button.title.text.workspace" />, value: 'workspace', kind: 'item' as const },
        { label: <FormattedMessage id="button.title.text.custom.node" />, value: 'custom-node', kind: 'item' as const },
        ...(templateOptions.length
            ? [
                { label: '', value: 'divider-templates', kind: 'divider' as const },
                { label: 'Templates', value: 'templates-header', kind: 'header' as const },
                ...templateOptions
            ]
            : [])
    ];

    /**Trigger the backend command based on the drop-down value */ 
    const setSelectedValue = (value: string) => {
        if (
            value === 'open-file' ||
            value === 'open-template' ||
            value === 'open-backup-locations' ||
            value === 'workspace' ||
            value === 'custom-node'
        ) {
            sideBarCommand(value);
            return;
        }

        // Handle template selections by filename pattern (order-independent)
        if (value === 'sidebar-template-1') {
            // Template 1 = Template_00_HowToCreateADynamoGraph.dyn
            const template00 = realTemplates.find(t => 
                (t?.ContextData || '').includes('Template_00_')
            );
            if (template00?.ContextData) {
                newWorkspaceWithTemplate(template00.ContextData);
            } else {
                console.error('Template_00_ not found. Templates not loaded yet or missing.');
            }
            return;
        }

        if (value === 'sidebar-template-2') {
            // Template 2 = Template_01_DynamoWorkflowImportExport.dyn
            const template01 = realTemplates.find(t => 
                (t?.ContextData || '').includes('Template_01_')
            );
            if (template01?.ContextData) {
                newWorkspaceWithTemplate(template01.ContextData);
            } else {
                console.error('Template_01_ not found. Templates not loaded yet or missing.');
            }
            return;
        }

        // Not a template, try opening as file
        openFile(value);
    };

    return (
        
        <div className={'sidebar-container'}>
            <div className={styles['sidebar-grid-container']}>
                <div className={styles.cell}>
                    <p className={styles['dynamo-logo']}>Dynamo</p>
                    {/* Files Dropdown */}
                    <CustomDropdown 
                        id="openDropdown"
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
                        placeholder={<FormattedMessage id="button.title.text.new" />}
                        onSelectionChange={setSelectedValue}
                        options={newDropdownOptions}
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
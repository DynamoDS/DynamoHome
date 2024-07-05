declare module 'react-split-pane';
declare module 'react-table';

declare module "*.module.css";
type Locale = 'en' | 'en-US' | 'es-ES' | 'de-DE' | 'cs-CZ' | 'fr-FR' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'pl-PL' | 'pt-BR' | 'ru-RU' | 'zh-Hans' | 'zh-Hant' | 'zh-CN' | 'zh-TW';
type SidebarCommand = 'open-file' | 'open-template' | 'open-backup-locations' | 'workspace' | 'custom-node';
type SidebarItem = 'Recent' | 'Samples' | 'Learning';
type HomePageSetting = { recentPageViewMode: 'grid' | 'list' | undefined, samplesViewMode: 'grid' | 'list' | undefined }
interface Window {
  setLocale: (value: Locale) => void;
  setShowStartPageChanged?: (showStartPage: boolean) => void;
  setHomePageSettings?: (settingsJson: any) => void;
  receiveInteractiveGuidesDataFromDotNet: (jsonData: any) => void;
  receiveGraphDataFromDotNet: (jsonData: any) => void;
  receiveSamplesDataFromDotNet: (jsonData: any) => void;
  receiveTrainingVideoDataFromDotNet: (jsonData: any) => void;
  chrome?: {
    webview?: any;
  };
}

type Cell = {
  getCellProps: (props?: {}) => {};
  render: (type: string) => JSX.Element | null;
}

type Direction = 'right' | 'left';
type Arrow = {
  isOpen: boolean;
  direction?: Direction;
  color?: string;
}

type AuthorCell = {
  value: string;
  row?: any;
}

type CardItem = {
  imageSrc: string;
  onClick: (e) => void;
  tooltipContent: JSX.Element | null | string;
  titleText: string;
  subtitleText: string;
}

type option = {
  label: JSX.Element | null | string;
  value: string;
}

type Dropdown = {
  id: string;
  options: option[];
  placeholder: JSX.Element | null | string;
  onSelectionChange: (value: string) => void
}

type GraphItem = {
  id: string;
  Caption: string;
  ContextData: string;
  Description: string;
  DateModified: string;
  Thumbnail: string;
  setIsDisabled: (disable: boolean) => void;
}

type Graph = {
  id: string;
  date: string;
  Caption: string;
  ContextData: string;
  Thumbnail: string;
}

type GraphTable = {
  columns: Column[];
  data: Graph[]; 
  onRowClick: (row: Row) => void; 
}

type Guide = {
  id: string;
  Name: string;
  Description: string;
  Type: 'test' | '';
  Thumbnail?: string;
}


type ModalItem = {
  isOpen?: boolean;
  onClose?: () => void;
  children: JSX.Element | null;
}

type CellParams = {
  value: string;
  row: {
    original: {
      Thumbnail?: string;
      Description: string;
    }
  }
}

type Samples = {
  FileName: string;
  FilePath: string;
  Description: string;
  DateModified: string;
  Thumbnail: string;
  Children?: Samples[];
}

type SamplesTable = {
  columns: any;
  data: Samples;
  onRowClick: (row: Row) => void;
  onCollapsedRowsChange: (collapsedRows: {}) => void;
}

type Original = {
  id: string;
  parentId?: string;
  isParent: boolean;
  ContextData: string;
  depth: number;
}

type Row = {
  original: Original;
  cells: [];
  getRowProps: (props: RowProps) => RowProps;
  FilePath?: string;
}

type RowProps = {
  style: {
    cursor: 'pointer' | 'default'
  };
  onClick?: () => void;
}

type CollapsedRow = { [id: string]: boolean };

type Column = {
  Header: 'Title' | 'Author' | 'Date Modified' | 'Location';
  accessor: 'Caption' | 'Author' | 'DateModified' | 'ContextData';
  width?: number;
  resizable: boolean;
  Cell?: (params: CellParams) => JSX.Element | null,
}

type CustomSampleCellRenderer = {
  value: string;
  row: Row;
  rows: Row[]
  rowIndex: number;
  collapsedRows: CollapsedRow;
}

type Sidebar = {
  onItemSelect: (item: SidebarItem) => void;
  selectedSidebarItem: SidebarItem;
}

type VideoCarouselItem = {
  id: string;
  title: string;
  videoId: string;
  description: string;
}

type RecentPage = { setIsDisabled: (disable: boolean) => void, recentPageViewMode: string }

type Tooltip = {
  children: JSX.Element | null | string;
  content?: JSX.Element | null | string;
  verticalOffset?: number;
}
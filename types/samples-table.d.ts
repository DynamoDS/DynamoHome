type Samples = {
  FileName: string;
  FilePath: string;
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
  onClick: () => void | undefined;
}

type CollapsedRow = { [id: string]: string } | {};

type CustomSampleCellRenderer = {
  value: string;
  row: Row;
  rows: Row[]
  rowIndex: number;
  collapsedRows: CollapsedRow;
}
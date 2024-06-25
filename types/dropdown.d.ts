type option = {
  label: any;
  value: string;
}

type Dropdown = {
  id: string;
  options: option[];
  placeholder: any;
  onSelectionChange: (value: string) => void
}

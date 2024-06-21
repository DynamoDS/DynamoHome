type GraphItem = {
  id: string;
  Caption: string;
  ContextData: any;
  Description: string;
  DateModified: string;
  Thumbnail: string;
  setIsDisabled: (disable: boolean) => void;
}
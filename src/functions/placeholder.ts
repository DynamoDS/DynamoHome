import { img, placeholderDyn, placeholderDyf, placeholderDyt } from '../assets/home';

export const getPlaceholderImage = (filePath: string): string => {
  if (!filePath) return img; // fallback if no path
  
  const extension = filePath.toLowerCase().split('.').pop();
  
  switch (extension) {
    case 'dyn':
      return placeholderDyn;
    case 'dyf':
      return placeholderDyf;
    case 'dyt':
      return placeholderDyt;
    default:
      return img; // fallback for unknown types
  }
};
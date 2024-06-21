
type ModalItem = {
  isOpen?: boolean;
  onClose?: ()=> void;
  children: ReactNode;
}
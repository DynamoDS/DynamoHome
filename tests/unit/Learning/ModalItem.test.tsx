import { render, screen, fireEvent } from '@testing-library/react';
import ModalItem from '../../../src/components/Learning/ModalItem';

describe('ModalItem', () => {
  beforeEach(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    document.getElementById('modal-root')?.remove();
  });

  it('renders nothing when isOpen=false', () => {
    render(<ModalItem isOpen={false} onClose={jest.fn()}><div>Modal Content</div></ModalItem>);
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('renders children in the portal when isOpen=true', () => {
    render(<ModalItem isOpen={true} onClose={jest.fn()}><div>Modal Content</div></ModalItem>);
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('renders a close button when isOpen=true', () => {
    render(<ModalItem isOpen={true} onClose={jest.fn()}><div>Content</div></ModalItem>);
    const closeBtn = screen.getByRole('button', { name: /close/i });
    expect(closeBtn).toBeInTheDocument();
  });

  it('clicking the close button calls onClose', () => {
    const onClose = jest.fn();
    render(<ModalItem isOpen={true} onClose={onClose}><div>Content</div></ModalItem>);
    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });

  it('clicking the overlay calls onClose', () => {
    const onClose = jest.fn();
    render(
      <ModalItem isOpen={true} onClose={onClose}><div>Content</div></ModalItem>
    );
    // The portal renders: <overlay-div /><modal-div>...</modal-div>
    // The overlay is the first element child of modal-root (empty div with onClick)
    const modalRoot = document.getElementById('modal-root')!;
    const overlay = modalRoot.firstElementChild as HTMLElement;
    expect(overlay).toBeTruthy();
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });

  it('renders children in modal-root portal, not in component container', () => {
    const { container } = render(
      <ModalItem isOpen={true} onClose={jest.fn()}><div>Portal Content</div></ModalItem>
    );
    // Content should be in modal-root, not in the direct component container
    expect(container.textContent).not.toContain('Portal Content');
    expect(document.getElementById('modal-root')?.textContent).toContain('Portal Content');
  });
});

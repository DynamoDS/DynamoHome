import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { VideoCarouselItem } from '../../../src/components/Learning/VideoCarouselItem';

describe('VideoCarouselItem', () => {
  beforeEach(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    document.getElementById('modal-root')?.remove();
  });

  const defaultProps: VideoCarouselItem = {
    id: 'v1',
    title: 'Intro to Dynamo',
    videoId: 'abc123xyz',
    description: 'A great intro video',
  };

  it('renders the title', () => {
    render(<VideoCarouselItem {...defaultProps} />);
    expect(screen.getByText('Intro to Dynamo')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<VideoCarouselItem {...defaultProps} />);
    expect(screen.getByText('A great intro video')).toBeInTheDocument();
  });

  it('renders an iframe with the correct YouTube embed URL', () => {
    const { container } = render(<VideoCarouselItem {...defaultProps} />);
    const iframes = container.querySelectorAll('iframe');
    const youtubeUrl = `https://www.youtube.com/embed/abc123xyz?autoplay=1`;
    const hasYoutubeIframe = Array.from(iframes).some(
      (iframe) => iframe.getAttribute('src') === youtubeUrl
    );
    expect(hasYoutubeIframe).toBe(true);
  });

  it('shows video overlay div initially (empty div sibling to iframe)', () => {
    const { container } = render(<VideoCarouselItem {...defaultProps} />);
    // The iframe is inside the clipped-video-container
    const iframe = container.querySelector('iframe')!;
    const clippedContainer = iframe.parentElement!;
    // Initially: overlay div + iframe = 2 children
    expect(clippedContainer.children.length).toBe(2);
    // The first child (overlay) has no content
    expect(clippedContainer.firstElementChild?.tagName).toBe('DIV');
  });

  it('clicking the video container removes the overlay', () => {
    const { container } = render(<VideoCarouselItem {...defaultProps} />);
    const iframe = container.querySelector('iframe')!;
    const clippedContainer = iframe.parentElement as HTMLElement;
    fireEvent.click(clippedContainer);
    // After modal opens, overlay is removed: only iframe remains in clipped-video-container
    expect(clippedContainer.children.length).toBe(1);
  });

  it('clicking the video container shows modal with close button', () => {
    const { container } = render(<VideoCarouselItem {...defaultProps} />);
    const iframe = container.querySelector('iframe')!;
    const clippedContainer = iframe.parentElement as HTMLElement;
    fireEvent.click(clippedContainer);
    const closeBtn = screen.getByRole('button', { name: /close/i });
    expect(closeBtn).toBeInTheDocument();
  });

  it('closing the modal restores the overlay div', () => {
    const { container } = render(<VideoCarouselItem {...defaultProps} />);
    const iframe = container.querySelector('iframe')!;
    const clippedContainer = iframe.parentElement as HTMLElement;
    // Open modal
    fireEvent.click(clippedContainer);
    expect(clippedContainer.children.length).toBe(1);
    // Close modal
    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);
    // Overlay returns
    expect(clippedContainer.children.length).toBe(2);
  });
});

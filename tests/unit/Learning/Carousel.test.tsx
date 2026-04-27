import { render, screen, fireEvent } from '@testing-library/react';
import { Carousel } from '../../../src/components/Learning/Carousel';

const makeChildren = (count: number) =>
  Array.from({ length: count }, (_, i) => (
    <div key={i} data-testid={`child-${i}`}>
      Child {i}
    </div>
  ));

describe('Carousel', () => {
  it('renders children', () => {
    render(<Carousel>{makeChildren(3)}</Carousel>);
    expect(screen.getByText('Child 0')).toBeInTheDocument();
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('starts at index 0 with transform translateX(-0%)', () => {
    render(<Carousel>{makeChildren(6)}</Carousel>);
    const carousel = document.getElementById('videoCarousel')!;
    expect(carousel.style.transform).toBe('translateX(-0%)');
  });

  it('clicking right button advances to index 1', () => {
    render(<Carousel>{makeChildren(6)}</Carousel>);
    const carousel = document.getElementById('videoCarousel')!;
    const buttons = screen.getAllByRole('button');
    const rightBtn = buttons[1]; // right is second button
    fireEvent.click(rightBtn);
    expect(carousel.style.transform).toBe('translateX(-25%)');
  });

  it('clicking right twice advances to index 2', () => {
    render(<Carousel>{makeChildren(6)}</Carousel>);
    const carousel = document.getElementById('videoCarousel')!;
    const buttons = screen.getAllByRole('button');
    const rightBtn = buttons[1];
    fireEvent.click(rightBtn);
    fireEvent.click(rightBtn);
    expect(carousel.style.transform).toBe('translateX(-50%)');
  });

  it('clicking right at maxIndex wraps to 0', () => {
    // 6 items, itemsPerPage=4, maxIndex=2
    render(<Carousel>{makeChildren(6)}</Carousel>);
    const carousel = document.getElementById('videoCarousel')!;
    const buttons = screen.getAllByRole('button');
    const rightBtn = buttons[1];
    // Go to maxIndex (2)
    fireEvent.click(rightBtn);
    fireEvent.click(rightBtn);
    expect(carousel.style.transform).toBe('translateX(-50%)');
    // One more click wraps to 0
    fireEvent.click(rightBtn);
    expect(carousel.style.transform).toBe('translateX(-0%)');
  });

  it('clicking left at index 0 wraps to maxIndex', () => {
    // 6 items, maxIndex=2
    render(<Carousel>{makeChildren(6)}</Carousel>);
    const carousel = document.getElementById('videoCarousel')!;
    const buttons = screen.getAllByRole('button');
    const leftBtn = buttons[0];
    fireEvent.click(leftBtn);
    expect(carousel.style.transform).toBe('translateX(-50%)');
  });

  it('clicking left when index > 0 decrements', () => {
    render(<Carousel>{makeChildren(6)}</Carousel>);
    const carousel = document.getElementById('videoCarousel')!;
    const buttons = screen.getAllByRole('button');
    const rightBtn = buttons[1];
    const leftBtn = buttons[0];
    // Go to index 2
    fireEvent.click(rightBtn);
    fireEvent.click(rightBtn);
    // Go back to index 1
    fireEvent.click(leftBtn);
    expect(carousel.style.transform).toBe('translateX(-25%)');
  });

  it('renders with fewer than 4 children without crash', () => {
    expect(() => render(<Carousel>{makeChildren(2)}</Carousel>)).not.toThrow();
  });

  it('renders left and right navigation buttons', () => {
    render(<Carousel>{makeChildren(4)}</Carousel>);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);
  });
});

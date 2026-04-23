import { render } from '@testing-library/react';
import { ClosedArrow, OpenArrow } from '../../../src/components/Common/Arrow';

// CSS modules are mocked as {}, so class names resolve to undefined.
// We test that:
// - isOpen=true adds an extra class entry (array longer by 1)
// - direction adds an extra class entry
// We use getAttribute('class') since SVG.className is SVGAnimatedString, not a plain string.

describe('ClosedArrow', () => {
  it('renders an SVG element', () => {
    const { container } = render(<ClosedArrow isOpen={false} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('uses default color #949494 when no color is provided', () => {
    const { container } = render(<ClosedArrow isOpen={false} />);
    const path = container.querySelector('path');
    expect(path?.getAttribute('fill')).toBe('#949494');
  });

  it('uses the provided color as fill', () => {
    const { container } = render(<ClosedArrow isOpen={false} color="#ff0000" />);
    const path = container.querySelector('path');
    expect(path?.getAttribute('fill')).toBe('#ff0000');
  });

  it('SVG has width=8 and height=4', () => {
    const { container } = render(<ClosedArrow isOpen={false} />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('8');
    expect(svg?.getAttribute('height')).toBe('4');
  });

  it('isOpen=true adds extra class (class attribute is longer than isOpen=false)', () => {
    const { container: c1 } = render(<ClosedArrow isOpen={false} />);
    const { container: c2 } = render(<ClosedArrow isOpen={true} />);
    const cls1 = c1.querySelector('svg')?.getAttribute('class') ?? '';
    const cls2 = c2.querySelector('svg')?.getAttribute('class') ?? '';
    expect(cls2.length).toBeGreaterThan(cls1.length);
  });

  it('direction="left" adds extra class compared to no direction', () => {
    const { container: c1 } = render(<ClosedArrow isOpen={false} />);
    const { container: c2 } = render(<ClosedArrow isOpen={false} direction="left" />);
    const cls1 = c1.querySelector('svg')?.getAttribute('class') ?? '';
    const cls2 = c2.querySelector('svg')?.getAttribute('class') ?? '';
    expect(cls2.length).toBeGreaterThan(cls1.length);
  });

  it('direction="right" adds extra class compared to no direction', () => {
    const { container: c1 } = render(<ClosedArrow isOpen={false} />);
    const { container: c2 } = render(<ClosedArrow isOpen={false} direction="right" />);
    const cls1 = c1.querySelector('svg')?.getAttribute('class') ?? '';
    const cls2 = c2.querySelector('svg')?.getAttribute('class') ?? '';
    expect(cls2.length).toBeGreaterThan(cls1.length);
  });

  it('renders the correct path d attribute', () => {
    const { container } = render(<ClosedArrow isOpen={false} />);
    const path = container.querySelector('path');
    expect(path?.getAttribute('d')).toBe('M4 4L7.5 0H0.5L4 4Z');
  });
});

describe('OpenArrow', () => {
  it('renders an SVG element', () => {
    const { container } = render(<OpenArrow isOpen={false} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('uses default color #949494 as stroke when no color provided', () => {
    const { container } = render(<OpenArrow isOpen={false} />);
    const path = container.querySelector('path');
    expect(path?.getAttribute('stroke')).toBe('#949494');
  });

  it('uses the provided color as stroke', () => {
    const { container } = render(<OpenArrow isOpen={false} color="#00ff00" />);
    const path = container.querySelector('path');
    expect(path?.getAttribute('stroke')).toBe('#00ff00');
  });

  it('SVG has width=24 and height=24', () => {
    const { container } = render(<OpenArrow isOpen={false} />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('24');
    expect(svg?.getAttribute('height')).toBe('24');
  });

  it('isOpen=true adds extra class (class attribute is longer than isOpen=false)', () => {
    const { container: c1 } = render(<OpenArrow isOpen={false} />);
    const { container: c2 } = render(<OpenArrow isOpen={true} />);
    const cls1 = c1.querySelector('svg')?.getAttribute('class') ?? '';
    const cls2 = c2.querySelector('svg')?.getAttribute('class') ?? '';
    expect(cls2.length).toBeGreaterThan(cls1.length);
  });

  it('direction="left" adds extra class compared to no direction', () => {
    const { container: c1 } = render(<OpenArrow isOpen={false} />);
    const { container: c2 } = render(<OpenArrow isOpen={false} direction="left" />);
    const cls1 = c1.querySelector('svg')?.getAttribute('class') ?? '';
    const cls2 = c2.querySelector('svg')?.getAttribute('class') ?? '';
    expect(cls2.length).toBeGreaterThan(cls1.length);
  });

  it('direction="right" adds extra class compared to no direction', () => {
    const { container: c1 } = render(<OpenArrow isOpen={false} />);
    const { container: c2 } = render(<OpenArrow isOpen={false} direction="right" />);
    const cls1 = c1.querySelector('svg')?.getAttribute('class') ?? '';
    const cls2 = c2.querySelector('svg')?.getAttribute('class') ?? '';
    expect(cls2.length).toBeGreaterThan(cls1.length);
  });

  it('path has fill="none"', () => {
    const { container } = render(<OpenArrow isOpen={false} />);
    const path = container.querySelector('path');
    expect(path?.getAttribute('fill')).toBe('none');
  });
});

import { render } from '@testing-library/react';
import Portal from '../../../src/components/Common/Portal';

describe('Portal', () => {
  it('renders children into document.body', () => {
    render(
      <Portal>
        <div>Portal Content</div>
      </Portal>
    );
    expect(document.body.textContent).toContain('Portal Content');
  });

  it('does NOT render children inside the component container', () => {
    const { container } = render(
      <Portal>
        <div>Portal Only Here</div>
      </Portal>
    );
    expect(container.textContent).not.toContain('Portal Only Here');
  });

  it('renders multiple children', () => {
    render(
      <Portal>
        <>
          <div>Child One</div>
          <div>Child Two</div>
        </>
      </Portal>
    );
    expect(document.body.textContent).toContain('Child One');
    expect(document.body.textContent).toContain('Child Two');
  });
});

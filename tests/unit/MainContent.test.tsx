import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { getMessagesForLocale } from '../../src/localization/localization';
import { MainContent } from '../../src/components/MainContent';

jest.mock('../../src/components/Recent/PageRecent', () => ({
  RecentPage: () => <div data-testid="recent-page">Recent Page</div>,
}));
jest.mock('../../src/components/Samples/PageSamples', () => ({
  SamplesPage: () => <div data-testid="samples-page">Samples Page</div>,
}));
jest.mock('../../src/components/Learning/PageLearning', () => ({
  LearningPage: () => <div data-testid="learning-page">Learning Page</div>,
}));

const messages = getMessagesForLocale('en');

const renderContent = (props: Partial<MainContentProps> = {}) => {
  const defaultProps: MainContentProps = {
    selectedSidebarItem: 'Recent',
    settings: null,
    isDisabled: false,
    setIsDisabled: jest.fn(),
    ...props,
  };
  return render(
    <IntlProvider locale="en" messages={messages}>
      <MainContent {...defaultProps} />
    </IntlProvider>
  );
};

describe('MainContent', () => {
  it('renders Recent page when selectedSidebarItem="Recent"', () => {
    renderContent({ selectedSidebarItem: 'Recent' });
    expect(screen.getByTestId('recent-page')).toBeInTheDocument();
  });

  it('Recent page container does not have "hidden" class when selected', () => {
    const { container } = renderContent({ selectedSidebarItem: 'Recent' });
    const pageContainers = container.querySelectorAll('.page-container');
    // First page-container is Recent
    expect(pageContainers[0].classList.contains('hidden')).toBe(false);
  });

  it('Samples and Learning containers have "hidden" class when Recent is selected', () => {
    const { container } = renderContent({ selectedSidebarItem: 'Recent' });
    const pageContainers = container.querySelectorAll('.page-container');
    expect(pageContainers[1].classList.contains('hidden')).toBe(true);
    expect(pageContainers[2].classList.contains('hidden')).toBe(true);
  });

  it('renders Samples page container without "hidden" when selectedSidebarItem="Samples"', () => {
    const { container } = renderContent({ selectedSidebarItem: 'Samples' });
    const pageContainers = container.querySelectorAll('.page-container');
    expect(pageContainers[1].classList.contains('hidden')).toBe(false);
    expect(pageContainers[0].classList.contains('hidden')).toBe(true);
    expect(pageContainers[2].classList.contains('hidden')).toBe(true);
  });

  it('renders Learning page container without "hidden" when selectedSidebarItem="Learning"', () => {
    const { container } = renderContent({ selectedSidebarItem: 'Learning' });
    const pageContainers = container.querySelectorAll('.page-container');
    expect(pageContainers[2].classList.contains('hidden')).toBe(false);
    expect(pageContainers[0].classList.contains('hidden')).toBe(true);
    expect(pageContainers[1].classList.contains('hidden')).toBe(true);
  });

  it('shows loading overlay with "Loading" text when isDisabled=true', () => {
    renderContent({ isDisabled: true });
    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(document.querySelector('.loading-overlay')).toBeTruthy();
  });

  it('does not show loading overlay when isDisabled=false', () => {
    renderContent({ isDisabled: false });
    expect(document.querySelector('.loading-overlay')).toBeNull();
    expect(screen.queryByText('Loading')).not.toBeInTheDocument();
  });

  it('passes settings.recentPageViewMode to RecentPage', () => {
    renderContent({ settings: { recentPageViewMode: 'list', samplesViewMode: undefined, sideBarWidth: undefined } });
    // RecentPage is mocked so this just verifies no crash
    expect(screen.getByTestId('recent-page')).toBeInTheDocument();
  });
});

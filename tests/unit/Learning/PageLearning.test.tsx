import { screen, act } from '@testing-library/react';
import { renderWithIntl } from '../testUtils';
import { LearningPage } from '../../../src/components/Learning/PageLearning';

jest.mock('../../../src/components/Learning/GuideGridItem', () => ({
  GuideGridItem: ({ Name }: any) => <div data-testid="guide-item">{Name}</div>,
}));

jest.mock('../../../src/components/Learning/Carousel', () => ({
  Carousel: ({ children }: any) => <div data-testid="carousel">{children}</div>,
}));

jest.mock('../../../src/components/Learning/VideoCarouselItem', () => ({
  VideoCarouselItem: ({ title }: any) => <div data-testid="video-item">{title}</div>,
}));

const mockGuides: Guide[] = [
  { id: 'g1', Name: 'Guide One', Description: 'Desc 1', Type: '', Thumbnail: '' },
  { id: 'g2', Name: 'Guide Two', Description: 'Desc 2', Type: '', Thumbnail: '' },
];

const mockVideos: VideoCarouselItem[] = [
  { id: 'v1', title: 'Video One', videoId: 'abc123', description: 'Video desc 1' },
  { id: 'v2', title: 'Video Two', videoId: 'def456', description: 'Video desc 2' },
];

describe('LearningPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders "Learning" title', () => {
    renderWithIntl(<LearningPage />);
    // learning.title.text.learning = "Learning"
    const headings = screen.getAllByText('Learning');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('renders "Interactive Guides" section title', () => {
    renderWithIntl(<LearningPage />);
    expect(screen.getByText('Interactive Guides')).toBeInTheDocument();
  });

  it('renders "Video Tutorials" section title', () => {
    renderWithIntl(<LearningPage />);
    expect(screen.getByText('Video Tutorials')).toBeInTheDocument();
  });

  it('renders no guide items without data', () => {
    renderWithIntl(<LearningPage />);
    expect(screen.queryAllByTestId('guide-item').length).toBe(0);
  });

  it('renders no video items without data', () => {
    renderWithIntl(<LearningPage />);
    expect(screen.queryAllByTestId('video-item').length).toBe(0);
  });

  it('window.receiveInteractiveGuidesDataFromDotNet is defined after mount', () => {
    renderWithIntl(<LearningPage />);
    expect(typeof window.receiveInteractiveGuidesDataFromDotNet).toBe('function');
  });

  it('window.receiveTrainingVideoDataFromDotNet is defined after mount', () => {
    renderWithIntl(<LearningPage />);
    expect(typeof window.receiveTrainingVideoDataFromDotNet).toBe('function');
  });

  it('receiveInteractiveGuidesDataFromDotNet populates guide items', () => {
    renderWithIntl(<LearningPage />);
    act(() => {
      window.receiveInteractiveGuidesDataFromDotNet(mockGuides);
    });
    expect(screen.getByText('Guide One')).toBeInTheDocument();
    expect(screen.getByText('Guide Two')).toBeInTheDocument();
  });

  it('receiveTrainingVideoDataFromDotNet populates video items', () => {
    renderWithIntl(<LearningPage />);
    act(() => {
      window.receiveTrainingVideoDataFromDotNet(mockVideos);
    });
    expect(screen.getByText('Video One')).toBeInTheDocument();
    expect(screen.getByText('Video Two')).toBeInTheDocument();
  });

  it('receiveInteractiveGuidesDataFromDotNet does not crash with empty array', () => {
    renderWithIntl(<LearningPage />);
    expect(() => {
      act(() => {
        window.receiveInteractiveGuidesDataFromDotNet([]);
      });
    }).not.toThrow();
  });

  it('receiveTrainingVideoDataFromDotNet does not crash with empty array', () => {
    renderWithIntl(<LearningPage />);
    expect(() => {
      act(() => {
        window.receiveTrainingVideoDataFromDotNet([]);
      });
    }).not.toThrow();
  });

  it('removes window globals on unmount', () => {
    const { unmount } = renderWithIntl(<LearningPage />);
    unmount();
    expect(window.receiveInteractiveGuidesDataFromDotNet).toBeUndefined();
    expect(window.receiveTrainingVideoDataFromDotNet).toBeUndefined();
  });
});

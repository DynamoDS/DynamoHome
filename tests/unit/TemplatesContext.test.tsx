import { act, render, screen } from '@testing-library/react';
import { TemplatesProvider, useTemplates } from '../../src/components/TemplatesContext';

const TemplatesConsumer = () => {
  const templates = useTemplates();

  return (
    <div>
      {templates.map((template) => (
        <div key={template.id}>
          <span>{template.Caption}</span>
          <span>{`date:${template.DateModified}`}</span>
          <span>{`author:${template.Author}`}</span>
          <span>{`description:${template.Description}`}</span>
        </div>
      ))}
    </div>
  );
};

describe('TemplatesProvider', () => {
  beforeEach(() => {
    window.setShowStartPageChanged = jest.fn();
  });

  afterEach(() => {
    delete window.setShowStartPageChanged;
    delete window.receiveTemplatesDataFromDotNet;
    jest.clearAllMocks();
  });

  it('clears loading state when template data is received', () => {
    render(
      <TemplatesProvider>
        <TemplatesConsumer />
      </TemplatesProvider>
    );

    act(() => {
      window.receiveTemplatesDataFromDotNet([]);
    });

    expect(window.setShowStartPageChanged).toHaveBeenCalledWith(true);
  });

  it('registers receiveTemplatesDataFromDotNet on mount', () => {
    render(
      <TemplatesProvider>
        <TemplatesConsumer />
      </TemplatesProvider>
    );

    expect(typeof window.receiveTemplatesDataFromDotNet).toBe('function');
  });

  it('updates templates from receiveTemplatesDataFromDotNet', () => {
    render(
      <TemplatesProvider>
        <TemplatesConsumer />
      </TemplatesProvider>
    );

    act(() => {
      window.receiveTemplatesDataFromDotNet([
        {
          id: 'template-1',
          Caption: 'Template One',
          ContextData: '/path/template-one.dyn',
          DateModified: '2024-02-01',
          Thumbnail: '',
          Author: 'Dynamo Team',
          Description: 'Template description',
        },
      ]);
    });

    expect(screen.getByText('Template One')).toBeInTheDocument();
    expect(screen.getByText('date:2024-02-01')).toBeInTheDocument();
    expect(screen.getByText('author:Dynamo Team')).toBeInTheDocument();
    expect(screen.getByText('description:Template description')).toBeInTheDocument();
  });

  it('normalizes date, Author, and Description fields from template input', () => {
    render(
      <TemplatesProvider>
        <TemplatesConsumer />
      </TemplatesProvider>
    );

    act(() => {
      window.receiveTemplatesDataFromDotNet([
        {
          id: 'template-1',
          Caption: 'Template One',
          ContextData: '/path/template-one.dyn',
          date: '2024-03-01',
          Thumbnail: '',
        },
      ]);
    });

    expect(screen.getByText('Template One')).toBeInTheDocument();
    expect(screen.getByText('date:2024-03-01')).toBeInTheDocument();
    expect(screen.getByText('author:')).toBeInTheDocument();
    expect(screen.getByText('description:')).toBeInTheDocument();
  });

  it('removes receiveTemplatesDataFromDotNet on unmount', () => {
    const { unmount } = render(
      <TemplatesProvider>
        <TemplatesConsumer />
      </TemplatesProvider>
    );

    unmount();

    expect(window.receiveTemplatesDataFromDotNet).toBeUndefined();
  });
});

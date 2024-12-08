import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import WritingExample from '@/components/WritingExample';

const alt = 'ざっし';
const content = '雑誌';

describe('component/WritingExample', () => {
  it('renders the component', () => {
    expect.assertions(1);

    render(<WritingExample content={content} />);

    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it('renders the alt content if specified and showAlt is true', () => {
    expect.assertions(2);

    render(<WritingExample alt={alt} content={content} showAlt />);

    expect(screen.getByText(content)).toBeInTheDocument();
    expect(screen.getByText(alt)).toBeInTheDocument();
  });

  it('does not render the alt content if showAlt is false', () => {
    expect.assertions(2);

    render(<WritingExample alt={alt} content={content} showAlt={false} />);

    expect(screen.getByText(content)).toBeInTheDocument();
    expect(screen.queryByText(alt)).toBeNull();
  });
});

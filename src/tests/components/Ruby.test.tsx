import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Ruby from '@/components/Ruby';

const alt = 'にほん';
const content = '日本';

describe('components/Ruby', () => {
  it('renders the component', () => {
    render(<Ruby content={content} showAlt={false} />);
    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it('renders the alt content when showAlt is true', () => {
    render(<Ruby alt={alt} content={content} showAlt />);
    expect(screen.getByText(content)).toBeInTheDocument();
    expect(screen.getByText(alt)).toBeInTheDocument();
  });

  it('does not render the alt content when showAlt is false', () => {
    render(<Ruby alt={alt} content={content} showAlt={false} />);
    expect(screen.getByText(content)).toBeInTheDocument();
    expect(screen.queryByText(alt)).toBeNull();
  });
});

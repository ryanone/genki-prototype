import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProgressBar from '@/components/ProgressBar';

describe('component/ProgressBar', () => {
  it('renders the ProgressBar component', () => {
    let current = 0;
    const total = 10;
    const { rerender } = render(
      <ProgressBar current={current} total={total} />,
    );
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar.getAttribute('aria-valuenow')).toBe(`${current}`);
    expect(progressBar.getAttribute('aria-valuemax')).toBe(`${total}`);

    current = 5;
    rerender(<ProgressBar current={current} total={total} />);
    expect(progressBar.getAttribute('aria-valuenow')).toBe(`${current}`);
    expect(progressBar.getAttribute('aria-valuemax')).toBe(`${total}`);
  });
});

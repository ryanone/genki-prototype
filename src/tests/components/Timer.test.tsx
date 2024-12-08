import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import Timer from '@/components/Timer';

const TICK_LENGTH = 1000;

describe('components/Timer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the component', async () => {
    expect.assertions(1);

    render(<Timer isRunning={false} />);

    expect(screen.getByRole('timer')).toHaveTextContent('00:00:00');
  });

  it('renders the component with a running timer', async () => {
    expect.assertions(2);

    render(<Timer isRunning />);

    expect(screen.getByRole('timer')).toHaveTextContent('00:00:00');

    act(() => vi.advanceTimersByTime(TICK_LENGTH));

    expect(screen.getByRole('timer')).toHaveTextContent('00:00:01');
  });

  it('calls onStop() when isRunning is initially false', async () => {
    expect.assertions(3);

    const spy = vi.fn();
    render(<Timer isRunning={false} onStop={spy} />);

    expect(screen.getByRole('timer')).toHaveTextContent('00:00:00');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(0);
  });

  it('calls onStop() when changing isRunning from true to false', () => {
    expect.assertions(6);

    const spy = vi.fn();
    const { rerender } = render(<Timer isRunning onStop={spy} />);

    expect(screen.getByRole('timer')).toHaveTextContent('00:00:00');

    act(() => vi.advanceTimersByTime(TICK_LENGTH));

    expect(screen.getByRole('timer')).toHaveTextContent('00:00:01');

    act(() => vi.advanceTimersByTime(TICK_LENGTH));

    expect(screen.getByRole('timer')).toHaveTextContent('00:00:02');
    expect(spy).toHaveBeenCalledTimes(0);

    rerender(<Timer isRunning={false} onStop={spy} />);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(2);
  });
});

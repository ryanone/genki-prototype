import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import Timer from '@/components/Timer';
import '@testing-library/jest-dom';

const TICK_LENGTH = 1000;

describe('components/Timer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render the Timer component', async () => {
    render(<Timer isRunning={false} />);
    expect(screen.getByRole('timer')).toHaveTextContent('00:00:00');
  });

  it('should render the Timer component and run', async () => {
    render(<Timer isRunning />);
    expect(screen.getByRole('timer')).toHaveTextContent('00:00:00');
    act(() => vi.advanceTimersByTime(TICK_LENGTH));
    expect(screen.getByRole('timer')).toHaveTextContent('00:00:01');
  });

  it('should call onTick() after each second', async () => {
    const spy = vi.fn(() => {});

    const { rerender } = render(<Timer isRunning onTick={spy} />);
    expect(screen.getByRole('timer')).toHaveTextContent('00:00:00');
    act(() => vi.advanceTimersByTime(TICK_LENGTH));
    expect(screen.getByRole('timer')).toHaveTextContent('00:00:01');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(1);
    act(() => vi.advanceTimersByTime(TICK_LENGTH));
    expect(screen.getByRole('timer')).toHaveTextContent('00:00:02');
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(2);

    rerender(<Timer isRunning={false} onTick={spy} />);
    expect(screen.getByRole('timer')).toHaveTextContent('00:00:02');
    act(() => vi.advanceTimersByTime(TICK_LENGTH));
    expect(screen.getByRole('timer')).toHaveTextContent('00:00:02');
    expect(spy).toHaveBeenCalledTimes(2);
  });
});

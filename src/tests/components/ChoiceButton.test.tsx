import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChoiceButton from '@/components/ChoiceButton';
import type { ChoiceData } from '@/features/multipleChoice/multipleChoiceSlice';

const DATA: ChoiceData = {
  content: 'Lorem ipsum dolor',
  id: '1',
};

describe('components/ChoiceButton', () => {
  it('renders the ChoiceButton with no value for `result`', () => {
    const data = {
      ...DATA,
    };
    render(<ChoiceButton data={data} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(data.content);
    expect(button.getAttribute('aria-label')).toBeFalsy();
  });

  it('renders the ChoiceButton with `result` as SELECTED_CORRECT', () => {
    const data: ChoiceData = {
      ...DATA,
      result: 'SELECTED_CORRECT',
    };
    render(<ChoiceButton data={data} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(data.content);
    expect(button.getAttribute('aria-label')).toBe('Correct answer chosen');
  });

  it('renders the ChoiceButton with `result` as UNSELECTED_CORRECT', () => {
    const data: ChoiceData = {
      ...DATA,
      result: 'UNSELECTED_CORRECT',
    };
    render(<ChoiceButton data={data} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(data.content);
    expect(button.getAttribute('aria-label')).toBe(
      'This is the correct answer',
    );
  });

  it('renders the ChoiceButton with `result` as INCORRECT', () => {
    const data: ChoiceData = {
      ...DATA,
      result: 'INCORRECT',
    };
    render(<ChoiceButton data={data} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(data.content);
    expect(button.getAttribute('aria-label')).toBe('Incorrect answer chosen');
  });

  it('ChoiceButton does not call onClick() if disabled', async () => {
    const user = userEvent.setup();
    const spy = vi.fn(() => {});
    const data = {
      ...DATA,
    };
    render(<ChoiceButton data={data} isDisabled onClick={spy} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    await user.click(button);
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('ChoiceButton calls onClick if enabled and clicked', async () => {
    const user = userEvent.setup();
    const spy = vi.fn(() => {});
    const data = {
      ...DATA,
    };
    render(<ChoiceButton data={data} onClick={spy} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    await user.click(button);
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(data.id);
  });
});

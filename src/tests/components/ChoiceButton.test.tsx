import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChoiceButton from '@/components/ChoiceButton';
import type { ChoiceData } from '@/features/multipleChoice/slice';

const DATA: ChoiceData = {
  content: 'Lorem ipsum dolor',
  id: '1',
};

describe('components/ChoiceButton', () => {
  it('renders the component with no value for `result`', () => {
    expect.assertions(3);

    const data = {
      ...DATA,
    };
    render(<ChoiceButton data={data} />);
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(data.content);
    expect(button.getAttribute('aria-label')).toBeFalsy();
  });

  it('renders the component with `result` as SELECTED_CORRECT', () => {
    expect.assertions(3);

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

  it('renders the component with `result` as UNSELECTED_CORRECT', () => {
    expect.assertions(3);

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

  it('renders the component with `result` as INCORRECT', () => {
    expect.assertions(3);

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

  it('does not call onClick() if disabled', async () => {
    expect.assertions(2);

    const user = userEvent.setup();
    const spy = vi.fn();
    const data = {
      ...DATA,
    };
    render(<ChoiceButton data={data} isDisabled onClick={spy} />);
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();

    await user.click(button);

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('calls onClick() if enabled and clicked', async () => {
    expect.assertions(3);

    const user = userEvent.setup();
    const spy = vi.fn();
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

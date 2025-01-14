import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShortAnswerInput from '@/components/ShortAnswerInput';

const answerContent = '日本に行きたいです。';
const correctAnswerConfirmation = 'This answer is correct.';
const onChange = () => {};

describe('component/ShortAnswerInput', () => {
  it('renders the component', () => {
    expect.assertions(2);

    render(<ShortAnswerInput onChange={onChange} />);
    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
    expect(input).toBeEnabled();
  });

  it('renders the component with defaultValue', () => {
    expect.assertions(3);

    const defaultValue = 'ありがとうござます。';
    render(
      <ShortAnswerInput defaultValue={defaultValue} onChange={onChange} />,
    );
    const input: HTMLInputElement = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
    expect(input).toBeEnabled();
    expect(input.value).toBe(defaultValue);
  });

  it('renders the component and shows the answer when result is INCORRECT', () => {
    expect.assertions(4);

    const incorrectAnswerConfirmation = `The correct answer is ${answerContent}`;
    render(
      <ShortAnswerInput
        answerContent={answerContent}
        onChange={onChange}
        result="INCORRECT"
      />,
    );
    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
    expect(input).toBeDisabled();
    expect(screen.queryByText(correctAnswerConfirmation)).toBeNull();
    expect(screen.getByText(incorrectAnswerConfirmation)).toBeInTheDocument();
  });

  it('renders the component and confirmation when result is CORRECT', () => {
    expect.assertions(4);

    const incorrectAnswerConfirmation = `The correct answer is ${answerContent}`;
    render(
      <ShortAnswerInput
        answerContent={answerContent}
        onChange={onChange}
        result="CORRECT"
      />,
    );
    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
    expect(input).toBeDisabled();
    expect(screen.getByText(correctAnswerConfirmation)).toBeInTheDocument();
    expect(screen.queryByText(incorrectAnswerConfirmation)).toBeNull();
  });

  it('renders the component and triggers onChange() when appropriate', async () => {
    expect.assertions(3);

    const user = userEvent.setup();
    const onChangeSpy = vi.fn();
    render(<ShortAnswerInput onChange={onChangeSpy} />);
    const input = screen.getByRole('textbox');
    await user.click(input);
    const inputValue = 'はい';
    await user.keyboard(inputValue);

    expect(onChangeSpy).toHaveBeenCalledTimes(inputValue.length);
    expect(onChangeSpy).toHaveBeenNthCalledWith(
      1,
      inputValue.substring(0, 1), // 'は'
    );
    expect(onChangeSpy).toHaveBeenNthCalledWith(
      2,
      inputValue.substring(0, 2), // 'い'
    );
  });
});

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import ChoiceInput from '@/components/ChoiceInput';

const questionContent = 'Foo';
const onChange = () => {};

describe('component/ChoiceInput', () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders the component', async () => {
    render(
      <ChoiceInput onChange={onChange} questionContent={questionContent} />,
    );
    expect(screen.getByLabelText(questionContent)).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toBeEnabled();
  });

  it('renders the component and triggers onChange() when appropriate', async () => {
    const onChangeSpy = vi.fn();
    render(
      <ChoiceInput onChange={onChangeSpy} questionContent={questionContent} />,
    );
    expect(screen.getByLabelText(questionContent)).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toBeEnabled();
    await user.click(input);
    const inputValue = 'bar';
    await user.keyboard(inputValue);
    expect(onChangeSpy).toHaveBeenCalledTimes(inputValue.length);
    expect(onChangeSpy).toHaveBeenNthCalledWith(
      1,
      questionContent,
      inputValue.substring(0, 1), // 'b'
    );
    expect(onChangeSpy).toHaveBeenNthCalledWith(
      2,
      questionContent,
      inputValue.substring(0, 2), // 'ba'
    );
    expect(onChangeSpy).toHaveBeenNthCalledWith(3, questionContent, inputValue);
  });

  it('renders the component when the result is INCORRECT', () => {
    const result = 'INCORRECT';
    const isDisabled = true;
    render(
      <ChoiceInput
        isDisabled={isDisabled}
        onChange={onChange}
        questionContent={questionContent}
        result={result}
      />,
    );
    expect(screen.getByLabelText(questionContent)).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toBeDisabled();
    expect(screen.getByTestId('choice-input-result')).toHaveTextContent(
      'The input value is incorrect',
    );
  });

  it('renders the component when the result is CORRECT', () => {
    const result = 'CORRECT';
    const isDisabled = true;
    render(
      <ChoiceInput
        isDisabled={isDisabled}
        onChange={onChange}
        questionContent={questionContent}
        result={result}
      />,
    );
    expect(screen.getByLabelText(questionContent)).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toBeDisabled();
    expect(screen.getByTestId('choice-input-result')).toHaveTextContent(
      'The input value is correct',
    );
  });
});

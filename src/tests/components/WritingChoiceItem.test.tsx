import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WritingChoiceItem from '@/components/WritingChoiceItem';
import type { Question } from '@/data/exercise';

const question: Question = {
  choices: {
    correctId: '100',
  },
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing eli',
  id: 'a',
};
const index = 1;
const answerContent = 'b';
const correctAnswerConfirmation = 'This answer is correct.';
const onChoiceChange = () => {};

describe('component/WritingChoiceItem', () => {
  it('renders the component', () => {
    render(
      <WritingChoiceItem
        index={index}
        onChoiceChange={onChoiceChange}
        question={question}
      />,
    );
    expect(screen.getByLabelText(question.content)).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toBeEnabled();
  });

  it('renders the component when result is CORRECT', () => {
    const incorrectAnswerConfirmation = `The correct answer is ${answerContent}`;
    const result = 'CORRECT';
    render(
      <WritingChoiceItem
        index={index}
        onChoiceChange={onChoiceChange}
        question={question}
        result={result}
      />,
    );
    expect(screen.getByLabelText(question.content)).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toBeDisabled();
    expect(screen.getByText(correctAnswerConfirmation)).toBeInTheDocument();
    expect(screen.queryByText(incorrectAnswerConfirmation)).toBeNull();
  });

  it('renders the component when result is INCORRECT', () => {
    const result = 'INCORRECT';
    const incorrectAnswerConfirmation = `The correct answer is ${answerContent}`;
    render(
      <WritingChoiceItem
        answerContent={answerContent}
        index={index}
        onChoiceChange={onChoiceChange}
        question={question}
        result={result}
      />,
    );
    expect(screen.getByLabelText(question.content)).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toBeDisabled();
    expect(screen.queryByText(correctAnswerConfirmation)).toBeNull();
    expect(screen.getByText(incorrectAnswerConfirmation)).toBeInTheDocument();
  });

  it('renders the component and triggers onChange() when appropriate', async () => {
    const user = userEvent.setup();
    const onChoiceChangeSpy = vi.fn();
    render(
      <WritingChoiceItem
        index={index}
        onChoiceChange={onChoiceChangeSpy}
        question={question}
      />,
    );
    const input = screen.getByRole('textbox');
    await user.click(input);
    const inputValue = 'a';
    await user.keyboard(inputValue);
    expect(onChoiceChangeSpy).toHaveBeenCalledTimes(inputValue.length);
    expect(onChoiceChangeSpy).toHaveBeenNthCalledWith(1, question, inputValue);
  });
});

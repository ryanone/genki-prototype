import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WritingAnswerItem from '@/components/WritingAnswerItem';
import { type Item as ShortAnswerItem } from '@/features/shortAnswer/shortAnswerSlice';

const index = 10;
const item: ShortAnswerItem = {
  question: {
    content: 'Lorem ipsum',
    choices: {
      correctId: '1000',
    },
  },
};
const onAnswerChange = () => {};

describe('components/WritingAnswerItem', () => {
  it('renders the component', () => {
    expect.assertions(1);

    render(
      <WritingAnswerItem
        data={item}
        index={index}
        onAnswerChange={onAnswerChange}
      />,
    );
    const questionContent = `${index}. ${item.question.content}`;

    expect(screen.getByText(questionContent)).toBeInTheDocument();
  });

  it('renders the component and calls onAnswerChange() when appropriate', async () => {
    expect.assertions(3);

    const user = userEvent.setup();
    const onAnswerChangeSpy = vi.fn();
    render(
      <WritingAnswerItem
        data={item}
        index={index}
        onAnswerChange={onAnswerChangeSpy}
      />,
    );
    const input = screen.getByRole('textbox');
    await user.click(input);
    const inputValue = 'はい';
    await user.keyboard(inputValue);

    expect(onAnswerChangeSpy).toHaveBeenCalledTimes(inputValue.length);
    expect(onAnswerChangeSpy).toHaveBeenNthCalledWith(
      1,
      item.question.id,
      inputValue.substring(0, 1), // 'は'
    );
    expect(onAnswerChangeSpy).toHaveBeenNthCalledWith(
      2,
      item.question.id,
      inputValue.substring(0, 2), // 'い'
    );
  });
});

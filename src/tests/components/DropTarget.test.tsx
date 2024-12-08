import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropTarget from '@/components/DropTarget';

const layout = 'HORIZONTAL';
const onDrop = () => {};
const result = undefined;
const val1 = {
  content: 'lorem',
  id: '1',
};

describe('components/DropTarget', () => {
  it('renders the component', () => {
    expect.assertions(3);

    render(
      <DropTarget
        layout={layout}
        onDrop={onDrop}
        result={result}
        val1={val1}
      />,
    );

    expect(screen.getByTestId('drop-target-val1-content')).toHaveTextContent(
      val1.content,
    );
    expect(screen.getByRole('button')).toHaveTextContent('');
    expect(screen.queryByTestId('drop-target-val1-alt')).toBeNull();
  });

  it('renders the component with val1 alt content depending on showAlt', () => {
    expect.assertions(3);

    const val1Alt = {
      ...val1,
      alt: 'ipsum',
    };
    const { rerender } = render(
      <DropTarget
        layout={layout}
        onDrop={onDrop}
        result={result}
        showAlt
        val1={val1Alt}
      />,
    );

    expect(screen.getByTestId('drop-target-val1-content')).toHaveTextContent(
      val1.content,
    );
    expect(screen.queryByTestId('drop-target-val1-alt')).toHaveTextContent(
      val1Alt.alt,
    );

    rerender(
      <DropTarget
        layout={layout}
        onDrop={onDrop}
        result={result}
        showAlt={false}
        val1={val1Alt}
      />,
    );

    expect(screen.queryByTestId('drop-target-val1-alt')).toBeNull();
  });

  it('renders the component when val2 is specified', () => {
    expect.assertions(1);

    const val2 = { content: 'dolor' };
    render(
      <DropTarget
        layout={layout}
        onDrop={onDrop}
        result={result}
        val1={val1}
        val2={val2}
      />,
    );

    expect(screen.getByRole('button')).toHaveTextContent(val2.content);
  });

  it('renders the component when result is CORRECT', () => {
    expect.assertions(1);

    render(
      <DropTarget
        layout={layout}
        onDrop={onDrop}
        result="CORRECT"
        val1={val1}
      />,
    );

    expect(screen.getByLabelText('Correct')).toBeInTheDocument();
  });

  it('renders the component when result is INCORRECT', () => {
    expect.assertions(1);

    render(
      <DropTarget
        layout={layout}
        onDrop={onDrop}
        result="INCORRECT"
        val1={val1}
      />,
    );

    expect(screen.getByLabelText('Incorrect')).toBeInTheDocument();
  });

  it('renders the component when result is INCORRECT and numIncorrectGuesses is specified', () => {
    expect.assertions(3);

    const numIncorrectGuesses = 5;
    const { rerender } = render(
      <DropTarget
        layout={layout}
        numIncorrectGuesses={numIncorrectGuesses}
        onDrop={onDrop}
        result="INCORRECT"
        val1={val1}
      />,
    );

    expect(screen.getByLabelText('Incorrect')).toBeInTheDocument();
    expect(screen.getByTestId('drop-target-num-incorrect')).toHaveTextContent(
      `wrong ${numIncorrectGuesses}x`,
    );

    rerender(
      <DropTarget
        layout="VERTICAL"
        numIncorrectGuesses={numIncorrectGuesses}
        onDrop={onDrop}
        result="INCORRECT"
        val1={val1}
      />,
    );

    expect(screen.getByTestId('drop-target-num-incorrect')).toHaveTextContent(
      `x${numIncorrectGuesses}`,
    );
  });

  it('calls onDrop() when the drop target has been clicked/dropped on', async () => {
    expect.assertions(4);

    const user = userEvent.setup();
    const onDropSpy = vi.fn();
    render(
      <DropTarget
        layout={layout}
        onDrop={onDropSpy}
        result={result}
        val1={val1}
      />,
    );
    const button = screen.getByRole('button');
    await user.click(button);

    expect(onDropSpy).toHaveBeenCalledTimes(1);
    expect(onDropSpy).toHaveBeenNthCalledWith(1, val1.id);

    fireEvent.drop(button);

    expect(onDropSpy).toHaveBeenCalledTimes(2);
    expect(onDropSpy).toHaveBeenNthCalledWith(2, val1.id);
  });

  it('calls onDrop() when the drop target has been clicked/dropped on and result is CORRECT', async () => {
    expect.assertions(2);

    const user = userEvent.setup();
    const onDropSpy = vi.fn();
    render(
      <DropTarget
        layout={layout}
        onDrop={onDropSpy}
        result="CORRECT"
        val1={val1}
      />,
    );
    const button = screen.getByRole('button');
    await user.click(button);

    expect(onDropSpy).toHaveBeenCalledTimes(0);

    fireEvent.drop(button);

    expect(onDropSpy).toHaveBeenCalledTimes(0);
  });
});

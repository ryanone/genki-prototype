import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WritingInput from '@/components/WritingInput';

const index = 0;
const onChange = () => {};

describe('component/WritingInput', () => {
  it('renders the component', () => {
    render(<WritingInput index={index} onChange={onChange} />);
    expect(screen.getByLabelText('Enter value')).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toBeEnabled();
  });

  it('renders the component with placeholder and defaultValue', () => {
    const defaultValue = 'foo';
    const placeholder = 'bar';
    render(
      <WritingInput
        defaultValue={defaultValue}
        index={index}
        onChange={onChange}
        placeholder={placeholder}
      />,
    );
    expect(screen.getByLabelText(`Enter ${placeholder}`)).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toBeEnabled();
  });

  it('renders the component when result is CORRECT', () => {
    const result = 'CORRECT';
    const isDisabled = true;
    render(
      <WritingInput
        index={index}
        isDisabled={isDisabled}
        onChange={onChange}
        result={result}
      />,
    );
    expect(screen.getByLabelText('Enter value')).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toBeDisabled();
    expect(screen.getByTestId('writing-input-result')).toHaveTextContent(
      'The input value is correct',
    );
  });

  it('renders the component when result is INCORRECT', () => {
    const result = 'INCORRECT';
    const isDisabled = true;
    render(
      <WritingInput
        index={index}
        isDisabled={isDisabled}
        onChange={onChange}
        result={result}
      />,
    );
    expect(screen.getByLabelText('Enter value')).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toBeDisabled();
    expect(screen.getByTestId('writing-input-result')).toHaveTextContent(
      'The input value is incorrect',
    );
  });

  it('renders the component and triggers onChange() when appropriate', async () => {
    const user = userEvent.setup();
    const onChangeSpy = vi.fn();
    render(<WritingInput index={index} onChange={onChangeSpy} />);
    const input = screen.getByRole('textbox');
    await user.click(input);
    const inputValue = 'foo';
    await user.keyboard(inputValue);
    expect(onChangeSpy).toHaveBeenCalledTimes(3);
    expect(onChangeSpy).toHaveBeenNthCalledWith(
      1,
      inputValue.substring(0, 1), // 'f'
      index,
    );
    expect(onChangeSpy).toHaveBeenNthCalledWith(
      2,
      inputValue.substring(0, 2), // 'fo'
      index,
    );
    expect(onChangeSpy).toHaveBeenNthCalledWith(3, inputValue, index);
  });
});

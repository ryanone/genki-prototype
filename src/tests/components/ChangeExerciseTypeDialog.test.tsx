import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChangeExerciseTypeDialog from '@/components/ChangeExerciseTypeDialog';
import Genki3Hiragana0 from '@/data/genki-3/exercises/hiragana-0.json';
import type { DragDropExercise } from '@/data/exercise';

const onRenderModeChoose = () => {};
const exercise: DragDropExercise = {
  ...Genki3Hiragana0,
  title: 'Writing System, Greetings and Numbers (p. 20-35)',
} as DragDropExercise;

describe('component/ChangeExerciseTypeDialog', () => {
  it('renders the component with the dialog open', () => {
    render(
      <ChangeExerciseTypeDialog
        isOpen
        exercise={exercise}
        onRenderModeChoose={onRenderModeChoose}
      />,
    );
    const dialog = screen.getByTestId('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog.hasAttribute('open')).toBeTruthy();
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    const options = screen.getAllByRole('option');
    expect(options.length).toBe(exercise.supportedRenderModes.length + 1);
    expect(options[0].getAttribute('value')).toBe('');
    expect(options[1].getAttribute('value')).toBe(
      exercise.supportedRenderModes[0],
    );
    expect(options[2].getAttribute('value')).toBe(
      exercise.supportedRenderModes[1],
    );
    expect(options[3].getAttribute('value')).toBe(
      exercise.supportedRenderModes[2],
    );
  });

  it('renders the component with the dialog closed', () => {
    render(
      <ChangeExerciseTypeDialog
        isOpen={false}
        exercise={exercise}
        onRenderModeChoose={onRenderModeChoose}
      />,
    );
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('invokes onCancel() when closing the modal', async () => {
    const user = userEvent.setup();
    const onCancelSpy = vi.fn();
    render(
      <ChangeExerciseTypeDialog
        isOpen
        exercise={exercise}
        onCancel={onCancelSpy}
        onRenderModeChoose={onRenderModeChoose}
      />,
    );
    const dialog = screen.getByTestId('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog.hasAttribute('open')).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(onCancelSpy).toHaveBeenCalledOnce();
  });

  it('does not invoke onRenderModeChoose() if no exercise type is chosen', async () => {
    const user = userEvent.setup();
    const onRenderModeChooseSpy = vi.fn();
    render(
      <ChangeExerciseTypeDialog
        isOpen
        exercise={exercise}
        onRenderModeChoose={onRenderModeChooseSpy}
      />,
    );
    const dialog = screen.getByTestId('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog.hasAttribute('open')).toBeTruthy();
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    user.selectOptions(select, ['']);
    await user.click(screen.getByRole('button', { name: 'Begin' }));
    expect(onRenderModeChooseSpy).toHaveBeenCalledTimes(0);
  });

  it('invokes onRenderModeChoose() when selecting an exercise type', async () => {
    const user = userEvent.setup();
    const onRenderModeChooseSpy = vi.fn();
    render(
      <ChangeExerciseTypeDialog
        isOpen
        exercise={exercise}
        onRenderModeChoose={onRenderModeChooseSpy}
      />,
    );
    const dialog = screen.getByTestId('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog.hasAttribute('open')).toBeTruthy();
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    user.selectOptions(select, [exercise.supportedRenderModes[2]]);
    await user.click(screen.getByRole('button', { name: 'Begin' }));
    expect(onRenderModeChooseSpy).toHaveBeenCalledOnce();
    expect(onRenderModeChooseSpy).toBeCalledWith(
      exercise.supportedRenderModes[2],
    );
  });
});

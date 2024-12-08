import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import formatTimer from '@/utils/time';
import ExerciseResults from '@/components/ExerciseResults';
import type { ExerciseType } from '@/data/exercise';

const exerciseType: ExerciseType = 'DRAG_DROP';
const timeElapsed = 50;
const onRestart = () => {};

describe('component/ExerciseResults', () => {
  it('renders the component and triggers onStart() when appropriate', async () => {
    expect.assertions(6);

    const user = userEvent.setup();
    const numSolved = 100;
    const numWrong = 0;
    const score = Math.floor(((numSolved - numWrong) / numSolved) * 100);
    const onRestartSpy = vi.fn();

    render(
      <ExerciseResults
        exerciseType={exerciseType}
        numSolved={numSolved}
        numWrong={numWrong}
        timeElapsed={timeElapsed}
        onRestart={onRestartSpy}
      />,
    );

    expect(screen.getByTestId('exercise-results-num-solved')).toHaveTextContent(
      `${numSolved}`,
    );
    expect(screen.getByTestId('exercise-results-num-wrong')).toHaveTextContent(
      `${numWrong}`,
    );
    expect(screen.getByTestId('exercise-results-score')).toHaveTextContent(
      `${score}`,
    );
    expect(
      screen.getByTestId('exercise-results-time-elapsed'),
    ).toHaveTextContent(`${formatTimer(timeElapsed)}`);
    expect(screen.getByTestId('exercise-results-advice')).toHaveTextContent(
      'PERFECT! Great job!',
    );

    await user.click(screen.getByRole('button'));

    expect(onRestartSpy).toHaveBeenCalledOnce();
  });

  it('renders the component and shows advice when score > 70 and < 100', async () => {
    expect.assertions(1);

    const numSolved = 100;
    const numWrong = 25;

    render(
      <ExerciseResults
        exerciseType={exerciseType}
        numSolved={numSolved}
        numWrong={numWrong}
        timeElapsed={timeElapsed}
        onRestart={onRestart}
      />,
    );

    expect(screen.getByTestId('exercise-results-advice')).toHaveTextContent(
      'Nice work!',
    );
  });

  it('renders the component and shows advice when score <= 70', async () => {
    expect.assertions(1);

    const numSolved = 100;
    const numWrong = 30;

    render(
      <ExerciseResults
        exerciseType={exerciseType}
        numSolved={numSolved}
        numWrong={numWrong}
        timeElapsed={timeElapsed}
        onRestart={onRestart}
      />,
    );

    expect(screen.getByTestId('exercise-results-advice')).toHaveTextContent(
      'Keep studying!',
    );
  });

  it('renders the component and shows type-specific advice when score < 100', () => {
    expect.assertions(2);

    const numSolved = 100;
    const numWrong = 1;

    const { rerender } = render(
      <ExerciseResults
        exerciseType="MULTIPLE_CHOICE"
        numSolved={numSolved}
        numWrong={numWrong}
        timeElapsed={timeElapsed}
        onRestart={onRestart}
      />,
    );

    expect(screen.getByTestId('exercise-results-advice')).toHaveTextContent(
      // eslint-disable-next-line max-len
      'Nice work! The answers you selected that were wrong are outlined in red. The correct answers are outlined in blue. Review these problems before trying again.',
    );

    rerender(
      <ExerciseResults
        exerciseType="WRITING_PRACTICE"
        numSolved={numSolved}
        numWrong={numWrong}
        timeElapsed={timeElapsed}
        onRestart={onRestart}
      />,
    );

    expect(screen.getByTestId('exercise-results-advice')).toHaveTextContent(
      // eslint-disable-next-line max-len
      'Nice work! The items outlined in red were answered wrong before finding the correct answer. Review these problems before trying again.',
    );
  });
});

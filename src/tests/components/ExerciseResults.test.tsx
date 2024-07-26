import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import formatTimer from '@/utils/time';
import ExerciseResults from '@/components/ExerciseResults';

describe('component/ExerciseResults', () => {
  it('renders the ExerciseResults component and triggers onStart() when appropriate', async () => {
    const user = userEvent.setup();
    const numSolved = 100;
    const numWrong = 0;
    const score = Math.floor(((numSolved - numWrong) / numSolved) * 100);
    const timeElapsed = 50;
    const onRestart = vi.fn();

    render(
      <ExerciseResults
        numSolved={numSolved}
        numWrong={numWrong}
        timeElapsed={timeElapsed}
        onRestart={onRestart}
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
    expect(onRestart).toHaveBeenCalledOnce();
  });

  it('renders the ExerciseResults component and shows advice when score > 70 and < 100', async () => {
    const numSolved = 100;
    const numWrong = 25;
    const timeElapsed = 50;
    const onRestart = vi.fn();

    render(
      <ExerciseResults
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

  it('renders the ExerciseResults component and shows advice when score <= 70', async () => {
    const numSolved = 100;
    const numWrong = 30;
    const timeElapsed = 50;
    const onRestart = vi.fn();

    render(
      <ExerciseResults
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
});

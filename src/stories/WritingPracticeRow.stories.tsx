import type { ComponentProps, ReactNode } from 'react';
import { Provider } from 'react-redux';
import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';
import { setupStore } from '@/app/store';
import WritingPracticeRow from '@/components/WritingPracticeRow';
import type { Question, WritingPracticeExercise } from '@/data/exercise';
import Genki3Exercise01 from '@/data/genki-3/exercises/hiragana-0-0.json';
import initializeState from '@/utils/writingPractice';

export const WritingPracticeRowActionsData = {
  onRowComplete: fn(),
};

type WritingPracticeRowPropsAndCustomArgs = ComponentProps<
  typeof WritingPracticeRow
>;

const meta: Meta<WritingPracticeRowPropsAndCustomArgs> = {
  component: WritingPracticeRow,
  title: 'Writing Practice Row',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {
    ...WritingPracticeRowActionsData,
  },
};

export default meta;

const question: Question = {
  content: 'あ',
  choices: {
    correctId: '1',
  },
};

const NUM_REPETITIONS = 6;

const data = {
  ...Genki3Exercise01,
  title: 'Hiragana (p. 20-21)',
} as WritingPracticeExercise;

function MockRoot({ children }: { children: ReactNode }) {
  return (
    <Provider store={setupStore({ writingPractice: initializeState(data) })}>
      <div
        style={{
          display: 'grid',
          gap: '8px',
          gridTemplateColumns: `repeat(${NUM_REPETITIONS + 1}, minmax(0, 1fr))`,
          width: '50vw',
        }}
      >
        {children}
      </div>
    </Provider>
  );
}

export const Default: Meta<WritingPracticeRowPropsAndCustomArgs> = {
  args: {
    numExamples: 3,
    numRepetitions: NUM_REPETITIONS,
    question,
    rowNumber: 0,
  },
  decorators: [
    (Story) => (
      <MockRoot>
        <Story />
      </MockRoot>
    ),
  ],
};

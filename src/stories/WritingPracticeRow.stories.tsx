import type { ComponentProps } from 'react';
import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';
import WritingPracticeRow from '@/components/WritingPracticeRow';
import type { Question } from '@/data/exercise';

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

export const Default: Meta<WritingPracticeRowPropsAndCustomArgs> = {
  args: {
    numExamples: 3,
    numRepetitions: NUM_REPETITIONS,
    question,
    rowNumber: 0,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'grid',
          gap: '8px',
          gridTemplateColumns: `repeat(${NUM_REPETITIONS + 1}, minmax(0, 1fr))`,
          width: '50vw',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

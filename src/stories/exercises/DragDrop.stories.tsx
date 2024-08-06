import { ComponentProps, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import DragDropExercise from '@/components/exercises/DragDrop';
import Genki3Exercise01 from '@/data/genki-3/exercises/hiragana-0-0.json';
import { setupStore } from '@/app/store';
import type { DragDropExercise as DragDropExerciseType } from '@/data/exercise';
import { initializeState } from '@/utils/dragDrop';

type DragDropExercisePropsAndCustomArgs = ComponentProps<
  typeof DragDropExercise
>;

type MockComponentProps = {
  children: ReactNode;
};

const data = {
  ...Genki3Exercise01,
  title: 'Hiragana (p. 20-21)',
} as DragDropExerciseType;

function MockRoot({ children }: MockComponentProps) {
  return (
    <Provider store={setupStore({ dragDrop: initializeState(data) })}>
      {children}
    </Provider>
  );
}

const meta: Meta<DragDropExercisePropsAndCustomArgs> = {
  component: DragDropExercise,
  title: 'Drag & Drop Exercise',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {},
  decorators: [
    (Story) => (
      <MockRoot>
        <Story />
      </MockRoot>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof DragDropExercise>;

export const Default: Story = {
  args: {
    data,
  },
};

import { ComponentProps, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import DragDropExercise from '@/components/exercises/DragDrop';
import Genki3Exercise01 from '@/data/genki-3/exercises/hiragana-0.json';
import { store } from '@/app/store';
import type { DragDropExercise as DragDropExerciseType } from '@/data/exercise';

type DragDropExercisePropsAndCustomArgs = ComponentProps<
  typeof DragDropExercise
>;

type MockRootProps = {
  children: ReactNode;
};

function MockRoot({ children }: MockRootProps) {
  return <Provider store={store}>{children}</Provider>;
}

const meta: Meta<DragDropExercisePropsAndCustomArgs> = {
  component: DragDropExercise,
  title: 'Drag & Drop Exercise',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {},
};

export default meta;

const data = {
  ...Genki3Exercise01,
  title: '"Hiragana (p. 20-21)',
} as DragDropExerciseType;

type Story = StoryObj<typeof DragDropExercise>;

export const DefaultHorizontal: Story = {
  args: {
    data,
  },
  decorators: [(story) => <MockRoot>{story()}</MockRoot>],
};

export const DefaultVertical: Story = {
  args: {
    data: {
      ...data,
      meta: {
        DRAG_DROP: {
          ...Genki3Exercise01.meta.DRAG_DROP,
          supportedLayouts: ['VERTICAL'],
        },
      },
    } as DragDropExerciseType,
  },
  decorators: [(story) => <MockRoot>{story()}</MockRoot>],
};

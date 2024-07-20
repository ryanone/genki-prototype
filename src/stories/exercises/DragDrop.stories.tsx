import { ComponentProps, useEffect, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import DragDropExercise from '@/components/exercises/DragDrop';
import Genki3Exercise01 from '@/data/genki-3/exercises/hiragana-0.json';
import { initialize } from '@/features/dragDrop/dragDropSlice';
import { store, type RootState } from '@/app/store';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import type { DragDropExercise as DragDropExerciseType } from '@/data/exercise';

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
  return <Provider store={store}>{children}</Provider>;
}

function MockExerciseRenderer({ children }: MockComponentProps) {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(
    (state: RootState) => state.dragDrop.initialized,
  );
  useEffect(() => {
    dispatch(initialize({ exercise: data }));
  }, [dispatch]);

  return <div>{isInitialized ? children : null}</div>;
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
        <MockExerciseRenderer>
          <Story />
        </MockExerciseRenderer>
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

import { ComponentProps, useEffect, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import MultipleChoiceExercise from '@/components/exercises/MultipleChoice';
import Genki3Exercise01 from '@/data/genki-3/exercises/hiragana-0.json';
import { initialize } from '@/features/multipleChoice/multipleChoiceSlice';
import { store, type RootState } from '@/app/store';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import type { MultipleChoiceExercise as MultipleChoiceExerciseType } from '@/data/exercise';

type MultipleChoiceExercisePropsAndCustomArgs = ComponentProps<
  typeof MultipleChoiceExercise
>;

type MockComponentProps = {
  children: ReactNode;
};

const data = {
  ...Genki3Exercise01,
  title: 'Hiragana (p. 20-21)',
} as MultipleChoiceExerciseType;

function MockRoot({ children }: MockComponentProps) {
  return <Provider store={store}>{children}</Provider>;
}

function MockExerciseRenderer({ children }: MockComponentProps) {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(
    (state: RootState) => state.multipleChoice.initialized,
  );
  useEffect(() => {
    dispatch(initialize({ exercise: data }));
  }, [dispatch]);

  return <div style={{ width: '50vw' }}>{isInitialized ? children : null}</div>;
}

const meta: Meta<MultipleChoiceExercisePropsAndCustomArgs> = {
  component: MultipleChoiceExercise,
  title: 'Multiple Choice Exercise',
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

type Story = StoryObj<typeof MultipleChoiceExercise>;

export const Default: Story = {
  args: {},
};

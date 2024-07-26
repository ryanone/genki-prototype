import { fn } from '@storybook/test';
import type { ComponentProps } from 'react';
import type { Meta } from '@storybook/react';
import ChoiceInput from '@/components/ChoiceInput';

export const ChoiceInputActionsData = {
  onChange: fn(),
};

type ChoiceInputPropsAndCustomArgs = ComponentProps<typeof ChoiceInput>;

const meta: Meta<ChoiceInputPropsAndCustomArgs> = {
  component: ChoiceInput,
  title: 'Choice Input',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {
    ...ChoiceInputActionsData,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '25vw' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default = {
  args: {
    questionContent: 'あ',
  },
};

import { fn } from '@storybook/test';
import type { ComponentProps } from 'react';
import type { Meta } from '@storybook/react';
import ShortAnswerInput from '@/components/ShortAnswerInput';

export const ShortAnswerInputActionsData = {
  onChange: fn(),
};

type ShortAnswerInputPropsAndCustomArgs = ComponentProps<
  typeof ShortAnswerInput
>;

const meta: Meta<ShortAnswerInputPropsAndCustomArgs> = {
  component: ShortAnswerInput,
  title: 'Short Answer Input',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {
    ...ShortAnswerInputActionsData,
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
  args: {},
};

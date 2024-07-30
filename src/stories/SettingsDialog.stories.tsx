import type { ComponentProps } from 'react';
import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';
import SettingsDialog from '@/components/SettingsDialog';
import ShowFuriganaProvider from '@/provider/ShowFuriganaProvider';
import ThemeProvider from '@/provider/ThemeProvider';

type SettingsDialogPropsAndCustomArgs = ComponentProps<typeof SettingsDialog>;

export const SettingsDialogActionsData = {
  onClose: fn(),
};

const meta: Meta<SettingsDialogPropsAndCustomArgs> = {
  component: SettingsDialog,
  title: 'Settings Dialog',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {
    ...SettingsDialogActionsData,
    isOpen: false,
  },
  decorators: [
    (Story) => (
      <ShowFuriganaProvider>
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      </ShowFuriganaProvider>
    ),
  ],
};

export default meta;

export const DefaultOpen = {
  args: {
    isOpen: true,
  },
};

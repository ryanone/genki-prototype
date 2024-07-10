import SettingsDialog from '@/components/SettingsDialog';
import ThemeProvider from '@/provider/ThemeProvider';
import { fn } from '@storybook/test';

export const SettingsDialogActionsData = {
  onClose: fn(),
};


export default {
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
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    )
  ]
};

export const DefaultOpen = {
  args: {
    isOpen: true,
  },
};
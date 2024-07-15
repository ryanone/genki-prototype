import { fn } from '@storybook/test';
import SettingsDialog from '@/components/SettingsDialog';
import ThemeProvider from '@/provider/ThemeProvider';

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
    ),
  ],
};

export const DefaultOpen = {
  args: {
    isOpen: true,
  },
};

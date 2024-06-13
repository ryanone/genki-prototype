import ReviewDialog from './ReviewDialog';
import { fn } from '@storybook/test';

export const ReviewDialogActionsData = {
  onConfirm: fn(),
};

export default {
  component: ReviewDialog,
  title: 'ReviewDialog',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {
    ...ReviewDialogActionsData,
    isOpen: false,
  },
};

export const DefaultOpen = {
  args: {
    isOpen: true,
  },
};

export const DefaultOpenWithCancel = {
  args: {
    isOpen: true,
    onCancel: fn(),
  },
};
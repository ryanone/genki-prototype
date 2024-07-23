import { createContext } from 'react';

export type MultipleChoiceQuestionFeedback = 'AT_END' | 'INSTANT';

export type MultipleChoiceSettings = {
  feedback: MultipleChoiceQuestionFeedback;
};

type MultipleChoiceSettingsContextValue = {
  setSettings: (value?: MultipleChoiceSettings) => void;
  settings: MultipleChoiceSettings;
};

const MultipleChoiceSettingsContext = createContext({
  settings: {
    feedback: 'INSTANT',
  },
  setSettings: (value?: MultipleChoiceSettings) => {
    console.error(
      'MultipleChoiceSettingsContext: `setSettings()` not implemented: %o',
      value,
    );
  },
} as MultipleChoiceSettingsContextValue);

export default MultipleChoiceSettingsContext;

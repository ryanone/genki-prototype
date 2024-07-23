import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import MultipleChoiceSettingsContext, {
  type MultipleChoiceSettings,
} from '@/context/MultipleChoiceSettingsContext';

const SETTINGS_KEY = 'multipleChoiceSettings';

type MultipleChoiceSettingsProviderProps = {
  children: ReactNode;
};

const DEFAULT_SETTINGS: MultipleChoiceSettings = {
  feedback: 'INSTANT',
};

export default function MultipleChoiceSettingsProvider({
  children,
}: MultipleChoiceSettingsProviderProps) {
  const [settings, setSettings] =
    useState<MultipleChoiceSettings>(DEFAULT_SETTINGS);
  const handleSetSettings = useCallback((s?: MultipleChoiceSettings) => {
    if (s) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
      setSettings(s);
    } else {
      localStorage.removeItem(SETTINGS_KEY);
    }
  }, []);

  useEffect(() => {
    const initialSettingsStr = localStorage.getItem(SETTINGS_KEY);
    if (initialSettingsStr) {
      setSettings(JSON.parse(initialSettingsStr));
    } else {
      setSettings(DEFAULT_SETTINGS);
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
    }
  }, []);

  const providerValue = useMemo(
    () => ({
      settings,
      setSettings: handleSetSettings,
    }),
    [handleSetSettings, settings],
  );

  return (
    <MultipleChoiceSettingsContext.Provider value={providerValue}>
      {children}
    </MultipleChoiceSettingsContext.Provider>
  );
}

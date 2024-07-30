import { useContext, useId, type ChangeEvent } from 'react';
import Dialog from '@/components/Dialog';
import DialogActions from '@/components/Dialog/Actions';
import DialogContent from '@/components/Dialog/Content';
import DialogHeader from '@/components/Dialog/Header';
import MultipleChoiceSettingsContext, {
  type MultipleChoiceQuestionFeedback,
} from '@/context/MultipleChoiceSettingsContext';
import ShowFuriganaContext from '@/context/ShowFuriganaContext';
import ThemeContext, { type Theme } from '@/context/ThemeContext';
import commonStyles from '@/styles/common.module.css';
import styles from './SettingsDialog.module.css';

type SettingsDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SettingsDialog({
  isOpen,
  onClose,
}: SettingsDialogProps) {
  const { theme, setTheme } = useContext(ThemeContext);
  const { showFurigana, setShowFurigana } = useContext(ShowFuriganaContext);
  const {
    settings: multipleChoiceSettings,
    setSettings: setMultipleChoiceSettings,
  } = useContext(MultipleChoiceSettingsContext);
  const multipleChoiceSelectId = useId();

  const handleDarkModeChange = (value: Theme) => {
    setTheme(value);
  };

  const handleClose = () => {
    onClose();
  };

  const handleMultipleChoiceFeedbackChange = (
    e: ChangeEvent<HTMLSelectElement>,
  ) => {
    setMultipleChoiceSettings({
      feedback: e.target.value as MultipleChoiceQuestionFeedback,
    });
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose}>
      <DialogHeader>Settings</DialogHeader>
      <DialogContent>
        <div className={styles.heading}>Display</div>
        <dl className={styles.settings}>
          <dt className={styles.darkModeSettingName}>Dark mode</dt>
          <dd className={styles.settingContent}>
            <ul className={styles.list}>
              <li>
                <label className={styles.label}>
                  <input
                    className={styles.radio}
                    type="radio"
                    name="darkMode"
                    value=""
                    defaultChecked={!theme}
                    onClick={() => handleDarkModeChange(null)}
                  />
                  Device settings
                </label>
              </li>
              <li>
                <label className={styles.label}>
                  <input
                    className={styles.radio}
                    type="radio"
                    name="darkMode"
                    value="light"
                    defaultChecked={theme === 'light'}
                    onClick={() => handleDarkModeChange('light')}
                  />
                  Off
                </label>
              </li>
              <li>
                <label className={styles.label}>
                  <input
                    className={styles.radio}
                    type="radio"
                    name="darkMode"
                    value="dark"
                    defaultChecked={theme === 'dark'}
                    onClick={() => handleDarkModeChange('dark')}
                  />
                  Dark
                </label>
              </li>
            </ul>
          </dd>
        </dl>
        <div className={styles.heading}>Exercises</div>
        <dl className={styles.settings}>
          <dt className={styles.settingName}>
            <label htmlFor={multipleChoiceSelectId}>
              Multiple Choice Feedback
            </label>
          </dt>
          <dd className={styles.settingContent}>
            <select
              className={commonStyles.select}
              onChange={handleMultipleChoiceFeedbackChange}
              value={multipleChoiceSettings.feedback}
              id={multipleChoiceSelectId}
            >
              <option value="INSTANT">Instant</option>
              <option value="AT_END">At end of exercise</option>
            </select>
          </dd>
          <dt className={styles.furiganaSettingName}>Furigana</dt>
          <dd className={styles.settingContent}>
            <ul className={styles.list}>
              <li>
                <label className={styles.label}>
                  <input
                    className={styles.radio}
                    type="radio"
                    name="furigana"
                    value="true"
                    defaultChecked={showFurigana}
                    onClick={() => setShowFurigana(true)}
                  />
                  On
                </label>
              </li>
              <li>
                <label className={styles.label}>
                  <input
                    className={styles.radio}
                    type="radio"
                    name="furigana"
                    value="false"
                    defaultChecked={!showFurigana}
                    onClick={() => setShowFurigana(false)}
                  />
                  Off
                </label>
              </li>
            </ul>
          </dd>
        </dl>
      </DialogContent>
      <DialogActions onClose={handleClose} />
    </Dialog>
  );
}

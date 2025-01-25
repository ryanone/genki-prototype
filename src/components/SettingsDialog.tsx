import { useContext, useId, type ChangeEvent } from 'react';
import Dialog from '@/components/Dialog';
import DialogActions from '@/components/Dialog/Actions';
import DialogContent from '@/components/Dialog/Content';
import DialogHeader from '@/components/Dialog/Header';
import MultipleChoiceSettingsContext, {
  type MultipleChoiceQuestionFeedback,
} from '@/context/MultipleChoiceSettingsContext';
import ShowFuriganaContext from '@/context/ShowFuriganaContext';
import ThemeContext, { type OptionalThemeName } from '@/context/ThemeContext';
import * as commonStyles from '@/styles/common.css';
import { settingName } from './SettingsDialog.css';
import * as styles from './SettingsDialog.css';

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

  const handleDarkModeChange = (value: OptionalThemeName) => {
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
        <div className={styles.headingClass}>Display</div>
        <dl className={styles.settingsClass}>
          <dt className={settingName({ align: 'start' })}>Dark mode</dt>
          <dd className={styles.settingContentClass}>
            <ul className={styles.listClass}>
              <li>
                <label className={styles.labelClass}>
                  <input
                    className={styles.radioClass}
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
                <label className={styles.labelClass}>
                  <input
                    className={styles.radioClass}
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
                <label className={styles.labelClass}>
                  <input
                    className={styles.radioClass}
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
        <div className={styles.headingClass}>Exercises</div>
        <dl className={styles.settingsClass}>
          <dt className={settingName()}>
            <label htmlFor={multipleChoiceSelectId}>
              Multiple Choice Feedback
            </label>
          </dt>
          <dd className={styles.settingContentClass}>
            <select
              className={commonStyles.selectClass}
              onChange={handleMultipleChoiceFeedbackChange}
              value={multipleChoiceSettings.feedback}
              id={multipleChoiceSelectId}
            >
              <option value="INSTANT">Instant</option>
              <option value="AT_END">At end of exercise</option>
            </select>
          </dd>
          <dt className={settingName({ align: 'start' })}>Furigana</dt>
          <dd className={styles.settingContentClass}>
            <ul className={styles.listClass}>
              <li>
                <label className={styles.labelClass}>
                  <input
                    className={styles.radioClass}
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
                <label className={styles.labelClass}>
                  <input
                    className={styles.radioClass}
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

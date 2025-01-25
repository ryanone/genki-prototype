import * as styles from './WritingExample.css';

type WritingExampleProps = {
  alt?: string | undefined;
  content: string;
  showAlt?: boolean;
};

export default function WritingExample({
  alt,
  content,
  showAlt = false,
}: WritingExampleProps) {
  return (
    <div className={styles.writingExampleClass}>
      <div className={styles.contentClass}>{content}</div>
      {showAlt && alt && <div className={styles.altClass}>{alt}</div>}
    </div>
  );
}

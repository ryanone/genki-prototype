import styles from './WritingExample.module.css';

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
    <div className={styles.writingExample}>
      <div className={styles.content}>{content}</div>
      {showAlt && alt && <div className={styles.alt}>{alt}</div>}
    </div>
  );
}

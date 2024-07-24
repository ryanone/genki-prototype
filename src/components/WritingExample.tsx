import styles from './WritingExample.module.css';

type WritingExampleProps = {
  content: string;
};

export default function WritingExample({ content }: WritingExampleProps) {
  return (
    <div className={styles.writingExample}>
      <div className={styles.content}>{content}</div>
    </div>
  );
}

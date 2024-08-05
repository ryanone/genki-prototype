import styles from './Ruby.module.css';

type RubyProps = {
  alt?: string | undefined;
  content: string;
  showAlt: boolean;
};

export default function Ruby({ alt, content, showAlt }: RubyProps) {
  if (showAlt) {
    if (alt) {
      return (
        <ruby className={styles.ruby}>
          {content}
          <rt className={styles.rt}>{alt}</rt>
        </ruby>
      );
    }
  }
  return content;
}

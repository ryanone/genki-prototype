import { type Choice } from '@/data/exercise';
import styles from './WritingChoicesList.module.css';

type WritingChoicesListProps = {
  choices: Choice[];
};

export default function WritingChoicesList({
  choices,
}: WritingChoicesListProps) {
  return (
    <div className={styles.writingChoicesList}>
      {choices.map((c) => (
        <div key={c.id} className={styles.choice}>
          ({c.id}) {c.content}
        </div>
      ))}
    </div>
  );
}

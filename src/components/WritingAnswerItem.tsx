import ShortAnswerInput from '@/components/ShortAnswerInput';
import styles from './WritingAnswerItem.module.css';
import type { Item as ShortAnswerItem } from '@/features/shortAnswer/shortAnswerSlice';

type WritingAnswerItemProps = {
  data: ShortAnswerItem;
  index: number;
  onAnswerChange: (questionId: string, value: string) => void;
};

export default function WritingAnswerItem({
  data,
  index,
  onAnswerChange,
}: WritingAnswerItemProps) {
  const { question } = data;
  const handleShortAnswerInputChange = (value: string) => {
    onAnswerChange(question.id!, value);
  };
  return (
    <div className={styles.writingAnswerItem} role="listitem">
      <span className={styles.questionContent}>
        {index}. {question.content}
      </span>
      <ShortAnswerInput
        answerContent={data.correctChoiceContent}
        defaultValue={data.userAnswer}
        onChange={handleShortAnswerInputChange}
        result={data.result}
        width={data.width}
      />
    </div>
  );
}

import ShortAnswerInput from '@/components/ShortAnswerInput';
import type { Item as ShortAnswerItem } from '@/features/shortAnswer/slice';
import * as styles from './WritingAnswerItem.css';

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
    <div className={styles.writingAnswerItemClass} role="listitem">
      <span className={styles.questionContentClass}>
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

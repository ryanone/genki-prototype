import ChoiceList from '@/components/ChoiceList';
import { type ChoiceItem } from '@/components/ChoiceButton';
import { type Question } from '@/data/exercise';
import './MultipleChoiceQuestion.css';

type MultipleChoiceQuestionProps = {
  choices: ChoiceItem[];
  index: number;
  isDisabled?: boolean;
  question: Question;
  onChoiceSelect: (id: string) => void;
}

export default function MultipleChoiceQuestion({ choices, index, isDisabled, question, onChoiceSelect }: MultipleChoiceQuestionProps) {
  return (
    <div className="multiplechoicequestion">
      <div className="multiplechoicequestion__content">{index + 1}. {question.content}</div>
      <div className="multiplechoicequestion__choices-container">
        <ChoiceList choices={choices} isDisabled={isDisabled} onChoiceSelect={onChoiceSelect}/>
      </div>
    </div>
  )
}
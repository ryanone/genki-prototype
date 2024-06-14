import MultipleChoiceQuestion from '@/components/MultipleChoiceQuestion';
import type { ChoiceItem } from '@/components/ChoiceButton';
import type { Question } from '@/data/exercise';
import './AnswerList.css';

export type QuestionAnswer = {
  question: Question;
  choices: ChoiceItem[];
}

type AnswerListProps = {
  data: QuestionAnswer[];
};

export default function AnswerList({ data }: AnswerListProps) {
  return (
    <div className="answerlist">
      {
        data.map((item, i) =>
          <MultipleChoiceQuestion key={item.question.content} index={i} isDisabled={true} question={item.question} choices={item.choices}/>
        )
      }
    </div>
  )
}
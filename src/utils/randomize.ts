import type { Choice, Question } from '@/data/exercise';
import type { ChoiceData } from '@/features/multipleChoice/multipleChoiceSlice';

export function randomizeArray<T>(input: T[]): T[] {
  const copy = [...input];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function generateRandomChoices(
  question: Question,
  choices: Choice[],
  numChoices: number,
): ChoiceData[] {
  let availableChoices = [...choices];
  const randomChoices: ChoiceData[] = [];
  const correctChoice = choices.find(
    (c) => c.id === question.choices.correctId,
  )!;
  availableChoices = availableChoices.filter((c) => c.id !== correctChoice.id);
  randomChoices.push({ ...correctChoice });

  if (question.choices.suggestions) {
    question.choices.suggestions.forEach((choiceId) => {
      const choice = availableChoices.find((c) => c.id === choiceId)!;
      randomChoices.push({ ...choice });
    });
  } else {
    let numChoicesRemaining = numChoices - 1;
    while (numChoicesRemaining) {
      randomChoices.push({
        ...availableChoices.splice(
          Math.floor(Math.random() * availableChoices.length),
          1,
        )[0],
      });
      numChoicesRemaining -= 1;
    }
  }
  return randomizeArray(randomChoices) as ChoiceData[];
}

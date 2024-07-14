import type { Exercise } from '@/data/exercise';
import type { ChoiceItem } from '@/components/ChoiceButton';

export function randomizeArray<T>(input: T[]): T[] {
  const copy = [...input];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function generateRandomChoices(data: Exercise, questionKey: string, numChoices: number): ChoiceItem[] {
  const question = data.questions.find((q) => q.content === questionKey);
  let availableChoices = [...data.choices];
  const randomChoices: ChoiceItem[] = [];
  if (question) {
    const correctChoice = data.choices.find((c) => c.id === question.choices.correctId);
    if (correctChoice) {
      availableChoices = availableChoices.filter((c) => c.id !== correctChoice.id);
      randomChoices.push({ ...correctChoice });
      numChoices--;
    }
    while (numChoices) {
      randomChoices.push(
        {
          ...availableChoices.splice(
            Math.floor(Math.random() * availableChoices.length),
            1,
          )[0],
        },
      );
      numChoices--;
    }
    return randomizeArray(randomChoices) as ChoiceItem[];
  }
  return randomChoices;
}

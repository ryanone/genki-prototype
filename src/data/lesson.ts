export type Lesson = {
  title: string;
  id: string;
  exercisesId: string;
}

export type ExerciseInfo = {
  title: string;
  id: string;
}

export type LessonExercises = {
  exercises: ExerciseInfo[];
}
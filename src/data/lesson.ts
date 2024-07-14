export type Lesson = {
  description: string;
  title: string;
  id: string;
  exercisesId: string;
};

export type ExerciseInfo = {
  title: string;
  id: string;
};

export type LessonExercises = {
  sections: LessonSection[];
};

export type LessonSection = {
  content: string;
  exercises: ExerciseInfo[];
};

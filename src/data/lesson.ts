export type Lesson = {
  description: string;
  exercisesId: string;
  id: string;
  title: string;
};

export type ExerciseInfo = {
  id: string;
  title: string;
};

export type LessonExercises = {
  sections: LessonSection[];
};

export type LessonSection = {
  content: string;
  exercises: ExerciseInfo[];
};

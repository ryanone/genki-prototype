import type { Lesson } from '@/data/lesson';

export type Book = {
  description: string;
  id: string;
  introduction: string;
  lessons: Lesson[];
  title: string;
};

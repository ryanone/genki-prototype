import type { Lesson } from '@/data/lesson';

export type Book = {
  description: string;
  title: string;
  lessons: Lesson[];
};
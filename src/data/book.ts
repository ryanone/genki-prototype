import type { Lesson } from '@/data/lesson';

export type Book = {
  description: string;
  id: string;
  title: string;
  lessons: Lesson[];
};
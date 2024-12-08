import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ExerciseLink from '@/components/ExerciseLink';
import type { ExerciseInfo } from '@/data/lesson';

describe('component/ExerciseLink', () => {
  it('renders the component', () => {
    expect.assertions(2);

    const bookId = 'xyz';
    const lessonId = 'abc';
    const exercise: ExerciseInfo = {
      id: '123',
      title: 'Lorem ipsum',
    };

    render(
      <MemoryRouter>
        <ExerciseLink bookId={bookId} exercise={exercise} lessonId={lessonId} />
      </MemoryRouter>,
    );

    const link: HTMLAnchorElement = screen.getByRole('link');

    expect(link).toBeInTheDocument();

    const url = new URL(link.href);

    expect(url.pathname).toBe(
      `/${bookId}/lesson/${lessonId}/exercise/${exercise.id}`,
    );
  });
});

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ExercisesSection from '@/components/ExercisesSection';
import Genki3Lesson0 from '@/data/genki-3/lessons/lesson-0.json';

describe('component/ExercisesSection', () => {
  it('renders the component', () => {
    expect.assertions(2);

    const bookId = 'genki-3';
    const lessonId = '0';
    const section = Genki3Lesson0.sections[0];
    render(
      <MemoryRouter>
        <ExercisesSection
          bookId={bookId}
          lessonId={lessonId}
          section={section}
        />
      </MemoryRouter>,
    );

    const heading = screen.getByTestId('exercises-section-heading');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(section.content);
  });
});

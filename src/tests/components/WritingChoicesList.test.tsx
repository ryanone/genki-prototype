import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Genki3WordMatch20 from '@/data/genki-3/exercises/word-match-2-0.json';
import WritingChoicesList from '@/components/WritingChoicesList';

const { choices } = Genki3WordMatch20;

describe('component/WritingChoicesList', () => {
  it('renders the component', () => {
    expect.assertions(choices.length);
    render(<WritingChoicesList choices={choices} />);
    choices.forEach((c) => {
      const content = `(${c.id}) ${c.content}`;
      expect(screen.getByText(content)).toBeInTheDocument();
    });
  });
});

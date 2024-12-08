import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Accordion from '@/components/Accordion';

const sections = [
  {
    id: '1',
    title: 'Lorem ipsum 1',
    content: 'Lorem ipsum dolor 1',
  },
  {
    id: '2',
    title: 'Lorem ipsum 2',
    content: 'Lorem ipsum dolor 2',
  },
];

describe('components/Accordion', () => {
  it('renders the component', async () => {
    expect.assertions(4);

    render(<Accordion sections={sections} />);
    const buttons = screen.getAllByRole('button', { expanded: false });

    expect(buttons).toHaveLength(sections.length);
    expect(buttons[0]).toHaveTextContent(sections[0].title);
    expect(buttons[1]).toHaveTextContent(sections[1].title);

    const regions = screen.getAllByRole('region', { hidden: true });

    expect(regions).toHaveLength(sections.length);
  });

  it('renders a section as expanded if defaultExpanded is true', async () => {
    expect.assertions(7);

    const newSections = sections.map((s, i) => {
      if (i === 1) {
        return {
          ...s,
          defaultExpanded: true,
        };
      }
      return { ...s };
    });
    render(<Accordion sections={newSections} />);
    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(newSections.length);
    expect(buttons[0]).toHaveTextContent(newSections[0].title);
    expect(buttons[1]).toHaveTextContent(newSections[1].title);
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');

    const visibleRegions = screen.getAllByRole('region', { hidden: false });

    expect(visibleRegions).toHaveLength(1);
    expect(visibleRegions[0].getAttribute('hidden')).toBeFalsy();
    expect(visibleRegions[0]).toHaveTextContent(newSections[1].content);
  });

  it('expands/collapses a section as expanded', async () => {
    expect.assertions(8);

    const user = userEvent.setup();
    render(<Accordion sections={sections} />);
    const buttons = screen.getAllByRole('button', { expanded: false });

    expect(buttons).toHaveLength(sections.length);

    await user.click(buttons[1]);
    const expandedButtons = screen.getAllByRole('button', { expanded: true });

    expect(expandedButtons).toHaveLength(1);
    expect(expandedButtons[0]).toHaveTextContent(sections[1].title);

    const regions = screen.getAllByTestId('accordion-content');

    expect(regions[1].getAttribute('hidden')).toBeFalsy();
    expect(regions[1]).toHaveTextContent(sections[1].content);
    expect(regions[0].getAttribute('hidden')).toBe('');

    await user.click(expandedButtons[1]);

    expect(screen.getAllByRole('button', { expanded: false })).toHaveLength(
      sections.length,
    );
    expect(regions[1].getAttribute('hidden')).toBeFalsy();
  });

  it('should collapse a section if another section is expanded', async () => {
    expect.assertions(5);

    const user = userEvent.setup();
    render(<Accordion sections={sections} />);
    const buttons = screen.getAllByRole('button', { expanded: false });

    expect(buttons).toHaveLength(sections.length);

    await user.click(buttons[0]);
    let expandedButtons = screen.getAllByRole('button', { expanded: true });

    expect(expandedButtons).toHaveLength(1);
    expect(expandedButtons[0]).toHaveTextContent(sections[0].title);

    await user.click(buttons[1]);
    expandedButtons = screen.getAllByRole('button', { expanded: true });

    expect(expandedButtons).toHaveLength(1);
    expect(expandedButtons[0]).toHaveTextContent(sections[1].title);
  });

  it('allows multiple sections to be expanded simultaneously, if allowMultipleExpanded is true', async () => {
    expect.assertions(5);

    const user = userEvent.setup();
    render(
      <Accordion
        sections={sections}
        options={{ allowMultipleExpanded: true }}
      />,
    );
    const buttons = screen.getAllByRole('button', { expanded: false });

    expect(buttons).toHaveLength(sections.length);

    await user.click(buttons[0]);
    let expandedButtons = screen.getAllByRole('button', { expanded: true });

    expect(expandedButtons).toHaveLength(1);
    expect(expandedButtons[0]).toHaveTextContent(sections[0].title);

    await user.click(buttons[1]);
    expandedButtons = screen.getAllByRole('button', { expanded: true });

    expect(expandedButtons).toHaveLength(2);
    expect(expandedButtons[1]).toHaveTextContent(sections[1].title);
  });
});

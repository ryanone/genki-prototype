import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DraggableItem from '@/components/DraggableItem';

describe('component/DraggableItem', () => {
  it('renders the component and calls events when appropriate', async () => {
    expect.assertions(5);

    const user = userEvent.setup();
    const val = {
      content: 'Lorem ipsum',
      id: '1',
    };
    const onSelect = vi.fn();
    const onUnselect = vi.fn();
    render(
      <DraggableItem val={val} onSelect={onSelect} onUnselect={onUnselect} />,
    );
    const draggableItem = screen.getByRole('button');

    expect(draggableItem).toBeInTheDocument();

    await user.click(draggableItem);

    expect(onSelect).toHaveBeenNthCalledWith(1, val.id);

    await user.keyboard('{Enter}');

    expect(onSelect).toHaveBeenNthCalledWith(2, val.id);
    expect(onUnselect).toHaveBeenCalledTimes(0);

    fireEvent.dragEnd(draggableItem);

    expect(onUnselect).toHaveBeenCalledOnce();
  });
});

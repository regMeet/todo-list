import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ChallengeComponent } from '../ChallengeComponent';
import userEvent from '@testing-library/user-event';

describe('<ChallengeComponent />', () => {
  function renderComponent() {
    return render(<ChallengeComponent />);
  }

  it('should render ChallengeComponent component', async () => {
    const { container } = renderComponent();
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();

    expect(container.getElementsByClassName('todo-list')).toBeDefined();
    expect(container.getElementsByClassName('inprogress-list')).toBeDefined();
    expect(container.getElementsByClassName('done-list')).toBeDefined();
  });

  it('should add new task', async () => {
    const { container } = renderComponent();

    const input = screen.queryByLabelText('Add task')!;

    fireEvent.change(input, { target: { value: 'new task written' } });

    userEvent.click(container.getElementsByClassName('add-task-button')[0]);

    expect(container.getElementsByClassName('task-ui').length).toBe(1);
  });
});

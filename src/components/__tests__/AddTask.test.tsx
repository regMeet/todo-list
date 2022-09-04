import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ChallengeComponent } from '../ChallengeComponent';
import userEvent from '@testing-library/user-event';
import { AddTask } from '../AddTask';

describe('<AddTask />', () => {
  function renderComponent() {
    const addTaskMock = jest.fn();

    return { ...render(<AddTask addNewTask={addTaskMock} />), addTaskMock };
  }

  it('should call add new task', async () => {
    const description = 'new task written';
    const { addTaskMock, container } = renderComponent();

    const input = screen.queryByLabelText('Add task')!;

    fireEvent.change(input, { target: { value: description } });

    userEvent.click(container.getElementsByClassName('add-task-button')[0]);

    expect(addTaskMock).toBeCalledWith(description);
  });
});

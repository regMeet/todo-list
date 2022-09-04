import { Box } from '@mui/material';
import { useState } from 'react';
import { TaskList, AddTask } from '.';
import { BoardStatus, Status, Task } from './types';

export function ChallengeComponent() {
  const [tasks, setTasks] = useState<Task[]>([]);
  // unique id
  const [counter, setCounter] = useState(0);

  const todoTasks = tasks.filter((t) => t.status === Status.TODO);
  const inProgressTasks = tasks.filter((t) => t.status === Status.IN_PROGRESS);
  const doneTasks = tasks.filter((t) => t.status === Status.DONE);

  const handleAddTask = (description: string) => {
    setTasks([
      ...tasks,
      {
        id: counter,
        description,
        status: Status.TODO
      }
    ]);
    setCounter((prev) => prev + 1);
  };

  const handleMoveBack = (id: number) => {
    const newTasks = tasks.map((t) =>
      t.id !== id ? t : { ...t, status: BoardStatus[t.status - 1] }
    );
    setTasks(newTasks);
  };

  const handleMoveForward = (id: number) => {
    const newTasks = tasks.map((t) =>
      t.id !== id ? t : { ...t, status: BoardStatus[t.status + 1] }
    );
    setTasks(newTasks);
  };

  return (
    <Box margin={4} data-testid="board">
      <Box display="flex" justifyContent="space-between" marginBottom={4}>
        <TaskList
          name="To Do"
          className="todo-list"
          itemList={todoTasks}
          moveBack={handleMoveBack}
          moveForward={handleMoveForward}
        />
        <TaskList
          name="In Progress"
          className="inprogress-list"
          itemList={inProgressTasks}
          moveBack={handleMoveBack}
          moveForward={handleMoveForward}
        />
        <TaskList
          name="Done"
          className="done-list"
          itemList={doneTasks}
          moveBack={handleMoveBack}
          moveForward={handleMoveForward}
        />
      </Box>
      <AddTask addNewTask={handleAddTask} />
    </Box>
  );
}

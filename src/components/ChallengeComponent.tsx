import { Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { TaskList, AddTask } from '.';
import { BoardStatus, Status, Task, TaskResponse } from './types';

const ISSUES_URL = 'https://api.github.com/repos/every-io/demo-issues/issues?state=all';

export function ChallengeComponent() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  // unique id
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    async function getIssues() {
      const response = await (await fetch(ISSUES_URL)).json();

      const taskArray: Task[] = response.map(({ title, state, id }: TaskResponse) => ({
        description: title,
        status: state === 'open' ? Status.TODO : Status.DONE,
        id
      }));
      setTasks(taskArray);
      setLoading(false);
    }
    getIssues();
  }, []);

  const todoTasks = tasks.filter((t) => t.status === Status.TODO);
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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

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

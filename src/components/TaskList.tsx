import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { TaskUI } from './TaskUI';
import { Task } from './types';

interface Props {
  name: string;
  className: string;
  itemList: Task[];
  moveBack: (id: number) => void;
  moveForward: (id: number) => void;
}

export function TaskList({ name, itemList, moveBack, moveForward, className }: Props) {
  return (
    <Box
      border={`1px solid ${grey[300]}`}
      width="45%"
      height="60vh"
      overflow="auto"
      boxShadow={3}
      borderRadius={1}
      className={className}
    >
      <Typography align="center" variant="h1" fontSize={24} sx={{ fontWeight: 'bold' }} marginY={3}>
        {name}
      </Typography>
      {itemList.map((task, i) => (
        <TaskUI key={i} task={task} moveBack={moveBack} moveForward={moveForward} />
      ))}
    </Box>
  );
}

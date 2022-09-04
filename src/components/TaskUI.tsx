import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { green, red } from '@mui/material/colors';
import { BoardStatus, Task } from './types';

interface Props {
  task: Task;
  moveBack: (id: number) => void;
  moveForward: (id: number) => void;
}

export function TaskUI({ task, moveBack, moveForward }: Props) {
  const first = task.status === BoardStatus[0];
  const last = task.status === BoardStatus[BoardStatus.length - 1];

  return (
    <Box
      display="flex"
      marginBottom={3}
      justifyContent="space-between"
      marginX={2}
      boxShadow={3}
      borderRadius={2}
      className="task-ui"
    >
      <IconButton disabled={first} onClick={() => moveBack(task.id)}>
        <ArrowBackIcon
          sx={{
            background: first ? red[100] : red[500],
            color: 'white',
            borderRadius: 1,
            height: '40px',
            width: '30px'
          }}
        />
      </IconButton>

      <Typography
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          alignItems: 'center',
          WebkitLineClamp: '2',
          WebkitBoxOrient: 'vertical'
        }}
      >
        {task.description}
      </Typography>

      <IconButton disabled={last} onClick={() => moveForward(task.id)}>
        <ArrowForwardIcon
          sx={{
            background: last ? green[200] : green[500],
            color: 'white',
            borderRadius: 1,
            height: '40px',
            width: '30px'
          }}
        />
      </IconButton>
    </Box>
  );
}

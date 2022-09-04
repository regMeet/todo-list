import { Box, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import { useState } from 'react';

interface Props {
  addNewTask: (newTask: string) => void;
}

export function AddTask({ addNewTask }: Props) {
  const [description, setDescription] = useState('');

  const handleOnKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      handleAddTask();
    }
  };

  const handleAddTask = () => {
    if (!description) return;
    addNewTask(description);
    setDescription('');
  };

  return (
    <Box display="flex" width="30%" justifyContent="space-between">
      <Box
        component={TextField}
        className="new-task-field"
        id="outlined-basic"
        label="Add task"
        variant="outlined"
        placeholder="Write a new task.."
        value={description}
        onChange={(e: any) => setDescription(e.target.value)}
        onKeyDown={handleOnKeyDown}
        width="90%"
        autoFocus
      />
      <Box
        marginLeft={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
        onClick={handleAddTask}
      >
        <AddIcon
          className="add-task-button"
          fontSize="large"
          sx={{ background: blue[500], color: 'white' }}
        />
      </Box>
    </Box>
  );
}

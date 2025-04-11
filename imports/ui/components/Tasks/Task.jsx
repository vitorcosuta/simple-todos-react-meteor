import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from "react-router-dom";
import { ListItem } from '@mui/material';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AssignmentLateTwoToneIcon from '@mui/icons-material/AssignmentLateTwoTone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const taskStatuses = [
  'Cadastrada',
  'Em andamento',
  'Concluída',
];

export const Task = ({ task, username, currentUserId, onDeleteClick }) => {

  const status = task?.status ?? '';

  const [taskStatus, setTaskStatus] = useState(status); 

  const handleSelectChange = async (e) => {

    const selectedStatus = e.target.value;

    setTaskStatus(selectedStatus);

    await Meteor.callAsync('tasks.changeStatus', {
        _id: task._id,
        status: selectedStatus,
    });
  };

  const decideDisabledUpdates = !(task.userId === currentUserId);

  const decideDisabledOptions = (selectedStatus) => {
    if (taskStatus === 'Cadastrada' && selectedStatus === 'Concluída') {
      return true;
    }

    if (taskStatus === 'Concluída' && selectedStatus === 'Em andamento') {
      return true;
    }

    return false;
  }

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <AssignmentLateTwoToneIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText 
        primary={task.text} 
        secondary={username}
      />
      <FormControl sx={{ width: '20%' }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={taskStatus}
          onChange={handleSelectChange}
          input={<OutlinedInput label="Status" />}
          disabled={decideDisabledUpdates}
        >
          {taskStatuses.map((status) => (
            <MenuItem 
              key={status} 
              value={status}
              disabled={decideDisabledOptions(status)}
            >
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <PositionedTaskMenu
        task={task}
        disabled={decideDisabledUpdates}
        onDeleteClick={onDeleteClick}
      />
    </ListItem>
  );
};

const PositionedTaskMenu = ({ task, disabled, onDeleteClick }) => {

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = (task) => {
    handleClose();
    onDeleteClick(task);
  }

  const handleEditClick = (task) => {
    handleClose();
    navigate(`/tasks/edit/${task._id}`);
  }

  const handleCheckboxChange = async (task) => {
    handleClose();
    await Meteor.callAsync('tasks.changePrivacy', {
        _id: task._id,
        isPersonal: task.isPersonal,
    });
  }

  return (
    <div>
      <IconButton 
        edge="end" 
        aria-label="options"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem 
          onClick={ () => handleEditClick(task) } 
          disabled={disabled}
        >
          Editar
        </MenuItem>
        
        <MenuItem 
          onClick={ () => handleDeleteClick(task) }
          disabled={disabled}
        >
          Remover
        </MenuItem>

        <MenuItem
          disabled={disabled}
        >
          <FormControlLabel 
            control={
              <Checkbox
                checked={task.isPersonal}
                onChange={ () => handleCheckboxChange(task) }
                size='small' />
            } 
            label="Pessoal"
          />
        </MenuItem>
      </Menu>
    </div>
  );
}
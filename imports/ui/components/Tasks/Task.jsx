import React from 'react';
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

export const Task = ({ task, username, onDeleteClick }) => {

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
      <PositionedTaskMenu
        task={task}
        onDeleteClick={onDeleteClick}
      />
      
    </ListItem>
  );
};

const PositionedTaskMenu = ({ task, onDeleteClick }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
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
        <MenuItem onClick={ () => handleEditClick(task) }>Editar</MenuItem>
        <MenuItem onClick={ () => handleDeleteClick(task) }>Remover</MenuItem>
      </Menu>
    </div>
  );
}
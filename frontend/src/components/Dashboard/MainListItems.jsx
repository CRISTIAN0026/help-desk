import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';

const MainListItems = ({ onItemClick, value }) => {
  const handleItemClick = (itemName) => {
    if (onItemClick) {
      onItemClick(itemName);
    }
  };

  return (
    <React.Fragment>
      <ListItemButton selected={value === 0} onClick={() => handleItemClick(0)}>
        <ListItemIcon>
          <DashboardIcon style={{backgroundColor:"#84D8FF"}} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </React.Fragment>
  );
};

export default MainListItems;

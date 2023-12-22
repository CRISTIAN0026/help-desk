import React from "react";
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Grid from '@mui/material/Grid';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import ChatIcon from '@mui/icons-material/Chat';
import { useSubscription } from '@apollo/client';
import { SEND_MESSAGE_SUBSCRIPTION } from '../../queries.js';




export default function Notifications({handleClickNotification, anchorElNotification, 
    openNotification, handleCloseNotification, handleClose}){

        const { data: subscriptionData } = useSubscription(SEND_MESSAGE_SUBSCRIPTION)

          console.log(subscriptionData)

    return(
<Grid>
        <IconButton onClick={handleClickNotification} color="inherit">
        <Badge  badgeContent={4} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
              <Menu
              anchorEl={anchorElNotification}
              id="account-menu"
              open={openNotification}
              onClose={handleCloseNotification}
              onClick={handleCloseNotification}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose}>
                <ChatIcon style={{marginRight:"10px"}} /> Tienes un nuevo mensaje de Chavo Paez
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Avatar />  Chavo Paez te ha enviado una solicitud
              </MenuItem>
          <MenuItem onClick={handleClose}>
            <Avatar /> El estado de tu solisitud a cambiado
          </MenuItem>
              <Divider />
            </Menu>
            </Grid>
    )
}

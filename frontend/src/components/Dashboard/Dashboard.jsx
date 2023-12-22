import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MainListItems from "./MainListItems"
import Orders from './Orders';
import PropTypes from 'prop-types';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Logout from '@mui/icons-material/Logout';
import ChatIcon from '@mui/icons-material/Chat';
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../queries.js';
// import Notifications from './Notifications.jsx';



const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();

export default function Dashboard() {
  const { logout, user } = useAuth0();

  const [anchorElNotification, setAnchorElNotification] = React.useState(null);
  const openNotification = Boolean(anchorElNotification);
  // const handleClickNotification = (event) => {
    // setAnchorElNotification(event.currentTarget);
  // };
  const handleCloseNotification = () => {
    setAnchorElNotification(null);
  };
  const email  = user?.email

  const { data } = useQuery(GET_USER, {
    variables: { email },
  });


  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [value, setValue] = React.useState(0);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard - Help Desk
            </Typography>
            <IconButton onClick={handleClick} color="inherit">
            <Badge  color="secondary">
            <AccountCircleIcon/>
            </Badge>
            </IconButton>
            {/* <Notifications  */}
            {/* // anchorElNotification={anchorElNotification}  */}
            {/* // handleClickNotification={handleClickNotification}  */}
            {/* // handleClose={handleClickNotification} */}
            {/* // handleCloseNotification={handleCloseNotification} */}
            {/* // openNotification={openNotification} */}
            {/* // /> */}
          </Toolbar>
        </AppBar>
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
        <Menu
        id="basic-menu1"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => logout({ returnTo: window.location.origin })}>
        <ListItemIcon>
   <Logout fontSize="small" />
 </ListItemIcon>
         Cerrrar sesion
          </MenuItem>
      </Menu>
        <Drawer variant="permanent" open={open}>
          <Toolbar sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1], }}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
         
            <List>
            <MainListItems onItemClick={setValue} value={value}/>
            </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ width: '100%' }}>
      <CustomTabPanel value={value} index={0}>
      <Grid container spacing={3}>
   <Grid item xs={12}>
     <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
       <Orders typeUser={data}/>
     </Paper>
   </Grid>
 </Grid>
      </CustomTabPanel>
    </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
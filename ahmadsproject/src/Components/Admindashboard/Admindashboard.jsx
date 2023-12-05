import React from 'react'
import "./Admindashboard.css"
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import GradingIcon from '@mui/icons-material/Grading';
import SubjectIcon from '@mui/icons-material/Subject';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogout } from '../../Redux/loginSlice';
const Admindashboard = (props) => {
    const drawerWidth = 240;
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = ()=>{
        dispatch(setLogout())
        navigate("/")
    }
    const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
const sideBarAll = [
    {name:"Activate students accounts",nav:""},
    {name:"Edit students marks",nav:"subjects"},
    {name:"Add subjects",nav:"grades"},
    {name:"Assign subjects to students",nav:"assign"},
]
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container = window !== undefined ? () => window().document.body : undefined;
    const drawer = (
        <div>
          <Toolbar />
          <Divider />
          <List>
            {sideBarAll.map((text, index) => (
              <ListItem key={text.name} disablePadding onClick={()=>{navigate(text.nav)}}>
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 && <Diversity3Icon/>}
                    {index===1 && <SubjectIcon/>}
                    {index===2 && <GradingIcon/>}
                    {index ===3 && <ManageAccountsIcon/>}
                  </ListItemIcon>
                  <ListItemText primary={text.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </div>
      );  
    return (
    <div>
        <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin dash board
          </Typography>
          <Typography variant="h6" noWrap component="div" className='logoutbtn' onClick={()=>{handleLogout()}}>
            Logout
          </Typography>
          
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet/>
      </Box>
    </Box>
    </div>
  )
}

export default Admindashboard
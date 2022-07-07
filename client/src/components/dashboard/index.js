import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink, Switch, Route } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';

import Roster from './roster';

import ddevito from '../../assests/images/ddevito.png';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: theme.palette.background.paper,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  listItemIcon: {
    minWidth: '20px',
    paddingRight: theme.spacing(1),

    marginLeft: theme.spacing(0.5),
  },
  listItemText: {
    marginBottom: '2px',
    '& span': { fontSize: '0.9rem' },
  },
  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    backgroundColor: theme.palette.secondary.main,
    margin: '0 auto',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  listSection: {
    backgroundColor: 'rgba(61,0,54,0.85)',
    marginBottom: theme.spacing(1),
    '& .MuiListItem-root': {
      paddingTop: '8px',
      paddingBottom: '8px',
    },
  },
}));

function Dashboard(props) {
  const { window } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Avatar alt="ddevito" src={ddevito} className={classes.avatar} />
      </div>
      <Divider />
      <List>
        <ListItem button key="/" component={RouterLink} to="/">
          <ListItemIcon className={classes.listItemIcon}>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText className={classes.listItemText}>Home</ListItemText>
        </ListItem>
      </List>

      <List className={classes.listSection}>
        <ListItem>
          <Typography variant="overline">Guild</Typography>
        </ListItem>
        <ListItem
          button
          key="/dashboard"
          component={RouterLink}
          to="/dashboard"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText className={classes.listItemText}>
            <Typography variant="body2">Dashboard</Typography>
          </ListItemText>
        </ListItem>
        <ListItem
          button
          key="/dashboard/roster"
          component={RouterLink}
          to="/dashboard/roster"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <GroupIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText className={classes.listItemText}>
            <Typography variant="body2">Roster</Typography>
          </ListItemText>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Doney Brian
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="js">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Route path="/dashboard/roster">
          <Roster />
        </Route>
      </main>
    </div>
  );
}

export default Dashboard;

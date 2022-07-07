import { AppBar, BottomNavigation, Icon } from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { useReactRouter } from '../../utils/useReactRouter';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Link,
  useScrollTrigger,
  Slide,
} from '@material-ui/core';
import {
  Autorenew,
  PowerSettingsNewRounded,
  DesktopWindowsRounded,
  Palette,
  MenuOutlined,
} from '@material-ui/icons';

import { useAuthState, logoutUser, useAuthDispatch } from '../../auth';

// const ME = gql`
//   query me {
//     me {
//       username
//       role
//     }
//   }
// `;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    padding: theme.spacing(1, 0),
    minWidth: '48px',
  },
  title: {
    flexGrow: 1,
  },
  menuIcon: {
    minWidth: 0,
    marginRight: 16,
  },
  mainToolbar: {
    zIndex: '1200',
    //backgroundColor: '#1b0e18',
    // background: 'rgb(27, 0, 24)',
    // background:
    //   '-moz-linear-gradient(180deg, rgba(27,0,24,1) 0%, rgba(27,0,24,0) 100%)',
    // background:
    //   '-webkit-linear-gradient(180deg, rgba(27,0,24,1) 0%, rgba(27,0,24,0) 100%)',
    // background:
    //   'linear-gradient(180deg, rgba(27,0,24,1) 0%, rgba(27,0,24,0) 100%)',
    // filter:
    //   'progid:DXImageTransform.Microsoft.gradient(startColorstr="#1b0018",endColorstr="#1b0018",GradientType=1)',
    padding: theme.spacing(0),
    boxShadow: 'none',
    alignItems: 'flex-end',
    opacity: '.85',
  },
}));

const HomeDropDownMenu = () => {
  const { user } = useAuthState();
  const { history } = useReactRouter();
  const dispatch = useAuthDispatch();

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // const handleLogin = () => {
  //   history.push('/login');
  // };
  const handleLogout = () => {
    setAnchorEl(null);
    logoutUser(dispatch);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const LinkPropped = React.forwardRef((props, ref) => (
    <Link ref={ref} {...props} />
  ));

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        color="secondary"
        size="small"
        className={classes.menuButton}
        style={user ? { padding: '8px 12px' } : {}}
      >
        {user ? `Hello ${user.username}` : <MenuOutlined />}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{
          marginTop: '4px',
        }}
      >
        <MenuItem
          dense
          onClick={handleClose}
          component={RouterLink}
          to="/dashboard"
        >
          <ListItemIcon className={classes.menuIcon}>
            <DesktopWindowsRounded fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </MenuItem>
        {!!user ? (
          <MenuItem
            dense
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
            onClick={handleLogout}
            component={RouterLink}
            to="/"
          >
            <ListItemIcon className={classes.menuIcon}>
              <PowerSettingsNewRounded fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </MenuItem>
        ) : (
          <MenuItem
            dense
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
            component={RouterLink}
            to="/login"
          >
            <ListItemIcon className={classes.menuIcon}>
              <PowerSettingsNewRounded fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Log In" />
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

const MainHeader = (props) => {
  //const theme = useTheme();
  const classes = useStyles();

  const HideOnScroll = (props) => {
    const { children } = props;
    const trigger = useScrollTrigger();
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  };

  return (
    // <HideOnScroll {...props}>
    <AppBar className={classes.mainToolbar}>
      <Toolbar>
        <HomeDropDownMenu />
      </Toolbar>
    </AppBar>
    // </HideOnScroll>
  );
};

export default MainHeader;

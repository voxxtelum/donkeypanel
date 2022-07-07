import { AppBar, Container, Icon } from '@material-ui/core';

import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
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
  Grid,
} from '@material-ui/core';
import {
  Autorenew,
  MenuIcon,
  PowerSettingsNewRounded,
  DesktopWindowsRounded,
} from '@material-ui/icons';

import MainHeader from './MainHeader';
import MainTitle from './MainTitle';
import MainNavigationTabs from './MainNavigationTabs';
import Main from './Main';
import MainTest from './MainTest';

function Home() {
  return (
    <>
      <MainHeader />
      <MainTest />
      {/* <Grid container>
        <Grid item xs={false} sm={1} />
        <Grid item xs={12} sm={10}>
          
        </Grid>
        <Grid item xs={false} sm={1} />
        <Grid item xs={12} style={{ marginTop: '8em' }}></Grid>
      </Grid> */}
    </>
  );
}

export default withRouter(Home);

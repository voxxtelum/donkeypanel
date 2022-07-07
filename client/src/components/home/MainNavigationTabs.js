import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Icon, Container } from '@material-ui/core';
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
} from '@material-ui/core';

export default function MainNavigationTabs() {
  return (
    <Typography variant="h3" style={{ height: '200vh' }}>
      Welcome
    </Typography>
  );
}

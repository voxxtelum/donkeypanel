import React, { useRef, useEffect } from 'react';
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
  Tab,
  Tabs,
} from '@material-ui/core';
import { Controls } from 'react-gsap';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.core.globals('ScrollTrigger', ScrollTrigger);

const titleTransparency = '0.75';

const useStyles = makeStyles((theme) => ({
  root: {
    scrollSnapType: 'y mandatory',
  },
  mainHeaderText: {},
  titleContainer: {
    height: '200vh',

    // backgroundColor: 'rgba(233, 233, 245, 0.1)',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 2, 0),
    },
    [theme.breakpoints.down('sm')]: {
      '& h1': {
        fontSize: '9vw',
      },
    },
    [theme.breakpoints.down('md')]: {
      '& h1': {
        fontSize: '10vw',
      },
    },
    '& h1': {
      fontFamily: 'Monoton',
      textShadow: '0 0 3vw rgba(112, 243, 255, 0.5)',
      zIndex: '1102',
    },
  },
  t1: {
    //margin: '-6px 0 0 -6px',
    position: 'absolute',
    color: `rgba(0, 255, 255, ${titleTransparency})`,
    '&.top': {
      // top: '100px',
    },
  },
  t2: {
    position: 'absolute',
    color: `rgba(255, 255, 0, ${titleTransparency})`,
  },
  t3: {
    position: 'absolute',
    color: `rgba(255, 0, 255, ${titleTransparency})`,
  },
  fixed: {
    position: 'fixed',
    top: '120px',
  },
  mainContainer: {},
  text1: {},
  headerTextBackgroundFixed: {
    position: 'fixed',
    height: '25%',
    backgroundColor: theme.palette.background.default,
    // backgroundColor: 'transparent',
    zIndex: '1101',
    top: 0,
    left: 0,
    minWidth: '100%',
  },
}));

export default function Main() {
  const classes = useStyles();
  const titleRef1 = useRef();
  const titleRef2 = useRef();
  const titleRef3 = useRef();

  useEffect(() => {
    gsap.fromTo(
      titleRef1.current,
      {
        y: 0,
      },
      {
        y: 0,
        duration: 2,
        ease: 'none',
        scrollTrigger: {
          id: '.titleText1',
          trigger: '.titleText1',
          endTrigger: 'html',
          start: '-64 top',
          end: '200% top',
          pin: true,
          scrub: 2,
          pinSpacing: 0,
          markers: false,
        },
      }
    );
    gsap.fromTo(
      '.titleText2',
      { y: '100%' },
      {
        y: '50%',
        autoAlpha: 0,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
          id: '.titleText2',
          trigger: '.titleText2',
          endTrigger: 'html',
          start: '-64 top',
          end: '200% top',
          pin: true,
          scrub: 2,
          pinSpacing: 0,
        },
      }
    );
    gsap.fromTo(
      '.titleText3',
      { y: '200%' },
      {
        y: '100%',
        autoAlpha: 0,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
          id: '.titleText3',
          trigger: '.titleText3',
          endTrigger: 'html',
          start: '-64 top',
          end: '200% top',
          pin: true,
          scrub: 2,
          pinSpacing: 0,
          markers: false,
        },
      }
    );
  }, [titleRef1]);

  return (
    <>
      <div className={classes.mainContainer} style={{ height: '600vh' }}>
        <div className={classes.headerTextBackgroundFixed}></div>
        <div style={{ height: '20vh' }} />
        <div className={classes.titleContainer}>
          <Typography variant="h1" className={`${classes.t1} top`}>
            <div ref={titleRef1} className="titleText1">
              DONKEY BRAINS
            </div>
          </Typography>
          <Typography variant="h1" className={`${classes.t2} top`}>
            <div ref={titleRef2} className="titleText2">
              DONKEY BRAINS
            </div>
          </Typography>
          <Typography variant="h1" className={`${classes.t3} top`}>
            <div ref={titleRef3} className="titleText3">
              DONKEY BRAINS
            </div>
          </Typography>
        </div>
      </div>
    </>
  );
}

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
// gsap.core.globals('ScrollTrigger', ScrollTrigger);

const titleTransparency = '0.75';

const useStyles = makeStyles((theme) => ({
  mainHeaderText: {},
  titleContainer: {
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 2, 0),
    },
    [theme.breakpoints.down('md')]: {
      '& h1': {
        fontSize: '10vw',
      },
    },
    [theme.breakpoints.down('lg')]: {
      '& h1': {
        fontSize: '15vw',
      },
    },
    '& h1': {
      fontFamily: 'Monoton',
      textShadow: '0 0 3vw rgba(112, 243, 255, 0.25)',
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
  titleNavContainer: {
    position: 'absolute',
  },
  titleNav: {},
  tabContainer: {},
}));

export default function MainTitle() {
  const classes = useStyles();
  const titleRef1 = useRef();
  const titleRef2 = useRef();
  const titleRef3 = useRef();

  const titles = [titleRef1.current, titleRef2.current, titleRef3.current];

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
          endTrigger: 'titleContainer',
          start: 'top-=80px top+=20vh',
          end: 'bottom bottom',
          pin: true,
          scrub: 2,
          pinSpacing: 0,
        },
      }
    );
    gsap.fromTo(
      '.titleText2',
      { y: '15vh' },
      {
        y: '1vh',
        x: -100,
        autoAlpha: 0,
        duration: 2,
        ease: 'none',
        scrollTrigger: {
          id: '.titleText2',
          trigger: '.titleText2',
          endTrigger: 'titleContainer',
          start: 'top-=80x top+=20vh',
          end: 'bottom top-=10vh',
          pin: true,
          scrub: 2,
          pinSpacing: 0,
        },
      }
    );
    gsap.fromTo(
      '.titleText3',
      { y: '30vh' },
      {
        y: '1vh',
        x: 100,
        autoAlpha: 0,
        duration: 2,
        ease: 'none',
        scrollTrigger: {
          id: '.titleText3',
          trigger: '.titleText3',
          endTrigger: 'titleContainer',
          start: 'top-=80px top+=20vh',
          end: 'bottom top-=10vh',
          pin: true,
          scrub: 2,
          pinSpacing: 0,
          markers: true,
        },
      }
    );
  }, [titleRef1]);

  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const titleNavRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      titleNavRef.current,
      {
        autoAlpha: 0.5,
        y: '50vh',
      },
      {
        y: '50vh',
        autoAlpha: 1,
        scrollTrigger: {
          id: 'titleNav',
          trigger: '.MuiTabs-flexContainer',
          endTrigger: '.titleContainer',
          start: 'top-=240px top+=20vh',
          end: 'bottom top-=10vh',
          pin: true,
          markers: true,
          pinSpacing: 0,
          scrub: 2,
        },
      }
    );
  }, [titleNavRef]);

  return (
    <>
      <div style={{ height: '1000vh' }}>
        <div style={{ height: '25vh' }} />
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
          <div className={classes.titleNavContainer} ref={titleNavRef}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              className={classes.titleNav}
            >
              <Tab label="About" />
              <Tab label="Information" />
              <Tab label="Loot Guide" />
              <Tab label="Heierarchy " />
            </Tabs>
          </div>
        </div>
      </div>
      <div style={{ height: '25vh' }} />

      <div />
    </>
  );
}

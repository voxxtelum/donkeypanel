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
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { camelCase } from 'lodash';
import { isNonEmptyArray } from '@apollo/client/utilities';

gsap.registerPlugin(ScrollTrigger);
gsap.core.globals('ScrollTrigger', ScrollTrigger);

const titleTransparency = '0.75';

const useStyles = makeStyles((theme) => ({
  mainHeaderText: {},
  titleContainer: {
    // position: 'relative',
    height: '100vh',
    padding: '0 8%',

    // backgroundColor: 'rgba(255, 0, 255, 0.5)',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 2, 0),
    },
    // [theme.breakpoints.down('sm')]: {
    //   '& h1': {
    //     fontSize: '12vw',
    //   },
    // },
    // [theme.breakpoints.down('md')]: {
    //   '& h1': {
    //     //fontSize: '10vw',
    //   },
    // },
    '& h1': {
      fontFamily: 'Monoton',
      textShadow: '0 0 3vw rgba(112, 243, 255, 0.5)',
      position: 'fixed',
      zIndex: '-1',
      lineHeight: '1em',
    },
  },
  t1: {
    //margin: '-6px 0 0 -6px',
    position: 'absolute',
    color: `rgba(255, 0, 255, ${titleTransparency})`,
  },
  t2: {
    position: 'absolute',
    color: `rgba(255, 255, 0, ${titleTransparency})`,
  },
  t3: {
    position: 'absolute',
    color: `rgba(0, 255, 255, ${titleTransparency})`,
  },
  fixed: {
    position: 'fixed',
    top: '120px',
  },
  mainContainer: {
    // position: 'relative',
  },
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
  cardWrapper: {
    height: '100vh',
    width: '100%',
    overflow: 'hidden',
  },
  visitsContainer: {
    position: 'fixed',
    zIndex: '1302',
    top: '130px',
    left: '20%',
    '& path': {
      strokeWidth: '2',
      fill: 'white',
      stroke: theme.palette.custom.yellow,
      opacity: '0.9',
    },
  },
  visitsPath: {},
}));

export default function MainTest() {
  const classes = useStyles();
  const titleContainerRef = useRef();
  const titleRef1 = useRef();
  const titleRef2 = useRef();
  const titleRef3 = useRef();
  const card3Ref = useRef(null);
  const t3Ref = useRef(null);
  const visitsRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef1.current,
      {
        y: '1em',
      },
      {
        scale: 0.8,
        transformOrigin: 'top left',
        y: '36px',
        x: '-8px',
        // autoAlpha: 0.25,
        scrollTrigger: {
          trigger: titleContainerRef.current,
          start: 'top top',
          end: 'bottom top',
          ease: 'power2',
          scrub: 1,
        },
      }
    );
    return () => {};
  }, [titleRef1]);

  useEffect(() => {
    gsap.fromTo(
      titleRef2.current,
      {
        y: '3em',
      },
      {
        y: '40px',
        x: '-4px',
        scale: 0.83,
        transformOrigin: 'top left',
        // autoAlpha: 0.25,
        scrollTrigger: {
          trigger: titleContainerRef.current,
          start: 'top top',
          end: 'bottom top',
          ease: 'power2',
          scrub: 1,
        },
      }
    );
    return () => {};
  }, [titleRef2]);

  useEffect(() => {
    gsap.fromTo(
      titleRef3.current,
      {
        y: '5em',
      },
      {
        y: '44px',
        scale: 0.86,
        transformOrigin: 'top left',
        scrollTrigger: {
          trigger: titleContainerRef.current,
          start: 'top top',
          end: 'bottom top',
          ease: 'power2',
          scrub: 1,
        },
      }
    );
    return () => {};
  }, [titleRef3]);

  useEffect(() => {
    gsap.to(titleRef3.current, {
      ease: 'none',
      css: { color: '#1b0018' },
      scrollTrigger: {
        trigger: card3Ref.current,
        start: 'top center',
        end: 'top top+=30%',
        scrub: 1,
      },
    });
    gsap.to(t3Ref.current, {
      ease: 'none',
      css: { zIndex: '1301', textShadow: 'none' },
      scrollTrigger: {
        trigger: card3Ref.current,
        start: 'top center',
        end: 'top top+=30%',
        scrub: true,
        markers: false,
      },
    });
    gsap.to([titleRef1.current, titleRef2.current], {
      autoAlpha: 0,
      scrollTrigger: {
        trigger: card3Ref.current,
        start: 'top center',
        end: 'top top+=30%',
        scrub: true,
        markers: false,
      },
    });
  }, [titleContainerRef]);

  useEffect(() => {
    gsap.fromTo(
      'visitsPath',
      {},
      {
        ease: 'none',
        scrollTrigger: {
          trigger: card3Ref.current,
          start: 'top center',
          end: 'bottom bottom+=300%',
        },
      }
    );
  }, [visitsRef]);

  return (
    <>
      <div
        className={classes.mainContainer}
        style={
          {
            //height: '1000vh'
          }
        }
      >
        {/* <div className={classes.headerTextBackgroundFixed}></div> */}
        <div ref={titleContainerRef} className={classes.titleContainer}>
          <Typography
            variant="h1"
            className={`${classes.t1} ${classes.titleText}`}
          >
            <div ref={titleRef1} className="titleText1">
              DONKEY
              <br />
              BRAINS
            </div>
          </Typography>
          <Typography
            variant="h1"
            className={`${classes.t2} ${classes.titleText}`}
          >
            <div ref={titleRef2} className="titleText2">
              DONKEY
              <br />
              BRAINS
            </div>
          </Typography>
          <Typography
            variant="h1"
            ref={t3Ref}
            className={`${classes.t3} ${classes.titleText}`}
          >
            <div ref={titleRef3} className="titleText3">
              DONKEY
              <br />
              BRAINS
            </div>
          </Typography>
        </div>

        <div
          className={classes.cardWrapper}
          style={
            {
              //backgroundColor: 'rgba(0, 255, 255, 0.5)',
            }
          }
        ></div>
        {/* <div
          className={classes.cardWrapper}
          style={
            {
              //backgroundColor: 'rgba(0, 255, 255, 0.5)',
            }
          }
        ></div> */}

        <div
          className={classes.cardWrapper}
          ref={card3Ref}
          style={{
            backgroundColor: '#9a5b5e',
          }}
        >
          <div className={classes.visitsContainer}></div>
        </div>
      </div>
    </>
  );
}

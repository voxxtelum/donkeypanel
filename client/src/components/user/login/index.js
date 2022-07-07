import { gql, useMutation } from '@apollo/client';
import React from 'react';
// import { useHistory } from 'react-router-dom';
import {
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
  Avatar,
} from '@material-ui/core';
import { ErrorOutlineOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { useAuthDispatch, useAuthState, loginUser } from '../../../auth';

import { gsap } from 'gsap';

import ddevito from '../../../assests/images/ddevito.png';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
  },
  item: {
    marginTop: '15vh',
    [theme.breakpoints.down('sm')]: {
      marginTop: '10vh',
    },
  },
  container: {},
  paper: {
    padding: theme.spacing(5, 4),
    textAlign: 'center',

    maxWidth: 300,
    //backgroundColor: 'transparent',
    borderRadius: '4px',
    backgroundColor: theme.palette.background.default,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    '&.MuiButton-root.Mui-disabled': {
      cursor: 'not-allowed !important',
      pointerEvents: 'all',
    },
  },
  loginForm: {
    margin: theme.spacing(0),
    '& .MuiTextField-root': {
      margin: theme.spacing(2, 0, 0),
    },
  },
  outlinedRoot: {
    '&:hover $notchedOutline': {},
    '&$focused $notchedOutline': {},
  },
  notchedOutline: {},
  focused: {},
  loginAvatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    backgroundColor: theme.palette.secondary.main,
    margin: '0 auto',
    marginBottom: theme.spacing(3),
  },
  loginErrorDiv: {
    backgroundColor: theme.palette.error.dark,
    borderRadius: '2px',
    width: '100%',
    margin: theme.spacing(2, 0, 1),
  },
  loginError: {
    color: theme.palette.error.contrastText,
    justifyContent: 'center',
    fontSize: '1em',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  backdrop: {
    zIndex: 10000,
    backgroundColor: 'rgba(0, 0, 0, .7)',
  },
}));

const Login = (props) => {
  const dispatch = useAuthDispatch();
  const { loading: dispatchLoading, errorMessage } = useAuthState();
  const [open, setOpen] = React.useState(false);

  const loginContainerRef = React.useRef(null);

  React.useEffect(() => {
    gsap.from(loginContainerRef.current, {
      // opacity: 0,
      y: '-=100',
    });
    gsap.to(loginContainerRef.current, {
      // opacity: 1,
      y: 0,
      ease: 'back.out(1)',
      duration: 0.65,
    });
  }, [loginContainerRef]);

  React.useEffect(() => {
    !!dispatchLoading ? setOpen(true) : setOpen(false);
  }, [dispatchLoading]);

  const classes = useStyles();
  const InputProps = {
    classes: {
      root: classes.outlinedRoot,
      notchedOutline: classes.notchedOutline,
      focused: classes.focused,
    },
  };

  const LoginSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required.')
      .min(3, 'Username too short.')
      .max(12, 'Username too long.'),
    password: yup.string().required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    errors,
    setError,
    reset,
    formState: { touched, isValid },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: { username: '', password: '' },
    mode: 'onChange',
  });

  const onSubmit = async (values, event) => {
    event.preventDefault();
    // setSubmittedData(values);

    const { username, password } = values;

    let loginResult = await loginUser(dispatch, { username, password });

    console.log(`====== loginResult ======`);
    console.log(loginResult);
    console.log(`====== loginResult ======`);
    if (!loginResult) return;
    props.history.push('/');
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Grid
        container
        className={classes.container}
        ref={loginContainerRef}
        direction="row"
        justify="center"
        alignContent="center"
      >
        <Grid item className={classes.item}>
          {/* <Typography variant="body1">Home</Typography> */}
          <Paper className={classes.paper}>
            <Avatar
              alt="ddevito"
              src={ddevito}
              className={classes.loginAvatar}
            />
            {/* <Typography component="h1" variant="h6" color="primary">
              Login
            </Typography> */}

            {errorMessage ? (
              <div className={classes.loginErrorDiv}>
                <Typography color="error" className={classes.loginError}>
                  <ErrorOutlineOutlined style={{ margin: '8px 8px 8px 0' }} />
                  {errorMessage}
                </Typography>
              </div>
            ) : null}
            <form
              className={classes.loginForm}
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                inputRef={register}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                size="small"
                InputProps={InputProps}
                error={!!errors?.username || !!errorMessage}
                helperText={errors?.username?.message}
              />

              <TextField
                inputRef={register}
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                size="small"
                InputProps={InputProps}
                error={!!errors?.password || !!errorMessage}
                helperText={errors?.password?.message}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={
                  _.isEmpty(touched) || !isValid || dispatchLoading
                    ? true
                    : false
                }
              >
                {!_.isEmpty(errors) ? 'Hey you have errors' : 'Log In'}
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item style={{ minHeight: '75vh' }}></Grid>
      </Grid>
    </>
  );
};

export default Login;

import { createMuiTheme } from '@material-ui/core/styles';

const vt1 = createMuiTheme({
  palette: {
    type: 'dark',
    custom: {
      yellow: 'rgb(255, 255, 0)',
      cyan: 'rgb(0, 255, 255)',
      magenta: 'rgb(255, 0, 255)',
    },
    primary: {
      main: 'rgba(112,243,255,0.85)',
      light: '#70f3ff',
      dark: '#00cee0',
    },
    secondary: {
      main: '#9a5b5e',
      light: '#ac7275',
      dark: '#744446',
    },
    background: {
      default: '#1b0018',
      paper: '#001b2e',
    },
    text: {
      primary: 'rgba(254,254,246,0.85)',
      secondary: 'rgba(254,254,246,0.7)',
      disabled: 'rgba(254,254,246,0.5)',
      hint: 'rgba(254,254,246,0.5)',
    },
  },
  props: {
    MuiSlider: {
      color: 'primary',
    },
    MuiAppBar: {
      color: 'transparent',
    },
    MuiTooltip: {
      arrow: true,
    },
    MuiMenuItem: {
      //backgroundColor: '#010a12',
    },
  },
  shape: {
    borderRadius: 2,
  },
  typography: {
    h1: {
      fontFamily: 'Fira Mono',
    },
    h2: {
      fontFamily: 'Fira Mono',
    },
  },
});

export default vt1;

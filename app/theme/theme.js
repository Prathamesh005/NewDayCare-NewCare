import { createTheme } from '@material-ui/core/styles';
import FontFam from '../../assets/Yantramanav-Light.ttf';
export default createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-scrollbar': {
          width: '0.4em',
          height: '0.4em',
          background: '#ffffff',
        },
        // '*::-webkit-scrollbar-track': {
        //   '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        // },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.1)',
          borderRadius: 100,
          // outline: '1px solid slategrey'
        },
      },
    },
  },
  palette: {
    backgroundColor: {
      light: '#f7f8fa',
      main: '#ffffff',
      primary: '#F7F6F4',
      dark: '#000000',
      tabellight: '#F7F6F4',
      tabelmain: '#373737',
      drawerBackground: '#F7F6F4',
      extraLight: '#f4f4f4',
    },
    tabledata: {
      light: '#efefef',
      main: '#373737',
    },
    primary: {
      light: '#ffffff',
      main: '#4a4a4a',
      dark: '#4a4a4a',
      button: '#ff3399',
      common: '#373737',
      error: 'red',
    },
    secondary: {
      light: '#f1f5f9',
      main: '#f9f9f9',
      dark: '#f6f6f6',
      avtar: '#e91e63',
      extraLight: '#fafafa',
    },
    dropdownColor: {
      border: '#9a9a9a',
      text: '#292020',
      selection: '#f2f2f2',
    },
    text: {
      light: '#9A9A9A',
      main: '#4a4a4a',
      dark: '#707070',
      other: '#f0595c', // cruxbyte red color
      other2: '#33a2e5',
      white: '#ffffff',
      common: '#000000',
      error: '#6E6E6E',
      black: '#00000',
      active: '#FF3399',
    },
    icon: {
      active: '#FF5CAD',
      main: '#727272',
    },
    button: {
      primary: {
        backgroundColor: '#292020',
        color: '#ffffff',
      },
      secondary: {
        border: '#d9d9d9',
        color: '#333333',
      },
      ghost: {
        backgroundColor: '#b9b9b9',
        color: '#ffffff',
      },
      link: {
        color: '#ffffff',
      },
      paginated: {
        color: '#ff3399',
      },
      common: {
        color: '#FF3399',
        main: '#000000',
      },
    },
    list: {
      backgroundColor: '#00000029',
      color: '#000',
    },
    tabs: {
      primary: {
        color: '#000',
        main: '#373737',
        light: '#ffffff',
        selected: '#FF3399',
        default: '#F7F6F4',
      },
    },
    chip: {
      main: '#ab521e',
      selection: '#FF5CAD',
      unselected: '#ffffff',
      background: '#ffffff',
      light: '#E8E8E8',
      text: '#6E6E6E',
      common: '#ffffff',
      dark: '#000000',
    },
    card: {
      main: '#F8F8F8',
      common: '#ffffff',
      button: {
        main: '#F4F4F4',
      },
    },
    menu: {
      main: '#ab521e',
      selection: '#333333',
      unselected: '#9a9a9a',
    },
    lineBorderColor: {
      light: '#eeeeee',
      main: '#e6e6e6',
      dark: '#DCDCDC',
      dBorder: '#9a9a9a',
      tableBorder: '#e0e0e0',
    },
    blackShades: {
      d1: '#111111',
      d2: '#373737',
      d3: '#666666',
      d4: '#878787',
    },
    whiteShades: {
      l1: '#ffffff',
      l2: '#f8f8f8',
      l3: '#d5d5d5',
      l4: '#aaaaaa',
    },
    utils: {
      error: '#FF6D6D',
      warning: '#ffa000',
      info: '#6C63FF',
      success: '#51CC65',
    },
    success: {
      light: '#F1F9F1',
      main: '#75C378',
    },
    error: {
      light: '#FFEEEE',
      main: '#FF5C5C',
    },
    warning: {
      light: '#FDF7EB',
      main: '#ECB036',
    },
    scroll: {
      light: '#e6e6e6',
      main: '#fff',
      dark: '#ccc',
    },
  },
  typography: {
    fontFamily: `"Yantramanav", sans-serif  !important`,
    src: `local('Lato'), url(${FontFam}).format('truetype')`,
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 300,
    fontWeightMedium: 500,
    fontWeightBold: 500,
    h1: {
      fontWeight: 600,
      fontSize: '28px',
      lineHeight: 'inherit',
    },
    h2: {
      fontWeight: 500,
      fontSize: '24px',
      lineHeight: 'inherit',
    },
    h3: {
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: 'inherit',
    },
    h4: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: 'inherit',
    },
    h5: {
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: 'inherit',
    },
    h6: {
      fontWeight: 400,
      fontSize: '10px',
      lineHeight: 'inherit',
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: '32px',
      lineHeight: 1.17,
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: '20px',
      lineHeight: 1.6,
    },
    button: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: 1.75,
      textTransform: 'inherit',
      padding: '5px 0px',
      minHeight: 35,
      minWidth: 125,
      border: 'none',
      borderRadius: '5px',
      color: '#2196f3',
    },
  },

  alphabets: {
    m: '#FFECBE',
    h: '#FFBEBE',
    l: '#CEF1D4',
  },
  spacing: factor =>
    [
      0,
      5,
      10,
      15,
      20,
      25,
      30,
      35,
      40,
      45,
      50,
      55,
      60,
      65,
      70,
      75,
      80,
      85,
      90,
      95,
      100,
      105,
    ][factor],
});

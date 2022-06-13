import myFont from '../assets/Yantramanav-Light.ttf';
injectGlobal`
  @font-face {
    font-family: 'Yantramanav', sans-serif !important';
    src: url(${myFont}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;
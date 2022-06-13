/* Environments */
const environments = {
  PROD: 'PROD',
  DEV: 'DEV',
  DEMO: 'DEMO'
};

// const currentEnvironment = environments.PROD;
// const currentEnvironment = environments.DEV;
const currentEnvironment =
  process.env.RUN_MODE &&
  (Object.keys(environments).includes(process.env.RUN_MODE) ? environments[process.env.RUN_MODE] : environments.DEFAULT);

/* URL Prefixes */
console.log(process.env, 'process.env');

const port = window.location.port ? ':9044' : '';
const apiUrlPrefixes = {
  // [environments.PROD]:
  //   process.env.REACT_APP_BACKEND_URL || process.env.BACKEND_URL || `${window.location.protocol}//${window.location.hostname}${port}`,
  // [environments.DEV]: `http://10.1.14.1${port}`,
  // [environments.DEV]: `http://10.1.14.1:9044`,
  [environments.DEV]: `https://api.app-dev.nuqare.com`,
  [environments.DEMO]: `https://api.demo.nuqare.com`,
  [environments.PROD]: 'https://platform-api.nuqare.com',
  // [environments.DEV]: 'http://10.128.0.43:6010',
  // Vishnu
  // [environments.PROD]: 'http://10.128.0.34:6010',
  // [environments.DEV]: 'http://10.128.0.34:6010',
  // [environments.PROD]: 'http://10.100.0.6:6010',
  // [environments.DEV]: 'http://10.128.0.44:6011', // kartikey IP
  // production
  // [environments.PROD]: 'http://10.128.0.44:9044',
  // [environments.DEV]: 'http://10.128.0.44:9044',
  // http://10.128.0.44:6010/api-docs/
  // [environments.DEV]: 'http://10.128.0.34:6010',
};

const currentApiUrlPrefix = apiUrlPrefixes[currentEnvironment];

/* Log configuration */
const logLevels = {
  TRACE: 'TRACE',
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  OFF: 'SILENT',
};

/* Environment Specific configs */
const environmentConfigs = {
  [environments.PROD]: {
    enableAuthorization: true,
    enableMock: false,
    logLevel: logLevels.WARN,
  },
  [environments.DEV]: {
    enableAuthorization: true,
    enableMock: false,
    logLevel: logLevels.DEBUG,
  },
  [environments.DEMO]: {
    enableAuthorization: true,
    enableMock: false,
    logLevel: logLevels.DEBUG,
  },
  [environments.SIT]: {
    enableAuthorization: false,
    enableMock: false,
    logLevel: logLevels.DEBUG,
  },
  [environments.UAT]: {
    enableAuthorization: false,
    enableMock: false,
    logLevel: logLevels.DEBUG,
  },
};

const currentEnvironmentConfig = environmentConfigs[currentEnvironment];

/* Exports */
export { environments, currentEnvironment, apiUrlPrefixes, currentApiUrlPrefix, environmentConfigs, currentEnvironmentConfig, logLevels };

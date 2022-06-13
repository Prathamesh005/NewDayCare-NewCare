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
//console.log(process.env, 'process.env');

const port = window.location.port ? ':9044' : '';
const apiUrlPrefixes = {
  [environments.PROD]: `https://platform-api.nuqare.com`,
  [environments.DEV]: `https://api.app-dev.nuqare.com`,
  [environments.DEMO]: `https://api.demo.nuqare.com`,

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
    logLevel: logLevels.ERROR,
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
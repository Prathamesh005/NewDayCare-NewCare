import log from 'loglevel';
import prefix from 'loglevel-plugin-prefix';
import moment from 'moment';

import {
  currentEnvironmentConfig,
  logLevels,
} from '../config/environmentConfig';

const defaultLogLevel = currentEnvironmentConfig.logLevel || logLevels.INFO;

prefix.apply(log, {
  template: '[%t] %l (%n):',
  timestampFormatter(date) {
    return moment(date).format('DD/MM/YYYY HH:mm:ss.SSS');
  },
  levelFormatter(level) {
    return level.charAt(0).toUpperCase() + level.substr(1);
  },
  nameFormatter(name) {
    return name || 'global';
  },
});

log.setLevel(log.levels[defaultLogLevel]);

const getLoggerForModule = moduleName => {
  log.getLogger('logModule').info('module logger init-', moduleName);
  return log.getLogger(moduleName);
};

export { getLoggerForModule, log };

import axios from 'axios';
import MessageFormat from 'messageformat';
import {
  getAxiosApiConfig,
  spinLoaderConfigDefault,
} from '../config/apiConfig';
import { getLoggerForModule } from './appLogger';

const messageFormatter = new MessageFormat('en');
const localLogger = getLoggerForModule('ApiService');

class ApiService {
  constructor(config, apiKeyParam) {
    const isValidObject = input =>
      input && typeof input === 'object' && Object.keys(input).length;
    const apiKey = apiKeyParam || config.apiKey;

    this.config = config || {};
    if (apiKey) {
      this.apiConfig = getAxiosApiConfig(apiKey);
      // Header Config
      if (isValidObject(this.config.headers)) {
        this.apiConfig.headers = this.config.headers;
      }
      // JSON Request Body
      if (this.config.data) {
        this.apiConfig.data = this.config.data;
      }
      // URL Path Variables
      if (isValidObject(this.config.pathVariables)) {
        const rawUrl = this.apiConfig.url;
        const mfUrl = messageFormatter.compile(rawUrl);
        this.apiConfig.url = mfUrl(this.config.pathVariables);
      }
      // URL Params
      if (isValidObject(this.config.urlParams)) {
        const url = new URL(this.apiConfig.url, window.location.origin);
        const params = this.config.urlParams;
        if (params) {
          Object.keys(params).forEach(key =>
            url.searchParams.append(key, params[key]),
          );
          this.apiConfig.url = url;
        }
      }
      // Spinner Config
      if (isValidObject(this.config.spinLoaderConfig)) {
        if (this.config.spinLoaderConfig.isEnabled) {
          this.apiConfig.spinLoaderConfig = this.config.spinLoaderConfig;
          if (
            typeof this.apiConfig.spinLoaderConfig.actionFunction !== 'function'
          ) {
            this.apiConfig.spinLoaderConfig.actionFunction =
              spinLoaderConfigDefault.actionFunction;
          }
        }
      } else {
        this.apiConfig.spinLoaderConfig = spinLoaderConfigDefault;
      }
      if (!this.apiConfig) {
        localLogger.error(`No Api-config present for apiKey - ${apiKey}`);
      }
    }
  }

  getApiConfig() {
    return this.apiConfig;
  }

  manageSpinLoaderDuringApiCall(displayState) {
    const { actionFunction, spinLoaderKey } = this.apiConfig.spinLoaderConfig;
    // if (typeof actionFunction === 'function' && spinLoaderKey) {
    //   actionFunction(spinLoaderKey, displayState);
    // }
    if (typeof actionFunction === 'function' && spinLoaderKey) {
      actionFunction(displayState);
    }
  }

  beforeSendCallBack() {
    if (typeof this.config.beforeSendCallBack === 'function') {
      this.config.beforeSendCallBack();
    }
    if (this.apiConfig.spinLoaderConfig) {
      this.manageSpinLoaderDuringApiCall(true);
    }
  }

  completeCallBack(response) {
    if (typeof this.config.completeCallBack === 'function') {
      this.config.completeCallBack(response);
    }
    if (this.apiConfig.spinLoaderConfig) {
      this.manageSpinLoaderDuringApiCall(false);
    }
  }

  call() {
    this.beforeSendCallBack();

    return new Promise((resolve, reject) => {
      window.numberOfAjaxCAllPending += 1;
      axios(this.apiConfig)
        .then(response => {
          window.numberOfAjaxCAllPending -= 1;
          this.completeCallBack(response);
          resolve(response);
        })
        .catch(error => {
          window.numberOfAjaxCAllPending -= 1;
          this.completeCallBack(error);
          reject(error);
        });
    });
  }
}

export default ApiService;

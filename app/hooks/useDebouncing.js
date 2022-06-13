import _ from 'lodash';
import { useCallback } from 'react';

export const useDebouncing = functionName =>
  useCallback(_.debounce(functionName, 500), []);

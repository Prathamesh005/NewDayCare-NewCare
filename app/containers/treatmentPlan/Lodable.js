/**
 * Asynchronously loads the component for ImageLabellingPage
 */

import React from 'react';
import loadable from 'utils/loadable';
import { SearchPatient } from '../skeleton';

export default loadable(() => import('./index'), {
  fallback: <SearchPatient />,
});

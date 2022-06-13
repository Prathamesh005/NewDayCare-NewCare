/**
 * Asynchronously loads the component for ImageLabellingPage
 */

import React from 'react';
import loadable from 'utils/loadable';
import Patient360 from '../skeleton/Patient360';

export default loadable(() => import('./index'), {
  fallback: <Patient360 />,
});

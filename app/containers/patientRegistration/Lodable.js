/**
 * Asynchronously loads the component for ImageLabellingPage
 */

import React from 'react';
import loadable from 'utils/loadable';
import { PatientRegistration } from '../skeleton';

export default loadable(() => import('./index'), {
  fallback: <PatientRegistration />,
});

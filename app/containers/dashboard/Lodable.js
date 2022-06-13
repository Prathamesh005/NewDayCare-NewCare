/**
 * Asynchronously loads the component for ImageLabellingPage
 */

import React from 'react';
import loadable from 'utils/loadable';
import Dashboard from '../skeleton/NewDashboard';

export default loadable(() => import('./index'), {
  fallback: <Dashboard />,
});

/**
 * Asynchronously loads the component for ImageLabellingPage
 */

import React from 'react';
import loadable from 'utils/loadable';
import { TableSkeletone } from '../skeleton/';

export default loadable(() => import('./index'), {
  fallback: <TableSkeletone size={6} />,
});

/**
 * Asynchronously loads the component for ImageLabellingPage
 */

import React from 'react';
import loadable from 'utils/loadable';
// import { Appointments } from '../skeleton';

// export default loadable(() => import('./index'), {
//   fallback: <Appointments />,
// });


import { TableSkeletone } from '../skeleton/';

export default loadable(() => import('./index'), {
  fallback: <TableSkeletone size={12}/>,
});

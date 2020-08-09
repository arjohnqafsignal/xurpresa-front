/**
 *
 * Asynchronously loads the component for BecomeAgentDetails
 *
 */

import { lazyLoad } from 'utils/loadable';

export const BecomeAgentDetails = lazyLoad(
  () => import('./index'),
  module => module.BecomeAgentDetails,
);

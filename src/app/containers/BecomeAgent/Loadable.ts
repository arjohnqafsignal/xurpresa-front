/**
 *
 * Asynchronously loads the component for BecomeAgent
 *
 */

import { lazyLoad } from 'utils/loadable';

export const BecomeAgent = lazyLoad(
  () => import('./index'),
  module => module.BecomeAgent,
);

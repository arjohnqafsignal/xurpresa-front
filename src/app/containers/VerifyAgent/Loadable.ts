/**
 *
 * Asynchronously loads the component for VerifyAgent
 *
 */

import { lazyLoad } from 'utils/loadable';

export const VerifyAgent = lazyLoad(
  () => import('./index'),
  module => module.VerifyAgent,
);

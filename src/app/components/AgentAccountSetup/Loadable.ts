/**
 *
 * Asynchronously loads the component for AgentAccountSetup
 *
 */

import { lazyLoad } from 'utils/loadable';

export const AgentAccountSetup = lazyLoad(
  () => import('./index'),
  module => module.AgentAccountSetup,
);

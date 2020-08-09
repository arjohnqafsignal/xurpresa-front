/**
 *
 * Asynchronously loads the component for AgentProfile
 *
 */

import { lazyLoad } from 'utils/loadable';

export const AgentProfile = lazyLoad(
  () => import('./index'),
  module => module.AgentProfile,
);

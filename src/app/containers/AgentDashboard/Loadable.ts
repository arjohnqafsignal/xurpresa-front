/**
 *
 * Asynchronously loads the component for AgentDashboard
 *
 */

import { lazyLoad } from 'utils/loadable';

export const AgentDashboard = lazyLoad(
  () => import('./index'),
  module => module.AgentDashboard,
);

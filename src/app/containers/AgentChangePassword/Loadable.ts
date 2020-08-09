/**
 *
 * Asynchronously loads the component for AgentChangePassword
 *
 */

import { lazyLoad } from 'utils/loadable';

export const AgentChangePassword = lazyLoad(
  () => import('./index'),
  module => module.AgentChangePassword,
);

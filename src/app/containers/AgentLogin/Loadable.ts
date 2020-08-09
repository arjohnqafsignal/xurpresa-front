/**
 *
 * Asynchronously loads the component for AgentLogin
 *
 */

import { lazyLoad } from 'utils/loadable';

export const AgentLogin = lazyLoad(
  () => import('./index'),
  module => module.AgentLogin,
);

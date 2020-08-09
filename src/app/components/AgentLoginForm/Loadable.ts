/**
 *
 * Asynchronously loads the component for AgentLoginForm
 *
 */

import { lazyLoad } from 'utils/loadable';

export const AgentLoginForm = lazyLoad(
  () => import('./index'),
  module => module.AgentLoginForm,
);

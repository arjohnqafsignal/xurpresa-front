/**
 *
 * Asynchronously loads the component for BecomeAgentForm
 *
 */

import { lazyLoad } from 'utils/loadable';

export const BecomeAgentForm = lazyLoad(
  () => import('./index'),
  module => module.BecomeAgentForm,
);

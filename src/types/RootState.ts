import { BecomeAgentState } from 'app/containers/BecomeAgent/types';
import { AgentLoginState } from 'app/containers/AgentLogin/types';
import { AgentDashboardState } from 'app/containers/AgentDashboard/types';
import { VerifyAgentState } from 'app/containers/VerifyAgent/types';
import { AgentProfileState } from 'app/containers/AgentProfile/types';
import { AgentChangePasswordState } from 'app/containers/AgentChangePassword/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  becomeAgent?: BecomeAgentState;
  agentLogin?: AgentLoginState;
  agentDashboard?: AgentDashboardState;
  verifyAgent?: VerifyAgentState;
  agentProfile?: AgentProfileState;
  agentChangePassword?: AgentChangePasswordState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}

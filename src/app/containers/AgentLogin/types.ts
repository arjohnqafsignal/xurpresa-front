/* --- STATE --- */
export interface AgentLoginState {
  loading: boolean;
  error: string;
  success: string;
  loginData: Object;
}

export type ContainerState = AgentLoginState;

/* --- STATE --- */
export interface BecomeAgentState {
  loading: boolean;
  error: string;
  success: string;
  registrationData: Object;
}

export type ContainerState = BecomeAgentState;

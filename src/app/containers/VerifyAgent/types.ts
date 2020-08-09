/* --- STATE --- */
export interface VerifyAgentState {
  verificationToken: string;
  verificationError: string;
  verificationSuccess: string;
}

export type ContainerState = VerifyAgentState;

export type TSession = {
  isLoading: boolean;
  isAuthenticated: boolean;
  isConnected: boolean;
  checkSession: () => Promise<void>
  user?: TUser
}

export type TUser = {
  id: number;
  email: string;
  githubToken: string;
  createdAt: Date;
  updateAt: Date
}
export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}

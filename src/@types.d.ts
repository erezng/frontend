export type AuthContextType = {
  isLoggedIn: boolean;
  username?: string;
  email?: string;
  token?: string;
  login: (username: string, email: string, token: string) => void;
  logout: () => void;
};
export type ChildProps = {
  children?: React.ReactNode;
};
export type RegisterFormType = {
  username: string;
  email: string;
  password: string;
};
export type LoginFormType = {
  email: string;
  password: string;
};

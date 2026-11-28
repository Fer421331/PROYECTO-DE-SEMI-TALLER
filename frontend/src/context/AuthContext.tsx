import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  iniciarSesion,
  type AuthUser,
} from '../services/auth.service';

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const readStoredUser = (): AuthUser | null => {
  try {
    const storedUser = localStorage.getItem('usuario');
    return storedUser ? (JSON.parse(storedUser) as AuthUser) : null;
  } catch {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    return null;
  }
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [user, setUser] = useState<AuthUser | null>(readStoredUser);
  const [isLoading] = useState(false);

  const login = useCallback(async (username: string, password: string) => {
    const response = await iniciarSesion(username, password);

    localStorage.setItem('token', response.token);
    localStorage.setItem('usuario', JSON.stringify(response.user));

    setToken(response.token);
    setUser(response.user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    token,
    isAuthenticated: Boolean(token && user),
    isLoading,
    login,
    logout,
  }), [user, token, isLoading, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

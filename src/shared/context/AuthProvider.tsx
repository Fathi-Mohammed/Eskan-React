import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from 'react';
import { getCookie, removeCookie, setCookie } from '../utils/cookie';

interface User {
  access_token: string;
  name: string;
  image: string;
  mobile: string;
  email: string;
  rate: number;
  id: number;
  created_at: string;
  updated_at: string;
  token: string;
}

interface AuthContextProps {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = getCookie('auth_token');
    if (token) {
      setUser(JSON.parse(token)); // Assuming token is a JSON stringified user object
    }
  }, []);

  const login = (userData: User) => {
    const data = JSON.stringify(userData);
    setCookie('auth_token', data, {
      path: '/',
      expires: new Date('9999-12-31T23:59:59.999Z'),
    });
    setUser(userData);
  };

  const logout = () => {
    removeCookie('auth_token');
    setUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
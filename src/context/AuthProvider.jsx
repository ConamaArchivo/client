import { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem('persist')) || false
  );

  return (
    <AuthContext.Provider value={{ persist, setPersist, auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

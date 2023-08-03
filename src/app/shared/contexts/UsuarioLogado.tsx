import { createContext, useCallback, useEffect, useState } from "react";

interface IUsuarioLogadoContextData {
  userName: string;
  logout: () => void;
}

interface IChildren {
  children: React.ReactNode
}

export const UsuarioLogadoContext = createContext({} as IUsuarioLogadoContextData);

export const UsuarioLogadoProvider = ({ children }: IChildren) => {
  const [name, setName] = useState('Olá')

  useEffect(() => {
    setTimeout(() => {
      setName('Giovane')
    }, 1300)
  })

  const handleLogout = useCallback(() => {
    console.log('Logout Exec!')
  }, [])

  return (
    <UsuarioLogadoContext.Provider value={{ userName: name, logout: handleLogout }}>
      {children}
    </UsuarioLogadoContext.Provider>
  );
};

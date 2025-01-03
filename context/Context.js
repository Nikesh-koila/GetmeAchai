"use client";
import { createContext, useContext, useState } from "react";

const LoginContext = createContext();


export function Context({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <LoginContext.Provider value={{isLogin,setIsLogin}}>{children}</LoginContext.Provider>
  );
}

export {LoginContext}
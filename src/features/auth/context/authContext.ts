import { createContext } from "react";
import { AuthContextType } from "../types/auth";

const AuthContext = createContext<AuthContextType>({
	token: null,
  setToken: () => {}
});

export default AuthContext;
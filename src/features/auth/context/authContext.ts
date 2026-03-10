import { createContext } from "react";
import { AuthContextType } from "../types/auth";

const AuthContext = createContext<AuthContextType>({
	login: () => {},
	register: () => {},
	logout: () => {}
});

export default AuthContext;
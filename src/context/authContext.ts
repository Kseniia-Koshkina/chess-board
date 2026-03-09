import { createContext } from "react";
import { AuthContextType } from "../models/auth/Auth";

const AuthContext = createContext<AuthContextType>({
	login: () => {},
	register: () => {},
	logout: () => {}
});

export default AuthContext;
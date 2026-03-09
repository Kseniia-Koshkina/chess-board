import { createContext } from "react";
import { UserContextType } from "../models/auth/User";

const UserContext = createContext<UserContextType>({
	setUser: () => {},
	clearUser: () => {}
});

export default UserContext;
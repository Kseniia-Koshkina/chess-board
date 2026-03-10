import { createContext } from "react";
import { UserContextType } from "../types/user";

const UserContext = createContext<UserContextType>({
	setUser: () => {},
	clearUser: () => {}
});

export default UserContext;
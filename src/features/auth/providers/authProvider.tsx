import { useState } from "react";
import AuthContext from "../context/authContext";
import { Token } from "../types/auth";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [token, setToken] = useState<Token | null>(null);

	return (
		<AuthContext.Provider value={{ token, setToken }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider;
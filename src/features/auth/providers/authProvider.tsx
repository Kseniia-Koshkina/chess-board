import { useState } from "react";
import AuthContext from "../context/authContext";
import { Token } from "../types/auth";

const api = import.meta.env.VITE_API_BASE_URL;

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [token, setToken] = useState<Token | undefined>();

	const login = async (
		username: string,
		password: string
	) => {	
		if (!username || !password) return;

		const request = await fetch(api + "/auth/login",  {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(
				{
					username: username,
					password: password
				}
			)
		});

		if (request.ok) {
			const data = await request.json();
			setToken({ access_token: data.token })
		}
	}

	const register = async (
		username: string,
		password: string
	) => {
		console.log(username, password)
	}

	const logout = () => {
		setToken(undefined);
	}

	return  (
		<AuthContext.Provider value={{ token, login, register, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider;
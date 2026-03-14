import { 
	loginRequest, 
	logoutRequest, 
	tokenRequest 
} from "../../../api/authApi";
import useAuthStore from "./useAuthStore";

export const useAuth = () => {
	const { token, setToken } = useAuthStore();

	const login = async (
		username: string,
		password: string
	) => {
		const response = await loginRequest(username, password);

		if (response.ok) {
			await getToken();
			return true;
		}

		return false;
	}

	const getToken = async () => {
		const response = await tokenRequest();

		if (response.ok) 
			setToken(()=>response.data);

		return response.data;
	}

	const logout = async () => {
		const response = await logoutRequest();
		if (response.ok) 
			setToken(null);
	}

	return { token, login, getToken, logout }
}
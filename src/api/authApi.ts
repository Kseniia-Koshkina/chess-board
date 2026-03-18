import { Token } from "../features/auth/types/auth";
import apiFetch, { ApiResponse } from "./baseApi";

export const loginRequest = async (
	username: string,
	password: string
) => {
	return await apiFetch("/auth/login",
		{
			method: "POST",
			credentials: "include",
			body: JSON.stringify(
				{
					username: username,
					password: password
				}
			)
		}
	);
}

export const registerRequest = async (
	username: string,
	password: string
) => {
	return await apiFetch("/auth/register", 
		{
			method: "POST",
			credentials: "include",
			body: JSON.stringify(
				{
					username: username,
					password: password
				}
			)
		}
	)
}

interface TokenResponse {
	access_token: string;
}

export const tokenRequest = async (): 
Promise<ApiResponse<Token | null>> => {
	const response = await apiFetch<TokenResponse>("/auth/token", {
		credentials: "include"
	});

	console.log(response)

	const data = response.data ? {
		accessToken: response.data.access_token
	} : null;

	return {
		...response,
		data: data
	}
}

export const logoutRequest = async () => {
	return await apiFetch("/auth/logout", {
		method: "POST",
		credentials: "include"
	});
}
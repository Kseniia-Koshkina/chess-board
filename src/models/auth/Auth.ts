export interface AuthContextType {
	token?: Token;
	login: (
		username: string,
		password: string
	) => void;
	register: (
		username: string,
		password: string
	) => void;
	logout: () => void;
}

export interface Token {
	access_token: string;
	// expires_at: string;
}
export interface AuthContextType {
	token: Token | null;
	setToken: React.Dispatch<React.SetStateAction<Token | null>>;
}

export interface Token {
	accessToken: string | null;
	//expiresIn: string;
}
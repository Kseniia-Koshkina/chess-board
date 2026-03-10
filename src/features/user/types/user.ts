export interface UserContextType {
	user?: User;
	setUser: () => void;
  clearUser: () => void;
}

export interface User {
	username: string;
}
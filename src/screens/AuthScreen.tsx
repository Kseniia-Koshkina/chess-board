import { useContext, useState } from "react";
import AuthContext from "../features/auth/context/authContext";

const AuthScreen = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const { login } = useContext(AuthContext);

	return (
		<>
			<input type="text" onInput={e => setUsername(e.currentTarget.value)} />
			<input type="password" onInput={e => setPassword(e.currentTarget.value)} />
			<button onClick={() => login(username, password)}>Log in</button>
		</>
	)
}

export default AuthScreen;
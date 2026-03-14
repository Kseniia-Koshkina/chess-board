import { useState } from "react";
import { Input } from "../components/Input";
import { Card } from "../components/Card";
import { Box } from "../components/Box";
import { Button } from "../components/Button";
import { useAuth } from "../features/auth";
import { useLocation, useNavigate } from "react-router-dom";

const AuthScreen = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const { login } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	const handleLogin = async () => {
		if (!username || !password) return;

		const loginSuccess = await login(username, password);
		if (loginSuccess) 
			navigate(from, { replace: true });
	}

	return (
		<Box center>
			<Card
				flexDirection={"column"}
				gap={2} 
				padding={2} 
				width={"30%"}
			> 
				<Box flexDirection="row">
					<img src={"/logo.svg"} style={{ height:"150px"}}/>
					<img src={"/chess-naming.png"} style={{ height:"150px"}} />
				</Box>
				<Input 
					type="text" 
					onInput={e => setUsername(e.currentTarget.value)} 
					placeholder="username"
				/>
				<Input 
					type="password" 
					onInput={e => setPassword(e.currentTarget.value)} 
					placeholder="password"
				/>
				<Button
					onClick={() => handleLogin()}
					disabled={!password || !username}
				>
					Log in
				</Button>
			</Card>
		</Box>
	)
}

export default AuthScreen;
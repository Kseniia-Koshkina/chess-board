import { useState } from "react";
import { Input } from "../components/Input";
import { Card } from "../components/Card";
import { Box } from "../components/Box";
import { Button } from "../components/Button";
import { useAuth } from "../features/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, TextButton } from "../components";
import { useTheme } from "../theme/themeContext";

const AuthScreen = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isSignUp, setIsSignUp] = useState<boolean>(false);
	const { theme } = useTheme();
	const { login, register } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	const toggleSignUpOption = () => {
		setUsername("");
		setPassword("");
		setIsSignUp(!isSignUp);
	}

	const handleLogin = async () => {
		if (!username || !password) return;
		const loginSuccess = await login(username, password);
		if (loginSuccess) 
			navigate(from, { replace: true });
	}

	const handleRegister = async () => {
		if (!username || !password) return;
		const registerSuccess = await register(username, password);
		if (registerSuccess)
			navigate(from, { replace: true });
	}

	return (
		<Container padding={3}>
			<Card
				gap={5} 
				padding={2} 
				height="600px"
				maxWidth="400px"
				width="100%"
				bgOpacity="40"
			>
				<Box 
					flexDirection="row" 
					center 
					maxHeight="250px"
					gap={2}
				>
					<img 
						src={`logo-${theme}.svg`} 
						style={{ height:"150px"}}
					/>
					<img 
						src={`chess-naming-${theme}.png`} 
						style={{ height:"150px"}} 
					/>
				</Box>
				<Box gap={2} center>
					<Input 
						type="text" 
						onInput={e => setUsername(e.currentTarget.value)} 
						placeholder="username"
						value={username}
					/>
					<Input 
						type="password" 
						onInput={e => setPassword(e.currentTarget.value)} 
						placeholder="password"
						value={password}
					/>
					
					<Button
						onClick={() => !isSignUp ? handleLogin() : handleRegister()}
						disabled={!password || !username}
						bgOpacity="90"
						height="50px"
						width="100%"
					>
						Sign {!isSignUp ? "In" : "Up"}
					</Button>
					<p>
						{!isSignUp ? "Don`t have an account " : "Already have an account "} 
						<TextButton onClick={() => toggleSignUpOption()}>Sign {isSignUp ? "In" : "Up"}</TextButton>
					</p>
				</Box>
			</Card>
		</Container>
	)
}

export default AuthScreen;
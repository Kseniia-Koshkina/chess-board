import { useContext, useState } from "react";
import AuthContext from "../features/auth/context/authContext";
import { Input } from "../components/Input";
import { Card } from "../components/Card";
import { Box } from "../components/Box";
import { Button } from "../components/Button";

const AuthScreen = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const { login } = useContext(AuthContext);

	return (
		<Box center>
			<Card 
				flexDirection="column" 
				gap={2} 
				padding={2} 
				width={"30%"}
			> 
				<img src={"chess-logo.png"}></img>
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
					onClick={() => login(username, password)}
					disabled={!password || !username}
				>
					Log in
				</Button>
			</Card>
		</Box>
	)
}

export default AuthScreen;
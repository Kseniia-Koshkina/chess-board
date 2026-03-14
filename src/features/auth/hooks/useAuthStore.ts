import { useContext } from "react";
import AuthContext from "../context/authContext"

const useAuthStore = () => useContext(AuthContext);

export default useAuthStore;
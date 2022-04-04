import { useJwt } from "./JwtContext";
import { useNavigate } from "react-router-dom";

export const Auth = ({ children, isPublic = false }) => {
    const { isConnected, setConnected } = useJwt();
    let nav = useNavigate();
    if (isConnected || isPublic)
        return (
            <div>
                {children}
            </div>
        )
    else
        nav('/');
}
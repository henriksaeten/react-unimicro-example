import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate("/home")
        }
    });

    const signIn = () => {
        auth.signinRedirect();
    }
    return (<button onClick={(signIn)}>Log in</button>)
}
export default LoginPage;



import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import "../styles/login.css"

const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/home");
    }
  });

  const signIn = () => {
    auth.signinRedirect();
  };
  return (
    <div className="container">
      <Button onClick={signIn} text={"Log in"} />
    </div>
  );
};
export default LoginPage;

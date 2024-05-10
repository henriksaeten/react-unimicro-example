import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { API_BASE_URL } from "../environment";
import Button from "./button";
import "../styles/navbar.css"
interface User {
  DisplayName: string;
}

const Navbar = () => {
  const auth = useAuth();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = auth.user!.access_token;
        const res = await getCurrentUser(token);
        setUser(res);
      } catch (error) {
        console.error("couldn't fetch user: ", error);
      }
    };
    fetchUser();
  }, []);

  return (
      <div className="navbar">
        <div className="logo">
          <p>Logo</p>
        </div>
        <ul> 
          <li>
            <Link to="/home" style={{textDecoration: "None", color: "black"}}>Min Oversikt</Link>
          </li>
          <li>
            <Link to="/home"style={{textDecoration: "None", color: "black"}}>Ansattfordeler</Link>
          </li>
          <li>
            <Link to="/home"style={{textDecoration: "None", color: "black"}}>Mine Kontakter</Link>
          </li>
        </ul>
        <Button
          key={user?.DisplayName}
          text={user ? user.DisplayName : "Loading..."}
          onClick={() => void console.log("clicked")}
        ></Button>
      </div>
  );
};

async function getCurrentUser(token: string) {
  const res = await fetch(API_BASE_URL + "/biz/users?action=current-session", {
    headers: { Authorization: "Bearer " + token },
  });
  if (res.ok) {
    const user = await res.json();
    return user;
  } else {
    console.log("Error: " + (await res.text()));
  }
}

export default Navbar;

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { API_BASE_URL } from "../environment";
import Button from "./button";
import CSS from "csstype";
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
        console.log(res);
        setUser(res);
      } catch (error) {
        console.error("couldn't fetch user: ", error);
      }
    };
    fetchUser();
  }, []);

  return (
      <div style={navStyle}>
        <div style={logoStyle}>
          <p>Logo</p>
        </div>
        <ul style={ulStyle}>
          <li style={liStyle}>
            <Link to="/home" style={{textDecoration: "None", color: "black"}}>Min Oversikt</Link>
          </li>
          <li style={liStyle}>
            <Link to="/home"style={{textDecoration: "None", color: "black"}}>Ansattfordeler</Link>
          </li>
          <li style={liStyle}>
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

const navStyle: CSS.Properties = {
    display: "flex",
    height: "80px",
    width: "100%",
    background: "white",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid red",
  };
  const ulStyle: CSS.Properties = {
    display: "flex",
    justifyContent: "space-around",
    width: "50%",
    listStyle: "none",
    border: "1px solid red",
  };
  const liStyle: CSS.Properties = {
    textDecoration: "none",
    border: "1px solid red",
  };
  const logoStyle: CSS.Properties = {
    display: "flex",
    marginLeft: "2%",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid red",
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

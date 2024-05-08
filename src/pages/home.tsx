import React, { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { API_BASE_URL } from "../environment";
import CSS from "csstype";
import Button from "../components/button";
import Navbar from "../components/navbar";

interface Users {
  ID: number;
  Info: {
    Name: string;
    DefaultPhone: { Number: string };
  };
}

const Home = () => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<Users[]>([]);
  useEffect(() => {
    const getContacts = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams({
          expand:
            "Info.Name,Info.DefaultPhone,Info.DefaultEmail,Info.DefaultAddress",
          hateoas: "false",
        });
        if (auth.user) {
          const contacts = await fetch(
            `${API_BASE_URL}biz/contacts?${params.toString()}`,
            {
              headers: { Authorization: "Bearer " + auth.user!.access_token },
            }
          ).then((res) => res.json());
          console.log(contacts.data);
          setUsers(contacts);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getContacts();
  }, []);

  return (
    <>
    <Navbar/>
    <div style={rootStyle}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Mine Kontakter</h2>
        <ul style={ulStyle}>
          {users.map(({ ID, Info }) => {
            return (
              <li key={ID} style={liStyle}>
                <div style={textStyle}>{Info.Name}</div>
                <div style={textStyle}>Phone: {Info.DefaultPhone.Number}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
    <Button text={"Endre"} onClick={changeView}/>
    </>
  );
};
const rootStyle: CSS.Properties = {
  display: "flex",
  textAlign: "center",
  justifyContent: "center",
  marginTop: "20px",
  //border: "1px solid red",
};
const containerStyle: CSS.Properties = {
  width: "50%",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  //border: "1px solid red",
};
const headingStyle: CSS.Properties = {
  fontSize: "2.0rem",
  //border: "1px solid red",
};
const ulStyle: CSS.Properties = {
  listStyle: "none",
  //border: "1px solid red",
};
const liStyle: CSS.Properties = {
  display: "flex",
  //justifyContent: "space-around",
  textDecoration: "none",
  textAlign: "left",
  marginBottom: "20px",
  marginLeft: "20%"
};
const textStyle: CSS.Properties = {
    flexBasis: "100%",
    textAlign: "left",
    //border: "1px solid red",
    fontSize: "20px"
}

function changeView() {

}
export default Home;

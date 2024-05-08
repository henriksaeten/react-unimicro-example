import React, { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { API_BASE_URL } from "../environment";
import Button from "../components/button";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import "../styles/home.css"

interface Users {
  ID: number;
  Info: {
    Name: string;
    DefaultPhone: { Number: string };
  };
}

const Home = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<Users[]>([]);

  const changeView = () => {
    navigate("/change")
  }

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
      <Navbar />
      <div className="root" >
        <div className="container" >
          <h2 className="header" >Mine Kontakter</h2>
          <ul >
            {users.map(({ ID, Info }) => {
              return (
                <li key={ID} >
                  <div >{Info.Name}</div>
                  <div >Phone: {Info.DefaultPhone.Number}</div>
                </li>
              );
            })}
          </ul>
          <div>
            <Button text={"Endre"} onClick={changeView} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;

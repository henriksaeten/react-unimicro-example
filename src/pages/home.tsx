import React, { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { API_BASE_URL } from "../environment";
import Button from "../components/button";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import UserComponent from "../components/userComponent";
import User  from "../types/user"

const Home = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [User, setUser] = useState<User[]>([]);
  const [isEditMode, setIsEditMode] = useState(true);

  const changeView = () => {
    navigate("/change");
  };

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
          setUser(contacts);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getContacts();
  }, []);

  
  const editContacts = () => {
    setIsEditMode(!isEditMode);
  };


  return (
    <>
      <Navbar />
      {isLoading && "Loading..."}
      <div className="root">
        <div className="container">
          <h2 className="header">Mine Kontakter</h2>
          <ul>
            {User.map((user) => (
              <UserComponent key={user.ID} user={user} isEditMode={isEditMode} editContacts={editContacts}/>
            ))}
          </ul>
          <div className="buttons">
          <div>
            <Button text={"Legg til ny kontakt"} onClick={changeView} />
          </div>
          <div>
            <Button text={"Endre kontakter"} onClick={editContacts} />
          </div>
        </div>
        </div>
      </div>
    </>
  );
};
export default Home;

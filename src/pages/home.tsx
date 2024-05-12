import React, { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { API_BASE_URL } from "../environment";
import Button from "../components/button";
import Navbar from "../components/navbar";
import "../styles/home.css";
import UserComponent from "../components/userComponent";
import { User } from "../types/user";

const Home = () => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [User, setUser] = useState<User[]>([]);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

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
          console.log(contacts);
          if (contacts) {
            setUser(
              contacts.map((contact: User) => ({
                ...contact,
                Info: {
                  ...contact.Info,
                  DefaultPhone: contact.Info.DefaultPhone
                    ? contact.Info.DefaultPhone
                    : { Number: "" },
                },
              }))
            );
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    getContacts();
  }, []);

  const editContacts = () => {
    setIsEditMode(!isEditMode);
  };

  const setNewUser = () => {
    setIsNewUser(!isNewUser);
  };

  const addNewUser = () => {
    const newUser = {
      ID: Math.random(),
      InfoID: Math.random(),
      Info: {
        Name: "",
        DefaultPhone: {
          CountryCode: "+47",
          Description: "Mobile",
          Number: "",
        },
      },
    };
    setUser((prevUsers) => [...prevUsers, newUser]);
    editContacts();
    setNewUser();
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
              <UserComponent
                key={user.InfoID}
                user={user}
                isEditMode={isEditMode}
                editContacts={editContacts}
                isNewUser={isNewUser}
                setNewUser={setNewUser}
              />
            ))}
          </ul>
          <div className="buttons">
            <div>
              <Button text={"Legg til ny kontakt"} onClick={addNewUser} />
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

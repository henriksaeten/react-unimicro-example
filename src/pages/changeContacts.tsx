import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import Button from "../components/button";
import "../styles/changeContacts.css";
import { useAuth } from "react-oidc-context";
import { API_BASE_URL } from "../environment";
interface Users {
  ID: number;
  Info: {
    Name: string;
    DefaultPhone: { Number: string };
  };
}

const ChangeContacts = () => {
  const auth = useAuth();
  const [users, setUsers] = useState<Users[]>([]);
  const [updateUsers, setUpdateUsers] = useState<Users[]>([]);

  useEffect(() => {
    const getContacts = async () => {
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
        )
          .then((res) => res.json())
          .catch((err) => console.error(err));
        setUsers(contacts);
        setUpdateUsers(contacts);
      }
    };
    getContacts();
  }, [auth.user]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    userID: number
  ) => {
    const { name, value } = event.target;
    setUpdateUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.ID === userID
          ? {
              ...user,
              Info: {
                ...user.Info,
                [name]: value,
              },
            }
          : user
      )
    );
  };
  const handleDelete = (userID: number) => {
    setUpdateUsers((prevUsers) =>
      prevUsers.filter((user) => user.ID !== userID)
    );
  };

  return (
    <>
      <Navbar />
      <form className="root">
        <div className="container">
          <h2 className="header">Endre Kontakt</h2>
          <ul>
            {updateUsers.map(({ ID, Info }) => {
              return (
                <li key={ID}>
                  <input
                    type="text"
                    name="Name"
                    value={Info.Name}
                    onChange={(e) => handleInputChange(e, ID)}
                  />
                  <input
                    type="text"
                    name="DefaultPhone"
                    value={Info.DefaultPhone.Number}
                    onChange={(e) => handleInputChange(e, ID)}
                  />
                  <button onClick={() => handleDelete(ID)}>Delete</button>
                </li>
              );
            })}
          </ul>
          <div>
            <Button text={"Endre"} onClick={() => void console.log("hello")} />
          </div>
        </div>
      </form>
      <div>Hello there</div>
    </>
  );
};

export default ChangeContacts;

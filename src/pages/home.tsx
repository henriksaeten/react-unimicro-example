import React, { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { API_BASE_URL } from "../environment";
import Button from "../components/button";
import Navbar from "../components/navbar";
import "../styles/home.css";
import { User } from "../types/user";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [apiUser, setApiUser] = useState<User[]>([]);
  const [isEdited, setIsEdited] = useState<boolean[]>([]);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [buttonText, setButtonText] = useState("Legg til");
  const [query, setQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filteredIsEdited, setFilteredIsEdited] = useState<boolean[]>([]);

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
            setApiUser(
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
            setFilteredUsers(contacts);
            if (contacts && contacts.length > 0) {
              setIsEdited(contacts.map(() => false));
            }
            setFilteredIsEdited(isEdited);
          }
        }
      } finally {
        setIsLoading(false);
        console.log(auth.user?.access_token)
      }
    };
    getContacts();
  }, []);

  const editContacts = () => {
    setIsReadOnly(!isReadOnly);
    setButtonText("Lagre");
  };

  const setNewUser = () => {
    setIsNewUser(!isNewUser);
  };

  const addNewUser = () => {
    filteredUsers.map((currentUser) => {
      const index = filteredUsers.indexOf(currentUser);
      const update = filteredIsEdited[index];
      if (update) {
        const myUrl = API_BASE_URL + "biz/contacts";
        const method = "POST";
        const content = {
          Info: {
            Name: currentUser.Info.Name,
            DefaultPhone: currentUser.Info.DefaultPhone.Number
              ? {
                  CountryCode: currentUser.Info.DefaultPhone.CountryCode,
                  Description: currentUser.Info.DefaultPhone.Description,
                  Number: currentUser.Info.DefaultPhone.Number,
                }
              : { Number: "" },
          },
        };
        apiCall(method, myUrl, JSON.stringify(content));
        updateIsEdited(index);
      }
    });
    showToast("Lagrer ny bruker");
    refresh();
  };

  const updateUser = () => {
    filteredUsers.map((currentUser) => {
      const index = filteredUsers.indexOf(currentUser);
      const shouldUpdate = filteredIsEdited[index];
      if (shouldUpdate) {
        const myUrl = `${API_BASE_URL}biz/contacts/${currentUser.ID}`;
        const method = "PUT";
        apiCall(method, myUrl, JSON.stringify(currentUser));
        updateIsEdited(index);
      }
    });
    showToast("Lagrer endringer");
    refresh();
  };

  const deleteUser = (id: number) => {
    const currentUser = filteredUsers.filter((item) => item.ID === id).pop()
    const myUrl = `${API_BASE_URL}biz/contacts/${currentUser!.ID}`;
    const method = "DELETE";
    apiCall(method, myUrl, "");
    setIsEdited(prev => prev.filter((_: boolean, index: number) => index != id));
    showToast("Sletter bruker");
    refresh();
  };

  const addInputFields = () => {
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
    setApiUser((prevUsers) => [...prevUsers, newUser]);
    setFilteredUsers((prevUser) => [...prevUser, newUser]);
    setIsEdited((prevUser) => [...prevUser, false]);
    editContacts();
    setNewUser();
  };

  const apiCall = async (method: string, myUrl: string, body: string) => {
    if (auth.user) {
      await fetch(myUrl, {
        method: method,
        body: body,
        headers: {
          Authorization: "Bearer " + auth.user!.access_token,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((err) => console.error(err));
    }
  };

  const updateIsEdited = (id: number) => {
    setIsEdited((prevState) => {
      const newState = [...prevState];
      newState[id] = true;
      return newState;
    });
    setFilteredIsEdited((prevState) => {
      const newState = [...prevState];
      newState[id] = true;
      return newState;
    })
  };

  const handleInputChange = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFilteredUsers((prevState) => {
      const newState = [...prevState];
      if (name === "Number") {
        newState[id] = {
          ...newState[id],
          Info: {
            ...newState[id].Info,
            DefaultPhone: {
              ...newState[id].Info.DefaultPhone,
              [name]: value,
            },
          },
        };
      } else {
        newState[id] = {
          ...newState[id],
          Info: {
            ...newState[id].Info,
            [name]: value,
          },
        };
      }
      return newState;
    });
    updateIsEdited(id);
  };

  const submit = () => {
    if (isNewUser) {
      addNewUser();
    } else {
      updateUser();
    }
  };

  const changeButtonText = () => {
    if (buttonText === "Lagre") {
      setButtonText("Legg til");
      submit();
    } else {
      addInputFields();
      setButtonText("Lagre");
    }
  };

  const refresh = () => {
    setTimeout(() => window.location.reload(), 2000);
  };

  const showToast = (text: string) => {
    toast(text, {
      position: "top-center",
      autoClose: 1000,
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setQuery(search);
    const filtered = apiUser.filter((currentUser) =>
      currentUser.Info.Name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
    setFilteredIsEdited(
      isEdited.filter((_, index) => filtered.includes(apiUser[index]))
    );
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      {isLoading && "Loading..."}
      <div className="root">
        <div className="container">
          <h2 className="header">Mine Kontakter</h2>
          <input
            className="search"
            type="search"
            placeholder="Søk etter kontakter"
            value={query}
            onChange={handleSearch}
          ></input>
          <div className="listContainer">
            <ul>
              {filteredUsers.map((currentUser, id) => (
                <li key={currentUser.InfoID}>
                  <input
                    type="text"
                    name="Name"
                    readOnly={isReadOnly}
                    onChange={(e) => handleInputChange(id, e)}
                    defaultValue={currentUser.Info.Name}
                    style={!isReadOnly ? { border: "1px solid black" } : {}}
                  />
                  <input
                    type="text"
                    name="Number"
                    readOnly={isReadOnly}
                    onChange={(e) => handleInputChange(id, e)}
                    defaultValue={currentUser!.Info.DefaultPhone.Number}
                    style={!isReadOnly ? { border: "1px solid black" } : {}}
                  />
                  {!isReadOnly && (
                    <button onClick={() => deleteUser(currentUser.ID)}>
                      Slett
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="buttons">
            <div>
              <Button text={buttonText} onClick={changeButtonText} />
            </div>
            <div>
              {isReadOnly && (
                <Button text={"Endre kontakter"} onClick={editContacts} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;

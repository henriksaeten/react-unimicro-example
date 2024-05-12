import { FC, useRef, useState } from "react";
import { User } from "../types/user";
import "../styles/userComponent.css";
import { API_BASE_URL } from "../environment";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import Button from "./button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type UserComponentProps = {
  id: number;
  user: User;
  isEditMode: boolean;
  editContacts: () => void;
  isNewUser: boolean;
  setNewUser: () => void;
  updateIsEdited: (id: number) => void;
};

const UserComponent: FC<UserComponentProps> = ({
  id,
  user,
  isEditMode,
  editContacts,
  isNewUser,
  setNewUser,
  updateIsEdited,
}) => {
  //const navigate = useNavigate();
  // const auth = useAuth();
  const [currentUser, setCurrentUser] = useState<User>(user);
  // const blurCount = useRef(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "Number") {
      setCurrentUser({
        ...currentUser,
        Info: {
          ...currentUser.Info,
          DefaultPhone: {
            ...currentUser.Info.DefaultPhone,
            [name]: value,
          },
        },
      });
    } else {
      setCurrentUser({
        ...currentUser,
        Info: {
          ...currentUser.Info,
          [name]: value,
        },
      });
    }
    updateIsEdited(id);
  };

  // const updateUser = async () => {
  //   if (auth.user) {
  //     const myUrl = `${API_BASE_URL}biz/contacts/${currentUser.ID}`;
  //     await fetch(myUrl, {
  //       method: "PUT",
  //       body: JSON.stringify(currentUser),
  //       headers: {
  //         Authorization: "Bearer " + auth.user!.access_token,
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((res) => res.json())
  //       .catch((err) => console.error(err));
  //   }
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 2000);
  // };

  // const addNewUser = async () => {
  //   if (auth.user) {
  //     const myUrl = API_BASE_URL + "biz/contacts";
  //     const content = {
  //       Info: {
  //         Name: currentUser.Info.Name,
  //         DefaultPhone: currentUser.Info.DefaultPhone
  //           ? {
  //               CountryCode: currentUser.Info.DefaultPhone.CountryCode,
  //               Description: currentUser.Info.DefaultPhone.Description,
  //               Number: currentUser.Info.DefaultPhone.Number,
  //             }
  //           : { Number: "" },
  //       },
  //     };
  //     await fetch(myUrl, {
  //       method: "POST",
  //       body: JSON.stringify(content),
  //       headers: {
  //         Authorization: "Bearer " + auth.user!.access_token,
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((res) => res.json())
  //       .catch((err) => console.error(err));
  //   }
  //   navigate("/home");
  //   setNewUser();
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 2000);
  // };

  // const handleBlur = () => {
  //   if (!isEditMode) {
  //     blurCount.current += 1;
  //     if (blurCount.current >= 2) {
  //       console.log("Sent post request");
  //       blurCount.current = 0;
  //       if (isNewUser) {
  //         addNewUser();
  //         showToast("Lagret ny bruker");
  //       } else {
  //         updateUser();
  //         showToast("Oppdatert bruker");
  //       }
  //       editContacts();
  //     }
  //   }
  // };

  const showToast = (text: string) => {
    toast(text, {
      position: "top-center",
      autoClose: 1000,
    });
  };

  // const deleteUser = async () => {
  //   if (auth.user) {
  //     const myUrl = `${API_BASE_URL}biz/contacts/${currentUser.ID}`;
  //     await fetch(myUrl, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: "Bearer " + auth.user!.access_token,
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((res) => res.json())
  //       .catch((err) => console.error(err));
  //   }
  //   navigate("/home");
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 2000);
  // };

  return (
    <>
      <ToastContainer />
      <li key={currentUser.InfoID}>
        <input
          type="text"
          name="Name"
          readOnly={isEditMode}
          onChange={(e) => handleInputChange(e)}
          defaultValue={currentUser.Info.Name}
          style={!isEditMode ? { border: "1px solid black" } : {}}
        />
        <input
          type="text"
          name="Number"
          readOnly={isEditMode}
          onChange={(e) => handleInputChange(e)}
          defaultValue={currentUser!.Info.DefaultPhone.Number}
          style={!isEditMode ? { border: "1px solid black" } : {}}
        />
      </li>
    </>
  );
};
export default UserComponent;

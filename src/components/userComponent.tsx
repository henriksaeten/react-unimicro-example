import { FC, useRef, useState } from "react";
import {User} from "../types/user";
import "../styles/userComponent.css"
import { API_BASE_URL } from "../environment";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

type UserComponentProps = {
  user: User;
  isEditMode: boolean,
  editContacts: () => void,
};

const UserComponent: FC<UserComponentProps> = ({ user, isEditMode, editContacts}) => {
    const navigate = useNavigate();
    const auth = useAuth();
  const [currentUser, setCurrentUser] = useState<User>(user);
  const blurCount = useRef(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentUser((prevUser) => {
      return {
        ...prevUser,
        Info: {
          ...prevUser!.Info,
          [name]: value,
        },
      };
    });
  };

  const updateUser = async () => {
    if (auth.user) {
        const myUrl = API_BASE_URL + 'biz/contacts';
        const content = {
                ID: currentUser.ID,
                InfoID: currentUser.InfoID,
                _createguid: currentUser._createguid,
                Info: {
                    Name: currentUser.Info.Name,
                    DefaultPhone: currentUser.Info.DefaultPhone ? {
                        CountryCode: currentUser.Info.DefaultPhone.CountryCode,
                        Description: currentUser.Info.DefaultPhone.Description,
                        Number: currentUser.Info.DefaultPhone.Number
                      } : { Number: "" }, 
                }
        }
        await fetch(myUrl,
          {
            method: 'PUT',
            body: JSON.stringify(content),
            headers: { Authorization: "Bearer " + auth.user!.access_token,
                'Content-Type': 'application/json'
             },
          }
        ).then((res) => res.json())
        .catch((err) => console.error(err));
        navigate("/home");
    }

  }

  const handleBlur = () => {
    if (!isEditMode) {
        blurCount.current +=1;
        if (blurCount.current >= 2) {
            console.log("Sent post request")
            blurCount.current = 0;
            updateUser();
            editContacts();
        }
    }
  }

  return (
    <li key={currentUser.InfoID}>
      <input
        type="text"
        name="Name"
        readOnly={isEditMode}
        onChange={(e) => handleInputChange(e)}
        onBlur={handleBlur}
        defaultValue={currentUser.Info.Name}
        style={ !isEditMode ? {border: '1px solid black'}: {}}
      />
      <input
        type="text"
        name="DefaultPhone"
        readOnly={isEditMode}
        onChange={(e) => handleInputChange(e)}
        onBlur={handleBlur}
        defaultValue={currentUser!.Info.DefaultPhone.Number}
        style={ !isEditMode ? {border: '1px solid black'}: {}}
      />
    </li>
  );
};
export default UserComponent;

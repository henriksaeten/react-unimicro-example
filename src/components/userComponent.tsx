import { FC, useRef, useState } from "react";
import User from "../types/user";
import "../styles/userComponent.css"

type UserComponentProps = {
  user: User;
  isEditMode: boolean,
  editContacts: () => void,
};

const UserComponent: FC<UserComponentProps> = ({ user, isEditMode, editContacts}) => {
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

  const handleBlur = () => {
    if (!isEditMode) {
        blurCount.current +=1;
        if (blurCount.current >= 2) {
            console.log("Sent post request")
            blurCount.current = 0;
            editContacts();
        }
    }
  }

  return (
    <li key={currentUser.ID}>
      <input
        type="text"
        name="Name"
        readOnly={isEditMode}
        onChange={(e) => handleInputChange(e)}
        onBlur={handleBlur}
        value={currentUser.Info.Name || ""}
        style={ !isEditMode ? {border: '1px solid black'}: {}}
      />
      <input
        type="text"
        name="DefaultPhone"
        readOnly={isEditMode}
        onChange={(e) => handleInputChange(e)}
        onBlur={handleBlur}
        value={currentUser.Info.DefaultPhone.Number || ""}
        style={ !isEditMode ? {border: '1px solid black'}: {}}
      />
    </li>
  );
};
export default UserComponent;

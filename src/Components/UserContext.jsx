import { createContext, useState, useContext } from "react";
const userContext = createContext();

const UserProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);
  return (
    <userContext.Provider value={{loggedInUser, setLoggedInUser}}>
      {children}
    </userContext.Provider>
  )
};

export const useUser = () => {
  return useContext(userContext);
};

export default UserProvider;

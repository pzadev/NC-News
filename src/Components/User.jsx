import { useState, useEffect } from "react";
import { getUsers } from "../api";
import { useUser } from "./UserContext";

const User = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { loggedInUser, setLoggedInUser } = useUser(); 

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((users) => {
        setUsers(users);
        setLoading(false);
      })
      .catch((err) => {
        setError("Unable to fetch users. Please try again.");
        setLoading(false);
      });
  }, []);

  const handleLogin = () => {
    if (selectedUser) {
      setLoggedInUser(selectedUser);
    } else {
      alert("Please choose a user to log in.");
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null); 
  };

  if (loading) return <h2>Loading list of users...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="user-page-container">
      {loggedInUser ? (
        <div>
          <h2>You have successfully logged in as {loggedInUser.username}</h2>
          <img
            src={loggedInUser.avatar_url}
            alt={`${loggedInUser.username}'s avatar`}
            style={{ width: "100px", height: "100px" }}
          />
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div className="user-login-box">
          <h2>User Log In</h2>
          <label>
            Once logged in, you are then able to comment on articles and delete
            your own comments!
          </label>
          <select
            id="user-select"
            value={selectedUser ? selectedUser.username : ""}
            onChange={(e) =>
              setSelectedUser(
                users.find((u) => u.username === e.target.value) || null
              )
            }
          >
            <option value="">-- Select a user --</option>
            {users.map((u) => (
              <option key={u.username} value={u.username}>
                {u.username}
              </option>
            ))}
          </select>
          <button onClick={handleLogin}>Log In</button>
        </div>
      )}
    </div>
  );
};

export default User;

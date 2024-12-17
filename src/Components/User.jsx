import { useState, useEffect } from "react";
import { getUsers } from "../api";
import { useUser } from "./UserContext"

const User = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setLoggedInUser } = useUser()

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((users) => {
        setUsers(users);
        setLoading(false);
      })
      .catch((err) => {
        setError("Unable to fetch users. Please try again.");
      });
  }, []);

 
  const handleLogin = () => {
    if (user) {
      setLoggedInUser(user);
    } else {
      return <p>Please choose a user to log in.</p>
    }
  };

  if (loading) return <p>Loading available users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>User Log In</h2>
      <label>Select a user:</label>
      <select
        id="user-select"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      >
        <option value="">-- Select a user --</option>
        {users.map((user) => (
          <option key={user.username} value={user.username}>
            {user.username}
          </option>
        ))}
      </select>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default User;

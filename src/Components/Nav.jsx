import { Link } from "react-router";
import { useUser } from "./UserContext";

const Nav = () => {
  const { loggedInUser } = useUser();

  return (
    <nav>
      <Link to="/articles">
        <p>Articles</p>
      </Link>
      <Link to="/user">
      <p>{loggedInUser ? loggedInUser : "User"}</p>
      </Link>
      {loggedInUser ? (
        <strong><p className="logged-in-msg">You are logged in as: {loggedInUser}</p>
        </strong>
      ) : (
        <p className="logged-in-msg">Not logged in</p>
      )}
    </nav>
  );
};

export default Nav;

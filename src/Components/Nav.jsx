import { Link } from "react-router";
import { useUser } from "./UserContext";

const Nav = () => {
  const { loggedInUser } = useUser();

  return (
    <nav>
      <Link to="/articles">
        <p>Articles</p>
      </Link>
      <Link to="/topics">
        <p>Topics</p>
      </Link>
      <Link to="/user">
        <p>{loggedInUser ? <p>Currently logged in as <strong>{loggedInUser}</strong></p> : "Users"}</p>
      </Link>
      {loggedInUser ? (
        ''
      ) : (
        <p>Not currently logged in</p>
      )}
    </nav>
  );
};

export default Nav;

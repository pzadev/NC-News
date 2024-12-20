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
        <p>
          {loggedInUser ? (
            <span>
              Currently logged in as <strong>{loggedInUser.username}</strong>
            </span>
          ) : (
            "Users"
          )}
        </p>
      </Link>
      {loggedInUser ? (
        <div className="user-info">
          <img
            src={loggedInUser.avatar_url}
            alt={`${loggedInUser.username}'s avatar`}
            className="avatar"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10%",
            }}
          />
        </div>
      ) : (
        <div>Not currently logged in</div>
      )}
    </nav>
  );
};

export default Nav;

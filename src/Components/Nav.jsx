import { Link } from "react-router"


const Nav = () => {
    return (
      <nav>
        <Link to="/articles"><p>Articles</p></Link>
        <Link to="/users"><p>Users</p></Link>
        <Link to="/comments"><p>Comments</p></Link>
      </nav>
    );
  }
  
  export default Nav;





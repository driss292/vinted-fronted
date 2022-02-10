import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to={"/signup"}>
        <button>SignUp</button>
      </Link>
      <Link to={"/login"}>
        <button>Login</button>
      </Link>
    </div>
  );
};
export default Header;

import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/logo.png";

const Header = ({ token, setUser }) => {
  const navigate = useNavigate();
  return token ? (
    <button
      onClick={() => {
        setUser(null);
        navigate("/");
      }}
    >
      Se deconnecter
    </button>
  ) : (
    <div className="block">
      <div className="header">
        <div>
          <img src={Logo} alt="" />
        </div>
        <div className="search">
          <input type="text" />
        </div>
        <div className="signup-login">
          <Link to={"/signup"}>
            <button>SignUp</button>
          </Link>
          <Link to={"/login"}>
            <button>Login</button>
          </Link>
        </div>
        <div className="sell">
          <button>Vends tes articles</button>
        </div>
      </div>
    </div>
  );
};
export default Header;

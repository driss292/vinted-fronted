import { useNavigate, Link } from "react-router-dom";
import Logo from "../images/logo.png";
import Button from "./Button";
import Logout from "./Logout";

const Header = ({ token, setUser }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="block">
        <div className="header">
          <div>
            <Link to={"/"}>
              <img src={Logo} alt="" />
            </Link>
          </div>
          <div className="search">
            <input type="text" placeholder="Recherche des articles" />
          </div>
          {token ? (
            <Logout navigate={navigate} setUser={setUser} />
          ) : (
            <Button />
          )}
          <div className="sell">
            <Link to={"/publish"}>
              <button>Vends tes articles</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;

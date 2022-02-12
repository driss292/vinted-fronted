import { Link } from "react-router-dom";

const Button = () => {
  return (
    <div className="signup-login">
      <Link to={"/signup"}>
        <button>SignUp</button>
      </Link>
      <Link to={"/login"}>
        <button>Login</button>
      </Link>
    </div>
  );
};
export default Button;

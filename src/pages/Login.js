const Login = () => {
  return (
    <div className="login-container">
      <form>
        <h2>Se connecter</h2>
        <input type="email" placeholder="Adresse email" />
        <input type="password" placeholder="Mot de passe" />
        <button>Se connecter</button>
      </form>
    </div>
  );
};
export default Login;

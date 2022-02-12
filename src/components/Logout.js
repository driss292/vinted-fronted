const Logout = ({ navigate, setUser }) => {
  return (
    <div className="signup-logout">
      <button
        onClick={() => {
          setUser(null);
          navigate("/");
        }}
      >
        Se déconnecter
      </button>
    </div>
  );
};

export default Logout;

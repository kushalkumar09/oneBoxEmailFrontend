import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { loginWithGoogle } from "../services/api.js";

const OAuthLogin = () => {
  const { user, handleLogout } = useContext(AuthContext);
  console.log(user);
  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={loginWithGoogle}>Login with Google</button>
      )}
    </div>
  );
};

export default OAuthLogin;

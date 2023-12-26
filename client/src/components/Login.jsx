import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const clientId =
  "635644996670-8fv86co48b1aaqqckv2qf6ocs5dfrduk.apps.googleusercontent.com";

const Login = () => {
  const usernameRef = useRef(null);
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    console.log("Login Success:", response);
    // Navigate to the Task screen after successful login
    navigate("/task");
  };
  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem("userId", usernameRef.current.value);
    usernameRef.current.value = "";
    navigate("/task");
  }

  return (
    <div className="login__container">
      <form action="" className="login__form" onSubmit={handleSubmit}>
        <label htmlFor="username">Provide a username</label>
        <input
          type="text"
          name="username"
          id="username"
          required
          ref={usernameRef}
        />
        <GoogleLogin
          clientId={clientId}
          buttonText="Login with Google"
          onSuccess={handleLoginSuccess}
          onFailure={(error) => console.log("Login Failure:", error)}
        />
        <button>SIGN IN</button>
      </form>
    </div>
  );
};

export default Login;

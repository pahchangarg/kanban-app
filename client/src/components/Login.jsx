import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { gapi } from "gapi-script";

const clientId =
  "376841111409-soab0kgmvs4f1rs12vk4aiaq8rukjjnf.apps.googleusercontent.com";

const Login = () => {
  const usernameRef = useRef(null);
  const navigate = useNavigate();
  //   function handleCallbackResponse(response) {}
  //   useEffect(()=>{
  //     google.account.id.initialize({
  const clientId =
    "376841111409-soab0kgmvs4f1rs12vk4aiaq8rukjjnf.apps.googleusercontent.com";
  //         callback: handleCallbackResponse
  //   },[])
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
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        <button>SIGN IN</button>
      </form>
    </div>
  );
};

export default Login;

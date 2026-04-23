import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import k from './assest/images.png'
export const Signup = () => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    const tokenId = credentialResponse.credential;

    try {
   const res = await fetch(
  "https://ecommerceaiagentwebsites.onrender.com/google-signup",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_token: tokenId }),
    credentials: "include", // required for cookies/CORS
  }
);


      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.access_token);
         localStorage.setItem("name", data.name);       // store user's name
  localStorage.setItem("email", data.email);
        navigate("/");
      } else {
        alert(data.msg);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>    <div className="bg-black text-white px-6 py-4 flex items-center">
        <img src={k} alt="logo" className="h-10" />
        <span className="ml-4 text-sm">Deliver to India</span>
      </div>
    <div className="min-h-screen bg-[#EAEDED] flex flex-col items-center pt-10">
      <div className="bg-white w-[350px] p-6 rounded border border-gray-300">

        <h1 className="text-2xl font-medium mb-4">Create account</h1>
        {/* GOOGLE SIGN IN */}
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => console.log("Google Login Failed")}
        />

        <p className="text-xs text-gray-600 mt-4">
          By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
        </p>
      </div>
    </div>
    </>
  );
};

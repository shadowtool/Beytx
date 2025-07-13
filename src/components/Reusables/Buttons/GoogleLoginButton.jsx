import React from "react";

const GoogleLoginButton = ({ classes }) => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI; // Set this in env, e.g. https://yourapp.com/api/auth/google-callback
  const scope = encodeURIComponent("openid email profile");
  const responseType = "code";
  const accessType = "offline"; // to get refresh token
  const prompt = "consent"; // to always ask for consent (optional)

  const handleGoogleLogin = () => {
    const oauth2Url =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}&` +
      `redirect_uri=${redirectUri}&` +
      `response_type=${responseType}&` +
      `scope=${scope}&` +
      `access_type=${accessType}&` +
      `prompt=${prompt}`;

    window.location.href = oauth2Url;
  };

  return (
    <button
      className={`bg-white py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center shadow border border-solid border-softGray text-black w-full h-12 ${classes}`}
      onClick={handleGoogleLogin}
      type="button"
    >
      <img
        src="/images/googlelogo.png"
        alt="Google logo"
        className="h-8 w-8 object-contain mr-2"
      />
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;

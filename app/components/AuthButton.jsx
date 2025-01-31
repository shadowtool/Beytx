"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  return session ? (
    <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded">
      Logout
    </button>
  ) : (
    <button
      onClick={() => signIn("google")}
      className="flex items-center bg-green-800  text-white font-mono px-4 py-2 rounded-lg hover:border-teal-800 border-2 border-solid transition-all duration-300"
    >
      <img
        src="/images/googlelogo.png" // Ensure you have a Google logo image in your public folder
        alt="Google Logo"
        className="w-8 h-8 mr-2 " // Increase the size of the logo
      />
      Login with Google
    </button>
  );
}

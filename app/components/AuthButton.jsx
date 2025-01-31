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
      className="flex justify-center items-center gap-2 bg-[#131314]  text-white font-mono px-4 py-3 h-12 rounded-lg border-2 border-solid hover:border-teal-800 transition-all duration-300
      "
    >
      <img
        src="/images/googlelogo.png" // Ensure you have a Google logo image in your public folder
        alt="Google Logo"
        className="w-6 h-6 mr-2 " // Increase the size of the logo
      />
      Google Login
    </button>
  );
}

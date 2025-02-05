'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function AuthButton() {
  const { data: session } = useSession();

  return session ? (
    <button 
      onClick={() => signOut()} 
      className="flex justify-center items-center gap-2 bg-zinc-600 text-white px-4 py-3 h-12 rounded-lg border-2 border-solid hover:border-zinc-400 transition-all duration-300"
    >
      Logout
    </button>
  ) : (
    <button
      onClick={() => signIn("google")}
    >
      <Image
        src="/images/google-sign-in.png"
        alt="Sign in with Google"
        width={192}  // Match your image's actual width
        height={48}  // Match your image's actual height
        className="w-full h-full object-contain"
        
      />
    </button>
  );
}
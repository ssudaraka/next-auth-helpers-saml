"use client";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthButtonClient({
  session,
}: {
  session: Session | null;
}) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithSSO({
      domain: "sudaraka.com",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });

    if (data?.url) {
      window.location.href = data.url;
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return session ? (
    <button onClick={handleSignOut}>Logout</button>
  ) : (
    <button onClick={handleSignIn}>Login</button>
  );
}

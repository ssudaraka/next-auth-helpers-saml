import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "./auth-button-server";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  }: any = await supabase.auth.getUser();

  return (
    <>
      <AuthButtonServer />
      {user ? (
        <pre>{JSON.stringify(user, null, 2)}</pre>
      ) : (
        <div>Sign in to get user data</div>
      )}
    </>
  );
}

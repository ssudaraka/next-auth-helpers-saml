import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const supabase = createRouteHandlerClient({ cookies });
  const { data, error } = await supabase.auth.signInWithSSO({
    domain: "sudaraka.com",
    options: {
      redirectTo: `${requestUrl.origin}/auth/callback`,
    },
  });

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }

  return NextResponse.json({
    message: "OK",
  });
}

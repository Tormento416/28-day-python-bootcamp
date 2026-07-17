import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) { return request.cookies.get(name)?.value; },
        set(name, value, options) { request.cookies.set({ name, value, ...options }); response = NextResponse.next({ request }); response.cookies.set({ name, value, ...options }); },
        remove(name, options) { request.cookies.set({ name, value: "", ...options }); response = NextResponse.next({ request }); response.cookies.set({ name, value: "", ...options }); },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;
  const isProtected = pathname.startsWith("/dashboard") || pathname.startsWith("/quests") || pathname.startsWith("/checkpoints");
  const isAuthPage = pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup");

  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  if (user && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = { matcher: ["/dashboard/:path*", "/quests/:path*", "/checkpoints/:path*", "/auth/login", "/auth/signup"] };

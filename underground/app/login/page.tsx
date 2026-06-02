import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080808] px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/">
            <h1 className="text-4xl font-bold tracking-widest text-[#E8FF47]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              UNDERGROUND
            </h1>
          </Link>
          <p className="mt-1 text-sm text-[#888]">Sign in to the scene</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#222] bg-[#111] p-6">
          {/* Google OAuth */}
          <button className="flex w-full items-center justify-center gap-3 rounded-full border border-[#333] bg-[#1a1a1a] px-4 py-3 text-sm font-medium hover:bg-[#222] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#222]" />
            <span className="text-xs text-[#555]">or</span>
            <div className="h-px flex-1 bg-[#222]" />
          </div>

          {/* Email form */}
          <form className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs text-[#888]" style={{ fontFamily: "'DM Mono', monospace" }}>
                EMAIL
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#222] bg-[#0d0d0d] px-4 py-3 text-sm text-white placeholder-[#555] outline-none transition-colors focus:border-[#E8FF47] focus:ring-1 focus:ring-[#E8FF47]/20"
              />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs text-[#888]" style={{ fontFamily: "'DM Mono', monospace" }}>
                  PASSWORD
                </label>
                <Link href="/forgot-password" className="text-xs text-[#888] hover:text-white transition-colors">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#222] bg-[#0d0d0d] px-4 py-3 text-sm text-white placeholder-[#555] outline-none transition-colors focus:border-[#E8FF47] focus:ring-1 focus:ring-[#E8FF47]/20"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[#E8FF47] py-3 text-sm font-bold text-black hover:bg-[#d4eb3d] transition-colors"
            >
              Sign in
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-[#888]">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-bold text-[#E8FF47] hover:underline">
            Join free
          </Link>
        </p>
      </div>
    </div>
  );
}

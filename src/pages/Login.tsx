
import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../network/auth/queries';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  ShieldCheck,
  Globe2,
  Fingerprint,
} from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError('');
    setSuccess('');
  };

  const { mutate, isPending, isError} = useLogin();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (!formData.identifier.trim()) {
      setError('Please enter your email address or username.');
      return;
    }

    if (!formData.password) {
      setError('Please enter your password.');
      return;
    }

    const payload = {
      identifier: formData.identifier.trim(),
      password: formData.password,
      rememberMe,
    };

    // Backend authentication will be connected later.
    console.log('AvendCrest login payload:', payload);

    setSuccess(
      'Your information has been validated. Login authentication will be enabled when the backend is connected.'
    );
  };

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">

      {/* =====================================
          LEFT DESIGN PANEL - DESKTOP ONLY
      ====================================== */}

      <section className="relative hidden lg:flex min-h-screen flex-col justify-between overflow-hidden bg-[#15181e] px-12 xl:px-20 py-12 text-white">

        {/* Background effects */}

        <div className="absolute -right-40 top-20 h-[450px] w-[450px] rounded-full border border-[#d91222]/20 shadow-[0_0_120px_rgba(217,18,34,0.08)]" />

        <div className="absolute -left-40 bottom-[-180px] h-[400px] w-[400px] rounded-full border border-[#d91222]/20" />

        <div className="absolute right-0 top-0 h-full w-full bg-[radial-gradient(ellipse_at_75%_45%,rgba(217,18,34,0.10),transparent_55%)] pointer-events-none" />

        {/* Logo */}

        <Link to="/" className="relative z-10 flex w-fit items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d91222] text-2xl font-black">
            A
          </div>

          <span className="text-xl font-extrabold tracking-[0.18em]">
            AVENDCREST
          </span>

        </Link>

        {/* Main visual content */}

        <div className="relative z-10 my-auto max-w-xl py-16">

          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#d91222]/30 bg-[#d91222]/10 px-4 py-2">

            <span className="h-2 w-2 rounded-full bg-[#d91222] shadow-[0_0_12px_#d91222]" />

            <span className="text-[10px] font-bold tracking-[0.22em] text-[#f15b65]">
              YOUR DIGITAL WEALTH AWAITS
            </span>

          </div>

          <h1 className="text-5xl xl:text-7xl font-extrabold leading-[1.12] tracking-tight">

            Welcome
            <br />

            back to
            <br />

            <span className="text-[#d91222]">
              AvendCrest.
            </span>

          </h1>

          <p className="mt-8 max-w-md text-sm leading-8 text-gray-400 xl:text-base">

            Your digital investment journey continues here.
            Access your account and stay connected to your
            financial goals.

          </p>

          {/* Feature cards */}

          <div className="mt-14 space-y-7">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#d91222]">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  Account protection
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Security-conscious account access.
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#d91222]">
                <Globe2 size={22} />
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  Your investments, connected
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Access your digital financial experience.
                </p>
              </div>

            </div>

          </div>

          {/* Decorative grid */}

          <div className="absolute -right-10 bottom-0 hidden xl:block opacity-20">

            <div className="grid grid-cols-5 gap-3">
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  key={i}
                  className="h-2 w-2 rounded-full bg-[#d91222]"
                />
              ))}
            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 text-[9px] tracking-[0.18em] text-gray-500">

          <span>
            AVENDCREST © {new Date().getFullYear()}
          </span>

          <span>
            INVEST WITH CLARITY.
          </span>

        </div>

      </section>


      {/* =====================================
          RIGHT LOGIN FORM
      ====================================== */}

      <section className="flex min-h-screen items-center justify-center bg-white px-5 py-8 sm:px-10 lg:px-12 xl:px-20">

        <div className="w-full max-w-[450px]">

          {/* Mobile logo */}

          <div className="mb-16 flex lg:hidden">

            <Link to="/" className="flex items-center gap-3 text-[#15181e]">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d91222] text-xl font-black text-white">
                A
              </div>

              <span className="text-lg font-extrabold tracking-[0.15em]">
                AVENDCREST
              </span>

            </Link>

          </div>


          {/* Form heading */}

          <div className="mb-10">

            <span className="text-[10px] font-bold tracking-[0.25em] text-[#d91222]">
              ACCOUNT ACCESS
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#15181e] sm:text-4xl">
              Welcome back
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Sign in to access your AvendCrest account.
            </p>

          </div>


          {/* Login form */}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* EMAIL / USERNAME */}

            <div>

              <label
                htmlFor="identifier"
                className="mb-2 block text-xs font-semibold text-[#15181e]"
              >
                Email address or username
              </label>

              <div className="flex h-13 items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-[#d91222] focus-within:ring-4 focus-within:ring-[#d91222]/5">

                <Mail size={18} className="shrink-0 text-gray-400" />

                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  placeholder="Enter your email or username"
                  value={formData.identifier}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                  className="h-full w-full bg-transparent text-sm text-[#15181e] outline-none placeholder:text-gray-400"
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div>

              <div className="mb-2 flex items-center justify-between">

                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-[#15181e]"
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-[#d91222] transition hover:underline"
                >
                  Forgot password?
                </Link>

              </div>

              <div className="flex h-13 items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-[#d91222] focus-within:ring-4 focus-within:ring-[#d91222]/5">

                <LockKeyhole size={18} className="shrink-0 text-gray-400" />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="h-full w-full bg-transparent text-sm text-[#15181e] outline-none placeholder:text-gray-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="shrink-0 text-gray-400 transition hover:text-[#d91222]"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>


            {/* REMEMBER ME */}

            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 cursor-pointer accent-[#d91222]"
              />

              <label
                htmlFor="rememberMe"
                className="cursor-pointer text-xs text-gray-500"
              >
                Remember me
              </label>

            </div>


            {/* ERROR MESSAGE */}

            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700"
              >
                {error}
              </div>
            )}


            {/* SUCCESS MESSAGE */}

            {success && (
              <div
                role="status"
                className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-xs text-green-700"
              >
                {success}
              </div>
            )}


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="group flex h-13 w-full items-center justify-center gap-3 rounded-xl bg-[#d91222] text-sm font-bold text-white shadow-lg shadow-[#d91222]/15 transition duration-300 hover:-translate-y-0.5 hover:bg-[#b80f1d] hover:shadow-xl active:translate-y-0"
            >

              Sign in to your account

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />

            </button>

          </form>


          {/* SECURITY INFORMATION */}

          <div className="mt-10 rounded-xl border border-gray-100 bg-gray-50 p-4">

            <div className="flex items-start gap-3">

              <Fingerprint
                size={21}
                className="shrink-0 text-[#d91222]"
              />

              <div>

                <h3 className="text-xs font-bold text-[#15181e]">
                  Keep your account secure
                </h3>

                <p className="mt-1 text-[11px] leading-5 text-gray-500">
                  Never share your password or verification codes
                  with anyone. AvendCrest will never ask you to
                  disclose your password.
                </p>

              </div>

            </div>

          </div>


          {/* REGISTER LINK */}

          <div className="mt-9 text-center text-xs text-gray-500">

            Don't have an account?

            <Link
              to="/signup"
              className="ml-1 font-bold text-[#d91222] hover:underline"
            >
              Create an account
            </Link>

          </div>


          {/* FOOTER */}

          <div className="mt-12 flex items-center justify-center gap-2 text-[10px] text-gray-400">

            <ShieldCheck size={15} />

            <span>
              Your account security matters to us.
            </span>

          </div>

        </div>

      </section>

    </main>
  );
}


import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  UserRound,
  Mail,
  LockKeyhole,
  Phone,
  Globe2,
  ShieldCheck,
  ChevronDown,
  Check,
  X,
  Search,
} from "lucide-react";

import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input";

import { useSignup } from "../network/auth/queries";

type Country = {
  code: string;
  name: string;
  dialCode: string;
};

const countryNames = new Intl.DisplayNames(["en"], {
  type: "region",
});

const countries: Country[] = getCountries()
  .map((code) => ({
    code,
    name: countryNames.of(code) || code,
    dialCode: `+${getCountryCallingCode(code)}`,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [countrySearch, setCountrySearch] = useState("");
  const [countryDropdown, setCountryDropdown] = useState(false);

  const [formError, setFormError] = useState("");

  const {
    mutate,
    isPending,
    error: signupError,
    reset: resetSignup,
  } = useSignup();

  const selectedCountry = countries.find(
    (country) => country.code === formData.country
  );

  const filteredCountries = useMemo(() => {
    const search = countrySearch.toLowerCase().trim();

    if (!search) return countries;

    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(search) ||
        country.dialCode.includes(search) ||
        country.code.toLowerCase().includes(search)
    );
  }, [countrySearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormError("");
    resetSignup();
  };

  const selectCountry = (country: Country) => {
    setFormData((prev) => ({
      ...prev,
      country: country.code,
      phone: "",
    }));

    setCountryDropdown(false);
    setCountrySearch("");
    setFormError("");
    resetSignup();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormError("");
    resetSignup();

    if (!formData.name.trim()) {
      setFormError("Please enter your full name.");
      return;
    }

    if (!selectedCountry) {
      setFormError("Please select your country.");
      return;
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");

    if (!phoneDigits || phoneDigits.length < 5 || phoneDigits.length > 15) {
      setFormError("Please enter a valid phone number.");
      return;
    }

    if (!formData.email.trim()) {
      setFormError("Please enter your email address.");
      return;
    }

    if (!formData.username.trim()) {
      setFormError("Please choose a username.");
      return;
    }

    if (formData.password.length < 8) {
      setFormError("Your password must contain at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError("Your passwords do not match.");
      return;
    }

    if (!acceptedTerms) {
      setFormError("Please accept the Terms and Conditions.");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      country: formData.country,
      phone: `${selectedCountry.dialCode}${phoneDigits}`,
      email: formData.email.trim(),
      username: formData.username.trim(),
      password: formData.password,
    };

    mutate(payload);
  };

  const backendError =
    signupError?.response?.data?.message ||
    (signupError ? "Something went wrong. Please try again." : "");

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* LEFT DESIGN PANEL - DESKTOP ONLY */}

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
              THE FUTURE OF DIGITAL WEALTH
            </span>
          </div>

          <h1 className="text-5xl xl:text-7xl font-extrabold leading-[1.12] tracking-tight">
            Your money.
            <br />
            Your future.
            <br />
            <span className="text-[#d91222]">Beyond limits.</span>
          </h1>

          <p className="mt-8 max-w-md text-sm leading-8 text-gray-400 xl:text-base">
            Explore a smarter approach to digital asset investing.
            Experience a platform designed around technology,
            transparency and financial opportunity.
          </p>

          {/* Feature cards */}

          <div className="mt-14 space-y-7">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#d91222]">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  Security-conscious design
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Built with security in mind.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#d91222]">
                <Globe2 size={22} />
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  Global accessibility
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  A digital financial experience.
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
          <span>AVENDCREST © {new Date().getFullYear()}</span>

          <span>INVEST WITH CLARITY.</span>
        </div>
      </section>

      {/* RIGHT SIGNUP FORM */}

      <section className="flex min-h-screen items-center justify-center bg-white px-5 py-8 sm:px-10 lg:px-12 xl:px-20">
        <div className="w-full max-w-[480px]">
          {/* Mobile logo */}

          <div className="mb-12 flex lg:hidden">
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

          <div className="mb-8">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#d91222]">
              GET STARTED
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#15181e] sm:text-4xl">
              Create your account
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Join AvendCrest and begin your digital investment journey.
            </p>
          </div>

          {/* Signup form */}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* FULL NAME */}

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs font-semibold text-[#15181e]"
              >
                Full name
              </label>

              <div className="flex h-12 items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-[#d91222] focus-within:ring-4 focus-within:ring-[#d91222]/5">
                <UserRound size={17} className="shrink-0 text-gray-400" />

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                  className="h-full w-full bg-transparent text-sm text-[#15181e] outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* COUNTRY AND PHONE */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* COUNTRY SELECTOR */}

              <div className="relative">
                <label className="mb-2 block text-xs font-semibold text-[#15181e]">
                  Country
                </label>

                <button
                  type="button"
                  onClick={() => setCountryDropdown(!countryDropdown)}
                  aria-expanded={countryDropdown}
                  className="flex h-12 w-full items-center justify-between gap-2 rounded-xl border border-gray-200 px-3 text-left transition hover:border-gray-300 focus:border-[#d91222] focus:outline-none focus:ring-4 focus:ring-[#d91222]/5"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Globe2 size={17} className="shrink-0 text-gray-400" />

                    <span
                      className={`truncate text-xs ${
                        selectedCountry ? "text-[#15181e]" : "text-gray-400"
                      }`}
                    >
                      {selectedCountry?.name || "Select country"}
                    </span>
                  </span>

                  <ChevronDown size={16} className="shrink-0 text-gray-400" />
                </button>

                {countryDropdown && (
                  <div className="absolute left-0 top-full z-50 mt-2 w-full min-w-[240px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl">
                    <div className="flex items-center gap-2 border-b border-gray-100 px-3">
                      <Search size={16} className="shrink-0 text-gray-400" />

                      <input
                        type="text"
                        placeholder="Search country..."
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        autoFocus
                        className="h-11 w-full bg-transparent text-xs text-[#15181e] outline-none placeholder:text-gray-400"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          setCountryDropdown(false);
                          setCountrySearch("");
                        }}
                        className="text-gray-400 hover:text-[#d91222]"
                        aria-label="Close country selector"
                      >
                        <X size={15} />
                      </button>
                    </div>

                    <div className="max-h-52 overflow-y-auto">
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => selectCountry(country)}
                            className={`flex w-full items-center justify-between px-4 py-3 text-left text-xs transition hover:bg-gray-50 ${
                              formData.country === country.code
                                ? "bg-red-50 text-[#d91222]"
                                : "text-[#15181e]"
                            }`}
                          >
                            <span>{country.name}</span>

                            <span className="flex items-center gap-2 text-gray-400">
                              {country.dialCode}

                              {formData.country === country.code && (
                                <Check size={14} className="text-[#d91222]" />
                              )}
                            </span>
                          </button>
                        ))
                      ) : (
                        <p className="px-4 py-5 text-center text-xs text-gray-400">
                          No countries found.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* PHONE NUMBER */}

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-xs font-semibold text-[#15181e]"
                >
                  Phone number
                </label>

                <div className="flex h-12 items-center gap-2 rounded-xl border border-gray-200 px-3 transition focus-within:border-[#d91222] focus-within:ring-4 focus-within:ring-[#d91222]/5">
                  <Phone size={16} className="shrink-0 text-gray-400" />

                  <span className="shrink-0 border-r border-gray-200 pr-2 text-xs font-semibold text-[#15181e]">
                    {selectedCountry?.dialCode || "+--"}
                  </span>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel-national"
                    required
                    className="h-full min-w-0 w-full bg-transparent text-xs text-[#15181e] outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* EMAIL */}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-semibold text-[#15181e]"
              >
                Email address
              </label>

              <div className="flex h-12 items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-[#d91222] focus-within:ring-4 focus-within:ring-[#d91222]/5">
                <Mail size={17} className="shrink-0 text-gray-400" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="h-full w-full bg-transparent text-sm text-[#15181e] outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* USERNAME */}

            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-xs font-semibold text-[#15181e]"
              >
                Username
              </label>

              <div className="flex h-12 items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-[#d91222] focus-within:ring-4 focus-within:ring-[#d91222]/5">
                <UserRound size={17} className="shrink-0 text-gray-400" />

                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                  className="h-full w-full bg-transparent text-sm text-[#15181e] outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-semibold text-[#15181e]"
              >
                Password
              </label>

              <div className="flex h-12 items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-[#d91222] focus-within:ring-4 focus-within:ring-[#d91222]/5">
                <LockKeyhole size={17} className="shrink-0 text-gray-400" />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className="h-full w-full bg-transparent text-sm text-[#15181e] outline-none placeholder:text-gray-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="shrink-0 text-gray-400 transition hover:text-[#d91222]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <p className="mt-2 text-[10px] text-gray-400">
                Use at least 8 characters.
              </p>
            </div>

            {/* CONFIRM PASSWORD */}

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-xs font-semibold text-[#15181e]"
              >
                Confirm password
              </label>

              <div className="flex h-12 items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-[#d91222] focus-within:ring-4 focus-within:ring-[#d91222]/5">
                <LockKeyhole size={17} className="shrink-0 text-gray-400" />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                  className="h-full w-full bg-transparent text-sm text-[#15181e] outline-none placeholder:text-gray-400"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  className="shrink-0 text-gray-400 transition hover:text-[#d91222]"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="mt-2 text-[10px] text-[#d91222]">
                    Passwords do not match.
                  </p>
                )}
            </div>

            {/* TERMS AND CONDITIONS */}

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => {
                  setAcceptedTerms(e.target.checked);
                  setFormError("");
                  resetSignup();
                }}
                className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#d91222]"
              />

              <label
                htmlFor="terms"
                className="text-xs leading-6 text-gray-500"
              >
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="font-semibold text-[#d91222] hover:underline"
                >
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="font-semibold text-[#d91222] hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            {/* FRONTEND VALIDATION ERROR */}

            {formError && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700"
              >
                {formError}
              </div>
            )}

            {/* BACKEND ERROR */}

            {backendError && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700"
              >
                {backendError}
              </div>
            )}

            {/* SUBMIT BUTTON */}

            <button
              type="submit"
              disabled={isPending}
              className="group flex h-13 w-full items-center justify-center gap-3 rounded-xl bg-[#d91222] text-sm font-bold text-white shadow-lg shadow-[#d91222]/15 transition duration-300 hover:-translate-y-0.5 hover:bg-[#b80f1d] hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {isPending ? "Creating account..." : "Create account"}

              {!isPending && (
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </button>
          </form>

          {/* FORGOT PASSWORD */}

          <div className="mt-5 flex justify-end">
            <Link
              to="/forgot-password"
              className="text-xs font-semibold text-[#d91222] transition hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* LOGIN LINK */}

          <div className="mt-8 text-center text-xs text-gray-500">
            Already have an account?

            <Link
              to="/login"
              className="ml-1 font-bold text-[#d91222] hover:underline"
            >
              Sign in
            </Link>
          </div>

          {/* SECURITY FOOTER */}

          <div className="mt-9 flex items-center justify-center gap-2 text-[10px] text-gray-400">
            <ShieldCheck size={15} />

            <span>Your information should be handled securely.</span>
          </div>
        </div>
      </section>
    </main>
  );
}

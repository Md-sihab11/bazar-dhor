"use client";
import Link from 'next/link';
import { FiGithub, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';

const LoginFormContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasNotified = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (searchParams.get("redirect") === "protected" && !hasNotified.current) {
      hasNotified.current = true;
      toast.info("পণ্যের বিস্তারিত তথ্য দেখতে অনুগ্রহ করে প্রথমে সাইন ইন করুন।");
    }
  }, [searchParams]);

  const handleSocialLogin = async (provider: "google" | "github") => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন!");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (data) {
        toast.success("সাইন ইন সফল হয়েছে!");
        router.push("/");
        router.refresh();
      }

      if (error) {
        toast.error(error.message || "লগইন ব্যর্থ হয়েছে!");
      }
    } catch {
      toast.error("কিছু ভুল হয়েছে! আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-base-100 p-4 py-10 min-h-[70vh]">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">সাইন ইন</h1>
        <p className="text-sm text-gray-500 mt-1">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
      </div>

      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-sm sm:w-96 border p-6 shadow-sm">
          <label className="label">ইমেইল</label>
          <input
            type="email"
            name="email"
            required
            className="input w-full"
            placeholder="you@example.com"
          />

          <label className="label mt-2">পাসওয়ার্ড</label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              className="input w-full pr-10"
              placeholder="কমপক্ষে ৮ অক্ষর"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none p-1 cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white border-none w-full mt-6"
          >
            {isLoading
              ? <span className="loading loading-spinner loading-sm" />
              : "সাইন ইন"}
          </button>

          <div className="divider my-4 text-xs text-gray-400">অথবা</div>

          <div className="flex gap-2 w-full">
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              className="btn btn-outline bg-white hover:bg-gray-50 text-black border-base-300 flex-1 flex items-center justify-center gap-2"
            >
              <FcGoogle className="text-lg" /> Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("github")}
              className="btn btn-outline bg-white hover:bg-gray-50 text-black border-base-300 flex-1 flex items-center justify-center gap-2"
            >
              <FiGithub className="text-lg" /> GitHub
            </button>
          </div>

          <div className="text-center mt-4 text-sm">
            <span className="text-gray-500">অ্যাকাউন্ট নেই? </span>
            <Link href="/sign-up" className="text-green-700 hover:underline font-medium">সাইন আপ করুন</Link>
          </div>
        </fieldset>
      </form>

      <div className="mt-4 text-sm text-gray-500">
        <Link href="/" className="hover:underline">← হোম পেজে ফিরে যান</Link>
      </div>
    </div>
  );
};

const LogInpage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-[50vh] flex items-center justify-center">
        <span className="loading loading-spinner text-success" />
      </div>
    }>
      <LoginFormContent />
    </Suspense>
  );
};

export default LogInpage;
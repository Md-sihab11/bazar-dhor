"use client";
import Link from 'next/link';
import { FiGithub, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useState } from 'react';

const SignUpPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSocialLogin = async (provider: "google" | "github") => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!name.trim()) {
      toast.error("নাম দিন!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড মিলছে না!");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষর হতে হবে!");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (data) {
        toast.success("অ্যাকাউন্ট তৈরি সফল! এখন সাইন ইন করুন।");
        router.push("/log-in");
      }

      if (error) {
        toast.error(error.message || "সাইন আপ ব্যর্থ হয়েছে!");
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
        <h1 className="text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="text-sm text-gray-500 mt-1">বিনামূল্যে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
      </div>

      <form onSubmit={onSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-sm sm:w-96 border p-6 shadow-sm">
          <label className="label">নাম</label>
          <input type="text" name="name" required className="input w-full" placeholder="যেমন: রহিম উদ্দিন" />

          <label className="label mt-2">ইমেইল</label>
          <input type="email" name="email" required className="input w-full" placeholder="you@example.com" />

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

          <label className="label mt-2">পাসওয়ার্ড নিশ্চিত করুন</label>
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              required
              className="input w-full pr-10"
              placeholder="আবার লিখুন"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none p-1 cursor-pointer"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white border-none w-full mt-6"
          >
            {isLoading
              ? <span className="loading loading-spinner loading-sm" />
              : "অ্যাকাউন্ট তৈরি করুন"}
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
            <span className="text-gray-500">অ্যাকাউন্ট আছে? </span>
            <Link href="/log-in" className="text-green-700 hover:underline font-medium">সাইন ইন করুন</Link>
          </div>
        </fieldset>
      </form>

      <div className="mt-4 text-sm text-gray-500">
        <Link href="/" className="hover:underline">← হোম পেজে ফিরে যান</Link>
      </div>
    </div>
  );
};

export default SignUpPage;

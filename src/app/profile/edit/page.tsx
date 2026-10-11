"use client";

import { useSession, updateUser } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

const EditProfilePage = () => {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    const [name, setName] = useState<string>("");
    const [isUpdating, setIsUpdating] = useState(false);

    // Redirect unauthenticated users to login
    useEffect(() => {
        if (!isPending && !session) {
            router.push("/log-in");
        }
    }, [session, isPending, router]);

    // Pre-fill input with user's current name
    useEffect(() => {
        if (session?.user?.name) {
            setName(session.user.name);
        }
    }, [session]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedName = name.trim();
        if (!trimmedName) {
            toast.error("নাম খালি রাখা যাবে না!");
            return;
        }

        if (isUpdating) return; // Prevent duplicate submissions

        setIsUpdating(true);
        try {
            const res = await updateUser({ name: trimmedName });
            if (res?.error) {
                toast.error(res.error.message || "তথ্য আপডেট করতে সমস্যা হয়েছে!");
            } else {
                toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
                router.refresh();
                router.push("/profile");
            }
        } catch {
            toast.error("কিছু ভুল হয়েছে! আবার চেষ্টা করুন।");
        } finally {
            setIsUpdating(false);
        }
    };

    if (isPending) {
        return (
            <div className="container mx-auto px-4 py-10 max-w-lg min-h-[60vh]">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mb-8" />
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                    <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
                    <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
                </div>
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="min-h-[70vh] flex flex-col justify-center py-10">
            <div className="container mx-auto px-4 max-w-lg">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">তথ্য আপডেট করুন</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        আপনার অ্যাকাউন্টের নাম পরিবর্তন করতে নিচে নতুন নাম লিখুন।
                    </p>
                </div>

                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="name-input" className="block text-sm font-medium text-gray-700 mb-1.5">
                                নাম
                            </label>
                            <input
                                id="name-input"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isUpdating}
                                className="input w-full border border-gray-300 rounded-lg focus:outline-none focus:border-green-700 px-3.5 py-2.5 text-gray-900"
                                placeholder="আপনার নাম লিখুন"
                                required
                            />
                        </div>

                        <div className="pt-2 flex flex-col sm:flex-row gap-3">
                            <button
                                type="submit"
                                disabled={isUpdating}
                                className="btn flex-1 bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white border-none rounded-lg font-medium transition-colors flex items-center justify-center gap-2 py-2.5"
                            >
                                {isUpdating ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm" />
                                        <span>আপডেট হচ্ছে...</span>
                                    </>
                                ) : (
                                    "তথ্য আপডেট করুন"
                                )}
                            </button>

                            <Link
                                href="/profile"
                                className="btn btn-outline border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium text-center py-2.5"
                            >
                                ফিরে যান
                            </Link>
                        </div>
                    </form>
                </div>

                <div className="mt-6 text-center">
                    <Link
                        href="/profile"
                        className="text-sm text-gray-500 hover:text-green-700 hover:underline transition-colors"
                    >
                        ← প্রোফাইলে ফিরে যান
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;

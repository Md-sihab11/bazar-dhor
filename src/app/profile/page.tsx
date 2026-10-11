"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";

const ProfilePage = () => {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/log-in");
        }
    }, [session, isPending, router]);

    const handleSignOut = async () => {
        await signOut();
        toast.success("সাইন আউট সফল হয়েছে!");
        router.push("/");
    };

    if (isPending) {
        return (
            <div className="container mx-auto px-4 py-10 max-w-2xl min-h-[60vh]">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mb-8" />
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse" />
                    <div className="flex-1 space-y-2">
                        <div className="h-5 w-36 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="min-h-[70vh] py-10">
            <div className="container mx-auto px-4 max-w-2xl">

                {/* Page title */}
                <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
                <p className="text-sm text-gray-500 mt-1">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

                {/* Profile header card */}
                <div className="mt-6 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-4">

                    {/* Avatar */}
                    <div className="shrink-0">
                        {session.user?.image ? (
                            <Image
                                src={session.user.image}
                                alt={session.user.name || "User"}
                                width={72}
                                height={72}
                                className="w-18 h-18 rounded-full object-cover border-2 border-green-100"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-green-700 flex items-center justify-center text-white text-2xl font-bold">
                                {session.user?.name?.charAt(0)?.toUpperCase() || "U"}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center sm:text-left min-w-0">
                        <p className="text-lg font-bold text-gray-900 truncate">{session.user?.name}</p>
                        <p className="text-sm text-gray-500 mt-0.5 truncate">{session.user?.email}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-2 shrink-0 w-full sm:w-auto">
                        <Link
                            href="/profile/edit"
                            className="flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-green-700 hover:bg-green-800 rounded-lg transition-colors"
                        >
                            ✏️ তথ্য আপডেট করুন
                        </Link>
                        <button
                            onClick={handleSignOut}
                            className="flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                        >
                            ↩ সাইন আউট
                        </button>
                    </div>
                </div>

                {/* Account Details */}
                <div className="mt-6 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h2 className="font-semibold text-gray-800 mb-4 text-base border-b border-gray-100 pb-3">
                        অ্যাকাউন্টের বিস্তারিত তথ্য
                    </h2>

                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-gray-50 gap-1">
                            <span className="text-sm text-gray-500">নাম</span>
                            <span className="text-sm font-medium text-gray-900">{session.user?.name || "দেওয়া নেই"}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-gray-50 gap-1">
                            <span className="text-sm text-gray-500">ইমেইল</span>
                            <span className="text-sm font-medium text-gray-900">{session.user?.email}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 gap-1">
                            <span className="text-sm text-gray-500">স্ট্যাটাস</span>
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full w-fit">
                                ● সক্রিয় অ্যাকাউন্ট
                            </span>
                        </div>
                    </div>
                </div>

                {/* Back link */}
                <div className="mt-6 text-center">
                    <Link href="/" className="text-sm text-gray-500 hover:text-green-700 hover:underline transition-colors">
                        ← হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

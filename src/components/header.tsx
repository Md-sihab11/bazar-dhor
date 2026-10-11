"use client";

import Link from "next/link";
import BanglaDate from "@/components/date/bangla-date";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const HeaderPage = () => {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        setDropdownOpen(false);
        await signOut();
        toast.success("সাইন আউট সফল হয়েছে!");
        router.push("/");
    };

    return (
        <div className="w-full border-b border-gray-200 bg-white">
            <div className="container mx-auto flex w-full items-center justify-between gap-2 px-3 py-3 sm:px-4 sm:py-4">

                {/* Logo */}
                <div className="flex min-w-0 items-center gap-2 sm:gap-4">
                    <Link
                        href="/"
                        className="shrink-0 rounded-xl bg-green-700 p-2 text-center text-xl sm:rounded-2xl sm:p-3 sm:text-2xl"
                    >
                        🛒
                    </Link>

                    <div className="min-w-0">
                        <Link
                            href="/"
                            className="block truncate text-xl font-bold sm:text-3xl"
                        >
                            বাজার দর
                        </Link>
                        <div className="text-xs sm:text-sm">
                            <BanglaDate />
                        </div>
                    </div>
                </div>

                {/* Auth Section */}
                <div
                    className="relative flex shrink-0 items-center gap-1 sm:gap-2"
                    ref={dropdownRef}
                >
                    {isPending ? (
                        <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" />
                    ) : session ? (
                        <>
                            {/* Avatar + name button */}
                            <button
                                onClick={() => setDropdownOpen((prev) => !prev)}
                                aria-expanded={dropdownOpen}
                                aria-label="ব্যবহারকারীর মেনু"
                                className="flex items-center gap-2 rounded-lg px-1.5 py-1 transition-colors hover:bg-gray-50 sm:px-2"
                            >
                                {session.user?.image ? (
                                    <Image
                                        src={session.user.image}
                                        alt={session.user.name || "User"}
                                        width={36}
                                        height={36}
                                        className="h-9 w-9 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white">
                                        {session.user?.name?.charAt(0)?.toUpperCase() || "U"}
                                    </div>
                                )}

                                <span className="hidden max-w-[120px] truncate text-sm font-medium text-gray-700 sm:block">
                                    {session.user?.name}
                                </span>
                                <span className="text-xs text-gray-400">▾</span>
                            </button>

                            {/* Dropdown */}
                            {dropdownOpen && (
                                <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
                                    <div className="border-b border-gray-100 px-4 py-3">
                                        <p className="truncate text-sm font-bold text-gray-900">
                                            {session.user?.name}
                                        </p>
                                        <p className="mt-0.5 truncate text-xs text-gray-500">
                                            {session.user?.email}
                                        </p>
                                    </div>

                                    <Link
                                        href="/profile"
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                                    >
                                        <span>👤</span> আমার প্রোফাইল
                                    </Link>

                                    <button
                                        onClick={handleSignOut}
                                        className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
                                    >
                                        <span>↩</span> সাইন আউট
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <Link
                                href="/log-in"
                                className="whitespace-nowrap px-2 py-2 text-sm font-semibold text-gray-700 transition-colors hover:text-green-700 sm:px-4"
                            >
                                সাইন ইন
                            </Link>

                            <Link
                                href="/sign-up"
                                className="whitespace-nowrap rounded border-0 bg-green-700 px-3 py-2 text-sm text-white transition-colors hover:bg-green-800 sm:px-4"
                            >
                                সাইন আপ
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeaderPage;
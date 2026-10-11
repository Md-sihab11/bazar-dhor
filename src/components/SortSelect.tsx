"use client";

import { ProductMarquee } from "@/types/navtypes";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const toBnNum = (num: number | string) => {
    return new Intl.NumberFormat("bn-BD").format(Number(num));
};

const SortSelect = ({
    data,
}: {
    data: ProductMarquee[];
}) => {
    const [sort, setSort] = useState("default");
    const [sortedData, setSortedData] = useState(data);

    const handleSort = (value: string) => {
        setSort(value);

        if (value === "default") {
            setSortedData(data);
            return;
        }

        const sorted = [...data].sort((a, b) => {
            if (value === "low") {
                return Number(a.today) - Number(b.today);
            }

            if (value === "high") {
                return Number(b.today) - Number(a.today);
            }

            return 0;
        });

        setSortedData(sorted);
    };

    return (
        <div>

            <div className="bg-[#FAFCFA] container mx-auto flex justify-end items-center gap-3 p-5 rounded-2xl border border-gray-200 mt-5 ">

                <p className="flex items-center">
                    সাজান
                </p>

                <select
                    value={sort}
                    onChange={(e) => handleSort(e.target.value)}
                    className="select w-40 rounded"
                >
                    <option value="default">
                        ডিফল্ট
                    </option>

                    <option value="low">
                        দাম: কম থেকে বেশি
                    </option>

                    <option value="high">
                        দাম: বেশি থেকে কম
                    </option>
                </select>

            </div>

            <p className="container mx-auto font-semibold mt-5 text-2xl">
                মোট {data.length}টি পণ্য দেখানো হচ্ছে
            </p>

            {/* Products */}
            <div className="container mx-auto mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-7">

                {sortedData.map((pr: ProductMarquee) => {

                    const isUp = pr.change?.dir === "up";
                    const isDown = pr.change?.dir === "down";

                    return (
                        <Link
                            href={`/detailpage/${pr.id}`}
                            key={pr.id}
                            className="card w-full max-w-[30rem] bg-base-100 card-sm shadow-sm hover:shadow-md transition-shadow duration-200"
                        >

                            <div className="card-body p-4 sm:p-5">

                                {/* Product Info */}
                                <div className="flex items-center gap-3">

                                    {pr.image?.startsWith("http") ? (
                                        <div className="w-16 h-16 shrink-0 bg-gray-100 rounded-xl overflow-hidden">

                                            <Image
                                                src={pr.image}
                                                alt={pr.categoryNameBn}
                                                width={64}
                                                height={64}
                                                className="w-full h-full object-contain"
                                            />

                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 shrink-0 bg-gray-100 rounded-xl flex items-center justify-center">

                                            <span className="text-4xl">
                                                {pr.image}
                                            </span>

                                        </div>
                                    )}

                                    <div>

                                        <p className="font-semibold text-base sm:text-lg">
                                            {pr.nameBn}
                                        </p>

                                        <p className="text-sm text-gray-500 mt-1">

                                            প্রতি{" "}

                                            {pr.unit === "kg"
                                                ? "কেজি"
                                                : pr.unit === "litre" ||
                                                    pr.unit === "liter"
                                                    ? "লিটার"
                                                    : pr.unit === "gram"
                                                        ? "গ্রাম"
                                                        : pr.unit === "piece"
                                                            ? "টি"
                                                            : pr.unit === "dozen"
                                                                ? "ডজন"
                                                                : pr.unit}

                                        </p>

                                    </div>

                                </div>

                                {/* Price */}
                                <p className="text-sm text-gray-500 mt-4">
                                    আজকের দাম
                                </p>

                                <div className="flex items-center justify-between gap-3 mt-2">

                                    {/* Price Left */}
                                    <p className="text-xl sm:text-2xl font-bold">
                                        {toBnNum(pr.today)} টাকা
                                    </p>

                                    {/* Change Right */}
                                    <div className="font-medium text-sm sm:text-base text-right whitespace-nowrap">

                                        {isUp && (
                                            <span className="text-red-600">
                                                ▲ {toBnNum (Math.abs(pr.change.pct))}
                                            </span>
                                        )}

                                        {isDown && (
                                            <span className="text-green-600">
                                                ▼ {toBnNum (Math.abs(pr.change.pct))}%
                                            </span>
                                        )}

                                        {!isUp && !isDown && (
                                            <span className="font-medium text-xs text-gray-400">
                                                ▬ ০.০%
                                            </span>
                                        )}

                                    </div>

                                </div>

                            </div>

                        </Link>
                    );
                })}

            </div>

        </div>
    );
};

export default SortSelect;
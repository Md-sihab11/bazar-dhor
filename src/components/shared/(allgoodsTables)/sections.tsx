
import { ProductMarquee } from "@/types/navtypes";
import Image from 'next/image'
import Link from 'next/link'

const toBnNum = (num: number | string) => {
    return new Intl.NumberFormat("bn-BD").format(Number(num));
};

const SectionsPage = async () => {
    const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products')
    const data: ProductMarquee[] = await res.json()
    const totalData = data.length
    const increasedProducts = data.filter((pr) => pr.change.dir === "up");
    const sortingProducts = increasedProducts.sort((a, b) => b.change.pct - a.change.pct)

    // decreased the price
    const decreasedProducts = data.filter((pr) => pr.change.dir === "down");
    const DsortingProducts = decreasedProducts.sort((a, b) => b.change.pct - a.change.pct)

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

            <h2 className="font-bold text-xl sm:text-[22px] mt-2">
                <span className="text-green-600">▲</span>{" "}
                আজ দাম বেড়েছে
            </h2>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                {
                    sortingProducts.slice(0, 6).map((pr: ProductMarquee) => {

                        return (
                            <Link
                                href={`/detailpage/${pr.id}`}
                                key={pr.id}
                                className="card w-full max-w-[30rem] bg-base-100 card-sm shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="card-body p-4 sm:p-5">

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

                                    <p className="text-sm text-gray-500 mt-4">
                                        আজকের দাম
                                    </p>

                                    <div className="flex items-center justify-between gap-3 mt-2">

                                        {/* Price - Left */}
                                        <p className="text-xl sm:text-2xl font-bold">
                                            {toBnNum(pr.today)} টাকা
                                        </p>

                                        {/* Percentage - Right */}
                                        <p className="text-red-600 font-medium text-sm sm:text-base text-right whitespace-nowrap">
                                            ▲ {toBnNum (Math.abs(pr.change.pct))}%
                                        </p>

                                    </div>

                                </div>
                            </Link>
                        );
                    })
                }

            </div>

            <h2 className="font-bold text-[22px] mt-5"><span className="text-red-600">▼</span> আজ দাম কমেছে</h2>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                {
                    DsortingProducts.slice(0, 6).map((pr: ProductMarquee) => {

                        return (
                            <Link
                                href={`/detailpage/${pr.id}`}
                                key={pr.id}
                                className="card w-full max-w-[30rem] bg-base-100 card-sm shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="card-body p-4 sm:p-5">

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

                                    <p className="text-sm text-gray-500 mt-4">
                                        আজকের দাম
                                    </p>

                                    <div className="flex items-center justify-between gap-3 mt-2">

                                        {/* Price - Left */}
                                        <p className="text-xl sm:text-2xl font-bold">
                                            {toBnNum(pr.today)} টাকা
                                        </p>

                                        {/* Percentage - Right */}
                                        <p className="text-green-600 font-medium text-sm sm:text-base text-right whitespace-nowrap">
                                            ▼ {toBnNum (Math.abs(pr.change.pct))}%
                                        </p>

                                    </div>

                                </div>
                            </Link>
                        );
                    })
                }

            </div>

            <h2 id="সব-পণ্য" className="font-bold text-[22px] mt-5">সব পণ্য</h2>
            <div >
                <p>মোট {toBnNum(totalData)} টি পণ্য দেখানো হচ্ছে</p>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    {
                        data.map((pr: ProductMarquee) => {

                            const isUp = pr.change?.dir === "up";
                            const isDown = pr.change?.dir === "down";

                            return (
                                <Link
                                    href={`/detailpage/${pr.id}`}
                                    key={pr.id}
                                    className="card w-full max-w-[30rem] bg-base-100 card-sm shadow-sm hover:shadow-md transition-shadow duration-200"
                                >
                                    <div className="card-body p-4 sm:p-5">

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

                                        <p className="text-sm text-gray-500 mt-4">
                                            আজকের দাম
                                        </p>

                                        <div className="flex items-center justify-between gap-3 mt-2">

                                            {/* Price - Left */}
                                            <p className="text-xl sm:text-2xl font-bold">
                                                {toBnNum(pr.today)} টাকা
                                            </p>

                                            {/* Percentage - Right */}
                                            {/* <p >
                                                ▼ {toBnNum(pr.change.pct)}%
                                            </p> */}

                                            <div className=" font-medium text-sm sm:text-base text-right whitespace-nowrap">

                                                {
                                                    isUp && (<span className="text-center text-red-600"> ▲{toBnNum (Math.abs(pr.change.pct))}%</span>)
                                                }
                                                {
                                                    isDown && (<span className="text-center text-green-600"> ▼{toBnNum (Math.abs(pr.change.pct))}%</span>)
                                                }
                                                {
                                                    !isUp && !isDown && (
                                                        <span className="font-medium text-xs text-gray-400">▬ ০.০%</span>
                                                    )
                                                }
                                            </div>

                                        </div>

                                    </div>
                                </Link>
                            );
                        })
                    }

                </div>
            </div>

        </div>
    );
};

export default SectionsPage;
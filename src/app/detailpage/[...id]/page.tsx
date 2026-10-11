import PriceSummery from "@/components/shared/(allgoodsTables)/PriceSummery";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const toBnNum = (num: number | string) => {
    return new Intl.NumberFormat("bn-BD").format(Number(num));
};

const DetailPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        redirect("/log-in?redirect=protected");
    }

    const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products/${id}`); //api2

    if (!res.ok) {
        notFound();
    }

    const data = await res.json();

    const priceChange = Number(data.today) - Number(data.yesterday);

    // Percentage API থেকে নেওয়া হচ্ছে
    const changePct = data.change.pct;

    // Unit বাংলায় দেখানো
    const unitBn =
        data.unit === "kg"
            ? "কেজি"
            : data.unit === "litre" || data.unit === "liter"
                ? "লিটার"
                : data.unit === "gram"
                    ? "গ্রাম"
                    : data.unit === "piece"
                        ? "টি"
                        : data.unit === "dozen"
                            ? "ডজন"
                            : data.unit;

    return (
        <div>
            <div className="container mx-auto mt-5 mb-5 space-y-5 p-5">
                <h2 className="flex flex-wrap items-center gap-2">
                    <Link href="/">হোম</Link>
                    <span>&gt;</span>
                    <p>{data.categoryNameBn}</p>
                    <span>&gt;</span>
                    <span>{data.nameBn}</span>
                </h2>

                <div className="rounded-xl bg-[#FAFCFA] p-10">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-3">
                            {data.image?.startsWith("http") ? (
                                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                                    <Image
                                        src={data.image}
                                        alt={data.nameBn}
                                        width={64}
                                        height={64}
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                            ) : (
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                                    <span className="text-4xl">
                                        {data.image || "🛒"}
                                    </span>
                                </div>
                            )}

                            <div>
                                <h2 className="font-semibold text-3xl">
                                    {data.nameBn}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    প্রতি {unitBn} · {data.categoryNameBn}
                                </p>

                                {priceChange > 0 ? (
                                    <p className="mt-1 text-sm text-red-600">
                                        গতকালের তুলনায় আজ দাম বেড়েছে ·{" "}
                                        {toBnNum(priceChange)} টাকা
                                    </p>
                                ) : priceChange < 0 ? (
                                    <p className="mt-1 text-sm text-green-600">
                                        গতকালের তুলনায় আজ দাম কমেছে ·{" "}
                                        {toBnNum(Math.abs(priceChange))} টাকা
                                    </p>
                                ) : (
                                    <p className="mt-1 text-sm text-gray-500">
                                        গতকালের তুলনায় আজ দাম অপরিবর্তিত
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 sm:text-right">
                            <p className="text-sm text-gray-500">
                                আজকের দাম
                            </p>

                            <p className="text-center text-3xl font-bold">
                                {toBnNum(data.today)}
                            </p>

                            <p>
                                টাকা / {unitBn}
                            </p>

                            <p
                                className={
                                    data.change.dir === "up"
                                        ? "text-red-600"
                                        : data.change.dir === "down"
                                            ? "text-green-600"
                                            : "text-gray-500"
                                }
                            >
                                {data.change.dir === "up"
                                    ? "▲"
                                    : data.change.dir === "down"
                                        ? "▼"
                                        : "−"}{" "}
                                {toBnNum(Math.abs(changePct))}%
                            </p>
                        </div>
                    </div>
                </div>

                <PriceSummery data={data} />
            </div>
         </div>
     );
};

            export default DetailPage;
import { ProductMarquee } from '@/types/navtypes';

const toBnNum = (num: number | string) => {
    return new Intl.NumberFormat("bn-BD").format(Number(num));
};

const PriceSummery = ({ data }: { data: ProductMarquee }) => {
    if (!data?.markets || data.markets.length === 0) {
        return null;
    }

    const lowestPrice = Math.min(...data.markets.map((market) => market.min));
    const highestPrice = Math.max(...data.markets.map((market) => market.max));

    const avg =
        data.markets.reduce(
            (total, market) => total + (market.min + market.max) / 2,
            0
        ) / data.markets.length;

    const cheapestMarket = data.markets.reduce((lowest, market) =>
        market.min < lowest.min ? market : lowest
    );

    const expensiveMarket = data.markets.reduce((highest, market) =>
        market.max > highest.max ? market : highest
    );

    return (
        <div className="container mx-auto mt-5 rounded-xl bg-[#FAFCFA] p-5">

            <h2 className="font-semibold">দামের সারসংক্ষেপ</h2>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">

                <div className="rounded border border-gray-300 p-4">
                    <p>সর্বনিম্ন দাম</p>

                    <p className="text-[29px] font-bold text-green-500">
                        {toBnNum(lowestPrice)}{" "}
                        <span className="text-[20px] text-black">টাকা</span>
                    </p>

                    <p className="mt-2 text-sm text-gray-600">
                        সবচেয়ে কম দামের বাজার
                    </p>

                    {/* <p className="font-semibold">{cheapestMarket.market}</p> */}
                </div>

                <div className="rounded border border-gray-300 p-4">
                    <p>সর্বাধিক দাম</p>

                    <p className="text-[29px] font-bold text-red-500">
                        {toBnNum(highestPrice)}{" "}
                        <span className="text-[20px] text-black">টাকা</span>
                    </p>

                    <p className="mt-2 text-sm text-gray-600">
                        সবচেয়ে বেশি দামের বাজার
                    </p>

                    {/* <p className="font-semibold">{expensiveMarket.market}</p> */}
                </div>

                <div className="rounded border border-gray-300 p-4">
                    <p>গড় দাম</p>

                    <p className="text-[29px] font-bold text-green-500">
                        {toBnNum(avg.toFixed(2))}{" "}
                        <span className="text-[20px] text-black">টাকা</span>
                    </p>

                    <p className="mt-2 text-sm text-gray-600">
                        প্রতি {data.unit === "kg" ? "কেজি" : data.unit} হিসাবে
                    </p>
                </div>

            </div>

            <h2 className="mb-4 mt-8 font-semibold">
                বাজারভিত্তিক আজকের দাম
            </h2>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full min-w-[600px] text-left text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">বাজার</th>
                            <th className="p-3">বিভাগ</th>
                            <th className="p-3">সর্বনিম্ন</th>
                            <th className="p-3">সর্বাধিক</th>
                            <th className="p-3">গড়</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.markets.map((market, index) => {
                            const marketAvg = (market.min + market.max) / 2;

                            return (
                                <tr
                                    key={`${market.market}-${index}`}
                                    className="border-t border-gray-200 odd:bg-white even:bg-gray-100"
                                >
                                    <td className="p-3 font-medium">
                                        {market.market}
                                    </td>

                                    <td className="p-3">
                                        {market.division}
                                    </td>

                                    <td className="p-3 text-green-600">
                                        {toBnNum(market.min)} টাকা
                                    </td>

                                    <td className="p-3 text-red-500">
                                        {toBnNum(market.max)} টাকা
                                    </td>

                                    <td className="p-3">
                                        {toBnNum(marketAvg.toFixed(2))} টাকা
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default PriceSummery;


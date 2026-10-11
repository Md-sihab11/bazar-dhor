import { ProductMarquee } from '@/types/navtypes';

import Marquee from "react-fast-marquee";


const toBnNum = (num: number | string) => {
  return new Intl.NumberFormat("bn-BD").format(Number(num));
};

const Pagemarquee = async () => {
    const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products') //api 2

    const data = await res.json()

    return (
        <div className="bg-white">
            <Marquee>
                {
                    data.map((product: ProductMarquee) => {

                        const isUp = product.change?.dir === "up";
                        const isDown = product.change?.dir === "down";

    const unitBn =
        product.unit === "kg"
            ? "কেজি"
            : product.unit === "litre" || product.unit === "liter"
                ? "লিটার"
                : product.unit === "gram"
                    ? "গ্রাম"
                    : product.unit === "piece"
                        ? "টি"
                        : product.unit === "dozen"
                            ? "ডজন"
                            : product.unit || "কেজি";

    return (
        <div className="text-black border border-gray-200 p-2 whitespace-nowrap" key={product.id}>
            <span>{`${product.categoryIcon} ${product.nameBn} ${toBnNum(product.today)} টাকা/${unitBn} `}</span>
            {isUp && (
                <span className="text-center text-red-600"> ▲{toBnNum (Math.abs(product.change.pct))}%</span>
            )}
            {isDown && (
                <span className="text-center text-green-600"> ▼{toBnNum (Math.abs(product.change.pct))}%</span>
            )}
            {!isUp && !isDown && (
                <span className="text-xs text-gray-500"> ▬ ০.০%</span>
            )}
        </div>
    );
                    })
                }
            </Marquee>
        </div>
    );
};

export default Pagemarquee;
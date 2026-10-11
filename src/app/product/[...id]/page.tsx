import { redirect } from "next/navigation";

// Alias: /product/[id] → /detailpage/[id]
// This allows both URL patterns to work for the product detail page.
const ProductAlias = async ({
    params,
}: {
    params: Promise<{ id: string[] }>;
}) => {
    const { id } = await params;
    redirect(`/detailpage/${id.join("/")}`);
};

export default ProductAlias;

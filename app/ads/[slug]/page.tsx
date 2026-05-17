import { notFound } from "next/navigation";
import AdsDetail from "@/components/theme/listing/ads-detail";
import { ads } from "@/components/theme/listing/data";

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function AdsPage({ params }: Props) {
    const { slug } = await params;
    const ad = ads.find((a) => a.id === Number(slug));

    if (!ad) return notFound();

    return <AdsDetail ad={ad} />;
}


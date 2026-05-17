import type { Ad } from "../listing/data";
import AdsCarousel from "./carousel";
import PriceInfo from "./price-info";
import Description from "./description";
import SellerInfo from "./seller-info";
import AdsFooter from "./ads-footer";

export default function AdsDetail({ ad }: { ad: Ad }) {
    const allImages = [ad.imageCover, ...ad.images];

    return (
        <div style={{ backgroundColor: "#ffffff", color: "#141414", minHeight: "100dvh" }}>
            <div style={{ maxWidth: 512, margin: "0 auto" }}>

                <AdsCarousel images={allImages} title={ad.title} />
                <PriceInfo price={ad.price} title={ad.title} time={ad.time} location={ad.location} />
                <Description description={ad.description} />
                <SellerInfo seller={ad.seller} userImage={ad.userImage} />

                {/* Spacer for sticky footer */}
                <div style={{ height: 80 }} />
            </div>

            <AdsFooter whatsapp={ad.whatsapp} title={ad.title} />
        </div>
    );
}

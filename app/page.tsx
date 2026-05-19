import { Suspense } from "react";
import Header from "@/components/theme/header";
import Footer from "@/components/theme/footer";
import Carousel from "@/components/homepage/carousel";
import CategorySection from "@/components/homepage/category/category";
import ListingSection from "@/components/homepage/listing-section";
import AdsCardSkeleton from "@/components/theme/listing/ads-card-skeleton";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Sticky top header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 pb-24 pt-2">
        <Carousel />
        <CategorySection />
        {/* Suspense: Header, Carousel, Category langsung tampil.
            ListingSection di-stream setelah fetch Supabase selesai. */}
        <Suspense fallback={<AdsCardSkeleton count={6} />}>
          <ListingSection />
        </Suspense>
      </main>

      {/* Sticky bottom navigation */}
      <Footer />
    </div>
  );
}


import { Suspense } from "react";
import Header from "@/components/theme/header";
import Footer from "@/components/theme/footer";
import Carousel from "@/components/homepage/carousel";
import CategorySection from "@/components/homepage/category/category";
import ListingSection from "@/components/homepage/listing-section";
import AdsCardSkeleton from "@/components/theme/listing/ads-card-skeleton";
import { auth } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch session here at the page level (not inside Suspense child)
  const session = await auth();
  const userEmail = session?.user?.email;

  // Fetch user's favorited ad IDs
  let favoritedIds: Set<string> = new Set();
  if (userEmail) {
    const { data: favs } = await supabaseAdmin
      .from("favorites")
      .select("ad_id")
      .eq("user_email", userEmail);

    if (favs) {
      // Normalize: extract UUID from slugs if any legacy data exists
      favoritedIds = new Set(
        favs.map((f) =>
          f.ad_id.includes("--") ? f.ad_id.split("--").pop()! : f.ad_id
        )
      );
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Sticky top header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 pb-24 pt-2">
        <Carousel />
        <CategorySection />
        {/* Pass favoritedIds & isLoggedIn as props so ListingSection
            doesn't need to call auth() itself inside Suspense */}
        <Suspense fallback={<AdsCardSkeleton count={6} />}>
          <ListingSection
            favoritedIds={favoritedIds}
            isLoggedIn={!!session}
          />
        </Suspense>
      </main>

      {/* Sticky bottom navigation */}
      <Footer />
    </div>
  );
}

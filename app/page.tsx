import Header from "@/components/theme/header";
import Footer from "@/components/theme/footer";
import Carousel from "@/components/homepage/carousel";
import CategorySection from "@/components/homepage/category/category";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Sticky top header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 pb-24 pt-2">
        <Carousel />
        <CategorySection />
      </main>

      {/* Sticky bottom navigation */}
      <Footer />
    </div>
  );
}


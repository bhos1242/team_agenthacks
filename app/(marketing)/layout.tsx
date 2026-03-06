import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/footer";
import { BottomNavbar } from "@/components/shared/bottom-navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col pb-24 lg:pb-0">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <BottomNavbar />
    </div>
  );
}

import Footer from "../components/base/Footer";
import Navbar2 from "../components/base/Navbar2";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const CustomizationLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen  bg-background text-foreground">
      <Navbar2 />

      <main className="flex-1  paddings overflow-hidden">{children}</main>
      <Footer />
    </div>
  );
};

export default CustomizationLayout;

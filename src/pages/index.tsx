// pages/Index.tsx
import { MoveRight } from "lucide-react";
import Button from "../components/ui/Button";
import { mediaData } from "../utils/mediaData";
import { useNavigate } from "react-router";

const Index = () => {
  const navigate = useNavigate();

  const navigateToCustomization = () => {
    navigate("/customization");
  };

  function handleTourView() {
    localStorage.setItem("hasSeenOnboarding", "false");
    navigate("/customization");
  }

  return (
    <main className="h-full lg:h-[calc(100dvh-100px)] justify-items-center items-center flex gap-10 flex-col lg:flex-row px-6">
      <div className="w-full lg:w-3/4 space-y-5">
        <h1 className="text-gradient roboto-headline-responsive">
          Select, Customize and Print, your unique products with ease
        </h1>
        <p className="text-[18px] font-medium text-black">
          Bring your ideas to life with our easy-to-use printing platform.
          Choose from a wide range of products, personalize every detail, and
          watch your custom creations turn into high-quality prints—delivered
          right to your door.
        </p>
        <div className=" relative flex flex-row gap-5">
          <Button
            onClick={navigateToCustomization}
            id="onboarding-customize-btn"
          >
            Customize <MoveRight className="ml-2" />
          </Button>
          <Button
            onClick={handleTourView}
            className="bg-transparent px-10 border border-primary text-primary"
            variant="secondary"
          >
            App Tour
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-7">
        <img
          src={mediaData.landingImage1}
          alt="Landing"
          className="w-[376px] h-[425px] object-contain"
        />
        <img
          src={mediaData.landingImage2}
          alt="Landing"
          className="hidden lg:block w-[173px] h-[425px]"
        />
      </div>
    </main>
  );
};

export default Index;

import { useState, useRef, useEffect } from "react";
import { Check, Crop, Minus, Plus, Scan, VectorSquare } from "lucide-react";
import BackButton from "../../../components/base/BackButton";
import { mediaData } from "../../../utils/mediaData";
import OnboardingTooltip from "../../../components/base/OnboardingToolTip";
import { useNavigate } from "react-router";

// Static sample data
const staticProduct = {
  name: "Premium Cotton T-Shirt",
  description: "A high-quality cotton t-shirt perfect for everyday wear.",
  image: "https://via.placeholder.com/400x500.png?text=Base+T-Shirt",
  price: {
    currentPrice: 50,
    discount: 20,
  },
};

const tShirtColors = [
  { id: 1, value: "#000000" },
  { id: 2, value: "#ffffff" },
  { id: 3, value: "#ff0000" },
  { id: 4, value: "#00ff00" },
  { id: 5, value: "#0000ff" },
];

const TShirtSizes = [
  { id: 1, title: "Small", value: "S" },
  { id: 2, title: "Medium", value: "M" },
  { id: 3, title: "Large", value: "L" },
  { id: 4, title: "XLarge", value: "XL" },
];

export default function StaticProductPreview() {
  const previewRef = useRef<HTMLDivElement>(null);

  const sideImages = [mediaData.Tshirt9, mediaData.demoshirt];

  const [activeImage, setActiveImage] = useState<string>(staticProduct.image);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(tShirtColors[0].value);
  const [selectedSize, setSelectedSize] = useState(TShirtSizes[0].value);

  function getPrice(price: number, discount: number): number {
    return price - (price * discount) / 100;
  }

  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding =
      localStorage.getItem("hasSeenOnboarding") === "true";
    if (!hasSeenOnboarding) {
      setShowTooltip(true);
    }
  }, []);

  const handleSkip = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setShowTooltip(false);
  };

  const navigate = useNavigate();
  function handleNext() {
    navigate("/appTour/payment");
  }

  return (
    <main className="min-h-screen">
      <header className="space-y-4 mb-6">
        <BackButton />
        <div className="text-center">
          <h1 className="font-bold text-lg lg:text-[30px]">
            Product Preview and Detail
          </h1>
        </div>
      </header>

      <section className="flex gap-5 items-center lg:items-start justify-between flex-col lg:flex-row">
        {/* Left Column: Thumbnails */}
        <div className="flex lg:flex-col flex-wrap items-center justify-center gap-3 w-full lg:w-[120px]">
          {sideImages.map((img, index) => (
            <div
              key={index}
              onClick={() => setActiveImage(img)}
              className="relative group cursor-pointer transition-all duration-200"
            >
              <img
                src={img}
                alt={`Preview ${index}`}
                className="w-[120px] h-[140px] rounded-xl object-cover object-top bg-[#b2bcb4] border-2 border-transparent hover:scale-105 transition-all"
                style={{ aspectRatio: "3/4" }}
              />
              {activeImage === img && (
                <div className="absolute inset-0 border-secondary border-2 bg-opacity-20 rounded-xl"></div>
              )}
            </div>
          ))}
        </div>

        {/* Right Column: Main Preview & Product Info */}
        <div className="flex flex-1 flex-col lg:flex-row items-start gap-10">
          <div
            ref={previewRef}
            className="w-full max-w-[444px] h-[530px] bg-[#b2bcb4] rounded-xl overflow-hidden relative shadow-lg flex items-center justify-center"
          >
            <img src={mediaData.demoshirt} />
          </div>

          {/* Details Section */}
          <div>
            <div className="text-start">
              <h2 className="font-bold text-[40px]">{staticProduct.name}</h2>
              <div className="mt-5 flex items-start gap-2">
                <span className="text-xl font-semibold">
                  $
                  {getPrice(
                    staticProduct.price.currentPrice,
                    staticProduct.price.discount
                  )}
                </span>
                <span className="text-lg line-through text-gray-500">
                  ${staticProduct.price.currentPrice}
                </span>
                <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">
                  {staticProduct.price.discount}%
                </span>
              </div>
              <p className="mt-3 text-gray-700 text-start max-w-md">
                {staticProduct.description}
              </p>
            </div>

            <hr className="text-gray-400 opacity-50 my-5" />

            <div className="space-y-2 mt-5">
              <h1>Edit Image</h1>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <VectorSquare className="text-secondary" />
                  <span className="text-sm">Transform</span>
                </div>
                <div className="flex items-center gap-2">
                  <Scan className="text-secondary" />
                  <span className="text-sm">Position</span>
                </div>
                <div className="flex items-center gap-2">
                  <Crop className="text-secondary" />
                  <span className="text-sm">Crop</span>
                </div>
              </div>
            </div>

            <hr id="checkout" className="text-gray-400 opacity-50 my-5" />

            <div className="space-y-2 mt-5">
              <h1>Select Color</h1>
              <div className="flex gap-3">
                {tShirtColors.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedColor(item.value)}
                    className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-300 cursor-pointer hover:ring-2 hover:ring-blue-500 transition"
                    style={{ backgroundColor: item.value }}
                  >
                    {selectedColor === item.value && (
                      <Check className="text-blue-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <hr className="text-gray-400 opacity-50 my-5" />

            <div className="space-y-2 mt-5">
              <h1>Choose Size</h1>
              <div className="flex items-center gap-3">
                {TShirtSizes.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSize(item.value)}
                    className={`px-4 py-2 bg-next rounded-full text-sm font-medium transition ${
                      selectedSize === item.value
                        ? "text-white border-2 border-red-500"
                        : "text-white hover:scale-105"
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

            <hr className="text-gray-400 opacity-50 my-5" />

            <div className="flex items-center justify-start gap-4 mt-6">
              <div className="flex items-center gap-2 bg-primaryBG px-3 py-1 rounded-full">
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus />
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus />
                </button>
              </div>
              <button className="px-8 w-full py-2 bg-primary text-white font-medium rounded-full hover:bg-red-700 transition">
                Check Out
              </button>
            </div>
          </div>
        </div>
      </section>

      {showTooltip && (
        <OnboardingTooltip
          title="Add To Cart"
          content="Choose the product type, set the size and adjust your customization and place the order "
          step={9}
          targetId="checkout"
          totalSteps={10}
          onNext={handleNext}
          onSkip={handleSkip}
        />
      )}
    </main>
  );
}

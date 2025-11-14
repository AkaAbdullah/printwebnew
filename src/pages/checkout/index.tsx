import BackButton from "../../components/base/BackButton";
import SVGCanvas from "../../components/base/SVGCanvass";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { mediaData } from "../../utils/mediaData";
import html2canvas from "html2canvas";
import { Check, Crop, Minus, Plus, Scan, VectorSquare } from "lucide-react";
import { tShirtColors, TShirtSizes } from "../../utils/products";
import {
  addQuantity,
  removeQuantity,
  updateProductColor,
  updateProductImage,
  updateProductName,
  updateProductPrice,
  updateSize,
} from "../../store/slices/checkoutSlice";
import { useNavigate } from "react-router";

export default function Index() {
  const dispatch = useDispatch();
  const { selectedProduct } = useSelector((state: RootState) => state.product);
  const { productInfo } = useSelector((state: RootState) => state.checkout);

  const { combinedTemplate } = useSelector(
    (state: RootState) => state.template
  );

  const [sideImages, setSideImages] = useState<string[]>([]);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  console.log(sideImages);
  useEffect(() => {
    if (!selectedProduct?.image) return;

    const baseImage = selectedProduct.image;
    const modelImage = mediaData.girlTshirt;

    setSideImages((prev) => {
      const newImages = [...prev];
      if (!newImages.includes(baseImage)) newImages.push(baseImage);
      if (!newImages.includes(modelImage)) newImages.push(modelImage);
      return newImages;
    });

    setActiveImage(baseImage);
  }, [selectedProduct?.image]);

  useEffect(() => {
    if (!previewRef.current || !combinedTemplate) return;

    const capturePreview = async () => {
      const node = previewRef.current;

      if (!node) {
        console.warn("Preview ref is not attached");
        return;
      }

      try {
        const canvas = await html2canvas(node, {
          scale: 2,
          useCORS: true,
          backgroundColor: null,
          allowTaint: true,
        });

        const imageUrl = canvas.toDataURL("image/png");
        dispatch(updateProductImage(imageUrl));
        dispatch(updateProductName(selectedProduct?.name));
        dispatch(
          updateProductPrice({
            currentPrice: selectedProduct?.price.currentPrice,
            discount: selectedProduct?.price.discount,
          })
        );

        setSideImages((prev) => {
          if (!prev.includes(imageUrl)) {
            return [...prev, imageUrl];
          }
          return prev;
        });
      } catch (err) {
        console.error("Failed to capture preview:", err);
      }
    };

    const timer = setTimeout(capturePreview, 50);
    return () => clearTimeout(timer);
  }, [combinedTemplate, selectedProduct?.image]);

  // Handle thumbnail click
  const handleThumbnailClick = (img: string) => {
    setActiveImage(img);
  };

  const handleSizeClick = (value: string) => {
    dispatch(updateSize(value));
  };

  function getPrice(price: any, discount: any): number {
    const discountAmount = (price * discount) / 100;
    return price - discountAmount;
  }

  const navigate = useNavigate();

  function handleNext() {
    navigate("/payment");
  }
  return (
    <main className=" min-h-screen">
      <header className="space-y-4 mb-6">
        <BackButton />
        <div className="text-center">
          <h1 className="font-bold text-lg lg:text-[30px]">
            Product Preview and Detail
          </h1>
        </div>
      </header>

      <section className="flex gap-5 items-center lg:items-start justify-between  flex-col lg:flex-row">
        {/* Left Column: Thumbnails */}
        <div className="flex lg:flex-col flex-wrap items-center justify-center gap-3 w-full lg:w-[120px]">
          {sideImages.map((img, index) => (
            <div
              key={index}
              onClick={() => handleThumbnailClick(img)}
              className="relative group cursor-pointer transition-all duration-200"
            >
              <img
                src={img}
                alt={`Preview ${index}`}
                className="w-[120px] h-[140px] rounded-xl object-cover object-top bg-[#b2bcb4] border-2 border-transparent  hover:scale-105 transition-all"
                style={{
                  aspectRatio: "3/4",
                }}
              />
              {/* Highlight active thumbnail */}
              {activeImage === img && (
                <div className="absolute inset-0 border-secondary  border-2 bg-opacity-20 rounded-xl"></div>
              )}
            </div>
          ))}
        </div>

        {/* Right Column: Main Preview & Product Info */}
        <div className="flex flex-1 flex-col lg:flex-row items-start gap-10">
          <div
            ref={previewRef}
            className="w-full max-w-[444px] h-[530px] bg-[#b2bcb4] rounded-xl overflow-hidden relative shadow-lg flex items-center justify-center"
            style={{
              backgroundImage: `url(${activeImage || selectedProduct?.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {!combinedTemplate ? (
              <p className="text-white text-lg  font-medium drop-shadow">
                No template selected
              </p>
            ) : (
              sideImages[2] !== activeImage && (
                <SVGCanvas url={combinedTemplate} width={200} height={400} />
              )
            )}
          </div>
          {/* details */}
          <div>
            <div className="text-start">
              <h2 className=" font-bold text-[40px]">
                {selectedProduct?.name}
              </h2>
              <div className="mt-5 flex items-startjustify-center gap-2">
                <span className="text-xl font-semibold">
                  $
                  {getPrice(
                    selectedProduct?.price.currentPrice,
                    selectedProduct?.price.discount
                  )}
                </span>
                <span className="text-lg line-through text-gray-500">
                  ${selectedProduct?.price.currentPrice}
                </span>
                <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">
                  {selectedProduct?.price.discount}%
                </span>
              </div>
              <p className="mt-3 text-gray-700 text-start max-w-md">
                {selectedProduct?.description}
              </p>
            </div>
            <hr className="text-gray-400 opacity-50 my-5" />

            <div className="space-y-2 mt-5">
              <h1>Edit Image</h1>
              <div className=" flex items-center  justify-between mt-2">
                <div className=" flex items-center gap-2">
                  <VectorSquare className="text-secondary" />
                  <span className=" text-sm">Trasnform</span>
                </div>
                <div className=" flex items-center gap-2">
                  <Scan className=" text-secondary" />
                  <span className=" text-sm">Position</span>
                </div>
                <div className=" flex items-center gap-2">
                  <Crop className=" text-secondary" />
                  <span className=" text-sm">Crop</span>
                </div>
              </div>
            </div>

            <hr className="text-gray-400 opacity-50 my-5" />

            <div className="space-y-2 mt-5">
              <h1>Select Color</h1>
              <div className="flex gap-3">
                {tShirtColors.map((item) => (
                  <div
                    onClick={() => {
                      dispatch(updateProductColor(item.value));
                    }}
                    key={item.id}
                    className="w-8 flex items-center justify-center h-8 rounded-full border-2 border-gray-300 cursor-pointer hover:ring-2 hover:ring-blue-500 transition"
                    style={{
                      backgroundColor: item.value,
                    }}
                  >
                    {productInfo?.color == item.value && (
                      <Check className="text-blue-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <hr className="text-gray-400 opacity-50 my-5" />

            <div className=" space-y-2 mt-5">
              <h1>Choose Size</h1>
              <div className=" flex items-center gap-3">
                {TShirtSizes.map((item) => (
                  <button
                    onClick={() => {
                      handleSizeClick(item.value);
                    }}
                    key={item.id}
                    className={`px-4 py-2 bg-next rounded-full text-sm font-medium transition ${
                      productInfo.size === item.value
                        ? " text-white border-2 border-red-500"
                        : " text-white hover:scale-105"
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
                <button className="w-8 h-8 rounded-full  flex items-center justify-center">
                  <Minus
                    onClick={() => {
                      dispatch(removeQuantity());
                    }}
                  />
                </button>
                <span className="w-8 text-center">{productInfo.quantity}</span>
                <button className="w-8 h-8 rounded-full  flex items-center justify-center">
                  <Plus
                    onClick={() => {
                      dispatch(addQuantity());
                    }}
                  />
                </button>
              </div>
              <button
                onClick={handleNext}
                className="px-8 w-full py-2 bg-primary text-white font-medium rounded-full hover:bg-red-700 transition"
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

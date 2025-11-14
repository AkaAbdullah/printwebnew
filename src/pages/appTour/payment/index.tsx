import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { mediaData } from "../../../utils/mediaData";
import BackButton from "../../../components/base/BackButton";
import OnboardingTooltip from "../../../components/base/OnboardingToolTip";

const Index = () => {
  // Static mock data
  const [productInfo, setProductInfo] = useState({
    productImage: mediaData.Tshirt9,
    productName: "Classic Cotton T-Shirt",
    size: "M",
    color: "Red",
    orderPrice: 25,
    quantity: 1,
  });

  const [selectedProduct] = useState({
    price: { currentPrice: 25, discount: 20 },
  });

  const [totalAmount, setTotalAmount] = useState(0);

  // Calculate total amount
  useEffect(() => {
    const quantity = productInfo.quantity;
    const price = selectedProduct.price.currentPrice;
    const discountPercent = selectedProduct.price.discount || 0;

    const totalOriginalPrice = quantity * price;
    const discountAmount = (totalOriginalPrice * discountPercent) / 100;
    const finalTotal = totalOriginalPrice - discountAmount + 15;

    setTotalAmount(Number(finalTotal.toFixed(2)));
  }, [productInfo, selectedProduct]);

  const formatDiscount = () => {
    const quantity = productInfo.quantity;
    const price = selectedProduct.price.currentPrice;
    const discountPercent = selectedProduct.price.discount || 0;
    const totalOriginalPrice = quantity * price;
    const discountAmount = (totalOriginalPrice * discountPercent) / 100;
    return discountAmount.toFixed(2);
  };

  const increaseQuantity = () => {
    setProductInfo((prev) => ({
      ...prev,
      quantity: prev.quantity + 1,
    }));
  };

  const decreaseQuantity = () => {
    setProductInfo((prev) => ({
      ...prev,
      quantity: prev.quantity > 1 ? prev.quantity - 1 : 1,
    }));
  };

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
  function handleCloseTour() {
    localStorage.setItem("hasSeenOnboarding", "true");
    navigate("/");
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="space-y-4 mb-6">
        <BackButton />
        <h1 className="text-2xl font-bold text-gray-900">Payment Method</h1>
      </header>

      <div className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Payment Form */}
          <div className="space-y-6">
            {/* Credit Card Input */}
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Credit Card"
                  className="w-full px-3 py-2 border bg-inputbg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <div className="absolute right-3 top-1 flex space-x-1">
                  <img src={mediaData.visaicon} alt="Visa" className="h-9" />
                  <img
                    src={mediaData.mastericon}
                    alt="Mastercard"
                    className="h-9"
                  />
                </div>
              </div>

              <input
                type="text"
                placeholder="Holder Name"
                className="w-full px-3 py-2 border bg-inputbg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Expire Date"
                  className="px-3 py-2 border bg-inputbg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="px-3 py-2 border bg-inputbg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              {/* Payment Options */}
              <div className="space-y-3">
                <button className="flex bg-inputbg justify-between items-center w-full px-3 py-2 border border-gray-300 rounded-md hover:bg-secondary transition">
                  <span>Apple Pay</span>
                  <img
                    src={mediaData.applepay}
                    alt="Apple Pay"
                    className="h-9"
                  />
                </button>
                <button className="flex bg-inputbg justify-between items-center w-full px-3 py-2 border border-gray-300 rounded-md hover:bg-secondary transition">
                  <span>Google Pay</span>
                  <img
                    src={mediaData.googlepay}
                    alt="Google Pay"
                    className="h-9"
                  />
                </button>
                <button className="flex bg-inputbg justify-between items-center w-full px-3 py-2 border border-gray-300 rounded-md hover:bg-secondary transition">
                  <span>By Cash</span>
                  <img src={mediaData.CODicon} alt="Cash" className="h-9" />
                </button>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Add Shipping Address
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="mt-1 block bg-inputbg w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="flex">
                    <select className="border bg-inputbg border-gray-300 rounded-l-md px-3 py-2 text-sm">
                      <option>US</option>
                    </select>
                    <input
                      type="tel"
                      defaultValue="+1 (333) 000-0000"
                      className="flex-1 bg-inputbg border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  defaultValue="380-394 11th Ave, New York, NY 10001"
                  className="mt-1 bg-inputbg block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    defaultValue="New York"
                    className="mt-1 block bg-inputbg w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Postal / Zip code
                  </label>
                  <input
                    type="text"
                    defaultValue="5432"
                    className="mt-1 block bg-inputbg w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="billing"
                  defaultChecked
                  className="h-4 w-4 accent-secondary"
                />
                <label htmlFor="billing" className="ml-2 text-sm text-gray-700">
                  Use as billing address
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="bg-inputbg p-6 rounded-2xl">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Summary
            </h2>

            <div className="mb-6">
              <div className="flex gap-5">
                <img
                  src={productInfo.productImage}
                  className="w-24"
                  alt={productInfo.productName}
                />
                <div className="flex-1">
                  <h1 className="font-bold text-xl">
                    {productInfo.productName}
                  </h1>
                  <p>Size: {productInfo.size}</p>
                  <p>Color: {productInfo.color}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-red-600">
                      ${productInfo.orderPrice}
                    </p>
                    <div className="flex text-xl items-center space-x-4">
                      <button
                        onClick={decreaseQuantity}
                        className="text-gray-600 cursor-pointer"
                      >
                        −
                      </button>
                      <span className="text-gray-800">
                        {productInfo.quantity}
                      </span>
                      <button
                        onClick={increaseQuantity}
                        className="text-gray-600 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <Trash2 className="text-red-600" />
                </div>
              </div>
            </div>

            <div className="space-y-2 text-base">
              <div id="endTour" className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-lg font-bold">
                  ${(productInfo.quantity * productInfo.orderPrice).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Discount ({selectedProduct.price.discount}%)</span>
                <span className="text-red-600 text-lg font-bold">
                  -${formatDiscount()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="text-lg font-bold">$15.00</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold text-2xl">
                <span>Total</span>
                <span>${totalAmount}</span>
              </div>
            </div>

            <div className="flex justify-end h-3/4 items-center">
              <button className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-md transition">
                Save & Continue
              </button>
            </div>
          </div>
        </div>
      </div>
      {showTooltip && (
        <OnboardingTooltip
          title="Confirm payment and address"
          content="Choose the product type, set the size and adjust your customization and place the order "
          step={10}
          targetId="endTour"
          totalSteps={10}
          onNext={handleCloseTour}
          onSkip={handleSkip}
        />
      )}
    </main>
  );
};

export default Index;

"use client";
import { useEffect, useState } from "react";
import BackButton from "../../components/base/BackButton";
import Tabs from "../../components/base/Tabs";
import ProductGrid from "../../components/sections/ProductGrid";
import { products } from "../../utils/products";
import { useNavigate } from "react-router";
import OnboardingTooltip from "../../components/base/OnboardingToolTip";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("Cups");

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
  const handleNext = () => {
    // start new flow: pick a template first
    navigate("/customization/select-template");
  };

  return (
    <div className="min-h-screen">
      <BackButton />

      {/* Header */}
      <div className="text-center mt-4">
        <h1 className="text-xl font-semibold">Select Products</h1>
        <p className="text-gray-600 text-sm">
          Select the type of products you would like to order
        </p>
      </div>

      {/* Tabs */}
      <div id="productGrid" className="mt-6 flex items-center justify-center">
        <Tabs
          tabs={Object.keys(products)}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {/* Product Grid */}
      <div className="mt-6">
        <ProductGrid
          products={products[activeTab]}
          fallbackText={
            products[activeTab].length > 0 ? "Not Available" : "Coming Soon"
          }
        />
      </div>
      {showTooltip && (
        <OnboardingTooltip
          title="Select Product"
          content="You can select the product you want to order and customize, eg: Cups, Shirts and Hoodies by selecting them from there categories."
          step={1}
          totalSteps={10}
          targetId="productGrid"
          onNext={handleNext}
          onSkip={handleSkip}
        />
      )}
    </div>
  );
};

export default ProductsPage;

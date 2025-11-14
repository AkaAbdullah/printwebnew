// hooks/useOnboardingTour.ts
import { useState, useEffect } from "react";

export interface TourStep {
  title: string;
  content: string;
}

export const useOnboardingTour = (steps: TourStep[]) => {
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    const hasSeen = localStorage.getItem("onboardingSeen") === "true";
    if (!hasSeen && steps.length > 0) {
      setCurrentStep(0);
    }
  }, [steps.length]);

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      end();
    }
  };

  const skip = () => {
    end();
  };

  const end = () => {
    setCurrentStep(-1);
    localStorage.setItem("onboardingSeen", "true");
  };

  const reset = () => {
    setCurrentStep(0);
    localStorage.removeItem("onboardingSeen");
  };

  return {
    currentStep,
    isClient,
    isActive: currentStep >= 0,
    stepData: steps[currentStep] || null,
    next,
    skip,
    end,
    reset,
  };
};

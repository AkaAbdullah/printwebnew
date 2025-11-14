import React, { useEffect, useRef, useState } from "react";

interface OnboardingTooltipProps {
  title: string;
  content: string;
  step: number;
  totalSteps: number;
  onNext: () => void;
  onSkip: () => void;
  targetId?: string;
}

const OnboardingTooltip: React.FC<OnboardingTooltipProps> = ({
  title,
  content,
  step,
  totalSteps,
  onNext,
  onSkip,
  targetId,
}) => {
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    const isNowMobile = window.innerWidth < 768;
    setIsMobile(isNowMobile);

    if (isNowMobile || !targetId) {
      setPosition(null); // fallback to center
      return;
    }

    const target = document.getElementById(targetId);
    if (!target) {
      setPosition(null);
      return;
    }

    const targetRect = target.getBoundingClientRect();
    const left = targetRect.left + targetRect.width / 2;
    const top = targetRect.bottom + window.scrollY + 10;
    setPosition({ top, left });
  };

  useEffect(() => {
    updatePosition();

    const handleScrollResize = () => {
      updatePosition();
    };

    window.addEventListener("scroll", handleScrollResize, true);
    window.addEventListener("resize", handleScrollResize);

    return () => {
      window.removeEventListener("scroll", handleScrollResize, true);
      window.removeEventListener("resize", handleScrollResize);
    };
  }, [targetId]);

  const isCentered = isMobile || position === null;

  return (
    <>
      {/* Backdrop Overlay */}
      <div className="fixed inset-0 bg-black/30 z-40" aria-hidden="true" />

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className={`z-50 bg-softBg rounded-xl rounded-bl-none shadow-xl border-secondary lg:min-w-[507px] max-w-[507px] p-5
          ${
            isCentered
              ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              : "absolute transform -translate-x-1/2"
          }`}
        style={
          isCentered ? undefined : { top: position!.top, left: position!.left }
        }
        onClick={(e) => e.stopPropagation()}
      >
        {/* Arrow (only for desktop positioning) */}
        {!isCentered && (
          <div
            className="absolute top-[-6px] left-1/4 transform -translate-x-1/2 w-3 h-3 bg-softBg rotate-45 "
            style={{ boxShadow: "-1px -1px 2px rgba(0,0,0,0.1)" }}
          />
        )}

        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <span className="text-xs font-medium text-gray-500">
            {step} / {totalSteps}
          </span>
        </div>

        {/* Content */}
        <p className="text-sm text-gray-700 mb-4 leading-relaxed">{content}</p>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onSkip}
            className="w-34 rounded-full px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 border-secondary border"
          >
            Skip
          </button>
          <button
            onClick={onNext}
            className="w-34 px-3 py-1.5 bg-red-600 text-white text-sm rounded-full hover:bg-red-700"
          >
            {step === totalSteps ? "Done" : "Next"}
          </button>
        </div>
      </div>
    </>
  );
};

export default OnboardingTooltip;

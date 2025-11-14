// components/OnboardingModal.tsx

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  step: number;
  totalSteps: number;
  onNext: () => void;
  onSkip: () => void;
  title: string;
  content: string;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  step,
  totalSteps,
  onNext,
  onSkip,
  title,
  content,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
          aria-label="Close tutorial"
        >
          ×
        </button>

        {/* Title & Step Counter */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <span className="text-sm font-medium text-gray-500">
            {step} / {totalSteps}
          </span>
        </div>

        {/* Content */}
        <p className="text-sm text-gray-700 mb-6 leading-relaxed">{content}</p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onSkip}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200 text-sm font-medium"
          >
            Skip Tour
          </button>
          <button
            onClick={onNext}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;

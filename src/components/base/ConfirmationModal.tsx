interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfirmationModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className="relative bg-background rounded-xl shadow-lg max-w-md w-full p-6 transform transition-all duration-300 ease-in-out scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Order Placed</h2>
          <p className="text-gray-600 mb-8">
            Kindly handle over this tab to shop owner for order confirmation
          </p>

          <button
            onClick={onClose}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

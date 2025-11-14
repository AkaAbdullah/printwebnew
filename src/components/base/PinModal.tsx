import { useState } from "react";

const MPINModal = ({
  open,
  onClose,
  onVerify,
}: {
  open: boolean;
  onClose: () => void;
  onVerify: (pin: string) => void;
}) => {
  const [pin, setPin] = useState(["", "", "", ""]);

  const handleChange = (value: string, index: number) => {
    if (value.length > 1) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 3) {
      const next = document.getElementById(`mpin-${index + 1}`);
      (next as HTMLInputElement)?.focus();
    }
  };

  const handleVerify = () => {
    onVerify(pin.join(""));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-[#F6EDE2] rounded-xl shadow-lg w-[90%] max-w-sm p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold">MPIN</h2>
        <p className="text-sm text-gray-600 mt-1">
          Please enter your MPIN to verify that you are owner
        </p>

        <div className="flex justify-center gap-3 mt-5">
          {pin.map((digit, i) => (
            <input
              key={i}
              id={`mpin-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              className="w-12 h-12 border rounded-md text-center text-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          className="w-full mt-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-red-700 transition"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default MPINModal;

import { Check } from "lucide-react";

interface ColorPalletProps {
  selected?: string; // ✅ comes from Redux
  onSelect: (color: string) => void; // ✅ callback to update Redux
}

const ColorPallet = ({ selected, onSelect }: ColorPalletProps) => {
  const colorList = [
    { id: 1, value: "#ccc" },
    { id: 2, value: "#666" },
    { id: 3, value: "#000" },
    { id: 4, value: "#fff" },
  ];

  return (
    <div className="flex gap-3">
      {colorList.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.value)}
          className="relative w-5 h-5 rounded-full  flex items-center justify-center"
          style={{ backgroundColor: item.value }}
        >
          {selected === item.value && (
            <Check
              className={`w-4 h-4 ${
                item.value === "#000" || item.value === "#666"
                  ? "text-white"
                  : "text-black"
              }`}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default ColorPallet;

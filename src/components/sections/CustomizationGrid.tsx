interface CustomizationGridProps {
  options?: OptionItem[];
  columns?: number;
  selectedId?: number | null;
  onOptionClick: (id: number) => void;
}

export interface OptionItem {
  id: number;
  imageUrl: string;
}

const CustomizationGrid = ({
  options = [],
  columns = 5,
  selectedId,
  onOptionClick,
}: CustomizationGridProps) => {
  return (
    <div
      className={`grid gap-4 bg-softBg rounded-xl p-4 grid-cols-${columns} lg:grid-cols-${columns}`}
    >
      {options.map(({ id, imageUrl }) => (
        <div
          key={`option-${id}`}
          className={`p-2 bg-primaryBG rounded cursor-pointer flex items-center justify-center transition-all duration-200 ${
            selectedId === id ? "ring-2 ring-secondary" : "hover:bg-secondary"
          }`}
          onClick={() => onOptionClick(id)}
        >
          <img
            src={imageUrl}
            alt={`option-${id}`}
            className="w-16 h-16 object-contain"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default CustomizationGrid;

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}

const Tabs = ({ tabs, activeTab, onChange }: TabsProps) => {
  return (
    <div className="relative w-fit mx-auto ">
      <div className="absolute bottom-0 left-0 w-full border-b border-white" />

      <div className="flex lg:gap-24 gap-14 md:gap-20 relative">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className="relative pb-2 cursor-pointer"
          >
            <span
              className={`text-lg font-semibold transition-colors ${
                activeTab === tab ? "text-gray-800" : "text-gray-500"
              }`}
            >
              {tab}
            </span>

            {activeTab === tab && (
              <span className="absolute left-0 -bottom-0.5 w-full h-[3px] bg-red-500 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;

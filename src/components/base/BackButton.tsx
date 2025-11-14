import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className="cursor-pointer">
      <div className="bg-[#C8A96A] h-[32px] w-[32px] rounded-full flex items-center justify-center">
        <ChevronLeft className="text-white mr-1" size={28} />
      </div>
    </button>
  );
};

export default BackButton;

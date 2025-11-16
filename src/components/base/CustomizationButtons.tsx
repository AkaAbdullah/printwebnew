import { useNavigate } from "react-router";
import { mediaData } from "../../utils/mediaData";
// import { useDispatch } from "react-redux";

interface CustomizationButtonsProps {
  onNext?: () => void;
}

const CustomizationButtons = ({ onNext }: CustomizationButtonsProps) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleReset = () => {
    // dispatch(reset());
  };

  const handleNext = () => {
    if (onNext) onNext();
    else navigate("/customization/background-customization");
  };

  return (
    <div className="flex items-center gap-5">
      <div className=" flex flex-col gap-1 items-center cursor-pointer">
        <img src={mediaData.swapicon} className=" w-12" />
        <h1 className=" font-semibold">Change Avatar</h1>
      </div>
      <div
        onClick={handleReset}
        className=" flex flex-col gap-1 items-center cursor-pointer"
      >
        <img src={mediaData.reseticom} className=" w-12" />
        <h1 className=" font-semibold">Reset</h1>
      </div>
      <div
        onClick={handleNext}
        className=" flex flex-col gap-1 items-center cursor-pointer"
      >
        <img id="characterList" src={mediaData.nexticon} className=" w-12" />
        <h1 className=" font-semibold">Next</h1>
      </div>
    </div>
  );
};

export default CustomizationButtons;

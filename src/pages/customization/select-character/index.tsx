import { MoveRight, X } from "lucide-react";
import BackButton from "../../../components/base/BackButton";
import { mediaData } from "../../../utils/mediaData";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import {
  addCharacter,
  removeCharacter,
  updateCharacterName,
  updateCharacterColor,
} from "../../../store/slices/characterSlice";
import { clearCharacterCustomization } from "../../../store/slices/customizationSlice";
import ColorPallet from "../../../components/base/ColorPallet";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import OnboardingTooltip from "../../../components/base/OnboardingToolTip";

const SelectCharacter = () => {
  const dispatch = useDispatch();
  const { characters, selectedCharacters } = useSelector(
    (state: RootState) => state.character
  );
  // customization state is not needed here, but left out in case of future features
  const { selectedTemplate } = useSelector((state: RootState) => state.template);
  const navigate = useNavigate();

  const maxAllowed = selectedTemplate?.noOfCharactersInTemplate ?? 4;

  const allowedCharacterTitles = selectedTemplate?.titles ?? null;

  const handleSelect = (id: number) => {
    if (selectedCharacters.length < maxAllowed) {
      dispatch(addCharacter({ id }));
    }
  };

  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltip2, setShowTooltip2] = useState(false);

  useEffect(() => {
    // If user navigates to select-characters without a selected template, take them back to select-template
    if (!selectedTemplate) {
      navigate("/customization/select-template");
      return;
    }
    const hasSeenOnboarding =
      localStorage.getItem("hasSeenOnboarding") === "true";
    if (!hasSeenOnboarding) {
      setShowTooltip(true);
    }
  }, [selectedTemplate, navigate]);

  const handleSkip = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setShowTooltip(false);
  };

  const handleNextModal = () => {
    setShowTooltip(false);
    setShowTooltip2(true);
  };

  const handleNext = () => {
    navigate("/appTour/character-look");
  };

  function handleNextPage() {
    navigate("/customization/customize-character");
  }

  return (
    <main>
      <BackButton />
      <div className="flex items-center flex-col gap-3 mt-5 lg:gap-4 text-center justify-center">
        <h1 className="font-bold text-lg lg:text-[30px]">
          How many characters do you want?
        </h1>
        <p className="text-[18px]">
          Choose your base models to customize (Select {maxAllowed} or less only)
        </p>
        <div className="flex justify-center lg:justify-end w-full">
          <button
            onClick={handleNextPage}
            className={`w-[230px] flex items-center justify-center h-10 rounded-full text-white ${
              selectedCharacters.length === 0
                ? "  opacity-50 cursor-not-allowed bg-[#666666]"
                : "bg-next"
            }`}
            disabled={selectedCharacters.length === 0}
          >
            Next <MoveRight className="ml-2" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start justify-between gap-10 mt-5">
        {/* Left side grid: Available characters */}
        <div className="w-full lg:w-1/2 relative">
          <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 gap-6">
            {(allowedCharacterTitles ? characters.filter(c => allowedCharacterTitles.includes(c.title)) : characters).map((item) => {
              const isSelected = selectedCharacters.some(
                (c) => c.id === item.id
              );
              return (
                <div
                  key={item.id}
                  className={`relative flex justify-center items-center w-[237px] h-[240px] border rounded-2xl cursor-pointer ${
                    isSelected
                      ? "opacity-50 pointer-events-none border-[#C8A96A]"
                      : "border-[#C8A96A] hover:shadow-md"
                  }`}
                  onClick={() => handleSelect(item.id)}
                >
                  <img
                    src={mediaData.gradientBg}
                    alt="gradient background"
                    className="absolute w-full max-w-[220px] h-[220px] object-contain"
                  />

                  <img
                    src={item.png}
                    alt={item.title}
                    className="z-50 w-[180px] h-[180px] object-contain"
                  />

                  {
                    <div className="absolute bottom-2 right-2">
                      <img
                        id="selectCharacter"
                        src={mediaData.plusicon}
                        alt="add icon"
                      />
                    </div>
                  }
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side: Selected Characters */}
        <div className="w-full bg-[#F9F5EF] lg:w-1/2 p-4 rounded-lg">
          <div className="flex flex-col gap-4">
            {selectedCharacters.map((char, index) => (
              <div
                key={char.id}
                className="relative flex items-center gap-4 lg:gap-12"
              >
                <div className="relative">
                  <div className="flex items-center justify-center min-w-[60px] max-h-[60px] lg:w-[110px] lg:min-h-[80px] border border-dashed border-secondary rounded-xl bg-white">
                    <img
                      src={char.png}
                      alt={char.name}
                      className="w-[60px] h-[60px] object-contain lg:w-[90px] lg:h-[70px]"
                    />
                  </div>

                  <div
                    onClick={() => {
                      dispatch(removeCharacter(char.id));
                      // clear any per-character customization when removed
                      dispatch(clearCharacterCustomization({ id: char.id }));
                    }}
                    className="absolute h-7 w-7 flex top-[-12px] cursor-pointer right-[-12px] items-center justify-center text-white rounded-full bg-secondary"
                  >
                    <X size={20} />
                  </div>
                </div>

                <div className="flex flex-col w-full gap-2">
                  <label>{`Character ${index + 1} Name`}</label>
                  <input
                    type="text"
                    placeholder={`Character ${index + 1} Name`}
                    value={char.name}
                    onChange={(e) =>
                      dispatch(
                        updateCharacterName({
                          id: char.id,
                          name: e.target.value,
                        })
                      )
                    }
                    className="flex-1 bg-primaryBG p-2 rounded-lg"
                  />

                  <ColorPallet
                    selected={char.color}
                    onSelect={(color) =>
                      dispatch(updateCharacterColor({ id: char.id, color }))
                    }
                  />
                </div>
              </div>
            ))}

            {selectedCharacters.length === 0 && (
              <p id="charctertext" className="text-gray-500 text-center">
                Please select a character to continue
              </p>
            )}
          </div>
        </div>
      </div>

      {showTooltip && (
        <OnboardingTooltip
          title="Select Characters"
          content="Here you can select Male, female, kid and Pet and customize them and display on your products."
          step={2}
          totalSteps={10}
          targetId="selectCharacter"
          onNext={handleNextModal}
          onSkip={handleSkip}
        />
      )}

      {showTooltip2 && (
        <OnboardingTooltip
          title="Characters Text"
          content="Here you can select Male, female, kid and Pet and customize them and display on your products."
          step={3}
          totalSteps={10}
          targetId="charctertext"
          onNext={handleNext}
          onSkip={handleSkip}
        />
      )}
    </main>
  );
};

export default SelectCharacter;

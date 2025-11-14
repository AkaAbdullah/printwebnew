// pages/BackgroundSelectionPage.tsx
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../../components/base/BackButton";
import type { RootState } from "../../../store";
import { useNavigate } from "react-router-dom";
import { MoveRight } from "lucide-react";
import {
  setCombinedTemplate,
  setTemplateBackground,
} from "../../../store/slices/templateSlice";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import OnboardingTooltip from "../../../components/base/OnboardingToolTip";
import { mediaData } from "../../../utils/mediaData";
import type { SelectedCharacter } from "../../../store/slices/characterSlice";
import CanvasEditor from "../../../components/base/CanvasEditor";

const BackgroundSelectionPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const previewRef = useRef<HTMLDivElement>(null);

  const captureCombinedImage = () => {
    if (!previewRef.current) return;

    html2canvas(previewRef.current, {
      backgroundColor: null,
      useCORS: true,
      scale: 2,
    }).then((canvas) => {
      const imgDataUrl = canvas.toDataURL("image/png");

      dispatch(setCombinedTemplate(imgDataUrl));
    });
  };

  const { selectedTemplate, background, allBackgrounds } = useSelector(
    (state: RootState) => state.template
  );
  const { selectedCharacters } = useSelector(
    (state: RootState) => state.character
  );
  const { activeCharacterId } = useSelector(
    (state: RootState) => state.customization
  );

  const activeCharacter: SelectedCharacter | null =
    selectedCharacters.find((char) => char.id === activeCharacterId) ??
    selectedCharacters[0] ??
    null;

  const handleNext = () => {
    captureCombinedImage();
    navigate("/checkout");
  };

  function handleTourNext() {
    navigate("/appTour/checkout");
  }

  const handleBackgroundSelect = (item: string) => {
    dispatch(setTemplateBackground(item));
  };

  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding =
      localStorage.getItem("hasSeenOnboarding") === "true";
    if (!hasSeenOnboarding) {
      setShowTooltip(true);
    }
  }, []);

  const handleSkip = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setShowTooltip(false);
  };

  return (
    <main className="p-4">
      <header className="space-y-5">
        <BackButton />
        <div className="text-center">
          <h1 className="font-bold text-lg lg:text-[30px]">
            Choose one background for your characters
          </h1>
        </div>
        <div className="flex justify-center lg:justify-end w-full">
          <button
            onClick={handleNext}
            className="w-[230px] flex items-center justify-center h-10 rounded-full text-white bg-next"
          >
            Next <MoveRight className="ml-2" />
          </button>
        </div>
      </header>

      <section className="grid  grid-cols-1 lg:grid-cols-2 gap-5 justify-items-center mt-6">
        {/* Background Selection Grid */}
  <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 bg-softBg p-2 lg:p-5 rounded-xl">
          {allBackgrounds.map((item, index) => (
            <div
              key={index}
              onClick={() => handleBackgroundSelect(item)}
              className={`cursor-pointer rounded-lg overflow-hidden shadow-md transition-all duration-200 transform ${
                background === item
                  ? "ring-3 ring-next scale-105"
                  : "ring-0 hover:ring-2 ring-gray-300"
              }`}
            >
              <img
                src={item}
                alt={`Background ${index + 1}`}
                className="w-[180px] h-[250px] object-cover"
              />
            </div>
          ))}
        </div>

                  {!showTooltip && (
                    <div
                      ref={previewRef}
                      className="w-full h-[500px] rounded-xl flex items-center justify-center overflow-hidden shadow-inner"
                      style={{
                        backgroundImage: `url(${background})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <div className="flex w-full items-center justify-center">
                        {/* Show rendered canvas of all selected characters on top of background */}
                        <div className="w-full max-h-full">
                          <div style={{ width: "100%", height: 500 }}>
                            <div className="w-full h-full">
                              <div className="flex items-center justify-center w-full h-full">
                                {/* non-editable CanvasEditor shows combined characters */}
                                {activeCharacter ? (
                                  <CanvasEditor editable={false} width={700} height={500} />
                                ) : selectedTemplate ? (
                                  <img
                                    src={selectedTemplate.image}
                                    alt="Selected Template"
                                    className="w-full max-h-full object-contain drop-shadow-2xl"
                                  />
                                ) : (
                                  <p className="text-white text-lg font-medium drop-shadow">
                                    No character selected
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
        )}
        {showTooltip && (
          <img src={mediaData.ss} className="w-full object-cover" />
        )}
      </section>
      {showTooltip && (
        <OnboardingTooltip
          title="Choose Background"
          content="When customization is complete then you can see the preview of your product by clicking on next button and order them."
          step={8}
          totalSteps={10}
          onNext={handleTourNext}
          onSkip={handleSkip}
        />
      )}
    </main>
  );
};

export default BackgroundSelectionPage;

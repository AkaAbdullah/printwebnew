import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import BackButton from "../../../components/base/BackButton";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router";
import { setSelectedTemplate } from "../../../store/slices/templateSlice";
import { clearAllCharacters } from "../../../store/slices/characterSlice";
import { clearAllCustomizations } from "../../../store/slices/customizationSlice";
import { newTemplateList, type Template } from "../../../utils/templates";
import { useEffect, useState } from "react";
import OnboardingTooltip from "../../../components/base/OnboardingToolTip";

const index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedTemplate } = useSelector(
    (state: RootState) => state.template
  );
  const { selectedProduct } = useSelector(
    (state: RootState) => state.product
  );

  const matchingTemplates = newTemplateList;

  const handleNext = () => {
    if (!selectedTemplate && !showTooltip) return; 
    navigate("/customization/select-character");
  };

  const handlePick = (templateObj: Template) => {
    dispatch(clearAllCharacters());
    dispatch(clearAllCustomizations());
    dispatch(setSelectedTemplate(templateObj));
  };

  const [showTooltip, setShowTooltip] = useState(false);
  useEffect(() => {
    if (!selectedProduct) {
      navigate("/customization");
      return;
    }
    const hasSeenOnboarding =
      localStorage.getItem("hasSeenOnboarding") === "true";
    if (!hasSeenOnboarding) {
      setShowTooltip(true);
    }
  }, [selectedProduct, navigate]);

  const handleSkip = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setShowTooltip(false);
  };

  return (
    <main>
      <header className=" space-y-5">
        <BackButton />
        <h1 className=" text-center  text-md lg:text-[30px] font-bold">
          Choose one template as you want for your characters
        </h1>
        <div className="flex justify-center lg:justify-end w-full">
          <button
            onClick={handleNext}
            className={`w-[230px] flex items-center justify-center h-10 rounded-full text-white ${
              !selectedTemplate
                ? "opacity-50 cursor-not-allowed bg-[#666]"
                : "bg-next"
            }`}
            disabled={!selectedTemplate}
          >
            Next <MoveRight className="ml-2" />
          </button>
        </div>
      </header>

      <section className=" mt-5 flex flex-col lg:flex-row gap-5">
        <div className=" lg:w-3/5 flex flex-wrap gap-5 bg-softBg rounded-xl py-5 items-center justify-center">
          {matchingTemplates.length > 0 ? (
            matchingTemplates.map((item: Template) => {
              const isActive = selectedTemplate?.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handlePick(item)}
                  className={`relative  rounded-xl  transition hover:shadow p-1 focus:outline-none ${
                    isActive
                      ? "border-[#C8A96A] ring-2 ring-[#C8A96A]/50"
                      : "border-[#C8A96A]"
                  }`}
                >
                  <div className="aspect-square cursor-pointer w-[200px] md:w-[200px] max-w-full overflow-hidden rounded-lg bg-background flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={`Template ${item.id}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                 
                </button>
              );
            })
          ) : !showTooltip ? (
            <p className="text-center text-gray-500">
              No templates found! <br />
              Please select another character combination.
            </p>
          ) : null}
          {showTooltip &&
            newTemplateList.map((item) => {
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`relative border-[#C8A96A] ring-2 ring-[#C8A96A]/50  rounded-xl  transition hover:shadow p-1 focus:outline-none `}
                >
                  <div className="aspect-square cursor-pointer w-[200px] md:w-[200px] max-w-full overflow-hidden rounded-lg bg-background flex items-center justify-center">
                    <img
                      id="template"
                      src={item.image}
                      alt={`Template ${item.id}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {item.characters && (
                    <div className="absolute top-2 left-2 bg-white/90 text-xs font-semibold text-gray-700 px-2 py-1 rounded-full shadow">
                      {item.characters.length}{" "}
                      {item.characters.length === 1
                        ? "Character"
                        : "Characters"}
                    </div>
                  )}
                </button>
              );
            })}
        </div>
        <div className=" flex-1">
          <div className="flex w-full items-center justify-center">
            {selectedTemplate && (
              <img src={selectedTemplate.image} className="w-full" />
            )}
            {!selectedTemplate && !showTooltip && (
              <div className="flex items-center justify-center ">
                <p className=" text-center">
                  Plesae select a template to continue
                </p>
              </div>
            )}
            {showTooltip && (
              <img src={newTemplateList[0].image} className="w-full" />
            )}
          </div>
        </div>
      </section>

      {showTooltip && (
        <OnboardingTooltip
          title="Choose one template"
          content="You can easily customize the character from this screen. Many options are available like change hair style, shirts, text and background of characters."
          step={5}
          totalSteps={10}
          onNext={handleNext}
          onSkip={handleSkip}
        />
      )}
    </main>
  );
};

export default index;

import { useEffect, useState } from "react";
import BackButton from "../../../components/base/BackButton";
import OnboardingTooltip from "../../../components/base/OnboardingToolTip";
import { mediaData } from "../../../utils/mediaData";
import { svgData } from "../../../utils/svgData";
import { useNavigate } from "react-router";

const index = () => {
  const charactersArray = [
    { id: 1, img: mediaData.girlPng },
    { id: 2, img: mediaData.boyPng },
    { id: 4, img: mediaData.dogPng },
    { id: 3, img: mediaData.childPng },
  ];

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
  const navigate = useNavigate();
  function handleNext() {
    navigate("/customization/select-template");
  }

  return (
    <main>
      <header>
        <BackButton />
        <div>
          <h1 className=" text-center font-bold text-lg lg:text-[30px]">
            Choose and avatar to start customizing
          </h1>
        </div>
      </header>

      <section className=" flex items-center justify-center mt-10">
        <div className="flex gap-10">
          {charactersArray.map((item) => (
            <div key={item.id} className=" border border-secondary rounded-xl">
              <img
                src={item.img}
                className=" w-20 h-20 object-cover object-top "
              />
            </div>
          ))}
        </div>
      </section>

      <section className=" p-5 bg-softBg rounded-xl mt-10 ">
        <div className=" grid grid-cols-2 lg:grid-cols-5 gap-10">
          {svgData.heads.slice(0, 10).map((item, index) => (
            <div key={index}>
              <img src={item} className=" w-40 bg-primaryBG rounded-lg" />
            </div>
          ))}
        </div>
      </section>

      {showTooltip && (
        <OnboardingTooltip
          title="Chose the character Look"
          content="You can chose any character look from this like there are many faces of female, male and pet so chose one one from the list."
          step={4}
          totalSteps={10}
          onNext={handleNext}
          onSkip={handleSkip}
        />
      )}
    </main>
  );
};

export default index;

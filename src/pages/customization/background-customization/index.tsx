// pages/BackgroundSelectionPage.tsx
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../../components/base/BackButton";
import type { RootState } from "../../../store";
import { useNavigate } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { setTemplateBackground, setFinalComposedTemplate } from "../../../store/slices/templateSlice";
import { updateProductImage } from "../../../store/slices/checkoutSlice";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from "react";
import html2canvas from "html2canvas";
import OnboardingTooltip from "../../../components/base/OnboardingToolTip";
import { mediaData } from "../../../utils/mediaData";
import type { SelectedCharacter } from "../../../store/slices/characterSlice";
import CanvasEditor, { type CanvasEditorRef } from "../../../components/base/CanvasEditor";
import { setCharacterVisible, setActiveCharacter } from "../../../store/slices/customizationSlice";

const BackgroundSelectionPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const previewRef = useRef<HTMLDivElement>(null);

  const canvasEditorRef = useRef<CanvasEditorRef | null>(null);

  const { selectedTemplate, background, allBackgrounds, combinedTemplate } = useSelector(
    (state: RootState) => state.template
  );
  const { selectedCharacters } = useSelector(
    (state: RootState) => state.character
  );
  const { generatedImages } = useSelector((state: RootState) => state.character);
  const { activeCharacterId } = useSelector(
    (state: RootState) => state.customization
  );
  const { selectedProduct } = useSelector((state: RootState) => state.product);

  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });
  const dragStateRef = useRef<{
    dragging: boolean;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  }>({
    dragging: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });

  useEffect(() => {
    // whenever we receive a new combined template or background reset offset to center
    setImageOffset({ x: 0, y: 0 });
  }, [combinedTemplate, background]);

  useEffect(() => {
    const handlePointerMove = (event: MouseEvent | TouchEvent) => {
      if (!dragStateRef.current.dragging) return;
      event.preventDefault();
      const point =
        event instanceof TouchEvent ? event.touches[0] ?? event.changedTouches[0] : event;
      if (!point) return;
      const deltaX = point.clientX - dragStateRef.current.startX;
      const deltaY = point.clientY - dragStateRef.current.startY;
      setImageOffset({
        x: dragStateRef.current.originX + deltaX,
        y: dragStateRef.current.originY + deltaY,
      });
    };

    const handlePointerUp = () => {
      if (dragStateRef.current.dragging) {
        dragStateRef.current.dragging = false;
      }
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchend", handlePointerUp);
    window.addEventListener("touchcancel", handlePointerUp);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchend", handlePointerUp);
      window.removeEventListener("touchcancel", handlePointerUp);
    };
  }, []);

  const startDraggingPreview = (
    event: ReactMouseEvent<HTMLDivElement> | ReactTouchEvent<HTMLDivElement>
  ) => {
    if (!combinedTemplate) return;
    event.preventDefault();
    const point =
      "touches" in event ? event.touches[0] ?? event.changedTouches[0] : event;
    if (!point) return;
    dragStateRef.current = {
      dragging: true,
      startX: point.clientX,
      startY: point.clientY,
      originX: imageOffset.x,
      originY: imageOffset.y,
    };
  };

  const activeCharacter: SelectedCharacter | null =
    selectedCharacters.find((char) => char.id === activeCharacterId) ??
    selectedCharacters[0] ??
    null;

  const capturePreviewImage = async (): Promise<string | null> => {
    if (!previewRef.current) return null;
    try {
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        useCORS: true,
        scale: 2,
      });
      return canvas.toDataURL("image/png");
    } catch (err) {
      console.warn("Failed to capture background preview:", err);
      return null;
    }
  };

  const handleNext = async () => {
    let composedImage: string | null = null;
    if (combinedTemplate) {
      composedImage = await capturePreviewImage();
      if (!composedImage) {
        composedImage = combinedTemplate;
      }
    }
    if (composedImage) {
      dispatch(setFinalComposedTemplate(composedImage));
      dispatch(updateProductImage(composedImage));
    }
    navigate("/checkout");
  };

  function handleTourNext() {
    navigate("/appTour/checkout");
  }

  const handleBackgroundSelect = (item: string) => {
    dispatch(setTemplateBackground(item));
  };

  // make generated images visible and set the active character so it can be edited from this page
  useEffect(() => {
    if (selectedCharacters.length === 0) return;
    // find first character which has a generated image
    const charWithGenerated = selectedCharacters.find((c) => generatedImages?.[c.id]);
    const target = charWithGenerated ?? selectedCharacters[0];
    if (target) {
      dispatch(setActiveCharacter(target));
      dispatch(setCharacterVisible({ id: target.id, visible: true }));
    }
  }, [selectedCharacters, generatedImages, dispatch]);

  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (!selectedProduct) {
      navigate("/customization");
      return;
    }
    if (!selectedTemplate) {
      navigate("/customization/select-template");
      return;
    }
    if (selectedCharacters.length === 0) {
      navigate("/customization/select-character");
    }
  }, [selectedProduct, selectedTemplate, selectedCharacters.length, navigate]);

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
                      className="relative w-full h-[500px] rounded-xl flex items-center justify-center overflow-hidden shadow-inner bg-center bg-cover"
                      style={{
                        backgroundImage: `url(${background})`,
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      {combinedTemplate ? (
                        <div
                          onMouseDown={startDraggingPreview}
                          onTouchStart={startDraggingPreview}
                          className="absolute cursor-move select-none"
                          style={{
                            transform: `translate(${imageOffset.x}px, ${imageOffset.y}px)`,
                          }}
                        >
                          <img
                            src={combinedTemplate}
                            alt="Character preview"
                            className="max-h-[460px] max-w-[90vw] object-contain drop-shadow-2xl pointer-events-none"
                          />
                        </div>
                      ) : activeCharacter ? (
                        <CanvasEditor
                          ref={canvasEditorRef}
                          editable={true}
                          width={700}
                          height={500}
                          imageOverrides={generatedImages}
                        />
                      ) : selectedTemplate ? (
                        <img
                          src={selectedTemplate.image}
                          alt="Selected Template"
                          className="max-h-full max-w-full w-full h-full object-contain drop-shadow-2xl"
                        />
                      ) : (
                        <p className="text-white text-lg font-medium drop-shadow">
                          No character selected
                        </p>
                      )}
                    </div>
        )}
        {!showTooltip && combinedTemplate && (
          <div className="text-center text-sm text-gray-600">
            Drag the snapshot to reposition it on the background.
            <button
              type="button"
              className="ml-2 text-secondary underline font-medium"
              onClick={() => setImageOffset({ x: 0, y: 0 })}
            >
              Reset position
            </button>
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

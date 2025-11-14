// pages/CustomizationPage.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../../components/base/BackButton";
import Tabs from "../../../components/base/Tabs";
import CustomizationGrid from "../../../components/sections/CustomizationGrid";
import CustomizationButtons from "../../../components/base/CustomizationButtons";
import {
  setActiveCharacter,
  setHead,
  setHair,
  setShirt,
  setJeans,
  setCharacterVisible,
} from "../../../store/slices/customizationSlice";
import { updateCharacterImage as updateSelectedCharacterImage } from "../../../store/slices/characterSlice";
import type { RootState } from "../../../store";
import {
  characterHairs,
  characterHeads,
  characterJeans,
  characterTshirts,
} from "../../../utils/customizationOptions";
import { doggyStyles } from "../../../utils/dogOptions";
import OnboardingTooltip from "../../../components/base/OnboardingToolTip";
// templateList not needed here; customized canvas uses selectedCharacters and customizations
import { useNavigate } from "react-router";
import { compressBlobToWebp, compressImageUrlsToWebp } from "../../../utils/imageUtils";
import CanvasEditor from "../../../components/base/CanvasEditor";

const colors = [
  // Row 1
  "#0096FF", // Cyan blue
  "#FF8C00", // Orange
  "#E236D6", // Magenta
  "#E5A0B4", // Light pink
  "#2D2D4F", // Dark navy
  "#4B2E83", // Deep purple
  "#7B4FA8", // Purple
  "#A460FF", // Lavender
  "#C7B8E7", // Light lavender
  "#0033CC", // Royal blue
  "#2F5D8B", // Teal blue
  "#0096FF", // Cyan blue (again)

  // Row 2
  "#78A8D6", // Light blue
  "#008B8B", // Turquoise
  "#5BC9D8", // Cyan teal
  "#004B36", // Dark green
  "#36FF8C", // Bright green
  "#008B45", // Forest green
  "#6B9B6B", // Olive green
  "#D4D46B", // Yellow-green
  "#B89B00", // Mustard yellow
  "#FFFF00", // Yellow
  "#F5F5DC", // Beige
  "#FF8C00", // Orange (again)

  // Row 3
  "#FF4500", // Red-orange
  "#FF69B4", // Pink
  "#DC143C", // Crimson red
  "#E5A0B4", // Light pink (again)
  "#8B0000", // Dark red
  "#5C0000", // Burgundy
  "#8B4513", // Brown
  "#654321", // Dark brown
  "#4B0000", // Deep maroon
  "#FFFFFF", // White
  "#C0C0C0", // Light gray

  // Bottom row
  "#2D2D2D", // Dark gray
  "#000000", // Black
];

const blobToDataUrl = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () =>
      reject(reader.error ?? new Error("Failed to read blob"));
    reader.readAsDataURL(blob);
  });

const CustomizationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedCharacters } = useSelector(
    (state: RootState) => state.character
  );
  const { selectedTemplate } = useSelector(
    (state: RootState) => state.template
  );
  const { customizations, activeCharacterId } = useSelector(
    (state: RootState) => state.customization
  );

  const [activeTab, setActiveTab] = useState<
    "Character" | "Hair" | "Shirt" | "jeans"
  >("Hair");
  const [colorTarget, setColorTarget] = useState<
    "head" | "hair" | "shirt" | "jeans" | null
  >(null);

  const selectedCharacterId =
    activeCharacterId ?? selectedCharacters[0]?.id ?? null;

  const selectedCharacter =
    selectedCharacters.find((char) => char.id === selectedCharacterId) ?? null;
  const isDog = selectedCharacter?.title?.toLowerCase() === "dog";

  const currentCustomization = selectedCharacterId
    ? customizations[selectedCharacterId]
    : null;

  const describeCustomization = (
    type: "head" | "hair" | "shirt" | "jeans",
    color?: string | null
  ) => {
    const colorText = color ? ` Use ${color} as the primary color.` : "";
    switch (type) {
      case "hair":
        return `Replace the hair with this sample.${colorText}`;
      case "shirt":
        return `Swap the shirt for this option.${colorText}`;
      case "jeans":
        return `Update the pants to match this reference.${colorText}`;
      case "head":
      default:
        return `Blend the face tone with this reference.${colorText}`;
    }
  };

  const handleCharacterClick = (item: any) => {
    // Always set the clicked character as active and make sure it is visible on the canvas.
    dispatch(setActiveCharacter(item));
    const isVisible = customizations[item.id]?.visibleOnCanvas;
    if (!isVisible) {
      dispatch(setCharacterVisible({ id: item.id, visible: true }));
    }
  };

  useEffect(() => {
    if (selectedCharacters.length > 0) {
      const first = selectedCharacters[0];
      if (!activeCharacterId) {
        dispatch(setActiveCharacter(first));
      }
      // ensure first character is visible by default on the canvas
      if (!customizations[first.id]?.visibleOnCanvas) {
        dispatch(setCharacterVisible({ id: first.id, visible: true }));
      }
    }
  }, [selectedCharacters, activeCharacterId, customizations, dispatch]);

  const handleOptionSelect = (id: number) => {
    const style = `${activeTab.toLowerCase()}-${id}`;
    let imageUrl = "";

    switch (activeTab) {
      case "Character":
        imageUrl =
          characterHeads.find((item) => item.id === id)?.imageUrl || "";
        dispatch(
          setHead({
            style,
            imageUrl,
            metaData: describeCustomization(
              "head",
              currentCustomization?.head.color
            ),
          })
        );
        setColorTarget("head");
        break;
      case "Hair":
        imageUrl =
          characterHairs.find((item) => item.id === id)?.imageUrl || "";
        dispatch(
          setHair({
            style,
            imageUrl,
            metaData: describeCustomization(
              "hair",
              currentCustomization?.hair.color
            ),
          })
        );
        setColorTarget("hair");
        break;
      case "Shirt":
        imageUrl =
          characterTshirts.find((item) => item.id === id)?.imageUrl || "";
        dispatch(
          setShirt({
            style,
            imageUrl,
            metaData: describeCustomization(
              "shirt",
              currentCustomization?.shirt.color
            ),
          })
        );
        setColorTarget("shirt");
        break;
      case "jeans":
        imageUrl =
          characterJeans.find((item) => item.id === id)?.imageUrl || "";
        dispatch(
          setJeans({
            style,
            imageUrl,
            metaData: describeCustomization(
              "jeans",
              currentCustomization?.jeans.color
            ),
          })
        );
        setColorTarget("jeans");
        break;
    }
  };

  const handleColorSelect = (color: string) => {
    if (!colorTarget || !selectedCharacterId) return;

    switch (colorTarget) {
      case "head":
        dispatch(
          setHead({
            color,
            metaData: describeCustomization("head", color),
          })
        );
        break;
      case "hair":
        dispatch(
          setHair({
            color,
            metaData: describeCustomization("hair", color),
          })
        );
        break;
      case "shirt":
        dispatch(
          setShirt({
            color,
            metaData: describeCustomization("shirt", color),
          })
        );
        break;
      case "jeans":
        dispatch(
          setJeans({
            color,
            metaData: describeCustomization("jeans", color),
          })
        );
        break;
    }
  };

  const getSelectedId = (style: string | null | undefined): number | null => {
    if (!style) return null;
    const match = style.match(/-(\d+)$/);
    return match ? parseInt(match[1], 10) : null;
  };

  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltip2, setShowTooltip2] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

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

  function handleNext() {
    setShowTooltip(false);
    setShowTooltip2(true);
  }

  function handleNextPage() {
    navigate("/customization/background-customization");
  }

  const handleGenerate = async () => {
    if (!selectedCharacters.length) {
      console.warn("No characters selected for generation.");
      return;
    }

    if (!selectedTemplate) {
      console.warn("No template selected. Please pick a template first.");
      return;
    }

    setIsGenerating(true);
    const primaryCharacter =
      selectedCharacters.find((char) => char.id === selectedCharacterId) ??
      selectedCharacters[0];

    const typeOrder: Array<"head" | "hair" | "shirt" | "jeans"> = [
      "head",
      "hair",
      "shirt",
      "jeans",
    ];

    const preparedEntries = selectedCharacters
      .map((character) => {
        const characterCustomization = customizations[character.id];
        if (!characterCustomization) {
          return null;
        }

        const entries: Array<{
          type: (typeof typeOrder)[number];
          imageUrl: string;
          color: string | null;
          metaData: string;
        }> = [];

        typeOrder.forEach((type) => {
          const option = characterCustomization[type];
          if (!option?.imageUrl) {
            return;
          }

          entries.push({
            type,
            imageUrl: option.imageUrl,
            color: option.color,
            metaData:
              option.metaData ?? describeCustomization(type, option.color),
          });
        });

        if (entries.length === 0) {
          return null;
        }

        return {
          character,
          baseImageUrl: characterCustomization.character?.png ?? character.png,
          characterName:
            (character.name && character.name.trim()) || character.title,
          customizations: entries,
        };
      })
      .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

    if (!primaryCharacter) {
      console.warn("Unable to determine the primary character.");
      setIsGenerating(false);
      return;
    }

    const entriesToUse =
      preparedEntries.length > 0
        ? preparedEntries
        : [
            {
              character: primaryCharacter,
              baseImageUrl: primaryCharacter.png,
              characterName:
                (primaryCharacter.name && primaryCharacter.name.trim()) ||
                primaryCharacter.title,
              customizations: [],
            },
          ];

    const formData = new FormData();

  // precompress list: we'll collect images to compress first and build a map
  // images will be precompressed and stored in precompressedMap

  const appendImageToFormData = async (
      key: string,
      imageUrl: string | null | undefined,
      filename: string,
      required = false
    ) => {
      if (!imageUrl) {
        if (required) {
          throw new Error(`Missing image for ${key}`);
        }
        return false;
      }

      // If we already precomputed compressed file for this imageUrl, use it


      let fetchedBlob: Blob | null = null;
  try {
        const res = await fetch(imageUrl);
        if (!res.ok) throw new Error(`Failed to fetch ${imageUrl}`);
        fetchedBlob = await res.blob();

        // Compress to webp (minimize size)
  // If precompressed file exists in batchMap, use that
  // Else compress here as a fallback
  const compressedFile = await compressBlobToWebp(fetchedBlob, filename, {
          maxSizeMB: 0.25,
          maxWidthOrHeight: 1920,
          initialQuality: 0.45,
          useWebWorker: true,
        });

        formData.append(key, compressedFile, compressedFile.name);
        return true;
  } catch (error) {
        // On compression error, fallback to sending the original (if fetched) or rethrow for required images
        if (fetchedBlob) {
          const fallbackFile = new File([fetchedBlob], filename, { type: fetchedBlob.type });
          formData.append(key, fallbackFile, filename);
          console.warn(`Compression failed for ${key}, sending original file instead.`, error);
          return true;
        }

        if (required) {
          throw error;
        }
        console.warn(`Skipping ${key}:`, error);
        return false;
      }
    };

    // Precompress all images in a batch to reduce total time and ensure uniform settings
    const precompressImages = async (items: Array<{ imageUrl: string; filename: string }>) => {
      if (!items.length) return new Map<string, File | null>();
      const results = await compressImageUrlsToWebp(items, {
        maxSizeMB: 0.25,
        maxWidthOrHeight: 1920,
        initialQuality: 0.45,
        useWebWorker: true,
      });
      const map = new Map<string, File | null>();
  results.forEach((r: { input: { imageUrl: string; filename: string }; file: File | null }) => map.set(r.input.imageUrl, r.file));
      return map;
    };

    // Build the list to precompress
    const uniqueCompressList: Array<{ imageUrl: string; filename: string }> = [];
    // primary
    uniqueCompressList.push({ imageUrl: primaryCharacter.png, filename: `character-${primaryCharacter.id}-base.png` });
    // reference template
    uniqueCompressList.push({ imageUrl: selectedTemplate?.image ?? "", filename: "selected-template.png" });
    for (let i = 0; i < entriesToUse.length; i++) {
      const entry = entriesToUse[i];
      uniqueCompressList.push({ imageUrl: entry.baseImageUrl, filename: `character-${entry.character.id}-base.png` });
      for (let j = 0; j < entry.customizations.length; j++) {
        const customizationEntry = entry.customizations[j];
        uniqueCompressList.push({ imageUrl: customizationEntry.imageUrl, filename: `character-${entry.character.id}-${customizationEntry.type}.png` });
      }
    }

    // remove falsy and dedupe by imageUrl
    const deduped = Array.from(new Map(uniqueCompressList.filter(i => i.imageUrl).map(i => [i.imageUrl, i])).values());
    const precompressedMap = await precompressImages(deduped);

    const appendFromMapOrFetch = async (key: string, imageUrl: string | null | undefined, filename: string, required = false) => {
      if (!imageUrl) {
        if (required) throw new Error(`Missing image for ${key}`);
        return false;
      }
      const preFile = precompressedMap.get(imageUrl);
      if (preFile) {
        formData.append(key, preFile, preFile.name);
        return true;
      }
      // fallback to existing function where we compress on the fly
      return appendImageToFormData(key, imageUrl, filename, required);
    };

    // Append primary image
    await appendFromMapOrFetch(
      "baseImage",
      primaryCharacter.png,
      `character-${primaryCharacter.id}-base.png`,
      true
    );

    await appendFromMapOrFetch(
      "referenceImage",
      selectedTemplate?.image,
      "selected-template.png",
      true
    );

    for (let i = 0; i < entriesToUse.length; i++) {
      const entry = entriesToUse[i];

      await appendFromMapOrFetch(
        `bundles[${i}][baseImage]`,
        entry.baseImageUrl,
        `character-${entry.character.id}-base.png`
      );

      for (let j = 0; j < entry.customizations.length; j++) {
        const customizationEntry = entry.customizations[j];
        const appended = await appendFromMapOrFetch(
          `bundles[${i}][customizations][${j}][image]`,
          customizationEntry.imageUrl,
          `character-${entry.character.id}-${customizationEntry.type}.png`
        );

        if (appended) {
          formData.append(
            `bundles[${i}][customizations][${j}][metaData]`,
            customizationEntry.metaData
          );
        }
      }
    }

    const prompt =
      "Render the final look exactly like the reference while keeping the pose and face unchanged.";

    formData.append("prompt", prompt);
    formData.append("size", "1024x1536");
    console.log("📦 Sending payload:", Array.from(formData.keys()));

    // "https://print-web-ai-api.vercel.app/edit-image/",

    try {
      const response = await fetch(
        "https://kingston.txdynamics.io/api/v1/edit-image",
        {
          method: "POST",
          headers: {
            Accept: "image/png",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP ${response.status}: ${text}`);
      }

  const blob = await response.blob();
  const dataUrl = await blobToDataUrl(blob);
  const downloadUrl = URL.createObjectURL(blob);

      const filename = `${
        primaryCharacter?.title ?? "character"
      }-${Date.now()}.png`;
      const downloadLink = document.createElement("a");
      downloadLink.href = downloadUrl;
      downloadLink.download = filename;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(downloadUrl);

      if (primaryCharacter) {
        const updatedCharacter = { ...primaryCharacter, png: dataUrl };
        dispatch(
          updateSelectedCharacterImage({
            id: updatedCharacter.id,
            png: dataUrl,
          })
        );
        dispatch(setActiveCharacter(updatedCharacter));
      }

      console.log("✅ Character updated with new image");
    } catch (error) {
      console.error("❌ API Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="">
      <header className="space-y-5">
        <BackButton />
      </header>

      <section className="flex flex-col mt-5 lg:flex-row  gap-6 items-start justify-start ">
        {isGenerating && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
              <p className="mt-4 text-center font-medium">
                Generating your character...
              </p>
            </div>
          </div>
        )}
        <div className="w-full lg:w-1/2 flex flex-col items-center gap-6 justify-center p-6 rounded-xl">
          {/* canvas editor preview */}

          <div className="w-full">
            {/* Canvas reduced by 30% height (default 600 -> 420) */}
            <CanvasEditor height={420} />
          </div>
          {/* Selected template preview shown below the canvas */}
          {selectedTemplate && (
            <div className="w-full mt-6">
              <div className="relative w-full h-56 lg:h-72 rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                <img
                  src={selectedTemplate.image}
                  alt={selectedTemplate.key || "template"}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-2 left-2 bg-white/80 px-3 py-1 rounded-md text-xs font-medium text-gray-700">
                  Selected Template
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col items-center gap-6">
          {/* selected template shown above canvas on the left side */}
          <div className="flex gap-4 flex-wrap justify-center">
            {selectedCharacters.map((item) => {
              const isSelected = selectedCharacterId === item.id;
              const isVisible = customizations[item.id]?.visibleOnCanvas;
              return (
                <div
                  key={item.id}
                  className={`cursor-pointer transition-all rounded-lg duration-200 ${
                    isSelected
                      ? "opacity-100 scale-105 ring-2 ring-secondary"
                      : "opacity-60"
                  } ${isVisible ? "ring-2 ring-next" : ""}`}
                  onClick={() => handleCharacterClick(item)}
                >
                  <div className="h-20 w-24 p-2 overflow-hidden border border-secondary rounded-lg flex items-center justify-center bg-primaryBG">
                    <img
                      src={item.png}
                      alt={item.title}
                      className="object-cover h-20"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {!isDog && (
            <div id="customizeCharacter">
              <Tabs
                tabs={["Hair", "Shirt", "jeans"]}
                activeTab={activeTab}
                onChange={(tab) => {
                  setActiveTab(tab as "Character" | "Hair" | "Shirt" | "jeans");
                  setColorTarget(null);
                }}
              />
            </div>
          )}

          <div className="w-full">
            {/* {activeTab === "Character" && selectedCharacterId !== 4 && (
              <CustomizationGrid
                options={characterHeads}
                columns={5}
                selectedId={getSelectedId(currentCustomization?.head?.style)}
                onOptionClick={handleOptionSelect}
              />
            )} */}

            {isDog && (
              <CustomizationGrid
                options={doggyStyles}
                columns={5}
                selectedId={getSelectedId(currentCustomization?.head?.style)}
                onOptionClick={handleOptionSelect}
              />
            )}
            {activeTab === "Hair" && !isDog && (
              <CustomizationGrid
                options={characterHairs}
                columns={5}
                selectedId={getSelectedId(currentCustomization?.hair?.style)}
                onOptionClick={handleOptionSelect}
              />
            )}
            {activeTab === "Shirt" && !isDog && (
              <CustomizationGrid
                options={characterTshirts}
                columns={5}
                selectedId={getSelectedId(currentCustomization?.shirt?.style)}
                onOptionClick={handleOptionSelect}
              />
            )}
            {activeTab === "jeans" && !isDog && (
              <CustomizationGrid
                options={characterJeans}
                columns={5}
                selectedId={getSelectedId(currentCustomization?.jeans?.style)}
                onOptionClick={handleOptionSelect}
              />
            )}
          </div>

          {colorTarget && !isDog && (
            <div className="w-full mt-0 flex items-center justify-center  p-4">
              {/* <h3 className="text-sm font-medium mb-3">Choose Color</h3> */}
              <div className="flex gap-2 flex-wrap">
                {colors.map((color, index) => {
                  const currentColor =
                    colorTarget === "head"
                      ? currentCustomization?.head.color
                      : colorTarget === "hair"
                      ? currentCustomization?.hair.color
                      : colorTarget === "shirt"
                      ? currentCustomization?.shirt.color
                      : currentCustomization?.jeans.color;

                  return (
                    <button
                      key={`${color}-${index}`}
                      type="button"
                      onClick={() => handleColorSelect(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-150 hover:scale-110 focus:outline-none ${
                        currentColor === color
                          ? "ring-2 ring-gray-400 scale-110"
                          : "ring-1 ring-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Color ${color}`}
                    />
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex justify-end w-full mr-16 gap-4">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? "Generating..." : "Generate"}
            </button>
            <CustomizationButtons />
          </div>
        </div>
      </section>

      {showTooltip && (
        <OnboardingTooltip
          title="Customize Characters"
          content="You can easily customize the character from this screen. Many options are available like change hair style, shirts, text and background of characters."
          step={6}
          totalSteps={10}
          targetId="customizeCharacter"
          onNext={handleNext}
          onSkip={handleSkip}
        />
      )}

      {showTooltip2 && (
        <OnboardingTooltip
          title="Next Step"
          content="When customization is complete then you can see the preview of your product bt clicking on next button and order them."
          step={7}
          totalSteps={10}
          targetId="characterList"
          onNext={handleNextPage}
          onSkip={handleSkip}
        />
      )}
    </main>
  );
};

export default CustomizationPage;

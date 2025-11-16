// pages/CustomizationPage.tsx
import { useEffect, useState, useRef } from "react";
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
import {
  setGeneratedCharacterImage,
  removeGeneratedCharacterImage,
  updateCharacterImage,
} from "../../../store/slices/characterSlice";
import type { RootState } from "../../../store";
import type { SelectedCharacter } from "../../../store/slices/characterSlice";
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
import { setCombinedTemplate } from "../../../store/slices/templateSlice";
import html2canvas from "html2canvas";
import CanvasEditor, { type CanvasEditorRef } from "../../../components/base/CanvasEditor";


const blobToDataUrl = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () =>
      reject(reader.error ?? new Error("Failed to read blob"));
    reader.readAsDataURL(blob);
  });

type ReviewModalData = {
  file: File | null;
  preview: string | null;
  usedFallback: boolean;
};

const customizationSections = [
  { key: "head", label: "Head" },
  { key: "hair", label: "Hair" },
  { key: "shirt", label: "Shirt" },
  { key: "jeans", label: "Jeans" },
] as const;

const CustomizationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedCharacters, generatedImages } = useSelector(
    (state: RootState) => state.character
  );
  const { selectedProduct } = useSelector((state: RootState) => state.product);
  const { selectedTemplate } = useSelector(
    (state: RootState) => state.template
  );
  const { customizations, activeCharacterId } = useSelector(
    (state: RootState) => state.customization
  );

  const [activeTab, setActiveTab] = useState<
    "Character" | "Hair" | "Shirt" | "jeans"
  >("Hair");

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

  const handleCharacterClick = (item: SelectedCharacter) => {
    // Always set the clicked character as active and make sure it is visible on the canvas.
    dispatch(setActiveCharacter(item));
    const isVisible = customizations[item.id]?.visibleOnCanvas;
    if (!isVisible) {
      dispatch(setCharacterVisible({ id: item.id, visible: true }));
    }
  };

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
      return;
    }
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
  }, [
    selectedCharacters,
    activeCharacterId,
    customizations,
    dispatch,
    selectedProduct,
    selectedTemplate,
    navigate,
  ]);

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
        break;
    }
  };

  const handleVisibilityToggle = (character: SelectedCharacter) => {
    const isVisible = customizations[character.id]?.visibleOnCanvas ?? false;
    if (!customizations[character.id]) {
      dispatch(setActiveCharacter(character));
    }
    dispatch(
      setCharacterVisible({ id: character.id, visible: !isVisible })
    );
  };

  const getSelectedId = (style: string | null | undefined): number | null => {
    if (!style) return null;
    const match = style.match(/-(\d+)$/);
    return match ? parseInt(match[1], 10) : null;
  };

  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltip2, setShowTooltip2] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasEditorRef = useRef<CanvasEditorRef | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewModalData, setReviewModalData] =
    useState<ReviewModalData | null>(null);

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

  async function handleNextPage() {
    if (!selectedCharacters?.length) {
      navigate("/customization/background-customization");
      return;
    }
    const primaryId = activeCharacterId ?? selectedCharacters[0]?.id;
    const primary = selectedCharacters.find((c) => c.id === primaryId);
    if (!primary) {
      navigate("/customization/background-customization");
      return;
    }

    // If there's an existing generated image for the primary character, just navigate
    if (generatedImages?.[primary.id]) {
      navigate("/customization/background-customization");
      return;
    }

    // Try to export from Konva stage first (hiding transformer), fallback to DOM capture
    let dataUrl: string | null = null;
    try {
      dataUrl = await canvasEditorRef.current?.exportAsDataURL(2, true) ?? null;
    } catch (err) {
      console.warn("Konva export failed on Next:", err);
    }

    if (!dataUrl && canvasEditorRef.current && canvasContainerRef?.current) {
      try {
        // CanvasEditor provides exportDomSnapshot that will hide transformer during capture
        dataUrl = await canvasEditorRef.current.exportDomSnapshot(canvasContainerRef.current, 2, true);
      } catch (err) {
        console.warn("exportDomSnapshot failed on Next:", err);
      }
    }

    if (dataUrl) {
      dispatch(setCombinedTemplate(dataUrl));
    }
    dispatch(setCharacterVisible({ id: primary.id, visible: true }));
    dispatch(setActiveCharacter(primary));

    navigate("/customization/background-customization");
  }

  const captureCanvasSnapshot = async (): Promise<{
    file: File;
    dataUrl: string;
  } | null> => {
    if (!canvasContainerRef?.current) return null;
    try {
      let dataUrl: string | null = null;
      try {
        dataUrl =
          (await canvasEditorRef.current?.exportDomSnapshot(
            canvasContainerRef.current,
            2,
            true
          )) ?? null;
      } catch (err) {
        console.warn("exportDomSnapshot failed, trying stage export", err);
      }
      if (!dataUrl) {
        try {
          dataUrl =
            canvasEditorRef.current?.exportAsDataURL(2, true) ?? null;
        } catch (err) {
          console.warn("exportAsDataURL failed, falling back to html2canvas", err);
        }
      }
      let blob: Blob | null = null;
      if (dataUrl) {
        const res = await fetch(dataUrl);
        blob = await res.blob();
      } else {
        const canvasSnapshot = await html2canvas(canvasContainerRef.current, {
          backgroundColor: null,
          useCORS: true,
          scale: 2,
        });
        blob = await new Promise<Blob | null>((resolve) =>
          canvasSnapshot.toBlob(resolve, "image/png")
        );
        if (blob) {
          dataUrl = await blobToDataUrl(blob);
        }
      }
      if (!blob || !dataUrl) return null;

      let compressedFile: File | null = null;
      try {
        compressedFile = await compressBlobToWebp(blob, `canvas-snapshot.png`, {
          maxSizeMB: 0.25,
          maxWidthOrHeight: 1920,
          initialQuality: 0.45,
          useWebWorker: true,
        });
      } catch (error) {
        compressedFile = new File([blob], `canvas-snapshot.png`, {
          type: blob.type,
        });
        console.warn(
          "Canvas compression failed, using original blob as file:",
          error
        );
      }
      if (!compressedFile) return null;
      return { file: compressedFile, dataUrl };
    } catch (error) {
      console.warn("Canvas snapshot failed:", error);
      return null;
    }
  };

  const handleGenerate = async () => {
    if (!selectedCharacters.length) {
      console.warn("No characters selected for generation.");
      return;
    }

    if (!selectedTemplate) {
      console.warn("No template selected. Please pick a template first.");
      return;
    }

    const snapshot = await captureCanvasSnapshot();
    if (!snapshot && !selectedTemplate?.image) {
      console.warn(
        "Unable to capture canvas snapshot and no template fallback is available."
      );
      return;
    }

    setReviewModalData({
      file: snapshot?.file ?? null,
      preview: snapshot?.dataUrl ?? selectedTemplate?.image ?? null,
      usedFallback: !snapshot,
    });
    setShowReviewModal(true);
  };

  const runCharacterGeneration = async (
    review?: ReviewModalData | null
  ) => {
    if (!selectedTemplate) return;
    setIsGenerating(true);
    setShowReviewModal(false);
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
  // no longer include selected template; we will use canvasSnapshotFile as the reference image instead
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

    let referenceFile = review?.file ?? null;
    let referencePreview = review?.preview ?? null;
    if (!referenceFile) {
      const fallbackSnapshot = await captureCanvasSnapshot();
      referenceFile = fallbackSnapshot?.file ?? null;
      referencePreview = fallbackSnapshot?.dataUrl ?? referencePreview;
    }

    if (referenceFile) {
      formData.append("referenceImage", referenceFile, referenceFile.name);
      console.log("🖼️ Reference snapshot being sent to API:", {
        name: referenceFile.name,
        size: `${(referenceFile.size / 1024).toFixed(2)} KB`,
        type: referenceFile.type,
        preview: referencePreview ?? "N/A",
        usedFallback: !review?.file,
      });
      if (import.meta.env.DEV) {
        let downloadHref = referencePreview;
        let tempObjectUrl: string | null = null;
        if (!downloadHref) {
          tempObjectUrl = URL.createObjectURL(referenceFile);
          downloadHref = tempObjectUrl;
        }
        if (downloadHref) {
          const downloadLink = document.createElement("a");
          downloadLink.href = downloadHref;
          downloadLink.download =
            referenceFile.name || "reference-image-preview.png";
          downloadLink.style.display = "none";
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        }
        if (tempObjectUrl) {
          const urlToRevoke = tempObjectUrl;
          setTimeout(() => URL.revokeObjectURL(urlToRevoke), 5000);
        }
      }
    } else {
      console.warn(
        "Falling back to selected template for reference image because snapshot could not be captured."
      );
      await appendFromMapOrFetch(
        "referenceImage",
        selectedTemplate?.image,
        "selected-template.png",
        true
      );
    }

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
        // store API result image in the generatedImages map instead of overwriting original
        dispatch(
          setGeneratedCharacterImage({
            id: primaryCharacter.id,
            png: dataUrl,
          })
        );
        // ensure the generated character is visible on the canvas and set active so the user
        // can manipulate it on the background page
        dispatch(setCharacterVisible({ id: primaryCharacter.id, visible: true }));
        dispatch(setActiveCharacter(primaryCharacter));
        dispatch(setCombinedTemplate(dataUrl));
      }

      navigate("/customization/background-customization");

      console.log("✅ Character updated with new image");
    } catch (error) {
      console.error("❌ API Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReviewConfirm = async () => {
    if (!reviewModalData) return;
    setShowReviewModal(false);
    await runCharacterGeneration(reviewModalData);
    setReviewModalData(null);
  };

  const handleReviewCancel = () => {
    setShowReviewModal(false);
    setReviewModalData(null);
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
  <div className="w-full lg:w-1/2 flex flex-col items-center gap-6 justify-center p-6 rounded-xl relative">
          {/* canvas editor preview */}

          <div ref={canvasContainerRef} className="w-full">
            {/* Canvas reduced by 30% height (default 600 -> 420) */}
            <CanvasEditor ref={canvasEditorRef} height={420} />
          </div>
          {/* Selected template preview shown below the canvas */}
          {selectedTemplate && (
            <div className="w-full mt-6">
              <div className="relative w-full h-56 lg:h-72 rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                <img
                  src={selectedTemplate.image}
                  alt={selectedTemplate.key || "template"}
                  className=" w-full h-full object-contain "
                />
                <div className="absolute top-2 left-2 bg-white/80 px-3 py-1 rounded-md text-xs font-medium text-gray-700">
                  Selected Template
                </div>
              </div>
            </div>
          )}
          {/* If there is a generated image for the active character show Accept/Reject */}
          {selectedCharacterId && generatedImages?.[selectedCharacterId] && (
            <div className="absolute top-4 right-6 z-50 flex gap-2 items-center">
              <button
                type="button"
                onClick={() => {
                  const gen = generatedImages[selectedCharacterId];
                  if (!gen) return;
                  // apply generated image to the selected character (accept)
                  dispatch(updateCharacterImage({ id: selectedCharacterId, png: gen }));
                  // remove generated override
                  dispatch(removeGeneratedCharacterImage(selectedCharacterId));
                }}
                className="px-3 py-1 bg-emerald-500 text-white rounded-md shadow-sm hover:bg-emerald-600"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => {
                  // reject generated image
                  dispatch(removeGeneratedCharacterImage(selectedCharacterId));
                }}
                className="px-3 py-1 bg-rose-500 text-white rounded-md shadow-sm hover:bg-rose-600"
              >
                Reject
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col items-center gap-6">
          <div className="flex gap-4 flex-wrap justify-center">
            {selectedCharacters.map((item) => {
              const isSelected = selectedCharacterId === item.id;
              const isVisible = customizations[item.id]?.visibleOnCanvas ?? false;
              return (
                <div
                  key={item.id}
                  className={`cursor-pointer transition-all rounded-lg duration-200 ${
                    isSelected
                      ? "opacity-100 scale-105"
                      : "opacity-60"
                  } ${
                    isVisible
                      ? "ring-2 ring-next"
                      : "ring-2 ring-dashed ring-gray-300"
                  }`}
                  onClick={() => handleCharacterClick(item)}
                >
                  <div className="relative h-20 w-24 p-2 overflow-hidden border border-secondary rounded-lg flex items-center justify-center bg-primaryBG">
                    <img
                      src={item.png}
                      alt={item.title}
                      className="object-cover h-20"
                    />
                    {generatedImages?.[item.id] && (
                      <div className="absolute top-1 right-1 bg-yellow-400 text-xs text-black rounded-full w-6 h-6 flex items-center justify-center font-semibold shadow">
                        G
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVisibilityToggle(item);
                      }}
                      className="absolute top-1 left-1 text-[10px] px-2 py-0.5 rounded-full bg-white/80 text-gray-700 shadow"
                    >
                      {isVisible ? "Hide" : "Show"}
                    </button>
                    {!isVisible && (
                      <div className="absolute inset-0 bg-white/80 text-[10px] font-semibold text-gray-600 flex items-center justify-center">
                        Hidden
                      </div>
                    )}
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

          {/* {colorTarget && !isDog && (
            <div className="w-full mt-0 flex items-center justify-center  p-4">
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
          )} */}

          <div className="flex justify-end w-full mr-16 gap-4">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? "Generating..." : "Generate"}
            </button>
            <CustomizationButtons onNext={handleNextPage} />
          </div>
        </div>
      </section>

      {showReviewModal && reviewModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full p-6 space-y-6 overflow-hidden">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Review & Confirm</h2>
              <button
                type="button"
                className="text-sm text-gray-500 hover:text-gray-700"
                onClick={handleReviewCancel}
              >
                Close
              </button>
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/2 bg-softBg rounded-xl p-4 flex items-center justify-center">
                {reviewModalData.preview ? (
                  <img
                    src={reviewModalData.preview}
                    alt="Canvas snapshot preview"
                    className="max-h-[360px] object-contain rounded-lg shadow-inner"
                  />
                ) : (
                  <p className="text-center text-gray-500">
                    No snapshot preview available.
                  </p>
                )}
              </div>
              <div className="flex-1 space-y-4 max-h-[360px] overflow-y-auto pr-2">
                {selectedCharacters.map((character) => {
                  const cust = customizations[character.id];
                  const sectionEntries = customizationSections.map((section) => {
                    const data = cust?.[section.key];
                    return { ...section, data };
                  });
                  return (
                    <div
                      key={character.id}
                      className="border border-gray-200 rounded-xl p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">
                            {character.name || character.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            Canvas: {cust?.visibleOnCanvas ? "Visible" : "Hidden"}
                          </p>
                        </div>
                        <img
                          src={character.png}
                          alt={character.title}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                      <div className="space-y-2">
                        {sectionEntries.map(({ key, label, data }) => (
                          <div
                            key={key}
                            className="flex items-center justify-between text-xs bg-gray-50 rounded-lg px-3 py-2"
                          >
                            <div className="font-semibold text-gray-700">
                              {label}
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              {data?.imageUrl && (
                                <img
                                  src={data.imageUrl}
                                  alt={`${label} preview`}
                                  className="w-8 h-8 object-contain rounded-md border"
                                />
                              )}
                              <span>
                                {data?.style ?? "Default"}
                              </span>
                              {data?.color && (
                                <span
                                  className="inline-flex items-center gap-1 text-[10px]"
                                >
                                  <span
                                    className="w-3 h-3 rounded-full border border-gray-300"
                                    style={{ backgroundColor: data.color }}
                                  />
                                  {data.color}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {reviewModalData.usedFallback && (
              <p className="text-xs text-amber-600">
                Snapshot fallback was used because the live canvas could not be captured.
              </p>
            )}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={handleReviewCancel}
              >
                Keep Editing
              </button>
              <button
                type="button"
                className="px-5 py-2 rounded-lg bg-secondary text-white hover:bg-secondary/80 disabled:opacity-50"
                onClick={handleReviewConfirm}
                disabled={isGenerating}
              >
                {isGenerating ? "Processing..." : "Confirm & Generate"}
              </button>
            </div>
          </div>
        </div>
      )}

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

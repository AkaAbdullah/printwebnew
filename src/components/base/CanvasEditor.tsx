import React, { useEffect, useRef, useState, useImperativeHandle } from "react";
import html2canvas from "html2canvas";
import { Stage, Layer, Image as KonvaImage, Transformer } from "react-konva";
import Konva from "konva";
import type { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  setCharacterPosition,
  setCharacterScale,
  setActiveCharacter,
} from "../../store/slices/customizationSlice";
import type { SelectedCharacter } from "../../store/slices/characterSlice";

// Purpose: Render selected characters on a Konva stage and allow drag/scale
export interface CanvasEditorRef {
  exportAsDataURL: (scale?: number, hideTransformer?: boolean) => string | null;
  exportDomSnapshot: (
    container: HTMLElement,
    scale?: number,
    hideTransformer?: boolean
  ) => Promise<string | null>;
  withHiddenTransformer: <T>(fn: () => Promise<T>) => Promise<T>;
}

interface CanvasEditorProps {
  editable?: boolean;
  width?: number;
  height?: number;
  imageOverrides?: Record<number, string | undefined>;
}
const CanvasEditor = React.forwardRef<CanvasEditorRef, CanvasEditorProps>(
  ({ editable = true, width = 600, height = 600, imageOverrides }, ref) => {
  const dispatch = useDispatch();
  const { selectedCharacters } = useSelector((state: RootState) => state.character);
  const { customizations, activeCharacterId } = useSelector(
    (state: RootState) => state.customization
  );

  const stageRef = useRef<Konva.Stage | null>(null);
  const layerRef = useRef<Konva.Layer | null>(null);
  const trRef = useRef<Konva.Transformer | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [images, setImages] = useState<Record<number, HTMLImageElement | null>>({});

  const detachTransformer = () => {
    const tr = trRef.current;
    if (!tr) return;
    tr.nodes([]);
    tr.getLayer()?.batchDraw();
  };

  const attachTransformerToNode = (node?: Konva.Node | null) => {
    const tr = trRef.current;
    if (!tr) return;
    let targetNode = node ?? null;
    if (!targetNode && activeCharacterId != null) {
      targetNode =
        (layerRef.current?.findOne(`#char-${activeCharacterId}`) as Konva.Node | null) ??
        null;
    }
    if (targetNode) {
      tr.nodes([targetNode]);
      tr.getLayer()?.batchDraw();
    }
  };

  useEffect(() => {
    // preload images for selected characters
    selectedCharacters.forEach((char) => {
  const img = new window.Image();
      img.crossOrigin = "anonymous";
  const src = imageOverrides?.[char.id] ?? char.png;
      img.src = src;
      img.onload = () => {
        setImages((prev) => ({ ...prev, [char.id]: img }));
        // If there's no scale initialized, set default scale so the image fits
  const cust = customizations[char.id];
          // Only set a default scale if none exists yet (null or undefined)
    if (cust?.visibleOnCanvas && (!cust || cust.scale == null || !cust.scaleNormalized)) {
            const stageWidth = width;
            const stageHeight = height;
            // Use the smaller dimension of the stage as reference and set all characters
            // to the same target size (e.g. 35% of the smaller stage dimension)
            const targetSize = Math.min(stageWidth, stageHeight) * 0.55;
            const maxDim = Math.max(img.width || 1, img.height || 1);
            let scale = targetSize / maxDim;
            // Avoid weird values: enforce a small positive number
            if (!isFinite(scale) || scale <= 0) scale = 0.5;
            // Cap the up-scale to avoid pixelation
            const MAX_SCALE = 1.5;
            if (scale > MAX_SCALE) scale = MAX_SCALE;
            dispatch(setCharacterScale({ id: char.id, scale }));
          }
  // ensure position exists
  if (cust?.visibleOnCanvas && !cust?.position) {
          const index = selectedCharacters.findIndex((c) => c.id === char.id);
          const stageWidth = width;
          const stageHeight = height;
          const gap = 120;
          const centerX = stageWidth / 2;
          const baseX = centerX + (index - Math.floor(selectedCharacters.length / 2)) * gap;
          const baseY = Math.round(stageHeight / 2);
          dispatch(setCharacterPosition({ id: char.id, x: baseX, y: baseY }));
        }
      };
      img.onerror = () => setImages((prev) => ({ ...prev, [char.id]: null }));
    });
  }, [selectedCharacters, customizations, dispatch, width, height, imageOverrides]);

  useEffect(() => {
    // attach transformer to active shape
    if (activeCharacterId == null) {
      detachTransformer();
      return;
    }
    if (!images[activeCharacterId]) return;
    attachTransformerToNode();
  }, [activeCharacterId, images]);

  useEffect(() => {
    if (!editable) return;
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const target = event.target as Node | null;
      if (target && !container.contains(target)) {
        detachTransformer();
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [editable]);

  const handleDragEnd = (id: number, e: Konva.KonvaEventObject<DragEvent>) => {
    const x = e.target.x();
    const y = e.target.y();
    dispatch(setCharacterPosition({ id, x, y }));
  };

  useImperativeHandle(ref, () => ({
    exportAsDataURL: (scale = 2, hideTransformer = true) => {
      try {
        const stage = stageRef.current;
        const tr = trRef.current;
        if (!stage) return null;
  let oldNodes: Konva.Node[] | null = null;
        if (hideTransformer && tr) {
          oldNodes = tr.nodes() as Konva.Node[];
          tr.nodes([]);
          tr.getLayer()?.batchDraw();
        }
        const data = stage.toDataURL({ pixelRatio: scale });
        if (hideTransformer && tr) {
          tr.nodes(oldNodes || []);
          tr.getLayer()?.batchDraw();
        }
        return data;
      } catch (err) {
        console.error("CanvasEditor: exportAsDataURL failed:", err);
        return null;
      }
    },
    exportDomSnapshot: async (container, scale = 2, hideTransformer = true) => {
      try {
        const tr = trRef.current;
  let oldNodes: Konva.Node[] | null = null;
        if (hideTransformer && tr) {
          oldNodes = tr.nodes() as Konva.Node[];
          tr.nodes([]);
          tr.getLayer()?.batchDraw();
        }
        const canvas = await html2canvas(container, {
          backgroundColor: null,
          useCORS: true,
          scale,
        });
        const data = canvas.toDataURL("image/png");
        if (hideTransformer && tr) {
          tr.nodes(oldNodes || []);
          tr.getLayer()?.batchDraw();
        }
        return data;
      } catch (err) {
        console.error("CanvasEditor: exportDomSnapshot failed:", err);
        return null;
      }
    },
    withHiddenTransformer: async <T,>(fn: () => Promise<T>) => {
      const tr = trRef.current;
  let oldNodes: Konva.Node[] | null = null;
      if (tr) {
        oldNodes = tr.nodes() as Konva.Node[];
        tr.nodes([]);
        tr.getLayer()?.batchDraw();
      }
      try {
        return await fn();
      } finally {
        if (tr) {
          tr.nodes(oldNodes || []);
          tr.getLayer()?.batchDraw();
        }
      }
    },
  }));

  // transform handled via Transformer onTransformEnd, so no local handler

  const handleStagePointerDown = (
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    if (!editable) return;
    const target = e.target;
    const stage = stageRef.current;
    if (!stage) return;
    if (target === stage || target?.getType?.() === "Layer") {
      detachTransformer();
    }
  };

  return (
  <div
      ref={containerRef}
      className="w-full h-full border border-gray-700 rounded-lg overflow-hidden"
    >
      <Stage
        width={width}
        height={height}
        ref={stageRef}
        onMouseDown={handleStagePointerDown}
        onTouchStart={handleStagePointerDown}
      >
        <Layer ref={layerRef}>
          {selectedCharacters.map((char: SelectedCharacter) => {
            const cust = customizations[char.id];
            // Only render if the character has been added to the canvas explicitly
            if (!cust?.visibleOnCanvas) return null;
            const img = images[char.id];
            const pos = cust?.position ?? { x: 250, y: 250 };
            const scale = cust?.scale ?? 1;
            return img ? (
              <React.Fragment key={char.id}>
          <KonvaImage
                  id={`char-${char.id}`}
                  image={img}
                  x={pos.x}
                  y={pos.y}
            draggable={editable}
                  onDragEnd={(e) => handleDragEnd(char.id, e)}
            onClick={(e) => {
              if (!editable) return;
              dispatch(setActiveCharacter(char));
              attachTransformerToNode(e.target);
            }}
            onTap={(e) => {
              if (!editable) return;
              dispatch(setActiveCharacter(char));
              attachTransformerToNode(e.target);
            }}
                  scaleX={scale}
                  scaleY={scale}
                  offset={{ x: img.width / 2, y: img.height / 2 }}
                />
              </React.Fragment>
            ) : null;
          })}
          {editable && (
            <Transformer
            ref={trRef}
            rotateEnabled={false}
            enabledAnchors={["top-left", "top-right", "bottom-left", "bottom-right"]}
            boundBoxFunc={(_oldBox, newBox) => newBox}
            onTransformEnd={() => {
              const node = trRef.current?.nodes()[0];
              if (!node) return;
              const idStr = node?.id();
              if (!idStr) return;
              const id = parseInt(idStr.replace("char-", ""), 10);
              const scale = node.scaleX();
              // update redux
              dispatch(setCharacterScale({ id, scale }));
            }}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
  }
);

export default CanvasEditor;

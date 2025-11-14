import React, { useEffect, useRef, useState } from "react";
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
interface CanvasEditorProps {
  editable?: boolean;
  width?: number;
  height?: number;
}

const CanvasEditor: React.FC<CanvasEditorProps> = ({ editable = true, width = 600, height = 600 }) => {
  const dispatch = useDispatch();
  const { selectedCharacters } = useSelector((state: RootState) => state.character);
  const { customizations, activeCharacterId } = useSelector(
    (state: RootState) => state.customization
  );

  const stageRef = useRef<Konva.Stage | null>(null);
  const layerRef = useRef<Konva.Layer | null>(null);
  const trRef = useRef<Konva.Transformer | null>(null);

  const [images, setImages] = useState<Record<number, HTMLImageElement | null>>({});

  useEffect(() => {
    // preload images for selected characters
    selectedCharacters.forEach((char) => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = char.png;
      img.onload = () => {
        setImages((prev) => ({ ...prev, [char.id]: img }));
        // If there's no scale initialized, set default scale so the image fits
  const cust = customizations[char.id];
          // Only set a default scale if none exists yet (null or undefined)
    if (cust?.visibleOnCanvas && (!cust || cust.scale == null || !cust.scaleNormalized)) {
            const stageWidth = width;
            const stageHeight = height;
            // Use the smaller dimension of the stage as reference and set all characters
            // to the same target size (e.g. 20% of the smaller stage dimension)
            const targetSize = Math.min(stageWidth, stageHeight) * 0.2;
            const maxDim = Math.max(img.width || 1, img.height || 1);
            let scale = targetSize / maxDim;
            // Avoid weird values: enforce a small positive number
            if (!isFinite(scale) || scale <= 0) scale = 0.5;
            // Cap the up-scale to avoid pixelation
            const MAX_SCALE = 1.2;
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
  }, [selectedCharacters, customizations, dispatch]);

  useEffect(() => {
    // attach transformer to active shape
    const stage = stageRef.current;
    const tr = trRef.current;
    if (!stage || !tr) return;
    const layer = layerRef.current;
    if (!layer) return;
    const selectedNode = layer.findOne(`#char-${activeCharacterId}`);
    if (selectedNode) {
      tr.nodes([selectedNode]);
      tr.getLayer()?.batchDraw();
    } else {
      tr.nodes([]);
      tr.getLayer()?.batchDraw();
    }
  }, [activeCharacterId, images]);

  const handleDragEnd = (id: number, e: Konva.KonvaEventObject<DragEvent>) => {
    const x = e.target.x();
    const y = e.target.y();
    dispatch(setCharacterPosition({ id, x, y }));
  };

  // transform handled via Transformer onTransformEnd, so no local handler

  return (
  <div className="w-full h-full border border-gray-700 rounded-lg overflow-hidden">
      <Stage width={width} height={height} ref={stageRef}>
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
            onClick={() => editable && dispatch(setActiveCharacter(char))}
            onTap={() => editable && dispatch(setActiveCharacter(char))}
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
};

export default CanvasEditor;

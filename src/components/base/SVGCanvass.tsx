import { Stage, Layer, Image as KonvaImage, Transformer } from "react-konva";
import { useEffect, useRef, useState } from "react";

interface SVGCanvasProps {
  url: string;
  width?: number;
  height?: number;
}

const SVGCanvas = ({ url, width = 400, height = 500 }: SVGCanvasProps) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [selected, setSelected] = useState(true);
  const imageRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (url) {
      const img = new window.Image();
      img.src = url;
      img.crossOrigin = "anonymous";
      img.onload = () => setImage(img);
    }
  }, [url]);

  useEffect(() => {
    if (trRef.current && imageRef.current && selected) {
      trRef.current.nodes([imageRef.current]);
      trRef.current.getLayer().batchDraw();
    } else if (trRef.current) {
      trRef.current.nodes([]);
      trRef.current.getLayer().batchDraw();
    }
  }, [selected, image]);

  const handleStageClick = (e: any) => {
    if (e.target === e.target.getStage()) {
      setSelected(false);
    }
  };

  const getFitSize = () => {
    if (!image) return {};

    const containerPadding = 40;
    const maxWidth = width - containerPadding;
    const maxHeight = height - containerPadding;

    const naturalWidth = image.naturalWidth;
    const naturalHeight = image.naturalHeight;

    const scale = Math.min(
      maxWidth / naturalWidth,
      maxHeight / naturalHeight,
      1
    );

    const fittedWidth = naturalWidth * scale;
    const fittedHeight = naturalHeight * scale;

    const x = (width - fittedWidth) / 2;
    const y = (height - fittedHeight) / 5;

    return { x, y, width: fittedWidth, height: fittedHeight };
  };

  const { x, y, width: fittedWidth, height: fittedHeight } = getFitSize();

  return (
    <Stage
      width={width}
      height={height}
      onMouseDown={handleStageClick}
      onTouchStart={handleStageClick}
    >
      <Layer>
        {image && fittedWidth && fittedHeight && (
          <>
            <KonvaImage
              image={image}
              ref={imageRef}
              x={x}
              y={y}
              width={fittedWidth}
              height={fittedHeight}
              draggable
              onClick={(e) => {
                e.cancelBubble = true;
                setSelected(true);
              }}
              onTap={(e) => {
                e.cancelBubble = true;
                setSelected(true);
              }}
            />
            <Transformer ref={trRef} />
          </>
        )}
      </Layer>
    </Stage>
  );
};

export default SVGCanvas;

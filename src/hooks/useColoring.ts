import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { RefObject } from 'react';

export const useColoring = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const imageURL = useSelector((state: RootState) => state.image.imageURL);
  const color = useSelector((state: RootState) => state.coloringTools.color);
  const tool = useSelector((state: RootState) => state.coloringTools.tool);
  const brushSize = useSelector(
    (state: RootState) => state.coloringTools.brushSize,
  );
  const canvas = canvasRef.current;

  const loadImage = () => {
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = imageURL;
    image.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  };

  const startPainting = (e: MouseEvent | TouchEvent) => {
    const coordinates = getCoordinates(e);
    if (coordinates) {
      paint(coordinates.x, coordinates.y);
    }
  };

  const paint = (x: number, y: number) => {
    // if (!isPainting) return;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.globalCompositeOperation =
      tool === 'eraser' ? 'destination-out' : 'source-over';

    context.beginPath();
    context.arc(x, y, brushSize / 2, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
  };

  const getCoordinates = (event: MouseEvent | TouchEvent) => {
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();

    const point = 'touches' in event ? event.touches[0] : event;
    return {
      x: point.clientX - rect.left,
      y: point.clientY - rect.top,
    };
  };

  return { getCoordinates, startPainting, paint, loadImage };
};

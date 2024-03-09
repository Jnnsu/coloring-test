import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import NextImage from 'next/image';
import { ColoringToolbar } from '@/components/Coloring/ColoringToolbar';
import { useColoring } from '@/hooks/useColoring';

export const ColoringArea = () => {
  const [isPainting, setIsPainting] = useState(false);
  const imageURL = useSelector((state: RootState) => state.image.imageURL);
  const color = useSelector((state: RootState) => state.coloringTools.color);
  const tool = useSelector((state: RootState) => state.coloringTools.tool);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { getCoordinates, startPainting, paint, loadImage } =
    useColoring(canvasRef);

  const handleStart = (e: MouseEvent | TouchEvent) => {
    const coordinates = getCoordinates(e);
    if (coordinates) {
      setIsPainting(true);
      startPainting(e);
    }
  };

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!isPainting) return;
    const coordinates = getCoordinates(e);
    if (coordinates) {
      paint(coordinates.x, coordinates.y);
    }
  };

  useEffect(() => {
    loadImage();
  }, [imageURL]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 마우스 이벤트
    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', () => setIsPainting(false));
    canvas.addEventListener('mouseleave', () => setIsPainting(false));

    // 터치 이벤트
    canvas.addEventListener('touchstart', handleStart);
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    canvas.addEventListener('touchend', () => setIsPainting(false));

    return () => {
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseup', () => setIsPainting(false));
      canvas.removeEventListener('mouseleave', () => setIsPainting(false));
      canvas.removeEventListener('touchstart', handleStart);
      canvas.removeEventListener('touchmove', handleMove);
      canvas.removeEventListener('touchend', () => setIsPainting(false));
    };
  }, [isPainting, color, tool]);

  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (canvas && canvas.parentElement) {
        const { width, height } = canvas.parentElement.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
      }
    };

    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize(); // 초기 로딩시에도 캔버스 사이즈 업데이트

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []); // 의존성 배열을 비워서 컴포넌트 마운트 시에만 실행되도록 함

  return (
    <>
      <div className={styles.coloringArea}>
        {imageURL ? (
          <div className={styles.canvasBox}>
            <NextImage
              className={styles.image}
              src={imageURL}
              fill
              objectFit="cover"
              alt="도안 이미지"
            />
            <canvas
              className={styles.canvas}
              ref={canvasRef}
              width={1024}
              height={1024}
            />
          </div>
        ) : (
          <p>생성된 이미지가 없습니다.</p>
        )}
      </div>
      <ColoringToolbar canvasRef={canvasRef} loadImage={() => loadImage()} />
    </>
  );
};

import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import styles from '@/styles/coloring.module.css';
import NextImage from 'next/image';
import { ColoringToolbar } from '@/components/ColoringToolbar';

const Coloring = () => {
  const imageURL = useSelector((state: RootState) => state.image.imageUrl);
  const color = useSelector((state: RootState) => state.coloringTools.color);
  const tool = useSelector((state: RootState) => state.coloringTools.tool);
  const brushSize = useSelector(
    (state: RootState) => state.coloringTools.brushSize,
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState(false);

  useEffect(() => {
    loadImage();
  }, [imageURL]);

  const loadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = imageURL;
    image.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height); // 이미지를 다시 그리기 전에 캔버스를 클리어
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  };

  const startPainting = (e: MouseEvent | TouchEvent) => {
    const coordinates = getCoordinates(e);
    if (coordinates) {
      setIsPainting(true);
      paint(coordinates.x, coordinates.y);
    }
  };

  const paint = (x: number, y: number) => {
    if (!isPainting) return;
    const canvas = canvasRef.current;
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

  // const stopPainting = () => {
  //   setIsPainting(false);
  // };

  const getCoordinates = (event: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();

    const point = 'touches' in event ? event.touches[0] : event;
    return {
      x: point.clientX - rect.left,
      y: point.clientY - rect.top,
    };
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isPainting) {
      const coordinates = getCoordinates(event);
      if (coordinates) {
        paint(coordinates.x, coordinates.y);
      }
    }
  };

  const handleTouchMove = (event: TouchEvent) => {
    event.preventDefault();
    if (isPainting) {
      const coordinates = getCoordinates(event);
      if (coordinates) {
        paint(coordinates.x, coordinates.y);
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 마우스 이벤트
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', () => setIsPainting(false));
    canvas.addEventListener('mouseleave', () => setIsPainting(false));

    // 터치 이벤트
    canvas.addEventListener('touchstart', startPainting);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', () => setIsPainting(false));

    return () => {
      canvas.removeEventListener('mousedown', startPainting);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', () => setIsPainting(false));
      canvas.removeEventListener('mouseleave', () => setIsPainting(false));
      canvas.removeEventListener('touchstart', startPainting);
      canvas.removeEventListener('touchmove', handleTouchMove);
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
    <div className={styles.background}>
      <div className={styles.canvasBox}>
        <div className={styles.imageContainer}>
          {imageURL ? (
            <div className={styles.imagebox}>
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
      </div>
      <ColoringToolbar canvasRef={canvasRef} loadImage={() => loadImage()} />
    </div>
  );
};

export default Coloring;

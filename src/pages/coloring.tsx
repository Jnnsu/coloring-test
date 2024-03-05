import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import styles from '@/styles/coloring.module.css';
import NextImage from 'next/image';
import { MAX_COLORS } from '@/constants/color';

const Coloring = () => {
  const imageURL = useSelector((state: RootState) => state.image.imageUrl);
  const [color, setColor] = useState('#ffffff');
  const [savedColors, setSavedColors] = useState<string[]>([]);
  const [tool, setTool] = useState('brush');
  const [brushSize, setBrushSize] = useState(10);
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

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    loadImage();
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

  const stopPainting = () => {
    setIsPainting(false);
  };

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

  const handleBrushSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBrushSize(Number(e.target.value));
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const handleColorSelect = (e: React.FocusEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    if (!savedColors.includes(newColor)) {
      if (savedColors.length >= MAX_COLORS) {
        setSavedColors((prev) => [newColor, ...prev.slice(0, -1)]);
      } else {
        setSavedColors((prev) => [newColor, ...prev]);
      }
    }
  };

  const handleSavedColorClick = (selectedColor: string) => {
    setColor(selectedColor);
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
    event.preventDefault(); // 스크롤 방지
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
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false }); // passive 옵션을 false로 설정하여 preventDefault 호출 가능
    canvas.addEventListener('touchend', () => setIsPainting(false));

    return () => {
      // 이벤트 리스너 해제
      canvas.removeEventListener('mousedown', startPainting);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', () => setIsPainting(false));
      canvas.removeEventListener('mouseleave', () => setIsPainting(false));
      canvas.removeEventListener('touchstart', startPainting);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', () => setIsPainting(false));
    };
  }, [isPainting, color, tool]);

  return (
    <div className={styles.background}>
      <div className={styles.article}>
        <div className={styles.imageContainer}>
          {imageURL ? (
            <div className={styles.canvasBox}>
              <NextImage
                src={imageURL}
                fill
                objectFit="cover"
                alt="도안 이미지"
                className={styles.image}
              />
              <canvas
                ref={canvasRef}
                width={1024}
                height={1024}
                className={styles.canvas}
              />
            </div>
          ) : (
            <p>생성된 이미지가 없습니다.</p>
          )}
        </div>
        <div className={styles.palette}>
          <button onClick={clearCanvas} className={styles.clearButton}>
            CLEAR
          </button>
          <div className={styles.brushs}>
            <button
              onClick={() => setTool('brush')}
              type="button"
              className={`${styles.brush} ${tool === 'brush' ? styles.brushSelected : ''}`}
            >
              <NextImage
                width={45}
                height={45}
                src="/images/brush1.png"
                alt="브러쉬 아이콘"
              />
            </button>
            <button
              onClick={() => setTool('eraser')}
              type="button"
              className={`${styles.brush} ${tool === 'eraser' ? styles.brushSelected : ''}`}
            >
              <NextImage
                width={40}
                height={40}
                src="/images/eraser1.png"
                alt="지우개 아이콘"
              />
            </button>
          </div>
          <div className={styles.brushSize}>
            <div
              className={styles.brushSizeIndicator}
              style={{
                width: '100%',
                height: '100%',
                maxWidth: '50px',
                maxHeight: '50px',
                borderRadius: '50%',

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: `${brushSize}px`,
                  height: `${brushSize}px`,
                  borderRadius: '50%',
                  backgroundColor: '#373740',
                  position: 'absolute',
                }}
              ></div>
            </div>

            <input
              type="range"
              min="1"
              max="50"
              value={brushSize}
              onChange={handleBrushSizeChange}
            />
            {tool === 'brush' ? (
              <span>브러시 크기: {brushSize}</span>
            ) : (
              <span>지우개 크기: {brushSize}</span>
            )}
          </div>

          <input
            className={styles.nowColor}
            type="color"
            value={color}
            onChange={handleColorChange}
            onBlur={handleColorSelect}
            disabled={tool === 'eraser'}
          />

          <div className={styles.savedColors}>
            {Array.from({ length: MAX_COLORS }).map((_, index) => {
              const color = savedColors[index];
              return (
                <button
                  className={styles.savedColor}
                  key={index}
                  onClick={() => color && handleSavedColorClick(color)}
                  title={
                    color ? `색상 사용: ${color}` : '사용 가능한 색상 없음'
                  }
                  style={{
                    backgroundColor: color || 'rgba(0, 0, 0, 0.1)',
                    width: '40px',
                    height: '40px',
                    margin: '2px',
                    border: color ? 'none' : '1px solid #ccc',
                  }}
                ></button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coloring;

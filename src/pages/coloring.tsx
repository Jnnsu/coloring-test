import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import styles from '@/styles/coloring.module.css';
import NextImage from 'next/image';

const Coloring = () => {
  const imageURL = useSelector((state: RootState) => state.image.imageUrl);
  const [color, setColor] = useState('#ffffff');
  const [tool, setTool] = useState('brush');
  const [brushSize, setBrushSize] = useState(10);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const image = new Image();
    image.src = imageURL;
    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }, [imageURL]);

  const startPainting = (e: MouseEvent) => {
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

  const getCoordinates = (e: MouseEvent) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleBrushSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBrushSize(Number(e.target.value));
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // 캔버스의 데이터를 이미지로 변환
    const imageDataUrl = canvas.toDataURL('image/png');

    // 생성된 데이터 URL을 이용하여 사용자가 이미지를 다운로드할 수 있게 함
    const link = document.createElement('a');
    link.href = imageDataUrl;
    link.download = 'my-drawing.png'; // 다운로드될 파일의 이름
    link.click(); // 가상의 링크 클릭 이벤트를 발생시켜 파일 다운로드
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isPainting) {
        const coordinates = getCoordinates(e);
        if (coordinates) {
          paint(coordinates.x, coordinates.y);
        }
      }
    };

    canvas.addEventListener('mousedown', startPainting as EventListener);
    canvas.addEventListener('mousemove', handleMouseMove as EventListener);
    canvas.addEventListener('mouseup', stopPainting as EventListener);
    canvas.addEventListener('mouseleave', stopPainting as EventListener);

    return () => {
      canvas.removeEventListener('mousedown', startPainting as EventListener);
      canvas.removeEventListener('mousemove', handleMouseMove as EventListener);
      canvas.removeEventListener('mouseup', stopPainting as EventListener);
      canvas.removeEventListener('mouseleave', stopPainting as EventListener);
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
                width={1024}
                height={1024}
                alt="도안 이미지"
                className={styles.image}
              />
              <canvas
                ref={canvasRef}
                width={1024}
                height={1024}
                style={{ width: '100%', height: 'auto' }}
                className={styles.canvas}
              />
            </div>
          ) : (
            <p>생성된 이미지가 없습니다.</p>
          )}
        </div>
        <div>
          <button onClick={() => setTool('brush')}>브러시</button>
          <button onClick={() => setTool('eraser')}>지우개</button>
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={handleBrushSizeChange}
          />{' '}
          브러시 크기: {brushSize}
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            disabled={tool === 'eraser'}
          />
          <button onClick={saveDrawing}>그림 저장하기</button>
        </div>
      </div>
    </div>
  );
};

export default Coloring;

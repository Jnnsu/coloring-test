import { RefObject, useState } from 'react';
import styles from './styles.module.css';
import { BrushSettingArea } from '@/components/ColoringToolbar/BrushSettingArea';
import { ColorPalette } from '@/components/ColoringToolbar/ColorPalette';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

interface Props {
  canvasRef: RefObject<HTMLCanvasElement>;
  loadImage: () => void;
}

export const ColoringToolbar = ({ canvasRef, loadImage }: Props) => {
  const tool = useSelector((state: RootState) => state.coloringTools.tool);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    loadImage();
  };

  return (
    <div className={styles.coloringToolBar}>
      <button onClick={clearCanvas} className={styles.clearButton}>
        CLEAR
      </button>
      <BrushSettingArea />
      <ColorPalette />
    </div>
  );
};

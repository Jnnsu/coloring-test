import { ChangeEvent, useState } from 'react';
import { MAX_COLORS } from '@/constants/color';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { setColor } from '@/features/coloringToolSlice'; //
import styles from './styles.module.css';

export const ColorPalette = () => {
  const color = useSelector((state: RootState) => state.coloringTools.color);
  const tool = useSelector((state: RootState) => state.coloringTools.tool);
  const [savedColors, setSavedColors] = useState<string[]>([]);
  const dispatch = useDispatch();

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setColor(e.target.value));
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
    dispatch(setColor(selectedColor));
  };

  return (
    <>
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
              title={color ? `색상 사용: ${color}` : '사용 가능한 색상 없음'}
              style={{
                backgroundColor: color || 'rgba(0, 0, 0, 0.1)',
                border: color ? 'none' : '1px solid #ccc',
              }}
            ></button>
          );
        })}
      </div>
    </>
  );
};

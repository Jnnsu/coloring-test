import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { setTool, setBrushSize } from '@/features/coloringToolSlice';
import NextImage from 'next/image';
import styles from './styles.module.css';

export const BrushSettingArea = () => {
  const tool = useSelector((state: RootState) => state.coloringTools.tool);
  const brushSize = useSelector(
    (state: RootState) => state.coloringTools.brushSize,
  );
  const dispatch = useDispatch();

  const handleBrushSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setBrushSize(Number(e.target.value)));
  };

  return (
    <div className={styles.background}>
      <div className={styles.brushs}>
        <div
          className={`${styles.brush} ${tool === 'brush' ? styles.brushSelected : ''}`}
        >
          <button
            onClick={() => dispatch(setTool('brush'))}
            type="button"
            className={styles.brushTool}
          >
            <NextImage fill src="/images/brush1.png" alt="브러쉬 아이콘" />
          </button>
        </div>
        <div
          className={`${styles.brush} ${tool === 'eraser' ? styles.brushSelected : ''}`}
        >
          <button
            onClick={() => dispatch(setTool('eraser'))}
            type="button"
            className={styles.brushTool}
          >
            <NextImage fill src="/images/eraser1.png" alt="지우개 아이콘" />
          </button>
        </div>
      </div>

      <div className={styles.brushSize}>
        <div className={styles.indicatorBox}>
          <div className={styles.brushSizeIndicator}>
            <div
              style={{
                width: `${brushSize / 10}rem`,
                height: `${brushSize / 10}rem`,
              }}
            ></div>
          </div>
        </div>
        <div className={styles.brushSizeRange}>
          <input
            className={styles.range}
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={handleBrushSizeChange}
          />
          <span>{brushSize}</span>
        </div>
      </div>
    </div>
  );
};

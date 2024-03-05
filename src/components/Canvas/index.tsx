// import { useState } from 'react';
// import axios from 'axios';

// function Canvas() {
//   const canvas = document.getElementById('canvas');
//   const ctx = canvas.getContext('2d');

//   // 검은색 테두리로 사각형 그리기
//   ctx.beginPath();
//   ctx.rect(50, 50, 300, 300);
//   ctx.stroke();

//   canvas.addEventListener('click', function (e) {
//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     floodFill(ctx, x, y, [0, 0, 0, 255]); // 검은색으로 채우기
//   });

//   function floodFill(ctx, x, y, fillColor) {
//     // 현재 픽셀의 색상을 가져온다.
//     const targetColor = ctx.getImageData(x, y, 1, 1).data;
//     const targetColorStr = `rgba(${targetColor[0]},${targetColor[1]},${targetColor[2]},${targetColor[3] / 255})`;

//     // 채우려는 색상이 현재 픽셀 색상과 같으면 아무 것도 하지 않는다.
//     if (fillColor === targetColorStr) return;

//     // 색상 채우기 실행
//     fillPixel(ctx, x, y, targetColor, fillColor);
//   }

//   function matchStartColor(data, pos, startColor) {
//     return (
//       data[pos] === startColor[0] &&
//       data[pos + 1] === startColor[1] &&
//       data[pos + 2] === startColor[2] &&
//       data[pos + 3] === startColor[3]
//     );
//   }

//   function colorPixel(data, pos, fillColor) {
//     data[pos] = fillColor[0];
//     data[pos + 1] = fillColor[1];
//     data[pos + 2] = fillColor[2];
//     data[pos + 3] = fillColor[3];
//   }

//   function fillPixel(ctx, startX, startY, startColor, fillColor) {
//     const canvasWidth = ctx.canvas.width;
//     const canvasHeight = ctx.canvas.height;
//     const pixelStack = [[startX, startY]];
//     const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
//     const data = imageData.data;
//     const fillColorRgba = fillColor.match(/\d+/g).map(Number);

//     while (pixelStack.length) {
//       const newPos = pixelStack.pop();
//       const x = newPos[0];
//       let y = newPos[1];
//       let pixelPos = (y * canvasWidth + x) * 4;
//       while (y-- >= 0 && matchStartColor(data, pixelPos, startColor)) {
//         pixelPos -= canvasWidth * 4;
//       }
//       pixelPos += canvasWidth * 4;
//       ++y;
//       let reachLeft = false;
//       let reachRight = false;
//       while (
//         y++ < canvasHeight - 1 &&
//         matchStartColor(data, pixelPos, startColor)
//       ) {
//         colorPixel(data, pixelPos, fillColorRgba);

//         if (x > 0) {
//           if (matchStartColor(data, pixelPos - 4, startColor)) {
//             if (!reachLeft) {
//               pixelStack.push([x - 1, y]);
//               reachLeft = true;
//             }
//           } else if (reachLeft) {
//             reachLeft = false;
//           }
//         }

//         if (x < canvasWidth - 1) {
//           if (matchStartColor(data, pixelPos + 4, startColor)) {
//             if (!reachRight) {
//               pixelStack.push([x + 1, y]);
//               reachRight = true;
//             }
//           } else if (reachRight) {
//             reachRight = false;
//           }
//         }

//         pixelPos += canvasWidth * 4;
//       }
//     }

//     ctx.putImageData(imageData, 0, 0);
//   }

//   return (
//     <div>
//       <canvas id="canvas" width="400" height="400"></canvas>
//     </div>
//   );
// }

// export default Canvas;

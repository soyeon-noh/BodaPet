import React, { useState } from "react";
import { useEffect, useRef } from "react";
import useAnalysisStore from "../zustand/AnalysisStore";

// clientX, clientY canvas 범위안에 있는 좌표값

export const DragCanvas = () => {
  const { draw, setDraw, coordinate, setCoordinate } = useAnalysisStore();

  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState();
  // 좌표값
  const [pos, setPos] = useState();
  // 마우스의 클릭와 놨을때 값
  const [isDraw, setIsDraw] = useState();

  // const [coordinate, setCoordinate] = useState({
  //   startX: "",
  //   startY: "",
  //   endX: "",
  //   endY: "",
  // });

  const drawStart = (e) => {
    setIsDraw(true);
    // console.log("e.x", e.clientX - canvasRef.current.offsetLeft);
    // console.log("e.y", e.clientY - canvasRef.current.offsetTop);
    const startX = e.clientX - canvasRef.current.offsetLeft;
    const startY = e.clientY - canvasRef.current.offsetTop;
    setPos([startX, startY]);

    // 시작 x
    // console.log("startX : ", startX);
    // 시작 y
    // console.log("startY : ", startY);

    setCoordinate("startX", startX);
    setCoordinate("startY", startY);
  };

  const drawSquare = (e) => {
    if (!isDraw) return;
    ctx.strokeStyle = draw;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    // ctx.strokeRect(0, 0, 50, 50);
    let x = e.clientX - canvasRef.current.offsetLeft;
    let y = e.clientY - canvasRef.current.offsetTop;
    // console.log("x", x);
    // console.log("y", y);
    // strokeRect(x, y, width, height)
    ctx.strokeRect(pos[0], pos[1], x - pos[0], y - pos[1]);
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    // console.log("canvas", canvas);
    setCtx(canvas.getContext("2d"));
  }, []);

  const drawEnd = (e) => {
    setIsDraw(false);

    const endX = e.clientX - canvasRef.current.offsetLeft;
    const endY = e.clientY - canvasRef.current.offsetTop;
    // console.log("endX", endX);
    // console.log("endY", endY);
    setCoordinate("endX", endX);
    setCoordinate("endY", endY);
    console.log("좌표", coordinate);
  };

  return (
    <>
      {draw ? (
        <canvas
          className="absolute"
          ref={canvasRef}
          width={320}
          height={180}
          onMouseDown={drawStart}
          onMouseMove={drawSquare}
          onMouseUp={drawEnd}
        ></canvas>
      ) : (
        <canvas
          className="absolute"
          ref={canvasRef}
          width={320}
          height={180}
        ></canvas>
      )}
    </>
  );
};

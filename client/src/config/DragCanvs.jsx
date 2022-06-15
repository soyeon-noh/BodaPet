import React, { useState } from "react";
import { useEffect, useRef } from "react";
// import "./App.css";

// export const canvasStore = create((set) => ({
//   ctx: "",
//   setCtx: () => set((state) => ({})),
// }));

// clientX, clientY canvas 범위안에 있는 좌표값

export const DragCanvas = () => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState();
  // 좌표값
  const [pos, setPos] = useState();
  // 마우스의 클릭와 놨을때 값
  const [isDraw, setIsDraw] = useState();

  const drawStart = (e) => {
    setIsDraw(true);
    // console.log("e.x", e.clientX - canvasRef.current.offsetLeft);
    // console.log("e.y", e.clientY - canvasRef.current.offsetTop);
    setPos([
      e.clientX - canvasRef.current.offsetLeft,
      e.clientY - canvasRef.current.offsetTop,
    ]);
    // 시작 x
    console.log("x start : ", e.clientX - canvasRef.current.offsetLeft);
    // 시작 y
    console.log("y start : ", e.clientY - canvasRef.current.offsetTop);
  };

  const drawSquare = (e) => {
    if (!isDraw) return;
    ctx.strokeStyle = "red";
    // ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
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
    console.log("canvas", canvas);
    setCtx(canvas.getContext("2d"));
  }, []);
  const drawEnd = (e) => {
    setIsDraw(false);

    const endX = e.clientX - canvasRef.current.offsetLeft;
    const endY = e.clientY - canvasRef.current.offsetTop;
    console.log("endX", endX);
    console.log("endY", endY);
  };

  // 배경넣기
  // const canvas = document.querySelector(.canvas);

  // let backImg = new Image();
  // backImg.src = "../static/image/rectangle.png";
  // context.drawImage(backImg, 0, 0, 500, 500);

  return (
    <canvas
      className="canvas"
      ref={canvasRef}
      width={320}
      height={180}
      onMouseDown={drawStart}
      onMouseMove={drawSquare}
      onMouseUp={drawEnd}
      // style="background: url('../static/image/rectangle.png')"
    ></canvas>
  );
};

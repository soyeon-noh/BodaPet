import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const navigate = useNavigate();

  const goPrevious = () => {
    navigate("/analysis3");
  };

  const goNext = () => {
    navigate("/analysis5");
  };

  return (
    <section>
      <div class="bg-main py-2 ">
        <div class="max-w-sm mx-auto">
          <div class="flex justify-between items-end text-left pt-10">
            <h1 class="mx-3 text-3xl  text-sky-600 text-opacity-80">3.26.토</h1>
            <div class="flex items-end">
              <h1 class="text-gray-800">오늘의 </h1>
              <h1 class="mx-3 text-xl text-gray-800">감자🐶</h1>
            </div>
            {/* <h4 class="mx-3">강아지의 분석결과</h4> */}
          </div>
        </div>
      </div>

      <div class="max-w-xs mx-auto py-6">
        <h1 class="text-xl mb-3 text-gray-800">활동량</h1>
        <div class="shadow-md p-7 mb-5 text-center">
          <div>
            <div>오늘 총 40분 움직였어요! 🥰</div>
            <div>(시간당 10분)</div>
          </div>
        </div>
        <h1 class="text-xl mb-3 text-gray-800">영역감지</h1>
        <div class="shadow-md p-7 mb-5 text-center">
          <div>
            <span class="mr-20">물그릇 영역</span>
            <span>총 4회</span>
          </div>
          <div>
            <span class="mr-20">밥그릇 영역</span>
            <span>총 2회</span>
          </div>
          <div>
            <span class="mr-20">화장실 영역</span>
            <span>총 1회</span>
          </div>
        </div>
        <h1 class="text-xl mb-3 text-gray-800">히트맵</h1>
        <div class="shadow-md p-7 mb-5 text-center">
          <img></img>
        </div>
      </div>
    </section>
  );
};

export default Report;

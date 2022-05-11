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
          <div class="text-left pt-4">
            <h3 class="inline-block mx-3 text-2xl font-extrabold text-md">
              3.26.토 <br />
            </h3>
          </div>
        </div>
      </div>
      <nav class="max-w-sm mx-auto">
        <ul class="flex">
          <li class="flex-1 mr-2">
            <a
              class="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white"
              href="#"
            >
              분석 리포트
            </a>
          </li>
          <li class="flex-1 mr-2">
            <a
              class="text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
              href="#"
            >
              영상 클립
            </a>
          </li>
        </ul>
      </nav>
      <div class="max-w-xs mx-auto py-6">
        <h3 class="text-2xl font-extrabold text-md mb-3">활동량</h3>
        <div class="shadow-md p-7 mb-5 text-center">
          <div>
            <span>오늘 총 40분 움직였어요 (시간당 10분)</span>
          </div>
        </div>
        <h3 class="text-2xl font-extrabold text-md mb-3">영역감지</h3>
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
      </div>
    </section>
  );
};

export default Report;

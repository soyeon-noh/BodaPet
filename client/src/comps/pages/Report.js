import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useReportStore from "../../zustand/ReportStore";

const Report = () => {
  const navigate = useNavigate();

  const goPrevious = () => {
    navigate("/analysis3");
  };

  const goNext = () => {
    navigate("/analysis5");
  };

  const { report, setReport } = useReportStore();

  const moveTimeList = report.move_time.map((data) => {
    let keys = Object.keys(data);
    return (
      <div class="shadow-md p-7 mb-5 text-center">
        <h1>{keys[0]}</h1>
        <div>
          <div>오늘 총 {data}초 움직였어요! 🥰</div>
        </div>
      </div>
    );
  });

  const visitTimeList = () => {
    const visitTime = report.visit_time;
    let petName = Object.keys(visitTime);

    for (let i = 0; i < petName.length; i++) {
      let areaName = Object.keys(visitTime.petName);
      for (let j = 0; j < areaName.length; j++) {
        return (
          <div class="shadow-md p-7 mb-5 text-center">
            <h1>{petName[i]}</h1>
            <div>
              <span class="mr-20">{visitTime.petName[i].areaName[j]}</span>
              <span>총 {visitTime.petName[i].areaName[j][0]}초</span>
              <span>총 {visitTime.petName[i].areaName[j][1]}회</span>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <section>
      <div class="bg-main py-2 ">
        <div class="max-w-sm mx-auto">
          <div class="flex justify-between items-end text-left pt-10">
            <h1 class="mx-3 text-3xl  text-sky-600 text-opacity-80">
              {report.date}
            </h1>
            <div class="flex items-end">
              <h1 class="text-gray-800">오늘의 </h1>
              <h1 class="mx-3 text-xl text-gray-800">리포트</h1>
            </div>
            {/* <h4 class="mx-3">강아지의 분석결과</h4> */}
          </div>
        </div>
      </div>

      <div class="max-w-xs mx-auto py-6">
        <h1 class="text-xl mb-3 text-gray-800">활동량</h1>
        {moveTimeList}
        {/* <div class="shadow-md p-7 mb-5 text-center">
          <div>
            <div>오늘 총 40분 움직였어요! 🥰</div>
            <div>(시간당 10분)</div>
          </div>
        </div> */}
        <h1 class="text-xl mb-3 text-gray-800">영역감지</h1>
        <visitTimeList />
        {/* <div class="shadow-md p-7 mb-5 text-center">
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
        </div> */}
        <h1 class="text-xl mb-3 text-gray-800">히트맵</h1>
        <div class="shadow-md p-7 mb-5 text-center">
          <img width={320} src={`${report.heatmap}`}></img>
        </div>
        <h1 class="text-xl mb-3 text-gray-800">이동경로</h1>
        <div class="shadow-md p-7 mb-5 text-center">
          <img width={320} src={`${report.scatter}`}></img>
        </div>
      </div>
    </section>
  );
};

export default Report;

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


  const moveTimeList = report.move_time.map((data, index) => {
    // console.log("data",data);
    return (
      <div key={index} class="shadow-md p-7 mb-5 text-center">
        <h1 class="text-left text-blue-300">{data[0]}</h1>
        <div>
          <div>오늘 총 {data[1]}초 움직였어요! 🥰</div>
        </div>
      </div>
    );

  });



  const visitTimeList = report.visit_time.map((data, index) => {
    console.log(data)

    
    const areaList = data.area.map((mapData,index)=>{
      return(     
        <div >
          <span class=" text-left mr-14">{mapData.name}</span>
          <span>총 {mapData.value[0]}초</span>
          <span class="ml-3">총 {mapData.value[1]}회</span>
      </div>)
    })
    return(          
    <div class="shadow-md p-7 mb-5 text-left">
      <h1 class="text-left text-blue-300">{data.name}</h1>
      <div class="flex ml-6 flex-col">
        {areaList}
        {/* <div >
          <span class=" text-left mr-14">{data.area[0].name}</span>
          <span>총 {data.area[0].value[0]}초</span>
          <span class="ml-3">총 {data.area[0].value[1]}회</span>
        </div> */}
        {/* <div>
          <span class="text-left mr-14">{data.area[1].name}</span>
          <span>총 {data.area[1].value[0]}초</span>
          <span class="ml-3">총 {data.area[1].value[1]}회</span>
        </div> */}
      </div>
    </div>)
  

  });

  return (
    <section>
      <div class="bg-main py-2 ">
        <div class="max-w-sm mx-auto">
          <div class="flex justify-between items-end text-left pt-10">
            <h1 class="mx-3 text-3xl  text-sky-500 text-opacity-80">
              {report.date}
            </h1>
            <div class="flex items-end">
              <h1 class="text-gray-800">오늘의 </h1>
              <h1 class="mx-3 text-xl text-gray-800">리포트</h1>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-xs mx-auto py-6">
        <h1 class="text-xl mb-3 text-gray-800">활동량</h1>
        {moveTimeList}

        <h1 class="text-xl mb-3 text-gray-800">영역감지</h1>
        {visitTimeList}

        <h1 class="text-xl mb-3 text-gray-800">히트맵</h1>

        <div class="shadow-md p-1 mb-5 text-center">
          <img width={320} src={`http://localhost:5050/${report.heatmap}`}></img>
        </div>
        <h1 class="text-xl mb-3 text-gray-800">이동 경로</h1>
        <div class="shadow-md p-1 mb-5 text-center">
          <img width={320} src={`http://localhost:5050/${report.scatter}`}></img>
        </div>
      </div>
    </section>
  );
};

export default Report;

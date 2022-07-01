import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useReportStore from "../../zustand/ReportStore";

const Report = () => {
  const navigate = useNavigate();

  const { report, setReport, setReportId, reportTimeList } = useReportStore();

  const moveReportPage = async (e) => {
    const id = e.target.id;

    const res = await fetch(`http://localhost:5050/report/id/${id}`);
    const resJson = await res.json();
    console.log("report가 잘 넘어오나 ", resJson);
    await setReport(resJson);
    navigate("/report2");
  };

  const timeListBox = reportTimeList.map((report) => {
    return (
      <div
        key={report.id}
        id={report.id}
        onClick={(e) => {
          moveReportPage(e);
        }}
        class="my-2 bg-sky-100 text-gray-600 rounded-lg h-16 w-full flex items-center justify-center  mx-2 border border-solid border-sky-300 hover:bg-sky-200 cursor-pointer"
      >
        {report.time}
      </div>
    );
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

      <div class="max-w-xs mx-auto py-6">{timeListBox}</div>
    </section>
  );
};

export default Report;

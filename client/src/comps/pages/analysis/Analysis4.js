import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import rectangle from "../../../static/image/rectangle.png";

import {
  faCircle,
  faCircleCheck,
  faTrashCan,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAnalysisStore from "../../../zustand/AnalysisStore";

import { DragCanvas } from "../../../config/DragCanvs.jsx";

const Analysis4 = () => {
  const navigate = useNavigate();
  const {
    areaList,
    setAreaList,
    setFilteredAreaList,
    analysis,
    setAnalysis,
    onChangeHandler,
  } = useAnalysisStore();

  const goPrevious = () => {
    navigate("/analysis3");
  };

  const goNext = () => {
    navigate("/report");
  };

  const onClickDelete = (id) => {
    let filtered = areaList.filter((element) => element !== id);
  };

  const showAreaList = areaList.map((data) => {
    if (data.checked) {
      return (
        <div class="felx flex-col justify-between">
          <div class="inline-block">
            <FontAwesomeIcon icon={faCircleCheck} color={data.color} />
          </div>
          <div class="inline-block text-left ml-5 mr-7 w-2/5">{data.name}</div>
          <div
            class="inline-block cursor-pointer"
            onClick={() => onClickDelete(data.id)}
          >
            <FontAwesomeIcon icon={faTrashCan} color="#909090" />
          </div>
        </div>
      );
    } else {
      return (
        <div class="felx flex-col justify-between my-2">
          <div class="inline-block">
            <FontAwesomeIcon icon={faCircle} color={data.color} />
          </div>
          <div class="inline-block text-left ml-5 mr-7 w-2/5">{data.name}</div>
          <div
            class="inline-block cursor-pointer"
            onClick={() => onClickDelete(data.id)}
          >
            <FontAwesomeIcon icon={faPenToSquare} color={data.color} />
          </div>
        </div>
      );
    }
  });

  const analysisInsert = async () => {
    const analysisRes = await fetch(`http://localhost:5050/analysis`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(analysis),
    });
    // 수정필요
    alert("analysis 등록완료");
    goNext();
  };

  return (
    <section>
      <div class="bg-main py-6 ">
        <div class="max-w-sm mx-auto">
          <div class="text-left pt-14">
            <h3 class="inline-block mx-3 text-2xl font-extrabold text-md">
              영역을
              <br />
              영상 위에 그려주세요
            </h3>
          </div>
        </div>
      </div>
      <div class="max-w-xs mx-auto py-6">
        <DragCanvas />
        <img
          class="max-w-xs mx-auto py-6 block ml-auto"
          src={rectangle}
          width="320" // 최대로보이는 숫자넣음 수정필요
        />
        <div class="shadow-lg p-7 mb-2 text-center">{showAreaList}</div>
      </div>
      <div class="flex justify-between max-w-xs mx-auto">
        <button
          onClick={() => goPrevious()}
          class="block w-24 bg-grey-100 hover:bg-grey-500 font-bold py-2 px-4 border rounded"
        >
          이전
        </button>
        <button
          onClick={() => analysisInsert()}
          class=" block w-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          결과 보기
        </button>
      </div>
    </section>
  );
};

export default Analysis4;

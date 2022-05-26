import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faFileVideo } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAnalysisStore from "../../../zustand/AnalysisStore";

const Analysis1 = () => {
  const navigate = useNavigate();

  const goNext = () => {
    navigate("/analysis2");
  };

  const { analysis, setAnalysis } = useAnalysisStore();

  console.log("analysis1 상태 확인", analysis);

  return (
    <section>
      <div class="bg-main py-6 ">
        <div class="max-w-sm mx-auto">
          <div class="text-left pt-14">
            <h3 class="inline-block mx-3 text-2xl font-extrabold text-md">
              영상을
              <br />
              선택해주세요
            </h3>
          </div>
        </div>
      </div>
      <div class="max-w-xs mx-auto py-6">
        <label
          htmlFor="inputVideo"
          class="block shadow-lg p-20 mb-2 bg-gray-100 text-center hover:bg-gray-200 cursor-pointer"
        >
          <div class="inline-block mx-auto mb-6">
            <FontAwesomeIcon icon={faFileVideo} size={"4x"} color="#909090" />
          </div>
          <h3 class="text-sm">영상을 선택해주세요.</h3>
        </label>
        <input id="inputVideo" type="file" accept="video/*" class="hidden" />
      </div>
      <div class="max-w-xs mx-auto">
        <button
          onClick={() => goNext()}
          class="block w-24 ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          다음
        </button>
      </div>
    </section>
  );
};

export default Analysis1;

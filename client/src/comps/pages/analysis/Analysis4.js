import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import rectangle from "../../../static/image/rectangle.png";

import { faCircle, faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAnalysisStore from "../../../zustand/AnalysisStore";

import { DragCanvas } from "../../../config/DragCanvs.jsx";
import Loading from "../Loading";

const Analysis4 = () => {
  const navigate = useNavigate();
  const {
    areaList,
    analysis,
    setAnalysis,
    setAnalysisArea,
    resetAnalysis,
    setDraw,
    coordinate,
    resetCoordinate,
    correct,
    incorrect,
  } = useAnalysisStore();

  const goPrevious = () => {
    setAnalysis("area", "");
    areaList.map((data) => (data.state = ""));

    navigate("/analysis3");
  };

  const goNext = () => {
    navigate("/report");
  };

  const processCoordinate = (name) => {
    const width = Math.abs(coordinate.endX - coordinate.startX);
    const height = Math.abs(coordinate.endY - coordinate.startY);
    const pCoordinate = [
      0,
      0,
      coordinate.startX * 6,
      coordinate.startY * 6,
      width * 6,
      height * 6,
    ];
    setAnalysisArea(name, pCoordinate);

    // 그리기지 않고 저장하기 방지 (coordinate값 리셋)
    resetCoordinate();

    // console.log(pCoordinate);
  };

  const drawStart = (data, index) => {
    if (areaList.filter((e) => e.state == "draw").length) {
      return;
    }
    setDraw(data.color);
    areaList[index].state = "draw";
  };

  const drawEnd = (data, index) => {
    // 그리기지 않고 저장하기 방지 (coordinate값 검사)
    if (!coordinate) {
      return;
    }
    setDraw("");
    areaList[index].state = "complet";
    processCoordinate(data.name);
    console.log("analysis", analysis);
    console.log("areaList", areaList);
  };

  const reDraw = (data, index) => {
    if (areaList.filter((e) => e.state == "draw").length) {
      return;
    }
    setDraw(data.color);
    areaList[index].state = "draw";
  };

  const showAreaList = areaList.map((data, index) => {
    if (data.state == "") {
      return (
        <div key={data.id} class="felx flex-col justify-between my-2">
          <div class="inline-block">
            <FontAwesomeIcon icon={faCircle} color={data.color} />
          </div>
          <div class="inline-block text-left ml-5 mr-4 w-2/5">{data.name}</div>
          <button
            onClick={() => drawStart(data, index)}
            class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 w-24 border border-gray-400 rounded shadow"
          >
            그리기
          </button>
        </div>
      );
    } else if (data.state == "draw") {
      return (
        <div key={data.id} class="felx flex-col justify-between my-2">
          <div class="inline-block">
            <FontAwesomeIcon icon={faCircle} color={data.color} />
          </div>
          <div class="inline-block text-left ml-5 mr-4 w-2/5">{data.name}</div>

          <button
            onClick={() => drawEnd(data, index)}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 w-24 border border-blue-500 rounded shadow"
          >
            저장하기
          </button>
        </div>
      );
    } else if (data.state == "complet") {
      return (
        <div key={data.id} class="felx flex-col justify-between my-2">
          <div class="inline-block">
            <FontAwesomeIcon icon={faCircleCheck} color="gray" />
          </div>
          <div class="inline-block text-left ml-5 mr-4 w-2/5 text-gray-400">
            {data.name}
          </div>

          <button
            onClick={() => reDraw(data, index)}
            class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-1 w-24 border border-gray-400 rounded shadow"
          >
            다시그리기
          </button>
        </div>
      );
    }
  });

  const [loading, setLoading] = useState(false);

  const analysisInsert = async () => {
    setLoading(true);
    if (areaList.length != Object.keys(analysis.area).length) {
      return;
    }
    const analysisRes = await fetch(`http://localhost:5050/analysis`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(analysis),
    });

    if (analysisRes.status === 404) {
      alert("영상분석에 실패했습니다. 다시 시도해주세요.");
      setLoading(false);
      return;
    }

    if (analysisRes.status === 200) {
      const res = await analysisRes.json();
 
      console.log("프론트에 넘어온 json", res);
   

      if (res) {
        console.log(res);
        // console.log(jsonRes.heatmap);
        // console.log(jsonRes.scatter);
        // console.log(jsonRes.move_time);
        // console.log(jsonRes.move_time.kka.move_time);
        // console.log(jsonRes.visit_time);
        // console.log(jsonRes.visit_time.kka.eat);
        // console.log(jsonRes.visit_time.kka.eat[0]);
        setLoading(false);
        resetAnalysis();
        alert("영상분석 결과 등록완료");
        navigate("/mypage")
      }
    }
  };

  return (
    <section>
      {loading ? <Loading /> : null}

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
          // src={`http://localhost:5050/thumbnails/4812_img.png`}
          src={`http://localhost:5050/${analysis.thumbnailPath}`}
          alt="thumbnail image"
          width="320"
        />
        <div class="shadow-lg p-7 mb-2 text-center">
          {showAreaList}
          {areaList.length == Object.keys(analysis.area).length ? (
            <span style={correct}>모든 영역을 그렸습니다.</span>
          ) : (
            <span style={incorrect}>모든 영역을 그려주세요.</span>
          )}
        </div>
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
          결과보기
        </button>
      </div>
    </section>
  );
};

export default Analysis4;

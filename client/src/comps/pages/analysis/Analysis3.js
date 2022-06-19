import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import rectangle from "../../../static/image/rectangle.png";

import {
  faCircle,
  faCircleCheck,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAnalysisStore from "../../../zustand/AnalysisStore";
import Loading from "../Loading";

const Analysis3 = () => {
  const navigate = useNavigate();

  const { analysis, areaList, setAreaList, setFilteredAreaList } =
    useAnalysisStore();

  const goPrevious = () => {
    navigate("/analysis2");
  };

  const goNext = () => {
    if (areaList.length < 1) return;

    navigate("/analysis4");
  };
  const incorrect = { color: "red", fontSize: "small" };

  const [area, setArea] = useState({ name: "" });

  const settingArea = (e) => {
    const { name, value } = e.target;

    setArea({ [name]: value });
    console.log("settingArea", area);
  };

  // const getRandomColor = () => {
  //   return "#" + Math.floor(Math.random() * 16777215).toString(16);
  // };

  const getRandomColor = () => {
    let letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  };

  const insertArea = () => {
    // 배열에 아무것도 없을 경우 기본값을 0으로 만들어서 id가 1부터 시작하도록 함
    let lastAreaId = 0;
    // 배열에 1개이상 담겨있을 경우 마지막에 담긴 요소의 id를 추출해 +1 한다.
    if (areaList.length > 0) {
      lastAreaId = areaList[areaList.length - 1].id;
    }

    if (area.name) {
      const areaInfo = {
        id: lastAreaId + 1,
        name: area.name,
        color: getRandomColor(),
        state: "",
      };

      setAreaList(areaInfo);

      setArea("");
    }
  };

  const onClickDelete = (id) => {
    let filtered = areaList.filter((element) => element.id !== id);
    setFilteredAreaList(filtered);
  };

  const showAreaList = areaList.map((data) => {
    return (
      <div key={data.id} class="felx flex-col justify-between">
        <div class="inline-block">
          <FontAwesomeIcon icon={faCircle} color={data.color} />
        </div>
        <div class="inline-block text-left ml-5 mr-7 w-2/5">{data.name}</div>
        <div
          class="inline-block cursor-pointer"
          onClick={() => onClickDelete(data.id)}
        >
          <FontAwesomeIcon icon={faTrashCan} color="gray" />
        </div>
      </div>
    );
  });

  return (
    <section>
      <div class="bg-main py-6 ">
        <div class="max-w-sm mx-auto">
          <div class="text-left pt-14">
            <h3 class="inline-block mx-3 text-2xl font-extrabold text-md">
              영역을
              <br />
              추가해주세요
            </h3>
          </div>
        </div>
      </div>
      <div class="max-w-xs mx-auto py-6">
        <img
          src={`http://localhost:5050/${analysis.thumbnailPath}`}
          alt="thumbnail image"
          width="320" // 최대로보이는 숫자넣음 수정필요
        />
        <div class="shadow-lg p-7 mb-2 text-center">
          {showAreaList}
          <div class="felx flex-col mt-8">
            <input
              name="name"
              type="text"
              value={area.name || ""}
              placeholder="영역 이름"
              class="shadow appearance-none w-3/5 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={settingArea}
            />
            <button
              class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-3 border border-gray-400 rounded shadow"
              onClick={() => insertArea()}
            >
              추가
            </button>
          </div>
          {area.name ? (
            <></>
          ) : (
            <span style={incorrect}>추가할 영역 이름을 작성해주세요.</span>
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
          onClick={() => goNext()}
          class="block w-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          다음
        </button>
      </div>
    </section>
  );
};

export default Analysis3;

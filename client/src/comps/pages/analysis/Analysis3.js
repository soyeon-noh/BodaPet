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

const Analysis3 = () => {
  const navigate = useNavigate();

  const { areaList, setAreaList, setFilteredAreaList } = useAnalysisStore();

  const goPrevious = () => {
    navigate("/analysis2");
  };

  const goNext = () => {
    navigate("/analysis4");
  };

  const color = ["red", "orange", "green", "blue", "purple"];

  const [area, setArea] = useState({ name: "" });

  const settingArea = (e) => {
    const { name, value } = e.target;

    setArea({ [name]: value });
    console.log("settingArea", area);
  };

  const insertArea = () => {
    const areaInfo = {
      id: areaList.length + 1,
      name: area.name,
      color: color.at(areaList.length + 1),
    };

    setAreaList(areaInfo);

    setArea("");
  };

  const onClickDelete = (id) => {
    let filtered = areaList.filter((element) => element.id !== id);
    setFilteredAreaList(filtered);
  };

  const showAreaList = areaList.map((data) => {
    if (data.checked) {
      return (
        <div>
          <FontAwesomeIcon icon={faCircleCheck} color={data.color} />
          <span class="inline-bolck ml-5 mr-20">{data.name}</span>
          <FontAwesomeIcon
            onClick={() => onClickDelete(data.id)}
            icon={faTrashCan}
            color={data.color}
          />
        </div>
      );
    } else {
      return (
        <div class="felx flex-col justify-between">
          <div class="inline-block">
            <FontAwesomeIcon icon={faCircle} color={data.color} />
          </div>
          <div class="inline-block text-left ml-5 mr-7 w-2/5">{data.name}</div>
          <div
            class="inline-block cursor-pointer"
            onClick={() => onClickDelete(data.id)}
          >
            <FontAwesomeIcon icon={faTrashCan} color={data.color} />
          </div>
        </div>
      );
    }
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
          class="max-w-xs mx-auto py-6 block ml-auto"
          src={rectangle}
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

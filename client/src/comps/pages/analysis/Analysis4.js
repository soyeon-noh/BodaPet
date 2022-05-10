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

const Analysis4 = () => {
  const navigate = useNavigate();

  const goPrevious = () => {
    navigate("/analysis3");
  };

  const goNext = () => {
    navigate("/report");
  };

  const [dataList, setDataList] = useState([
    {
      id: 1,
      name: "물그릇 영역",
      color: "blue",
      checked: false,
    },
    {
      id: 2,
      name: "밥그릇 영역",
      color: "orange",
      checked: false,
    },
    {
      id: 3,
      name: "화장실 영역",
      color: "green",
      checked: false,
    },
  ]);

  const onClickDelete = (id) => {
    let filtered = dataList.filter((element) => element !== id);
  };

  const showAreaList = dataList.map((data) => {
    if (data.checked) {
      return (
        <div>
          <FontAwesomeIcon icon={faCircleCheck} color={data.color} />
          <span class="inline-bolck ml-5 mr-20">{data.name}</span>
          <FontAwesomeIcon icon={faPenToSquare} />
          <FontAwesomeIcon icon={faTrashCan} />
        </div>
      );
    } else {
      return (
        <div>
          <FontAwesomeIcon icon={faCircle} color={data.color} />
          <span class="inline-bolck ml-5 mr-20">{data.name}</span>
          <FontAwesomeIcon icon={faPenToSquare} />
          <FontAwesomeIcon icon={faTrashCan} />
        </div>
      );
    }
  });

  return (
    <section>
      <div class="bg-main py-6 ">
        <div class="max-w-sm mx-auto">
          <div class="text-left pt-14">
            <h3 class="text-2xl font-extrabold text-md">
              영역을
              <br />
              영상 위에 그려주세요
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
          onClick={() => goNext()}
          class="animate-bounce block w-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          결과 보기
        </button>
      </div>
    </section>
  );
};

export default Analysis4;

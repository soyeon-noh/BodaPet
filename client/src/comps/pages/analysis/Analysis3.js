import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import rectangle from "../../../static/image/rectangle.png";

import {
  faCircle,
  faCircleCheck,
  faTrashCan,
  faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Analysis3 = () => {
  const navigate = useNavigate();

  const goPrevious = () => {
    navigate("/analysis2");
  };

  const goNext = () => {
    navigate("/analysis4");
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
    console.log("아이디 들어옴?", id);
    let filtered = dataList.filter((element) => element !== id);
  };

  const showAreaList = dataList.map((data) => {
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
      console.log("미야옹", data.color);
      return (
        <div>
          <FontAwesomeIcon icon={faCircle} color={data.color} />
          <span class="inline-bolck ml-5 mr-20">{data.name}</span>
          <FontAwesomeIcon
            onClick={() => onClickDelete}
            icon={faTrashCan}
            color={data.color}
          />
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
          class="block w-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          다음
        </button>
      </div>
    </section>
  );
};

export default Analysis3;

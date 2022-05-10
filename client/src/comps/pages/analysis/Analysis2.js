import React from "react";
import { useNavigate } from "react-router-dom";
import rectangle from "../../../static/image/rectangle.png";

import { faClock, faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Analysis2 = () => {
  const navigate = useNavigate();

  const goPrevious = () => {
    navigate("/analysis1");
  };

  const goNext = () => {
    navigate("/analysis3");
  };
  return (
    <section>
      <div class="bg-main py-6 ">
        <div class="max-w-sm mx-auto">
          <div class="text-left pt-14">
            <h3 class="text-2xl font-extrabold text-md">
              촬영일시를
              <br />
              선택해주세요
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
          <div>
            <label class="inline-block ml-0 mr-auto">
              {/* <FontAwesomeIcon icon={faCalendar} color="#909090" /> */}
            </label>
            <input type="date" name="date" class="inline-block w-25" />
          </div>
          <div>
            <label class="inline-block w-25">
              {/* <FontAwesomeIcon icon={faClock} color="#909090" /> */}
            </label>
            <input type="time" name="time" class="inline-block w-25" />
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

export default Analysis2;

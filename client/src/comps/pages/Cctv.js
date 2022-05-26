import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import "../../static/css/Fontawesome.css";

const Cctv = () => {
  return (
    <section>
      <div class="bg-main py-full ">
        <div class="max-w-sm mx-auto">
          <div
            class="text-center pt-14 flex flex-col
        "
          >
            <FontAwesomeIcon
              icon={faComments}
              size="4x"
              // className="text-red-300"
              className="faComments"
            />
            <h3 class="inline-block mx-3 my-5 text-2xl font-extrabold text-md">
              아직 준비중인 페이지 입니다.
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cctv;

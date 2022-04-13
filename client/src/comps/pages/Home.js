import React from "react";
import banner from "../../static/image/banner2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Home = () => {
  return (
    <section>
      <div class="bg-main py-6 ">
        <div class="max-w-xs mx-auto">
          <div class="text-left ">
            <h1 class="text-4xl">BODAPET</h1>
            <h3 class="text-sm">똑똑한 우리집 반려동물 AI CCTV</h3>
          </div>
          <div class="text-right ">
            <img class="block ml-auto" src={banner} width="200" />
          </div>
        </div>
      </div>
      <div class="max-w-xs mx-auto py-6 flex flex-col">
        <div class="shadow-md px-6 py-5 mb-2 hover:bg-main cursor-pointer">
          <h1 class="text-2xl my-3">CCTV</h1>
          <FontAwesomeIcon icon="fa-regular fa-camera-cctv" />
          <h3 class="text-sm">
            웹캠을 통해 실시간으로
            <br />
            반려동물을 지켜볼 수 있어요.
          </h3>
        </div>
        <div class="shadow-md px-6 py-5 hover:bg-main cursor-pointer">
          <h1 class="text-2xl my-3">영상분석</h1>
          <h3 class="text-sm">
            미리 촬영해둔 영상을 업로드해
            <br />
            필요한 정보를 분석해요.
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Home;

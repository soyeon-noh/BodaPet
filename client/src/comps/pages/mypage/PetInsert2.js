import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  faFileVideo,
  faCheckCircle,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePetStore from "../../../zustand/PetStore";
import useUserStore from "../../../zustand/UserStore";
import Loading from "../Loading";

const PetInsert2 = () => {
  const { pet, setPet, onChangeHandler, resetPet } = usePetStore();
  const { loginUser } = useUserStore();

  const refName = useRef();
  const incorrect = { color: "red", fontSize: "small", marginLeft: "8px" };

  const navigate = useNavigate();

  const [videoFile, setVideoFile] = useState(false);

  const [loading, setLoading] = useState(false);

  const [check, setCheck] = useState(false);

  const videoFetch = async () => {
    // 영상 데이터 가져오기
    const videoData = document.getElementById("inputVideo").files[0];

    setVideoFile(videoData.name);

    // formData 객체에 append
    const formData = new FormData();
    formData.append("file", videoData);
    formData.append("name", pet.name);

    setLoading(true);

    // 비디오 저장 fetch
    const videoRes = await fetch(`http://localhost:5050/mypage/video`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    if (videoRes.status === 404) {
      alert("동영상 등록에 실패했습니다.");
      return;
    }
    if (videoRes.status === 413) {
      alert("영상이 너무 커서 등록에 실패했습니다.");
      return;
    }

    // 비디오 저장 경로를 response해주고 그걸 pet state에 저장
    if (videoRes.status === 200) {
      const jsonRes = await videoRes.json();

      setPet("videoPath", jsonRes.videoPath);

      // 유저를 왜 여기서 설정해야 삽입이 되는걸까. petInsert함수에서 사용하는 법 찾아보기.
      setPet("userId", loginUser.userId);

      if (jsonRes.success) {
        setLoading(false);
      }
    }
  };

  const petInsert = async () => {
    if (pet.name.length < 1 || pet.name.length > 9) {
      refName.current.focus();
      return;
    }
    if (pet.videoPath.length < 1) {
      alert("영상을 등록해주세요.");
      return;
    }

    console.log("펫체크 : ", pet);

    // pet 정보 DB insert fetch
    const petRes = await fetch(`http://localhost:5050/mypage/pet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pet),
    });
    if (petRes.status === 404) {
      alert("반려동물 등록에 실패했습니다.");
      return;
    }
    alert(`${pet.name} 이 등록되었습니다.`);

    resetPet();
    navigate(`/petList`);
  };
  return (
    <section>
      {loading ? <Loading /> : null}
      <div class="bg-main py-6 ">
        <div class="max-w-sm mx-auto">
          <div class="text-left pt-14">
            <h3 class="inline-block mx-3 text-2xl font-extrabold text-md">
              반려동물 등록
            </h3>
          </div>
        </div>
      </div>
      <div class="max-w-xs mx-auto py-6">
        <div class="max-w-xs mx-auto py-2">
          <label class="block my-1">이름을 알려주세요</label>

          {check ? (
            <input
              name="name"
              type="text"
              disabled
              class="block bg-gray-100 w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm  sm:text-sm "
            />
          ) : (
            <input
              name="name"
              type="text"
              class="block bg-gray-100 w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm focus:bg-white"
              onChange={onChangeHandler}
            />
          )}

          {pet.name.length < 1 ? (
            <span style={incorrect}>반려동물 이름을 입력해주세요</span>
          ) : (
            <></>
          )}
        </div>
        {check ? null : (
          <div class="max-w-xs mx-auto">
            <button
              onClick={() => setCheck(true)}
              class="block w-24 ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              다음
            </button>
          </div>
        )}
      </div>
      {check ? (
        <>
          <div>
            <div class="max-w-xs mx-auto pb-8">
              <label class="block my-1">영상을 등록해주세요</label>

              {pet.videoPath ? (
                <label
                  htmlFor="inputVideo"
                  class="block border border-slate-300 rounded-md shadow-md p-20 mb-2 bg-sky-100 text-center hover:bg-sky-200 cursor-pointer"
                >
                  <div class="inline-block mx-auto mb-6">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      size={"4x"}
                      color="#76c8ff"
                    />
                  </div>
                  <h3 class="text-sm text-gray-600">{videoFile}</h3>
                  <h3 class="text-sm text-sky-600">영상이 등록되었습니다.</h3>
                </label>
              ) : (
                <label
                  htmlFor="inputVideo"
                  class="block border border-slate-300 rounded-md shadow-md p-20 mb-2 bg-gray-100 text-center hover:bg-gray-200 cursor-pointer"
                >
                  <div class="inline-block mx-auto mb-6">
                    <FontAwesomeIcon
                      icon={faFileVideo}
                      size={"4x"}
                      color="#909090"
                    />
                  </div>
                  <h3 class="text-sm text-gray-600">
                    보다 정확한 AI 를 위해
                    <br />
                    20 ~ 30초 정도의 <br />
                    반려동물 영상이 필요해요.
                  </h3>
                </label>
              )}

              <input
                id="inputVideo"
                name="file"
                type="file"
                accept="video/*"
                class="hidden"
                onChange={videoFetch}
              />
            </div>
          </div>
          <div class="flex justify-between max-w-xs mx-auto">
            <button
              onClick={() => setCheck(false)}
              class="block w-24 bg-grey-100 hover:bg-grey-500 font-bold py-2 px-4 border rounded"
            >
              이전
            </button>
            <button
              onClick={petInsert}
              class="block w-24 ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              등록
            </button>
          </div>
        </>
      ) : null}
    </section>
  );
};

export default PetInsert2;

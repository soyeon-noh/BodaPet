import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  faFileVideo,
  faCheckCircle,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAnalysisStore from "../../../zustand/AnalysisStore";

const Analysis1 = () => {
  const navigate = useNavigate();

  const goNext = () => {
    if (analysis.videoPath) {
      // 썸네일이 제대로 가져와진 경우 다음으로 이동
      if (getThumbnail()) {
        navigate("/analysis2");
      } else {
        alert("영상처리에 문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const { analysis, setAnalysis } = useAnalysisStore();

  const [videoFile, setVideoFile] = useState(false);

  const videoFetch = async () => {
    // 영상 데이터 가져오기
    const videoData = document.getElementById("inputVideo").files[0];

    setVideoFile(videoData.name);

    // formData 객체에 append
    const formData = new FormData();
    formData.append("file", videoData);

    // 비디오 저장 fetch
    const videoRes = await fetch(`http://localhost:5050/analysis/video`, {
      method: "POST",
      // headers: {},
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

    // 비디오 저장 경로를 response해주고 그걸 anaysis state에 저장
    if (videoRes.status === 200) {
      const vidoeResJson = await videoRes.json();
      console.log("fetch 반환값 videoJson: ", vidoeResJson);

      setAnalysis("videoPath", vidoeResJson.videoPath);
    }
  };

  const getThumbnail = async () => {
    console.log("analysis", analysis);
    const thumbnailRes = await fetch(
      `http://localhost:5050/analysis/thumbnail`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // JSON.stringify 안하면 400오류
        body: JSON.stringify(analysis),
      }
    );
    if (thumbnailRes.status === 200) {
      const jsonRes = await thumbnailRes.json();
      console.log("썸네일 패치 반환값", jsonRes);
      if (jsonRes.success) {
        setAnalysis("thumbnailPath", jsonRes.url);

        return true;
      }
    }
  };

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
        {analysis.videoPath ? (
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
              <FontAwesomeIcon icon={faFileVideo} size={"4x"} color="#909090" />
            </div>
            <h4 class="text-sm">영상을 선택해주세요.</h4>
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

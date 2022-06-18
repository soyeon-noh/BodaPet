import React from "react";
import Spinner from "../../static/image/loading.svg";

const Loading = () => {
  return (
    <div class="absolute w-full h-full top-0 left-0 bg-gray-900 bg-opacity-70 z-50 flex flex-col items-center justify-center">
      {/* <img class="animate-spin" src={Spinner}></img> */}
      <div class="animate-pulse font-semibold text-white my-5">
        영상을 분석 중입니다. . .
      </div>
      <div class="border border-gray-300 shadow rounded-md p-4 max-w-xs w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div class="rounded-full bg-gray-400 h-12 w-12"></div>
          <div class="flex-1 space-y-4 py-1">
            <div class="h-4 bg-gray-400 rounded w-3/4"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-400 rounded"></div>
              <div class="h-4 bg-gray-400 rounded w-5/6"></div>
            </div>
            <div class="h-4 bg-gray-400 rounded w-3/4"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-400 rounded"></div>
              <div class="h-4 bg-gray-400 rounded w-1/6"></div>
            </div>
            <div class="h-4 bg-gray-400 rounded w-3/4"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-400 rounded"></div>
              <div class="h-4 bg-gray-400 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

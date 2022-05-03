import React, { useState } from "react";
import { Link } from "react-router-dom";

const MainNav = () => {
  const [activeNav, setActiveNav] = useState();
  return (
    <nav class="mb-3">
      <ul class="flex justify-between ">
        <li
          class={`${
            activeNav === "cctv"
              ? "flex-none bg-main rounded-full"
              : "flex-none hover:bg-gray-200 rounded-full "
          }`}
        >
          <Link to="/cctv" onClick={() => setActiveNav("cctv")}>
            CCTV
          </Link>
        </li>
        <li
          class={`${
            activeNav === "analysis"
              ? "flex-none bg-main rounded-full"
              : "flex-none hover:bg-gray-200 rounded-full "
          }`}
        >
          <Link to="/analysis" onClick={() => setActiveNav("analysis")}>
            영상분석
          </Link>
        </li>
        <li
          class={`${
            activeNav === "report"
              ? "flex-none bg-main rounded-full"
              : "flex-none hover:bg-gray-200 rounded-full "
          }`}
        >
          <Link to="/report" onClick={() => setActiveNav("report")}>
            분석결과
          </Link>
        </li>
        <li
          class={`${
            activeNav === "mypage"
              ? "flex-none bg-main rounded-full"
              : "flex-none hover:bg-gray-200 rounded-full "
          }`}
        >
          <Link to="/mypage" onClick={() => setActiveNav("mypage")}>
            마이페이지
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;

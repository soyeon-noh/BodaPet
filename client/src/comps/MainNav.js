import React, { useState } from "react";
import { Link } from "react-router-dom";
import useActiveNaviStore from "../zustand/ActiveNaviStore";
import useUserStore from "../zustand/UserStore";

const MainNav = () => {
  // 나중에 데이터를 사용하여 중복을 최소화하게 만들어보자.
  // const navContent = [
  //   { index: 1, text: "CCTV" },
  //   { index: 2, text: "영상분석" },
  //   { index: 3, text: "분석결과" },
  //   { index: 4, text: "마이페이지" },
  // ];

  const { activeNav, setActiveNav } = useActiveNaviStore();

  const { loginUser } = useUserStore();

  return (
    <nav class="mb-3 mx-3">
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
          {loginUser ? (
            <Link to="/report" onClick={() => setActiveNav("report")}>
              분석결과
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={() => alert("로그인 후 이용할 수 있습니다.")}
            >
              분석결과
            </Link>
          )}
        </li>
        <li
          class={`${
            activeNav === "mypage"
              ? "flex-none bg-main rounded-full"
              : "flex-none hover:bg-gray-200 rounded-full "
          }`}
        >
          {loginUser ? (
            <Link to="/mypage" onClick={() => setActiveNav("mypage")}>
              마이페이지
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={() => alert("로그인 후 이용할 수 있습니다.")}
            >
              마이페이지
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;

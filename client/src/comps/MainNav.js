import React from "react";
import { Link } from "react-router-dom";

const MainNav = () => {
  return (
    <nav class="mb-3">
      <ul class="flex justify-between ">
        <li class="flex-none hover:bg-main rounded-full">
          <Link to="/cctv">CCTV</Link>
        </li>
        <li class="flex-none hover:bg-main rounded-full">
          <Link to="/analysis">영상분석</Link>
        </li>
        <li class="flex-none hover:bg-main rounded-full">
          <Link to="/report">분석결과</Link>
        </li>
        <li class="flex-none hover:bg-main rounded-full">
          <Link to="/mypage">마이페이지</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;

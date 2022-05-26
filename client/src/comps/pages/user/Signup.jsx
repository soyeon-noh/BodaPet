import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const login = () => {
    alert("로그인 성공");
    navigate("/");
  };

  return (
    <section>
      <div class="bg-main py-6 ">
        <div class="max-w-sm mx-auto">
          <div class="text-left pt-14">
            <h3 class="inline-block mx-3 text-2xl font-extrabold text-md">
              회원가입
            </h3>
          </div>
        </div>
      </div>
      <div class="max-w-xs mx-auto pt-12 pb-2">
        <label>아이디</label>
        <input
          type="text"
          class="block bg-gray-100 w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm focus:bg-white"
        />
      </div>
      <div class="max-w-xs mx-auto pb-2">
        <label>비밀번호</label>
        <input
          type="password"
          class="block bg-gray-100 w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm focus:bg-white"
        />
      </div>
      <div class="max-w-xs mx-auto pb-2">
        <label>비밀번호 확인</label>
        <input
          type="password"
          class="block bg-gray-100 w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm focus:bg-white"
        />
      </div>
      <div class="max-w-xs mx-auto pb-8">
        <label>이메일</label>
        <input
          type="email"
          class="block bg-gray-100 w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm focus:bg-white"
        />
      </div>
      <div class="text-center max-w-xs mx-auto ">
        <button
          onClick={() => login()}
          class="block w-full ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded"
        >
          회원가입
        </button>

        <ul class="mt-4">
          <li class="mx-1 text-gray-500 inline-block">
            <Link to="/cctv">비밀번호 찾기</Link>
          </li>
          <li class="mx-1 text-gray-500 inline-block">|</li>
          <li class="mx-1 text-gray-500 inline-block">
            <Link to="/cctv">아이디 찾기</Link>
          </li>
          <li class="mx-1 text-gray-500 inline-block">|</li>
          <li class="mx-1 text-gray-500 inline-block">
            <Link to="/login">로그인</Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Login;

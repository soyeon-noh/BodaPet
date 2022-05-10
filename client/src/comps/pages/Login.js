import React from "react";
import { useNavigate } from "react-router-dom";

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
            <h3 class="text-2xl font-extrabold text-md">Login</h3>
          </div>
        </div>
      </div>
      <div class="max-w-xs mx-auto pt-12 pb-6">
        <div>아이디</div>
        <input
          type="text"
          class="block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        />
      </div>
      <div class="max-w-xs mx-auto pb-10">
        <div>비밀번호</div>
        <input
          type="password"
          class="block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        />
      </div>
      <div class="text-center max-w-xs mx-auto ">
        <button
          onClick={() => login()}
          class="block w-24 ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          로그인
        </button>
      </div>
    </section>
  );
};

export default Login;

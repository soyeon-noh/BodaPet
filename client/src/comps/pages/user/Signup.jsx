import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useUserStore from "../../../zustand/UserStore";

const Signup = () => {
  const { user, onChangeHandler } = useUserStore();

  const navigate = useNavigate();

  const [passCheck, setPassCheck] = useState(false);

  const refId = useRef();
  const refPw = useRef();
  const refPwC = useRef();
  const refMail = useRef();

  const incorrect = { color: "red", fontSize: "small", marginLeft: "8px" };
  const correct = { color: "blue", fontSize: "small", marginLeft: "8px" };

  const passwordCheck = (e) => {
    const rePass = e.target.value;
    if (user.password === rePass) setPassCheck(true);
    else setPassCheck(false);
  };

  const reg_email =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

  const onClickSignup = async () => {
    if (user.userId.length < 4 || user.userId.length > 20) {
      refId.current.focus();
      return;
    }
    if (user.password.length < 6 || user.password.length > 20) {
      refPw.current.focus();
      return;
    }
    if (user.email.match(reg_email) == null) {
      refMail.current.focus();
      return;
    }
    if (!passCheck) {
      refPwC.current.focus();
      return;
    }

    console.log("유저체크 : ", user);

    const fetch_option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const res = await fetch(`http://localhost:5050/users/signup`, fetch_option);
    if (res.status === 404) {
      alert("회원가입에 실패했습니다.");
      return;
    }
    alert(`${user.userId} 님의 회원가입을 축하합니다.`);
    navigate(`/`);
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
          name="userId"
          type="text"
          class="block bg-gray-100 w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm focus:bg-white"
          ref={refId}
          onChange={onChangeHandler}
        />
        {user.userId.length < 4 || user.userId.length > 20 ? (
          <span style={incorrect}>ID는 4~20자 입니다</span>
        ) : (
          <></>
        )}
      </div>
      <div class="max-w-xs mx-auto pb-2">
        <label>비밀번호</label>
        <input
          name="password"
          type="password"
          class="block bg-gray-100 w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm focus:bg-white"
          ref={refPw}
          onChange={onChangeHandler}
        />
        {user.password.length < 6 || user.password.length > 20 ? (
          <span style={incorrect}>비밀번호는 6~20자 입니다</span>
        ) : (
          <></>
        )}
      </div>
      <div class="max-w-xs mx-auto pb-2">
        <label>비밀번호 확인</label>
        <input
          name="passwordCheck"
          type="password"
          class="block bg-gray-100 w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm focus:bg-white"
          ref={refPwC}
          onChange={passwordCheck}
        />
        {passCheck ? (
          <span style={correct}>비밀번호가 일치합니다</span>
        ) : (
          <span style={incorrect}>비밀번호가 일치하지 않습니다</span>
        )}
      </div>
      <div class="max-w-xs mx-auto pb-8">
        <label>이메일</label>
        <input
          name="email"
          type="email"
          class="block bg-gray-100 w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm focus:bg-white"
          ref={refMail}
          onChange={onChangeHandler}
        />
        {user.email.match(reg_email) == null ? (
          <span style={incorrect}>e-mail 형식에 맞게 입력하세요</span>
        ) : (
          <></>
        )}
      </div>
      <div class="text-center max-w-xs mx-auto ">
        <button
          onClick={() => onClickSignup()}
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

export default Signup;

import React from "react";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useActiveNaviStore from "../zustand/ActiveNaviStore";
import { useNavigate } from "react-router-dom";
import useUserStore from "../zustand/UserStore";

const Header = () => {
  const { setActiveNav } = useActiveNaviStore();
  const { loginUser, resetLoginUser } = useUserStore();
  const navigate = useNavigate();

  return (
    <header class="pt-4 pb-2 mx-3  flex justify-between items-end">
      <h1 class="text-3xl">
        <Link to="/" onClick={() => setActiveNav("")}>
          보다펫
        </Link>
      </h1>

      {loginUser ? (
        <div class="flex flex-row text-sm">
          {/* <div class="mr-2">{loginUser.userId} 님</div> */}
          <h1
            class="text-gray-400 cursor-pointer hover:bg-gray-100 rounded-full"
            onClick={() => {
              if (window.confirm("로그아웃 하시겠습니까?")) resetLoginUser();
            }}
          >
            로그아웃
          </h1>
        </div>
      ) : (
        <div
          class="cursor-pointer text-3xl"
          onClick={() => {
            navigate("/login");
            setActiveNav("");
          }}
        >
          <FontAwesomeIcon icon={faUser} size={"xs"} />{" "}
        </div>
      )}
    </header>
  );
};

export default Header;

import React from "react";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useActiveNaviStore from "./zustand/ActiveNaviStore";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { setActiveNav } = useActiveNaviStore();
  const navigate = useNavigate();

  return (
    <header class="pt-4 pb-2 mx-3 text-3xl flex justify-between">
      <div>
        <Link to="/" onClick={() => setActiveNav("")}>
          보다펫
        </Link>
      </div>
      <div
        class="cursor-pointer"
        onClick={() => {
          navigate("/login");
          setActiveNav("");
        }}
      >
        <FontAwesomeIcon icon={faUser} size={"xs"} />
      </div>
    </header>
  );
};

export default Header;

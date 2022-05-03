import React from "react";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header class="pt-4 pb-2 text-3xl flex justify-between">
      <div>
        <Link to="/">보다펫</Link>
      </div>
      <div>
        <FontAwesomeIcon icon={faUser} size={"xs"} />
      </div>
    </header>
  );
};

export default Header;

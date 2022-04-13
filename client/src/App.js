import "./App.css";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MainNav from "./comps/MainNav";
import Pages from "./comps/Pages";
import { Link } from "react-router-dom";

function App() {
  return (
    <div class="" className="App">
      <div class="max-w-sm mx-auto">
        <header class="pt-4 pb-2 text-3xl flex justify-between">
          <div>
            <Link to="/">보다펫</Link>
          </div>
          <div>
            <FontAwesomeIcon icon={faUser} size={"xs"} />
          </div>
        </header>
        <MainNav />
      </div>
      <Pages />
    </div>
  );
}

export default App;

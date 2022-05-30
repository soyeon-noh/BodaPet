import "./App.css";
import MainNav from "./comps/MainNav";
import Pages from "./comps/Pages";
import Header from "./comps/Header";

function App() {
  const fetch_option = {
    // method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
    credentials: "include",
  };
  const test_fetch = async () => {
    const res = await fetch("http://localhost:5000/mypage");
    const Jres = await res.json();
    console.log("test_fetch", Jres);
  };
  return (
    <div className="App">
      <button onClick={test_fetch}>테스트 버튼</button>
      <div class="max-w-sm mx-auto select-none">
        <Header />
        <MainNav />
      </div>
      <Pages />
    </div>
  );
}

export default App;

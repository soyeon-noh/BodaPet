import "./App.css";
import MainNav from "./comps/MainNav";
import Pages from "./comps/Pages";
import Header from "./comps/Header";

function App() {
  return (
    <div className="App">
      <div class="max-w-sm mx-auto select-none">
        <Header />
        <MainNav />
      </div>
      <Pages />
    </div>
  );
}

export default App;

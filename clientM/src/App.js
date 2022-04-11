import logo from "./logo.svg";
import "./App.css";
import { IonSegment, IonSegmentButton } from "@ionic/react";

function App() {
  // segment 네비
  return (
    <div className="App">
      <IonSegment>
        <IonSegmentButton>d</IonSegmentButton>
        <IonSegmentButton>d</IonSegmentButton>
      </IonSegment>
    </div>
  );
}

export default App;

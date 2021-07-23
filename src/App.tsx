import logo from "./logo.svg";
import "./App.css";

type Props = { a: number };

function App({ a }: Props) {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <p>{a}</p>
    </div>
  );
}

export default App;

import "./App.css";
import ExcelReader from "./components/ExcelReader";

function App() {
  return (
    <div className="App">
      <div className="w-full h-full bg-gradient-to-b from-sky-100 to-sky-300">
        <ExcelReader />
      </div>
    </div>
  );
}

export default App;

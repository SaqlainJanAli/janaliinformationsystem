import "./App.css";
import ExcelReader from "./components/ExcelReader";

function App() {
  return (
    <div className="App">
      <div className="w-full h-full bg-gradient-to-l from-cyan-100 to-cyan-300">
        <ExcelReader />
      </div>
    </div>
  );
}

export default App;

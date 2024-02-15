import "./App.css";
import ExcelReader from "./components/ExcelReader";

function App() {
  return (
    <div className="App">
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <ExcelReader />
      </div>
    </div>
  );
}

export default App;

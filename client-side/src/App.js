import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pay from "./Pay";
import Success from "./Success";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/pay" element={<Pay />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;

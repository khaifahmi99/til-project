import { Route, Routes } from "react-router-dom";

import { AddTIL } from "./views/AddTIL";
import { Home } from "./views/Home";
import { TIL } from "./views/TIL";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/til/:id" element={<TIL />} />
        <Route path="/add/til" element={<AddTIL />} />
        <Route
          path="*"
          element={<h1>Oops! Page not found</h1>}
        />
      </Routes>
    </div>
  );
}

export default App;

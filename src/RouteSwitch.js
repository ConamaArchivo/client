import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nueva-entrada" element={<New />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
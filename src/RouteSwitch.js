import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Sidebar from './components/Sidebar';

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/obras" element={<Home />} />
        <Route path="/nueva-entrada" element={<New />} />
        <Route path='/' element={<Navigate to='/obras' replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;

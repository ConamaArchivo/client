import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import User from './pages/User';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import useStyle from './hooks/useStyle';
import RequireLogin from './components/RequireLogin';

const RouteSwitch = () => {
  const { mobileView } = useStyle();

  return (
    <BrowserRouter>
      {!mobileView && <Sidebar />}
      <Routes>
        <Route path="/obras" element={<Home />} />
        <Route element={<RequireLogin />}>
          <Route path="/nueva-entrada" element={<New />} />
        </Route>
        <Route path="/iniciar-sesion" element={<User />} />
        <Route path="/" element={<Navigate to="/obras" replace />} />
      </Routes>
      {mobileView && <Navbar />}
    </BrowserRouter>
  );
};

export default RouteSwitch;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RequireLogin from './components/RequireLogin';
import PersistLogin from './components/PersistLogin';
import Home from './pages/Home';
import New from './pages/New';
import User from './pages/User';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import useStyle from './hooks/useStyle';

const RouteSwitch = () => {
  const { mobileView } = useStyle();

  return (
    <BrowserRouter>
      {!mobileView && <Sidebar />}
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Home />} />
          <Route element={<RequireLogin />}>
            <Route path="/new" element={<New />} />
            <Route path="/user" element={<User />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      {mobileView && <Navbar />}
    </BrowserRouter>
  );
};

export default RouteSwitch;

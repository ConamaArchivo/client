import {
  HouseDoor,
  HouseDoorFill,
  PlusSquare,
  PlusSquareFill,
  Person,
  PersonFill,
} from 'react-bootstrap-icons';
import ThemeToggler from './ThemeToggler';
import React from 'react';
import Page from './Page';
import useAuth from '../hooks/useAuth';
import useStyle from '../hooks/useStyle';

const Sidebar = () => {
  const { prefersDarkMode } = useStyle();
  const { auth } = useAuth();

  return (
    <div className="sidebar" data-dark-theme={prefersDarkMode}>
      <div className="title">
        <h1>CONAMA</h1>
        <h2>archivo musical</h2>
      </div>
      <nav>
        <ul>
          <Page to="/" icon={<HouseDoor />} activeIcon={<HouseDoorFill />}>
            Lista de obras
          </Page>
          {auth?.email && (
            <Page
              to="/new"
              icon={<PlusSquare />}
              activeIcon={<PlusSquareFill />}
            >
              Nueva entrada
            </Page>
          )}
          <Page
            to={auth?.email ? '/user' : '/login'}
            icon={<Person />}
            activeIcon={<PersonFill />}
          >
            {auth?.email ? 'Oficina técnica' : 'Iniciar sesión'}
          </Page>
        </ul>
      </nav>
      <ThemeToggler/>
    </div>
  );
};

export default Sidebar;

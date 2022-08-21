import {
  HouseDoor,
  HouseDoorFill,
  PlusSquare,
  PlusSquareFill,
  Person,
  PersonFill,
} from 'react-bootstrap-icons';
import React from 'react';
import Page from './Page';
import useAuth from '../hooks/useAuth';

const Sidebar = () => {
  const { auth } = useAuth();

  return (
    <div className="sidebar">
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
            {auth?.email ? 'Usuario' : 'Iniciar sesión'}
          </Page>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

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
import useStyle from '../hooks/useStyle';

const Navbar = () => {
  const { prefersDarkMode } = useStyle();
  const { auth } = useAuth();

  return (
    <nav className="navbar" data-dark-theme={prefersDarkMode}>
      <ul>
        <Page
          to="/"
          icon={<HouseDoor />}
          activeIcon={<HouseDoorFill />}
        ></Page>
        {auth?.email && (
          <Page
            to="/new"
            icon={<PlusSquare />}
            activeIcon={<PlusSquareFill />}
          ></Page>
        )}
        <Page
          to={auth?.email ? '/user' : '/login'}
          icon={<Person />}
          activeIcon={<PersonFill />}
        ></Page>
      </ul>
    </nav>
  );
};

export default Navbar;

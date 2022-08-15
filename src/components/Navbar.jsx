import { HouseDoor, HouseDoorFill, PlusSquare, PlusSquareFill, Person, PersonFill } from 'react-bootstrap-icons';
import React from 'react';
import Page from './Page';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <ul>
    <Page to="/obras" icon={<HouseDoor/>} activeIcon={<HouseDoorFill/>}></Page>
    <Page to="/nueva-entrada" icon={<PlusSquare/>} activeIcon={<PlusSquareFill/>}></Page>
    <Page to="/iniciar-sesion" icon={<Person/>} activeIcon={<PersonFill/>}></Page>
      </ul>
    </nav>
  );
};

export default Navbar;


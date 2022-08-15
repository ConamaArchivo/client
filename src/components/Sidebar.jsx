import { HouseDoor, HouseDoorFill, PlusSquare, PlusSquareFill, Person, PersonFill } from 'react-bootstrap-icons';
import React from 'react';
import Page from './Page';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="title">
        <h1>CONAMA</h1>
        <h2>archivo musical</h2>
      </div>
      <nav>
        <ul>
        <Page to="/obras" icon={<HouseDoor/>} activeIcon={<HouseDoorFill/>}>Lista de obras</Page>
    <Page to="/nueva-entrada" icon={<PlusSquare/>} activeIcon={<PlusSquareFill/>}>Nueva entrada</Page>
    <Page to="/iniciar-sesion" icon={<Person/>} activeIcon={<PersonFill/>}>Iniciar sesión</Page>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;


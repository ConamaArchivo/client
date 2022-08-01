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
      <Page to="/obras">LISTA DE OBRAS</Page>
      <Page to="/nueva-entrada">NUEVA ENTRADA</Page>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;


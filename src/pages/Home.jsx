import React, { useState, useEffect } from 'react';
import Table from '../components/Home/Table';
import Card from '../components/Home/Card';
import { axiosPublic } from '../axios';

const Home = () => {
  const [selectedPiece, setSelectedPiece] = useState({});
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const getPieces = async () => {
      try {
        const res = await axiosPublic.get('/obras', {});
        setPieces(res.data);
        console.log('res.data: ', res.data);
      } catch (error) {}
    };
    getPieces();
  }, []);

  return (
    <div id="home" className="section-container">
      <Table pieces={pieces} setSelectedPiece={setSelectedPiece} />
      <Card selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} />
    </div>
  );
};

export default Home;

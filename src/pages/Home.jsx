import React, { useState, useEffect } from 'react';
import Table from '../components/Home/Table';
import Card from '../components/Home/Card';
import axios from 'axios';

const Home = () => {
  const [selectedPiece, setSelectedPiece] = useState({});
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const getPieces = async () => {
      try {
        const res = await axios.get('/obras', {});
        console.log(res.data);
        setPieces(res.data);
      } catch (error) {}
    };
    getPieces();
  }, []);

  return (
    <div id="home">
      <Table pieces={pieces} setSelectedPiece={setSelectedPiece} />
      <Card selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} />
    </div>
  );
};

export default Home;

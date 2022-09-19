import React, { useState, useEffect } from 'react';
import Table from '../components/Home/Table';
import Card from '../components/Home/Card';
import useStyle from '../hooks/useStyle';
import { axiosPublic } from '../axios';
import useToast from '../hooks/useToast';

const Home = () => {
  const { displayToast } = useToast();
  const { prefersDarkMode } = useStyle();
  const [selectedPiece, setSelectedPiece] = useState({});
  const [pieces, setPieces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPieces = async () => {
      try {
        const res = await axiosPublic.get('/pieces', {});
        setPieces(res.data);
        console.log('res.data: ', res.data);
      } catch (error) {
        console.log(error);
        displayToast('Hubo un error con el servidor', 'error');
      }
      setLoading(false);
    };
    getPieces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      id="home"
      className="section-container"
      data-dark-theme={prefersDarkMode}
    >
      <Table
        pieces={pieces}
        setSelectedPiece={setSelectedPiece}
        loading={loading}
      />
      <Card selectedPiece={selectedPiece} setSelectedPiece={setSelectedPiece} />
    </div>
  );
};

export default Home;

import React, { useState } from 'react';
import Header from '../layout/Header/Header';
import Filter from '../layout/Header/Filter/Filter';

const Home = () => {
  const [selectedFilter, setSelectedFilter] = useState(0);
  return (
    <>
      <Header />
      <Filter selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
    </>
  );
};

export default Home;

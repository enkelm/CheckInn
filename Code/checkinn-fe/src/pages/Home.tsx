import React, { useState } from 'react';
import Filter from '../layout/Header/Filter/Filter';
import ListingsContainer from '../features/ListingsDisplay/ListingsContainer';

const Home = () => {
  const [selectedFilter, setSelectedFilter] = useState(0);

  return (
    <>
      <Filter selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
      <ListingsContainer />
    </>
  );
};

export default Home;

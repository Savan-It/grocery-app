import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

// Update: Use product display and Shiv Parlour branding
const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <>
      {/* <Header siteName="Shiv Parlour" /> */}
      <ExploreMenu setCategory={setCategory} category={category} categories={["Dairy", "Namkeen", "icecream", "other"]} />
      <FoodDisplay category={category} type="product" />
    </>
  );
};

export default Home;

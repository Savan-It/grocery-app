import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';

// Update: Use product display and Shiv Parlour branding
const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <>
      <Header siteName="Shiv Parlour" />
      <ExploreMenu setCategory={setCategory} category={category} categories={["Grocery", "Dairy", "Namkeen"]} />
      <FoodDisplay category={category} type="product" />
      <AppDownload siteName="Shiv Parlour" />
    </>
  );
};

export default Home;

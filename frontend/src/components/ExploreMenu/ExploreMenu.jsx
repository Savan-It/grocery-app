import React from 'react';
import './ExploreMenu.css';

const categories = ['Dairy', 'Namkeen', 'icecream'];

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Shop by Category</h1>
      <p className='explore-menu-text'>Find all your daily Dairy, Namkeen, and Icecream needs at Shiv Parlour. Select a category to explore products and offers.</p>
      <div className="explore-menu-list">
        {categories.map((cat, idx) => (
          <div
            onClick={() => setCategory(prev => prev === cat ? "All" : cat)}
            key={idx}
            className={`explore-menu-list-item${category===cat ? ' active' : ''}`}
          >
            {cat}
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;

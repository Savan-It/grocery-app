import React from 'react';
import './ExploreMenu.css';
import groceryIcon from '../../assets/food_1.png';
import dairyIcon from '../../assets/food_2.png';
import namkeenIcon from '../../assets/food_3.png';

const groceryCategories = [
  {
    name: 'Grocery',
    image: groceryIcon,
    desc: 'Staples, grains, and daily essentials.'
  },
  {
    name: 'Dairy',
    image: dairyIcon,
    desc: 'Milk, cheese, butter, and more.'
  },
  {
    name: 'Namkeen',
    image: namkeenIcon,
    desc: 'Snacks, chips, and savory treats.'
  }
];

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Shop by Category</h1>
      <p className='explore-menu-text'>Find all your daily grocery, dairy, and snack needs at Shiv Parlour. Select a category to explore products and offers.</p>
      <div className="explore-menu-list">
        {groceryCategories.map((item, index) => (
          <div
            onClick={() => setCategory(prev => prev === item.name ? "All" : item.name)}
            key={index}
            className='explore-menu-list-item'
          >
            <img src={item.image} className={category === item.name ? "active" : ""} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;

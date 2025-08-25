import React, { useContext } from 'react'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'
import { StoreContext } from '../../Context/StoreContext'

const FoodDisplay = ({category}) => {

  const {product_list} = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top products at Shiv Parlour</h2>
      <div className='food-display-list'>
        {(product_list || []).map((item) => {
          if (category === "All" || ["Dairy","Namkeen","icecream","other"].includes(item.category) && category === item.category) {
            return <FoodItem key={item._id} image={item.image} name={item.name} desc={item.description} price={item.price} id={item._id} />;
          }
          return null;
        })}
      </div>
    </div>
  )
}

export default FoodDisplay

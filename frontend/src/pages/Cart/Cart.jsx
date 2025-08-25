import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate, Link  } from 'react-router-dom';

const Cart = () => {

  const {cartItems, product_list, addToCart, removeFromCart, getTotalCartAmount, url, currency, deliveryCharge, setCartItems, loadCartData, token, updateCart} = useContext(StoreContext);
  const navigate = useNavigate();

  const cartIsEmpty = Object.values(cartItems).every(qty => qty === 0);

  if (cartIsEmpty) {
    return (
      <div className='cart-empty-message' style={{textAlign:'center',margin:'80px 0'}}>
        <h2>Your cart is empty</h2>
        <p className='my-2'>Start shopping to add products to your cart.</p>
        <Link  to='/' style={{color:'#43A047',fontWeight:'bold',textDecoration:'underline'}}>Home Page</Link>
      </div>
    );
  }

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Total</p> <p>Remove</p>
        </div>
        <br />
        <hr />
        {(product_list || []).map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{currency}{item.price}</p>
                  <div className="cart-item-qty-control">
                    <input
                      type="number"
                      min={1}
                      value={cartItems[item._id]}
                      onChange={async e => {
                        const val = Math.max(1, Number(e.target.value));
                        await updateCart(item._id, val);
                      }}
                      className="cart-qty-input"
                    />
                  </div>
                  <p>{currency}{item.price * cartItems[item._id]}</p>
                  <p className='cart-items-remove-icon' onClick={async () => {
                    await updateCart(item._id, 0);
                  }}>x</p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details"><p>Subtotal</p><p>{currency}{getTotalCartAmount()}</p></div>
            <hr />
            <div className="cart-total-details"><p>Delivery Fee</p><p>{currency}{getTotalCartAmount()===0?0:deliveryCharge}</p></div>
            <hr />
            <div className="cart-total-details"><b>Total</b><b>{currency}{getTotalCartAmount()===0?0:getTotalCartAmount()+deliveryCharge}</b></div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  )
}

export default Cart

import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import './OrderDetails.css';

const OrderDetails = () => {
  const { id } = useParams();
  const { url, token, currency, product_list } = useContext(StoreContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await axios.post(url + '/api/order/userorders', {}, { headers: { token } });
      const found = (response.data.data || []).find(o => o._id === id);
      setOrder(found || null);
      setLoading(false);
    };
    if (token) fetchOrder();
  }, [id, token]);

  if (loading) return <div className='order-details-loading'>Loading...</div>;
  if (!order) return <div className='order-details-empty'>Order not found.</div>;

  return (
    <>
        <button className='order-details-back' onClick={()=>navigate(-1)}>Back</button>
        <div className='order-details'>
        <h2>Order #{order._id.slice(-6).toUpperCase()}</h2>
        <div className='order-details-status'>
            <span>&#x25cf;</span> <b>{order.status.replace('Food', 'Product')}</b>
        </div>
        <div className='order-details-date'>Placed: {new Date(order.date).toLocaleString()}</div>
        <div className='order-details-products'>
            <h3>Products</h3>
            <div className='order-details-products-list'>
            {order.items.map((item, idx) => {
                const product = product_list.find(p => p._id === item.productId || p._id === item._id);
                return (
                  <div className='order-details-product' key={idx} style={{display:'flex',alignItems:'center',marginBottom:'12px',gap:'16px'}}>
                      <img src={product?.image ? `${url}/images/${product.image}` : assets.basket_icon} alt={item.name} style={{width:'56px',height:'56px',objectFit:'cover',borderRadius:'8px',background:'#f5f5f5'}} />
                    <div>
                      <div style={{fontWeight:'bold',fontSize:'1.05rem'}}>{product?.name || item.name}</div>
                      <div style={{color:'#888'}}>Qty: {item.quantity}</div>
                      {product?.price && <div style={{color:'#43A047'}}>Price: {currency}{product.price}</div>}
                    </div>
                  </div>
                );
            })}
            </div>
        </div>
        <div className='order-details-amount'>
            <b>Total Paid:</b> {currency}{order.amount}.00
        </div>
        <div className='order-details-address'>
            <h3>Delivery Address</h3>
            <div>Street: {order.address.street}</div>
            <div>City: {order.address.city}</div>
            <div>Phone: {order.address.phone}</div>
        </div>
        </div>
    </>
  );
};

export default OrderDetails;

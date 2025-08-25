import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { url, token, currency } = useContext(StoreContext);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    setLoading(true);
    const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
    setOrders(response.data.data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className='my-orders'>
      <div className='my-orders-header'>
        <h2>My Orders</h2>
        <button className='my-orders-refresh' onClick={fetchOrders} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      <div className="my-orders-list">
        {orders.length === 0 ? (
          <div className='my-orders-empty'>No orders found.</div>
        ) : (
          orders.map((order, index) => (
            <div key={order._id || index} className='my-orders-card' onClick={()=>navigate(`/order/${order._id}`)}>
              <div className='my-orders-card-top'>
                <img src={assets.parcel_icon} alt="Order" />
                <div className='my-orders-card-info'>
                  <div className='my-orders-card-title'>Order #{order._id.slice(-6).toUpperCase()}</div>
                  <div className='my-orders-card-date'>{new Date(order.date).toLocaleString()}</div>
                </div>
                <div className={`my-orders-status status-${order.status.replace(/\s/g,'').toLowerCase()}`}>
                  <b>{order.status.replace('Food', 'Product')}</b>
                </div>
              </div>
              <div className='my-orders-card-details'>
                <div className='my-orders-card-products'>
                  {order.items.map((item, idx) => (
                    <span key={idx}>{item.name} x {item.quantity}{idx < order.items.length-1 ? ', ' : ''}</span>
                  ))}
                </div>
                <div className='my-orders-card-amount'>{currency}{order.amount}.00</div>
                <div className='my-orders-card-items'>Items: {order.items.length}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;

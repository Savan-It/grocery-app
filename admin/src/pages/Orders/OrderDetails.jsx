import React, { useState } from 'react';
import './OrderDetails.css';
import { url } from '../../assets/assets';

const AdminOrderDetails = ({ order, onBack }) => {
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);

  const statusColors = {
    'Product Processing': '#FFA726',
    'Out for delivery': '#29B6F6',
    'Delivered': '#43A047',
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setLoading(true);
    try {
      await fetch(`${url}/api/order/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order._id, status: newStatus })
      });
      setStatus(newStatus);
    } catch (err) {}
    setLoading(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this order?')) {
      setLoading(true);
      try {
        await fetch(`${url}/api/order/delete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: order._id })
        });
        onBack('deleted');
      } catch (err) {}
      setLoading(false);
    }
  };

  if (!order) return <div className='order-details-empty'>Order not found.</div>;
  return (
    <div className='order-details'>
      <button className='order-details-back' onClick={onBack}>Back</button>
      <h2>Order #{order._id.slice(-6).toUpperCase()}
        <span style={{float:'right'}}>
          <button onClick={handleDelete} style={{background:'none',border:'none',color:'#d32f2f',fontSize:'1.2rem',cursor:'pointer'}}>🗑️</button>
        </span>
      </h2>
      <div className='order-details-status' style={{color:statusColors[status]||'#888'}}>
        <span>&#x25cf;</span> <b>{status}</b>
        <select value={status} onChange={handleStatusChange} disabled={loading} style={{marginLeft:'16px',padding:'4px 10px',borderRadius:'6px',border:'1px solid #ccc'}}>
          <option value="Product Processing">Product Processing</option>
          <option value="Out for delivery">Out for delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
      <div className='order-details-date'>Placed: {new Date(order.date).toLocaleString()}</div>
      <div className='order-details-products'>
        <h3>Products</h3>
        <div className='order-details-products-list'>
          {order.items.map((item, idx) => (
            <div className='order-details-product' key={idx} style={{display:'flex',alignItems:'center',marginBottom:'12px',gap:'16px'}}>
              <img src={item.image ? `${url}/images/${item.image}` : ''} alt={item.name} style={{width:'56px',height:'56px',objectFit:'cover',borderRadius:'8px',background:'#f5f5f5'}} />
              <div>
                <div style={{fontWeight:'bold',fontSize:'1.05rem'}}>{item.name}</div>
                <div style={{color:'#888'}}>Qty: {item.quantity}</div>
                {item.price && <div style={{color:'#43A047'}}>Price: ₹{item.price}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='order-details-amount'>
        <b>Total Paid:</b> ₹{order.amount}
      </div>
      <div className='order-details-address'>
        <h3>Delivery Address</h3>
        <div>Name: {order.address.firstName} {order.address.lastName}</div>
        <div>Street: {order.address.street}</div>
        <div>City: {order.address.city}</div>
        <div>State: {order.address.state}</div>
        <div>Country: {order.address.country}</div>
        <div>Zipcode: {order.address.zipcode}</div>
        <div>Phone: {order.address.phone}</div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;

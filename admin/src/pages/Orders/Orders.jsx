import React, { useEffect, useState } from 'react'
import AdminOrderDetails from './OrderDetails';
import './Orders.css'
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets, url, currency } from '../../assets/assets';

const Order = () => {

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`)
    if (response.data.success) {
      setOrders(response.data.data.reverse());
    }
    else {
      toast.error("Error")
    }
  }

  const statusHandler = async (event, orderId) => {
    console.log(event, orderId);
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
  }


  useEffect(() => {
    fetchAllOrders();
  }, [])

  const statusColors = {
    'Product Processing': '#FFA726',
    'Out for delivery': '#29B6F6',
    'Delivered': '#43A047',
  };

  // handle delete from listing
  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Delete this order?')) {
      await fetch(`${url}/api/order/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId })
      });
      fetchAllOrders();
    }
  };

  // handle details back, refresh if deleted
  const handleDetailsBack = (action) => {
    setSelectedOrder(null);
    if (action === 'deleted') fetchAllOrders();
  };

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      {selectedOrder ? (
        <AdminOrderDetails order={selectedOrder} onBack={handleDetailsBack} />
      ) : (
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className='order-item' style={{cursor:'pointer',borderColor:statusColors[order.status]||'#ccc',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'18px 24px',margin:'18px 0'}} onClick={() => setSelectedOrder(order)}>
              <div>
                <span style={{fontWeight:'bold',fontSize:'1.1rem'}}>Items: {order.items.length}</span>
              </div>
              <div>
                <span style={{fontWeight:'bold',fontSize:'1.1rem'}}>{order.address.firstName} {order.address.lastName}</span>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                <span style={{color:statusColors[order.status]||'#888',fontWeight:'bold'}}>{order.status}</span>
                <button onClick={e => {e.stopPropagation();handleDeleteOrder(order._id)}} style={{background:'none',border:'none',color:'#d32f2f',fontSize:'1.2rem',cursor:'pointer'}} title='Delete Order'>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Order

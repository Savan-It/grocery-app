import React, { useEffect, useState } from 'react'
import './List.css'
import EditItemModal from './EditItemModal'
import { url, currency } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {

  const [list, setList] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const categories = ['Dairy','Namkeen','icecream','other'];
  const [editItem, setEditItem] = useState(null);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/product/list`)
    if (response.data.success) {
      setList(response.data.data);
    }
    else {
      toast.error("Error")
    }
  }

  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null });

  const removeProduct = async (productId) => {
    setDeleteConfirm({ show: true, id: productId });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.id) return;
    const response = await axios.post(`${url}/api/product/remove`, {
      id: deleteConfirm.id
    });
    await fetchList();
    setDeleteConfirm({ show: false, id: null });
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Products List</p>
      <div style={{marginBottom:'16px'}}>
        <label style={{marginRight:'8px'}}>Filter by Category:</label>
        <select value={categoryFilter} onChange={e=>setCategoryFilter(e.target.value)}>
          <option value=''>All</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className='list-table'>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Stock</b>
          <b>Expiry</b>
          <b>Unit</b>
          <b>Action</b>
        </div>
        {list.filter(item => !categoryFilter || item.category === categoryFilter).map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p>{item.stock}</p>
              <p>{item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : '-'} </p>
              <p>{item.unit}</p>
              <div style={{display:'flex',gap:'8px'}}>
                <button style={{background:'#43A047',color:'#fff',border:'none',borderRadius:'4px',padding:'4px 10px',cursor:'pointer'}} onClick={()=>setEditItem(item)}>Edit</button>
                <button style={{background:'#e53935',color:'#fff',border:'none',borderRadius:'4px',padding:'4px 10px',cursor:'pointer'}} onClick={()=>removeProduct(item._id)}>Delete</button>
              </div>
            </div>
          )
        })}
      </div>
      {editItem && <EditItemModal item={editItem} onClose={()=>setEditItem(null)} onSave={fetchList} />}
      {deleteConfirm.show && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.2)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
          <div style={{background:'#fff',padding:'32px',borderRadius:'8px',boxShadow:'0 2px 16px rgba(0,0,0,0.12)',minWidth:'320px',textAlign:'center'}}>
            <h3>Delete Product</h3>
            <p>Are you sure you want to delete this product?</p>
            <div style={{display:'flex',gap:'12px',justifyContent:'center',marginTop:'24px'}}>
              <button style={{background:'#e53935',color:'#fff',border:'none',borderRadius:'4px',padding:'8px 16px',cursor:'pointer'}} onClick={confirmDelete}>Delete</button>
              <button style={{background:'#ccc',color:'#333',border:'none',borderRadius:'4px',padding:'8px 16px',cursor:'pointer'}} onClick={()=>setDeleteConfirm({show:false,id:null})}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default List

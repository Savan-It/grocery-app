import React, { useState } from 'react';
import './EditItemModal.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const categories = [
  'Dairy',
  'Namkeen',
  'icecream',
  'other'
];

const EditItemModal = ({ item, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: item.name,
    category: item.category,
    price: item.price,
    stock: item.stock,
    expiryDate: item.expiryDate ? item.expiryDate.slice(0,10) : '',
    unit: item.unit
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/product/update', {
        id: item._id,
        ...form
      });
      if (res.data.success) {
        toast.success('Item updated');
        onSave();
        onClose();
      } else {
        toast.error('Update failed');
      }
    } catch {
      toast.error('Update failed');
    }
  };

  return (
    <div className="edit-modal-bg">
      <div className="edit-modal">
        <h3>Edit Item</h3>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
          <label>Category</label>
          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <label>Price</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" required />
          <label>Stock</label>
          <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" required />
          <label>Expiry Date</label>
          <input name="expiryDate" type="date" value={form.expiryDate} onChange={handleChange} placeholder="Expiry Date" />
          <label>Unit</label>
          <input name="unit" value={form.unit} onChange={handleChange} placeholder="Unit" />
          <div className="edit-modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItemModal;

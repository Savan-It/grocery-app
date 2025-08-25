import React, { useState } from 'react'
import { toast } from 'react-toastify';
import './Add.css'
import { assets, url } from '../../assets/assets';
import axios from 'axios';

const Add = () => {


    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
    category: "Dairy",
        stock: "",
        expiryDate: "",
        unit: "pcs"
    });
    const [errors, setErrors] = useState({});

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        let newErrors = {};
        if (!image) {
            newErrors.image = 'Image not selected';
        }
        if (!data.name.trim()) {
            newErrors.name = 'Product name is required';
        }
        if (!data.description.trim()) {
            newErrors.description = 'Product description is required';
        }
        if (!data.price || isNaN(data.price) || Number(data.price) <= 0) {
            newErrors.price = 'Valid product price is required';
        }
        if (!data.stock || isNaN(data.stock) || Number(data.stock) < 0) {
            newErrors.stock = 'Valid stock quantity is required';
        }
        if (!data.unit.trim()) {
            newErrors.unit = 'Unit is required';
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("stock", Number(data.stock));
        formData.append("expiryDate", data.expiryDate);
        formData.append("unit", data.unit);
        formData.append("image", image);
        const response = await axios.post(`${url}/api/product/add`, formData);
        if (response.data.success) {
            toast.success(response.data.message);
            setData({
                name: "",
                description: "",
                price: "",
                category: "Dairy",
                stock: "",
                expiryDate: "",
                unit: "pcs"
            });
            setImage(false);
            setErrors({});
        } else {
            toast.error(response.data.message || "Failed to add product");
            setErrors({ submit: response.data.message });
        }
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload image</p>
                    <input onChange={(e) => { setImage(e.target.files[0]); e.target.value = '' }} type="file" accept="image/*" id="image" hidden />
                    <label htmlFor="image">
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                    </label>
                    {errors.image && <span className="error-msg">{errors.image}</span>}
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product name</p>
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Type here' />
                    {errors.name && <span className="error-msg">{errors.name}</span>}
                </div>
                <div className='add-product-description flex-col'>
                    <p>Product description</p>
                    <textarea name='description' onChange={onChangeHandler} value={data.description} type="text" rows={6} placeholder='Write content here' />
                    {errors.description && <span className="error-msg">{errors.description}</span>}
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Product category</p>
                        <select name='category' onChange={onChangeHandler} value={data.category}>
                            <option value="Dairy">Dairy</option>
                            <option value="Namkeen">Namkeen</option>
                            <option value="icecream">icecream</option>
                            <option value="other">other</option>
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Product Price</p>
                        <input type="Number" name='price' onChange={onChangeHandler} value={data.price} placeholder='25' />
                        {errors.price && <span className="error-msg">{errors.price}</span>}
                    </div>
                    <div className='add-stock flex-col'>
                        <p>Stock</p>
                        <input type="Number" name='stock' onChange={onChangeHandler} value={data.stock} placeholder='100' />
                        {errors.stock && <span className="error-msg">{errors.stock}</span>}
                    </div>
                    <div className='add-expiry flex-col'>
                        <p>Expiry Date</p>
                        <input type="date" name='expiryDate' onChange={onChangeHandler} value={data.expiryDate} />
                    </div>
                    <div className='add-unit flex-col'>
                        <p>Unit</p>
                        <input type="text" name='unit' onChange={onChangeHandler} value={data.unit} placeholder='pcs/kg/ltr' />
                        {errors.unit && <span className="error-msg">{errors.unit}</span>}
                    </div>
                </div>
                {errors.submit && <span className="error-msg">{errors.submit}</span>}
                <button type='submit' className='add-btn' >ADD</button>
            </form>
        </div>
    )
}

export default Add

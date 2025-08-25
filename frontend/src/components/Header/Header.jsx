import React, { useState } from 'react';
import './Header.css';
import banner1 from '../../assets/banner1.png';
import banner2 from '../../assets/banner2.png';

const sliderData = [
    {
        image: banner1,
        title: 'Fresh Dairy & Namkeen Delivered',
        desc: 'Shop the best dairy, namkeen, icecream, and more. Quality products, fast delivery, and great offers every day!',
        cta: 'Shop Now'
    },
    {
        image: banner2,
        title: 'Cool Off with Icecream & Snacks',
        desc: 'Beat the heat with our icecream and snack selection. Discover new flavors and enjoy exclusive deals!',
        cta: 'View Offers'
    }
];

const Header = () => {
    const [slide, setSlide] = useState(0);

    const handleCTA = () => {
        const el = document.getElementById('explore-menu');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className='header' style={{background:`url(${sliderData[slide].image}) no-repeat`,backgroundSize:'cover'}}>
            <div className='header-slider-controls'>
                {sliderData.map((_, idx) => (
                    <span
                        key={idx}
                        className={`header-slider-dot${slide===idx?' active':''}`}
                        onClick={()=>setSlide(idx)}
                    />
                ))}
            </div>
            <div className='header-contents'>
                <h2>{sliderData[slide].title}</h2>
                <p>{sliderData[slide].desc}</p>
                <button onClick={handleCTA}>{sliderData[slide].cta}</button>
            </div>
        </div>
    );
};

export default Header;

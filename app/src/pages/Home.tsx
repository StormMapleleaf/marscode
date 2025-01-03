import React, { useEffect, useState } from 'react';
import { getActiveProducts } from '../api/api.tsx';
import ProductsDetail from '../components/ProductsDetail.tsx';
import NavBar from '../components/NavBar.tsx';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([]);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const navigate = useNavigate();
    useEffect(() => {
            if (!user.id) {
                navigate('/login');
            }
        }, [user, navigate]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getActiveProducts();
            setProducts(response.data.products);
        };
        fetchProducts();
    }, []);

    return (
        <div className="home-page">
          <NavBar username={user.name || '用户'} />
            <div className="products-grid">
                {products.map((product) => (
                    <ProductsDetail key={product.id} product={product}/>
                ))}
            </div>
        </div>
    );
};

export default Home;
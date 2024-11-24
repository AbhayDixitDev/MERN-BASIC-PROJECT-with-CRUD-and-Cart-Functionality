import { useState, useEffect } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { addToCart } from '../cartSlice';

const Womenswear = () => {
    const [mydata, setMydata] = useState([]);
    const dispatch = useDispatch();

    const loadData = async () => {
        try {
            const api = "http://localhost:3000/products/productAll";
            const response = await axios.get(api);
            setMydata(response.data);

            // Filter data to only include womens products
            const mensData = response.data.filter(item => item.category === 'women');
            setMydata(mensData);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const cartDataAdd = (item) => {
        dispatch(addToCart({ ...item, qnty: 1 }));
    };

    return (
        <>
        <h1 style={{ textAlign: 'left', backgroundColor: "#1a1a1a", color: "#f0f0f0",padding: "20px" }}>Women Wears</h1>
            <div id="cardData"  className="card-container">
            
                {mydata.map((item) => (
                     <Card key={item.id} className="product-card">
                     <img src={item.image} className="product-image" alt={item.name} />
                     <Card.Body>
                         <Card.Title>{item.name} for {item.category}</Card.Title>
                         <Card.Text className="card-details">
                             {item.description}
                             <br />
                             <span className="product-price">Price: {item.price}</span>
                         </Card.Text>
                         <Button
                             variant="primary"
                             onClick={() => cartDataAdd(item)}
                             className="add-to-cart-btn"
                         >
                             Add to cart
                         </Button>
                     </Card.Body>
                 </Card>
                ))}
            </div>
        </>
    );
};

export default Womenswear;
import { useState, useEffect } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { addToCart } from '../cartSlice';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import "./style.css"

const Shop = () => {
    const [mydata, setMydata] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const loadData = async () => {
        try {
            const api = "http://localhost:3000/products/productAll";
            const response = await axios.get(api);
            setMydata(response.data);
            setFilteredData(response.data);
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

    const handleFilterChange = () => {
        let filtered = mydata;

        if (category) {
            filtered = filtered.filter(item => item.category === category);
        }

        if (subcategory) {
            filtered = filtered.filter(item => item.subcategory === subcategory);
        }

        if (priceRange) {
            const [min, max] = priceRange.split('-').map(Number);
            filtered = filtered.filter(item => item.price >= min && item.price <= max);
        }

        if (searchTerm) {
            filtered = filtered.filter(item => 
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredData(filtered);
    };

    useEffect(() => {
        handleFilterChange();
    }, [category, subcategory, priceRange, searchTerm, mydata]);

    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleSubcategoryChange = (e) => setSubcategory(e.target.value);
    const handlePriceRangeChange = (e) => setPriceRange(e.target.value);
    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    return (
        <Container fluid className="shop-container">
            <Row>
                <Col md={3} className="filter-column">
                    <h3>Filters</h3>
                    <Form>
                        <Form.Group controlId="searchInput" className="mb-3">
                            <Form.Label>Search</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="categorySelect" className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" value={category} onChange={handleCategoryChange} className="filter-select">
                                <option value="">All</option>
                                <option value="men">Menswear</option>
                                <option value="women">Womenswear</option>
                                <option value="kids">Kidswear</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="subcategorySelect" className="mb-3">
                            <Form.Label>Subcategory</Form.Label>
                            <Form.Control as="select" value={subcategory} onChange={handleSubcategoryChange} className="filter-select">
                                <option value="">All</option>
                                <option value="casual">Casual</option>
                                <option value="formal">Formal</option>
                                <option value="sports">Sports</option>
                                <option value="accessories">Accessories</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="priceRangeSelect" className="mb-3">
                            <Form.Label>Price Range</Form.Label>
                            <Form.Control as="select" value={priceRange} onChange={handlePriceRangeChange} className="filter-select">
                                <option value="">All</option>
                                <option value="0-499">0 - 499</option>
                                <option value="500-999">500 - 999</option>
                                <option value="1000-1999">1000 - 1999</option>
                                <option value="2000-6000">2000 - 6000</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={9} className="product-column">
                    <h1>New Arrivals</h1>
                    <div id="cardData" className="card-container">
                        {filteredData.map((item) => (
                            <Card key={item.id} className="product-card">
                                <Card.Img variant="top" src={item.image} className="product-image" alt={item.name} />
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{item.category} - {item.subcategory}</Card.Subtitle>
                                    <Card.Text className="card-details">
                                        {item.description}
                                        <br />
                                        <span className="product-price">Price: ₹{item.price}</span>
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
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;
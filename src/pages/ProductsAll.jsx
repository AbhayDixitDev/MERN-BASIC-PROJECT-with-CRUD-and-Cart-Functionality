import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';

const ProductsAll = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products/productAll');
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const handleAddProduct = async (product) => {
    try {
      await axios.post('http://localhost:3000/products/productSave', product);
      loadProducts();
      handleCloseModal();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleEditProduct = async (product) => {
    try {
      await axios.put(`http://localhost:3000/products/edit/${product._id}`, product);
      loadProducts();
      handleCloseModal();
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/delete/${id}`);
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleShowModal = (product = {}) => {
    setCurrentProduct(product);
    setIsEditing(!!product._id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentProduct({});
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      handleEditProduct(currentProduct);
    } else {
      handleAddProduct(currentProduct);
    }
  };

  return (
    <Container>
      <h1 className="my-4">Products Management</h1>
      <Button variant="primary" onClick={() => handleShowModal()} className="mb-3">
        Add New Product
      </Button>
      <Row>
        {products.map((product) => (
          <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card style={{ width: '18rem', height: '100%' }}>
              <Card.Img variant="top" src={product.image} style={{ height: '200px', objectFit: 'fit' }} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="flex-grow-1">
                  {product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description}
                  <br />
                  Price: ₹{product.price}
                  <br />
                  Category: {product.category}
                </Card.Text>
                <div>
                  <Button variant="info" onClick={() => handleShowModal(product)} className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteProduct(product._id)}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Product' : 'Add New Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label style={{color:"black"}}>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={currentProduct.name || ''}
                onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{color:"black"}}>Price (₹)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={currentProduct.price || ''}
                onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{color:"black"}}>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter product description"
                value={currentProduct.description || ''}
                onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{color:"black"}}>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={currentProduct.category || ''}
                onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{color:"black"}}>Subcategory</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter subcategory"
                value={currentProduct.subcategory || ''}
                onChange={(e) => setCurrentProduct({ ...currentProduct, subcategory: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{color:"black"}}>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={currentProduct.image || ''}
                onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {isEditing ? 'Update Product' : 'Add Product'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProductsAll;

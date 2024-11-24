import { useSelector, useDispatch } from "react-redux";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaPlusCircle, FaMinusCircle, FaTrash } from "react-icons/fa";
import { qntyInc, qntyDec, removeFromCart } from "../cartSlice";
import './Cart.css';

const Cart = () => {
    const MyCart = useSelector(state => state.mycart.cart);
    const dispatch = useDispatch();

    const qtyIncrement = (id) => {
        dispatch(qntyInc({id: id}));
    }

    const qtyDecrement = (id) => {
        dispatch(qntyDec({id: id}));
    }

    const removeItem = (id) => {
        dispatch(removeFromCart({id: id}));
    }

    const Data = MyCart.map((item) => (
        <tr key={item.id}>
            <td><img src={item.image} width="100" height="100" alt={item.name} /></td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.category}</td>
            <td>{item.price}</td>
            <td>
                <Button variant="link" onClick={() => qtyDecrement(item._id)}>
                    <FaMinusCircle />
                </Button>
                <span className="mx-2 fw-bold">{item.qnty}</span>
                <Button variant="link" onClick={() => qtyIncrement(item._id)}>
                    <FaPlusCircle />
                </Button>
            </td>
            <td>{item.price * item.qnty}</td>
            <td>
                <Button variant="danger" onClick={() => removeItem(item._id)}>
                    <FaTrash />
                </Button>
            </td>
        </tr>
    ));

    const grandTotal = MyCart.reduce((total, item) => total + item.price * item.qnty, 0);

    return (
        <div className="cart-container">
            <h1 className="cart-title">My Shopping Cart</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Data}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="6" className="text-end fw-bold">Grand Total:</td>
                        <td colSpan="2" className="fw-bold">{grandTotal}</td>
                    </tr>
                </tfoot>
            </Table>
        </div>
    );
}

export default Cart;
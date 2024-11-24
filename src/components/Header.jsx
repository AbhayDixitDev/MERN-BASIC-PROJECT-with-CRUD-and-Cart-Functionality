import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
//apply dark mode

import "../pages/style.css"
const Header=()=>{
  const mycart= useSelector(state=>state.mycart.cart);
  //  console.log(mycart);
  const navigate= useNavigate();


   const cartPage=()=>{
    navigate("/cart");
   }

  const cartLen= mycart.length;

  document.body.classList="dark-mode";

    return(
        <>
          <div id="header">

          <a href="#" onClick={cartPage} style={{ position: 'relative' }}>
            <FaShoppingCart className="space" />
            {cartLen > 0 && (
              <span id="carticon" >
                {cartLen}
              </span>
            )}
          </a>

          <GrUserAdmin  className="space"  />
          <FaSearch  className="space"/>
          </div>
        </>
    )
}
export default Header;
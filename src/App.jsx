import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Menswear from "./pages/Menswear"; // Importing the new Menswear component
import Womenswear from "./pages/womenswear";
import Kidswear from "./pages/Kidswear";
import Shop from "./pages/Shop";
import Products from "./pages/ProductsAll";

const App=()=>{
  return(
    <>
         <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
           <Routes>
             <Route path="/" element={<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path="home" element={<Home/>}/>
              <Route path="cart" element={<Cart/>}/> 
              <Route path="menswear" element={<Menswear/>}/> 
              <Route path="womenswear" element={<Womenswear/>}/>
              <Route path="kidswear" element={<Kidswear/>}/>
              <Route path="shop" element={<Shop/>}/>
              <Route path="products" element={<Products/>}/>
             </Route>
           </Routes>
         </BrowserRouter>
        
    </>
  )
}

export default App;
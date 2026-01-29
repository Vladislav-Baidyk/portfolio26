import { useState } from 'react'
import data from "./assets/data.json"
import './App.css'

function App() {
  const [cart, setCart] = useState([]);
    const [all,setAll] = useState(0);
const addToTheCart = (index) => {
if (!cart.find(item => item.id === index)) {
      setCart([...cart, { id: index, quantity: 1 }]);
    }
  };
const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  }
  return (
    <>
    <div className="container">
      <div className="left-part">
        <div className="header-left-part">Deserts</div>
        <div className="content-left-part">
          {data.map((product,index) => (
            <div key={index} className='container-product'>
              <div className="header-container-product">
                <img src={product.image.desktop} alt="image" className='image desktop'/>
                <img src={product.image.tablet} alt="image" className='image tablet'/>
                <img src={product.image.mobile} alt="image" className='image mobile'/>
                <button className={`button-add-to-the-cart ${cart.find(item => item.id === index) ? "added" : "not-yet"}` } onClick={() => addToTheCart(index)}>
              {!cart.find(item => item.id === index) ? (
                <div><p>add to the cart</p></div>
              ) :
               (
                <div className="container-buttons-product">
                  <button onClick={() =>  operationFunc(index,1)}>+</button>
                  <button onClick={() => operationFunc(index,0)}>-</button>
                </div>
               )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="right-part">
        {cart.map((product,index) => (
          <div key={index}>
            <p>{data[product.id].name}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default App

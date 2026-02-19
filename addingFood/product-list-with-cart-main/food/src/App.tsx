import { useState } from 'react'
import dataJson from "./assets/data.json"
import './App.css'

function App() {

const [items, setItems] = useState(() => 
    dataJson.map(item => ({
      ...item,
      quantity: 0
    }))
  );

  const manipulation = (name,delta) =>{
    setItems(prev => prev.map(item =>
       item.name === name
      ? {...item,quantity:Math.max(0,item.quantity + delta)}
      : item
    ));
  };
  const basket = items.filter(item => item.quantity > 0);
  const deleteItem = (name) =>{
    setItems(prev => prev.map(item =>
      item.name === name
      ?
      {...item,quantity:0}
      : 
      item
    ))
  }
  const show = () => {
    console.log(basket);
  }
  return (
    <>
    <div className="container">
      <div className="left-part">
        <h1>Deserts</h1>
        <div className="left-part-container">
                  {items.map((item,index) => (
          <div className='product' key={index}>
            <img className={`${item.quantity > 0 ? "image desktop border" : "image desktop"}`} src={item.image.desktop} alt="image desktop" />
            <img className={`${item.quantity > 0 ? "image tablet border" : "image tablet"}`} src={item.image.tablet} alt="image tablet" />
            <img className={`${item.quantity > 0 ? "image mobile border" : "image mobile"}`} src={item.image.mobile} alt="image mobile" />
          {item.quantity > 0 ? 
          <div className='container-buttons'>
            <button className='manipulation' onClick={() => manipulation(item.name,+1)}><img src="./assets/icon-increment-quantity.svg" alt="add" /></button>
            <p>{item.quantity}</p>
            <button className='manipulation' onClick={() => manipulation(item.name,-1)}><img src="./assets/icon-decrement-quantity.svg" alt="dec" /></button>
          </div>
        :
        <div  className='add-to-cart' onClick={() => manipulation(item.name,+1)}>
          <img src="./assets/icon-add-to-cart.svg" alt="korzuna" />
          add to the cart</div>}
          <p className='category'>{item.category}</p>
          <h1 className='name'>{item.name}</h1>
          <h1 className='price'>${item.price}</h1>
          </div>
        ))}
        </div>
      </div>
      <div className="right part">
        {items.filter(item => item.quantity > 0) ? 
        <div className='container-basket'>
          <p>hello</p>
          <button onClick={() =>  show()}></button>
        </div>
      :
      <div className='container-basket-empty'>
        <h1>Your Cart(0)</h1>
        <img src="./assets/illustration-empty-cart.svg" alt="empty" />
        <p>Your added items will appear here</p>
        </div>}
      </div>
    </div>
    </>
  )
}

export default App

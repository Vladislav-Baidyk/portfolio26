import { useEffect, useState } from 'react'
import './App.css'
import logo from "./assets/pikachu.png"
import background from "./assets/pokemon-background.jpg"

function App() {
  const [items,setItems] = useState([]);
  const [visible,setVisible] = useState(10);
  const [favorites,setFavorites] = useState([]);
  const [filterPrice, setFilterPrice] = useState(null);
  const [find,setFind] = useState("");
  const url = "https://pokeapi.co/api/v2/item?limit=2000";
  const getRarity = (cost) => {
    if(cost > 5000) return 'legendary';
    if(cost >= 1000) return 'rare';
    else return 'common';
  }


  useEffect(() =>{
    const fetchItem = async () =>{
      try{
        const response = await fetch(url);
        const data = await response.json();
        const dataDetails = data.results.slice(0,20).map(item => fetch(item.url).then(res => res.json()));
        const dataAll = await Promise.all(dataDetails);
        setItems(dataAll);
      }
      catch(err){
        console.log("Error appears");
      }
    }
    fetchItem(); 
  },[])

  const loadMore = async () =>  {
    try{
      const nextIndex = visible + 20;
      const response = await fetch(url);
      const data = await response.json();
      const dataDetails = data.results.slice(visible,nextIndex).map(item => fetch(item.url).then(res => res.json()));
      const dataAll = await Promise.all(dataDetails);  
      setItems(prev => [...prev, ...dataAll]);
      setVisible(nextIndex);
    }
    catch(err){
      console.log("Error appears");
    }
  }

  const addToFavorite = (yourItem) =>{
    setFavorites(prev => [...prev,...yourItem]);
  }
  const displayItems = items
  .filter(item => {
    if (!filterPrice) return true;
    if (filterPrice === 5000) return item.cost > 5000; 
    if (filterPrice === 1000) return item.cost >= 1000 && item.cost <= 5000;
    if (filterPrice === 999) return item.cost < 1000; 
    return true;
  })
  .filter(item => item.name.toLowerCase().includes(find.toLowerCase()));
  
  const findYour = items.filter(item => item.name.toLowerCase().includes(find.toLowerCase()));
  return (
    <>
    <div className="container">
        <div className="header">
    <div className="input-container">
      <img src={logo} alt="logo" className='logo' />
      <input type="text" onChange={(e) => setFind(e.target.value)} className='search' placeholder='Write your item ...'/>
    </div>
    </div>
    <div className="main">
         <div className="background-container">
      <img src={background} alt="back" />
      <h1>FIND YOUR<br/> POKEMON ITEM</h1>
    </div>
<div className="categories">
           <button className='btn' onClick={() => setFilterPrice(null)}>All</button>
           <button className="legendary btn" onClick={() => setFilterPrice(5000)}>Legendary</button>
           <button className="rare btn" onClick={() => setFilterPrice(1000)}>Rare</button>
           <button className="common btn" onClick={() => setFilterPrice(999)}>Common</button>
        </div>
    
        <div className='grid'>
          {displayItems.map((item,index) => (
                <div className={`card ${getRarity(item.cost)}`} key={index}>
              <div className="card-content">
                <div className="picture">
                  <img src={item.sprites?.default} alt="picture-card" className='card-picture' />
                </div>
                <div className="text">
              <h1>{item.name}</h1>
              <p>Category {item.category.name}</p>
              <h1>Cost : {item.cost}pt</h1>
              <button onClick={() => addToFavorite(item)} className='add-favorite'>Add to favourite</button>
                </div>
              </div>
              </div>
          ))}
                    <button onClick={() => loadMore()}>load</button>

          </div>
      
    </div>
    <div className="footer"></div>
    </div>
    </>
  )
}

export default App

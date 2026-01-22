import { useEffect, useState } from 'react'

import './App.css'

function App() {
const url = "https://www.dnd5eapi.co/api/equipment-categories/weapon"
const [weapons,setWeapons] = useState([])
const [damage,setDamage] = useState("");
const [amount,setAmount] = useState(20);
useEffect(() => {
  const fetchWeapons = async () =>{
    try{
      const response = await fetch(url); 
      const data = await response.json();

      const details = data.equipment.slice(0,10).map(d => fetch(`https://www.dnd5eapi.co${d.url}`).then(res => res.json()));
      const detailsWeapon= await Promise.all(details);
      setWeapons(detailsWeapon);
    }
    catch(err){
      console.log("error")
    }
  }
  fetchWeapons();
},[])

const loadmore = async () =>{
  try{
    const nextIndex = amount + 20;
    const response = await fetch(url);
    const data = await response.json();
    const details = data.equipment.slice(amount,nextIndex).map(d => fetch(`https://www.dnd5eapi.co${d.url}`).then(res => res.json()));
    const detailsWeapon = await Promise.all(details);
    setWeapons(detailsWeapon);
  }
  catch(err){
    console.log("error");
  }
}
  return (
    <>
  {weapons.map((weapon,index) => (
    <div key={index} >{weapon.name}</div>
  ))}
  <button onClick={() => loadmore()}></button>
    </>
  )
}

export default App

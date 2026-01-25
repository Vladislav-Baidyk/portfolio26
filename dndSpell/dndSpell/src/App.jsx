import { use, useEffect, useState } from 'react'
import './App.css'
import searchLogo from './assets/search.png'
import cross from './assets/cross.png'
function App() {
  const [spells,setSpells] = useState([])
  const [visible,setVisible] = useState(20);
  const [selected,setSelected] = useState("");
  const [school,setSchool] = useState("");
  const [clickedSpell,setClicked] = useState(null);
  const url = "https://www.dnd5eapi.co/api/spells";

  useEffect(() => {
    const fetchSpells = async () =>{
      try{
        const response = await fetch(url);
        const data = await response.json();

        const details =  data.results.slice(0,10).map(s => fetch(`https://www.dnd5eapi.co${s.url}`).then(res => res.json()));
        const detailedSpells = await Promise.all(details);
        setSpells(detailedSpells);
      }
      catch(err){
        console.log("error");
      }
    }
    fetchSpells();
  },[])

  const loadMore = async () =>{
    try{
      const nextIndex = visible +10;
              const response = await fetch(url);
        const data = await response.json();

        const details =  data.results.slice(visible,nextIndex).map(s => fetch(`https://www.dnd5eapi.co${s.url}`).then(res => res.json()));
        const detailedSpells = await Promise.all(details);
        setSpells(prev => [...prev,...detailedSpells]);
        setVisible(nextIndex);
    }
    catch(err){
      console.log("data")
    }
  }
const displaySpells = spells.filter(s => {
  const matchesName = s.name.toLowerCase().includes(selected.toLowerCase());
  const matchesSchool = school === "" || s.school.name.toLowerCase() === school.toLowerCase();
  return matchesName && matchesSchool;
});


  return (
    <>
  <div className='container'>
    <div className="header">
      <div className='search-container'>
              <img src={searchLogo} alt="search" className='search-logo' />
              <input className='search' type="text" placeholder='write a spell...' onChange={(e) => setSelected(e.target.value)} />

      </div>
   
<div className="schools-filter">
        <button onClick={() => setSchool("") } className={school === "" ? "active" : "basic"}>All</button>
        <button onClick={() => setSchool("abjuration")} className={school === "abjuration" ? "active" : "basic"}><div className='sphere blue'></div> Abjuration</button>
        <button onClick={() => setSchool("conjuration")} className={school === "conjuration" ? "active" : "basic"}><div className='sphere green'></div>Conjuration</button>
        <button onClick={() => setSchool("divination") } className={school === "divination" ? "active" : "basic"}><div className='sphere yellow'></div>Divination</button>
        <button onClick={() => setSchool("evocation")} className={school === "evocation" ? "active" : "basic"}><div className='sphere red'></div>Evocation</button>
        <button onClick={() => setSchool("illusion")} className={school === "illusion" ? "active" : "basic"}><div className='sphere purple'></div>Illusion</button>
          <button onClick={() => setSchool("transmutation")} className={school === "transmutation" ? "active" : "basic"}><div className='sphere pink'></div>Transmutation</button>
      </div>
    </div>
    <div className="main">
      <div className={clickedSpell ? "right-part-main half" : "right-part-main full"}>
      {displaySpells.map((spell, index) => (
            <div className={clickedSpell?.index === spell.index ? 'container-box base highlight': 'container-box base'} onClick={() => setClicked(spell)} key={index}>
              <h1>{spell.name}</h1>
              <p className='level-box'><div className={`sphere-box ${spell.school.name.toLowerCase()}`}></div> {spell.level}rd level</p>
              <div className="casting-box">
              <div className="casting-box-container">
                <p>CASTING TIME</p>
                <h1>{spell.casting_time}</h1>
              </div>
                            <div className="casting-box-container">
                <p>RANGE</p>
                <h1>{spell.range}</h1>
              </div>
              </div>
            </div>
          ))}

        <button className='load-more' onClick={() => loadMore()}>load more</button>
      </div>
      <div className={clickedSpell ? "left-part-main left-half": "left-part-main-hide"}>
        {clickedSpell ? 
        <div className='spell-box-selected'>
          <div className="header-spell-box">
            <h1>Spell Details</h1>
            <button onClick={() => hideSelect()}>  <img src={cross} alt="cross" className='cross' /></button>
          </div>
          <div className="spell-box-content">
            <div className={`spell-box-content-main-info ${clickedSpell.school.name.toLowerCase()} blur-effect`}>
              <h1>{clickedSpell.name}</h1>
              <p className>{clickedSpell.level}rd level {clickedSpell.school.name}</p>
              <div className="spell-box-content-main-info-grid">
                <div className="boxes-clicked-spell"><h1>CASTING TIME</h1><p>{clickedSpell.casting_time}</p></div>
               <div className="boxes-clicked-spell"><h1>RANGE</h1><p>{clickedSpell.range}</p></div>
         <div className="boxes-clicked-spell"><h1>COMPONENTS</h1>
         <div className="components">
          {clickedSpell.components.map((comp,index)=>(
            <div className="component-box" key={index}>
              <p>{comp}</p>
            </div>
          ))}
         </div>
         </div>
 <div className="boxes-clicked-spell"><h1>DURATION</h1><p>{clickedSpell.duration}</p></div>
              </div>
            </div>
          </div>
        </div>
        : <div>3113</div>}
      </div>
    </div>
    <div className="footer"></div>
  </div>
    </>
  )
}


export default App

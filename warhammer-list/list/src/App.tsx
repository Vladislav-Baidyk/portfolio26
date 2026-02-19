import { useState } from 'react'
import './App.css'
import dataJson from "./assets/data.json";
import logo from "./assets/html-5.png";
import theme from "./assets/night-mode.png";
function App() {
  //manipulation of some visible objects
  const[choose,setChoose] = useState(false);
  const [themeL,setThemeL] = useState(false);
  const [openFract,setOpenFract] = useState(false);

  //arrays of all data
  const [selectedFaction, setSelectedFaction] = useState(null);
  const [currentUnits, setCurrentUnits] = useState([]);

  //keywords arrays as characters, battleline , transport ...
  const [characters,setCharacters] = useState(null);
  const [battleline,setBattleline] = useState(null);
  const [transport,setTransport] = useState(null);
  const [units,setUnits] = useState(null);

//fraction
    const chooseFraction =(factionKey:string) => {
  const factionData = dataJson.warhammer_40k_datasheets[factionKey];
  if(factionData){
    setCurrentUnits(factionData);
    setSelectedFaction(factionKey);
    setChoose(false);
    setCharacters(factionData.characters);
    setBattleline(factionData.battleline);
    setTransport(factionData.transport);
    setUnits(factionData.units);
  }
  };
  //deleting the list
  const deleteAll = () => {
    setSelectedFaction(null);
  }
  return (
    <>
    <div className="container">
      <div className={`header ${themeL ? "header-light" : "header-dark"}`}>
        <div className="logo-container">
          <img src={logo} alt="logo" className='logo' />
          <p>TACTICAL DATA-SLATE W40.K<br/> <span>LIST TRACKER // SEGMENTUM SOLAR</span></p>
        </div>
        <div className="light-change">
          <img src={theme} alt="theme" className='logo'  onClick={()=> setThemeL(!themeL)} />
        </div>
      </div>
      <div className="main">
        {choose ? (
          <div>
            <div className="characters">
           {characters?.map((index,unit) => (
            <div className='container-characters' key={index}>
              <div className="header-container">Characters</div>
              <div className='unit'> 
                <h1>{unit.name}</h1>
                <p>Points cost</p>
              </div>
            </div>
           ))}
            </div>
          </div>
        ):
        <div className={`not-choosen ${themeL ? "light" : "dark"}`}>
          {openFract ?
           (<div className='faction-container'>
            <button onChange={() => chooseFraction('tau_empire') }>Tau Empire</button>
            <button onChange={() => chooseFraction('thousand_sons') }>Thousand Sons</button>
            <button onChange={() => chooseFraction('leagues_of_votann') }>Leagues Of Votann</button>
           </div>)
           : 
           (<button className='button-create' onClick={() => setOpenFract(true)}>Create?</button>)}
         </div>}
      </div>
      <div className="footer"></div>
    </div>
    </>
  )
}

export default App

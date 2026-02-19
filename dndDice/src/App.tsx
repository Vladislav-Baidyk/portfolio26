import { use, useState } from 'react'
import './App.css'
import "./index.css"
import pictures from "./assets/pictures.json"


function App() {

  const [diceToSave,setDiceToSave] = useState(0);
  
  const [number,setNumber] = useState(0);
  const [skill,setSkill] = useState(2);
  const [s,setS] = useState(4);
  const [t,setT] = useState(4);
  const [lethal,setLetahal] = useState(false);
  const [sustained,setSustained] = useState(0);

  /* function for calculating a dice roll*/
  const calculateWarhammerStats = (
) => {

  const pHit = (7 - skill) / 6;
  const pSix = 1 / 6;

  let pWoundThreshold = 4;
  if (s >= 2 * t) pWoundThreshold = 2;
  else if (s > t) pWoundThreshold = 3;
  else if (s === t) pWoundThreshold = 4;
  else if (s <= t / 2) pWoundThreshold = 6;
  else if (s < t) pWoundThreshold = 5;

  const pWound = (7 - pWoundThreshold) / 6;

  let hitsToWound = number * (pHit - (lethal ? pSix : 0));
  hitsToWound += (number * pSix * sustained);

  const autoWounds = lethal ? (number * pSix) : 0;

  const finalWounds = (hitsToWound * pWound) + autoWounds;

  return setDiceToSave(finalWounds.toFixed(2));
};  
  const checkSus = () => {
    if(sustained > 0){
      setSustained(prev => prev -1);
    }
  }
  return (
    <>
  <div className="container">
    <div className="header">
      <img src={pictures.pictures[0].path} alt="dice" />
      <div className="header-text">
        <h1>Dice probability</h1>
        <p>Free to use</p>
      </div>
    </div>
    <div className="main">
      <div className="left-container">
        <div className="left-container-top">
          <div className="attack-profile">
            <h1 className='header-left green'><img src={pictures.pictures[1].path} alt="attack"  /> Attacker Profile</h1>
          <div className="nubmer-of-dice">
            <h1 className='header-text-skill'>Number of dice : <input type="text" onChange={e => setNumber(Number(e.target.value))} placeholder={number}/></h1>
          </div>
          <div className="skills">
            <div className="skill">
              <h1 className='header-text-skill'>Weapon skill:</h1>
              <input type="text"  onChange={(e) => setSkill(Number(e.target.value))} placeholder={skill}/>
            </div>
            <div className="skill">
              <h1 className='header-text-skill'>Strength:</h1>
              <input type="text" onChange={(e) => setS(Number(e.target.value))} placeholder={s}/>
            </div>
          </div>
          </div>
          <div className="defender">
            <h1 className='header-left red'><img src={pictures.pictures[2].path} alt="defense" /> Defender Profile</h1>
          <div className="skills">
            <div className="skill">
              <h1 className='header-text-skill'>Tougness:</h1>
              <input type="text"  onChange={(e) => setT(Number(e.target.value))} placeholder={t}/>
            </div>
          </div>
          </div>
        </div>
        <div className="roll" onClick={() => calculateWarhammerStats(number,skill,s,t,lethal,sustained)}>Roll?</div>
      </div>
      <div className="mid-container">
        <h1>Average saves for enemy</h1>
        <p>{diceToSave}</p>
      </div>
      <div className="right-container">
        <div className="sustained">
          <button onClick={() => setSustained(sustained +1)}>+</button>
          <button >Susatined Hits {sustained}</button>
          <button onClick={() => checkSus()}>-</button>
        </div>
        <div className={`lethal  ${lethal ? "lethal-on" : '' }`} onClick={() => setLetahal(!lethal) }><p>Lethal hits</p></div>

        
      </div>
    </div>
    <div className="footer"></div>
  </div>
    </>
  )
}

export default App

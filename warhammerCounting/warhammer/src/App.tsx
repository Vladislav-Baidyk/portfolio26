import { use, useState } from 'react'
import './App.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import missions from "./assets/missions.json"
import 'swiper/css';
import 'swiper/css/navigation';

function App() {
const [primary,setPrimary] = useState(null);
const [fixed,setFixed] = useState([]);
const [fixed2,setFixed2] = useState([]);
const shuffled = [...missions.secondaryMissions].sort(() => Math.random() -0.5);
const shuffled2 = [...missions.secondaryMissions].sort(() => Math.random() -0.5);
const [deployment,setDeployment] = useState(null)
const randomPrimary = () => {
  const randomArray = missions.primaryMissions[Math.floor(Math.random() * missions.primaryMissions.length )];
  setPrimary(randomArray);
  randomDeployment();
  setFixed(shuffled);
  setFixed2(shuffled2);
}
const randomDeployment = () => {
  const random = missions.deployments[Math.floor(Math.random() *missions.deployments.length)];
  setDeployment(random)
}
const [inputs,setInputs] = useState([0,0,0,0,0,0,0,0,0,0]);
const [inputs2,setInputs2] = useState([0,0,0,0,0,0,0,0,0,0]);

const [player1,setPlayer1] = useState(0);
const [player2,setPlayer2] = useState(0);

const [primary1,setPrimary1] = useState([0,0,0,0,0]);
const [primary2,setPrimary2] = useState([0,0,0,0,0]);

const updateValue = (player, index, val) => {
    const num = Number(val) || 0;
    if (player === 1) {
      const newArr = [...inputs];
      newArr[index] = num;
      setInputs(newArr);
    } else {
      const newArr = [...inputs2];
      newArr[index] = num;
      setInputs2(newArr);
    }
  };
  const updatePrimaryValue = (player, index, val) => {
    const num = Number(val) || 0;
    if (player === 1) {
      const newArr = [...primary1];
      newArr[index] = num;
      setPrimary1(newArr);
    } else {
      const newArr = [...primary2];
      newArr[index] = num;
      setPrimary2(newArr);
    }
  };
  const calculateAll = () => {
const secondarySum1 = inputs.reduce((a, b) => a + b, 0);
  const primarySum1 = primary1.reduce((a, b) => a + b, 0);
  setPlayer1(secondarySum1 + primarySum1);

  const secondarySum2 = inputs2.reduce((a, b) => a + b, 0);
  const primarySum2 = primary2.reduce((a, b) => a + b, 0);
  setPlayer2(secondarySum2 + primarySum2);
  };

  const [fraction1,setFraction1] = useState("")
  const [fraction2,setFraction2] = useState("");
  return (
    <>
    <div className="container">
    <div className="header">
            <button className='start-battle' onClick={() => randomPrimary()}> click</button>
    <h1>Start the game</h1>
  
    </div>
    <div className="main">
      <h1 className='missions-header'> all Missions:</h1>
          <Swiper 
          className='my-swiper' 
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1.2}
          centeredSlides={true}
        >
          {fixed.map((mission, index) => (
            <SwiperSlide key={index}>
              <div className="card seconds">
                <h1>{mission.name}</h1>
                <p>Secondary Objective</p>
                <p>{mission.goal}</p>
                <p>{mission.vp}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        

        <h1 className='missions-header'>Battle game :</h1>
             {primary ? (
      <div className='card primary'>
        <h1>{primary.name}</h1>
        <p>Primary mission</p>
        <p>{primary.description}</p>
        <p>{primary.details}</p>
      </div>
    ):
    <div>
        <p>primary</p>
      </div>}
      {deployment ? (
        <div className='card deployment'>
          <img src={deployment.picture} alt="picture" />
        </div>
      ) :
      (
        <p>deployment</p>
      )}

    <div className="rachunok">
      <div className="player">
        <input type="text" className='name-fraction' onChange={(e) => setFraction1(e.target.value)} />
      </div>
      <div className="score">
        <input type="number" value={player1}  disabled />
         <input type="number" value={player2}  disabled />
      </div>
      <div className="player">
        <input type="text" className='name-fraction' onChange={(e) => setFraction2(e.target.value)}/>
      </div>

    </div>
      <div className="container-main">
                  
        {/*player 1 */}
                <div className="player-container">
          <div className="player-header-container">
            <div className="player-header-top">
              <input type="name" className='name-fraction' placeholder='fraction' value={fraction1} disabled />
              <h1 className='name-fraction'>{primary?.name}</h1>
              
            </div>
            <div className="player-header-bot">
              {primary1.map((input,index) => (
                  <div className='numbers primary-container' key={index}>
                    <h1>{index+1} round : </h1>
                <input type="number" onChange={(e) => updatePrimaryValue(1,index,e.target.value)} />
             
             </div>
             ))}
            </div>
          </div>
          <div className="content">
        <div className="left-container">
         <h1 className='name-fraction'>Secondary Mission</h1>
         {fixed.slice(0,10).map((missions,index) => (
          <div key={index} className='mission'>{missions.name}</div>
         ))}
        </div>
        <div className="right-container">
          {inputs.map((input,index) => (
            <div className='numbers' key={index}>
              <input type="number" onChange={(e) => updateValue(1,index,e.target.value)} />
            </div>
          ))}
        </div>
        </div>
</div>

        {/*player 2 */}
<div className="player-container">
          <div className="player-header-container">
            <div className="player-header-top">
              <input type="name" className='name-fraction' placeholder='fraction' value={fraction2} disabled />
              <h1 className='name-fraction'>{primary?.name}</h1>
              
            </div>
            <div className="player-header-bot">
              {primary2.map((input,index) => (
                  <div className='numbers primary-container' key={index}>
                    <h1>{index+1} round : </h1>
                <input type="number" onChange={(e) => updatePrimaryValue(2,index,e.target.value)} />
             
             </div>
             ))}
            </div>
          </div>
          <div className="content">
        <div className="left-container">
         <h1 className='name-fraction'>Secondary Mission</h1>
         {fixed2.slice(0,10).map((missions,index) => (
          <div key={index} className='mission'>{missions.name}</div>
         ))}
        </div>
        <div className="right-container">
          {inputs.map((input,index) => (
            <div className='numbers' key={index}>
              <input type="number" onChange={(e) => updateValue(2,index,e.target.value)} />
            </div>
          ))}
        </div>
        </div>
</div>
      </div>
        {/*submit */}
        <button className='submit' onClick={() => calculateAll()}>Sum up</button>


    </div>

    </div>

    </>
  )
}

export default App

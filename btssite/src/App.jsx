import { useState } from 'react'
import './App.css'
import logo from './assets/images/logo.png'
import arrow from './assets/images/right-arrow.png'
import bts from './assets/bts.json'
import play from './assets/images/right-arrow (1).png'
import earth from './assets/images/earth.png'
function App() {

  const [clickedArmy,setClickArmy] =useState(false);
  const [viewAll,setViewAll] = useState(false);

  const [selectedMember,setSelectedMember] = useState(null);
  const handleMemberClick = (index) =>{
    if(selectedMember === index){
      setSelectedMember(null);
    }
    else{
      setSelectedMember(index);
    }
  }
  return (
    <>
    <div className='container'>
      <div className='header'>

        <div className='navigation-container'>
          <div className='logo-container'>
            <img src={logo} alt="logo" />
            <h1 className='logo-text'>BTS.PORTAL</h1>
          </div>
        <nav className='navigation'>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#tour">Tour</a></li>
          </ul>
        </nav>
        <button className='join-army' onClick={() => setClickArmy(!clickedArmy)}>JOIN ARMY</button>
        </div>

        <div className='board-container'>
          <h1>BEYOND THE<br />  SCENE</h1>
          <p>A digital through the world of global icons. Exclusive content, archived<br/>memories, and the future of the ARMY.</p>
          <div className="buttn-container-board">
            <button className='buttn-board-enter'>ENTER THE ARCHIVE <img src={arrow} alt="arrow" /></button>
           <button className='buttn-board-comeback'>LATEST CAMEBACK</button>

          </div>
        </div>
      </div>
      <div className='main'>
        <div id='home' className='home'>
          <div className='left-home'>
           <h1>The Members</h1>
            <div className='members'>


              {viewAll ?            
                  bts.map((member,index) =>(
                <div onClick={() => handleMemberClick(index)} className='member-box' key={index}>
                  <img src={member.photo} className={selectedMember === index ? 'member-box-image-hide' : 'member-box-image'} alt={member.name}  />
                  <p className={selectedMember === index ? 'member-box-image-hide' : 'name'}>{member.name}</p>

            {selectedMember === index && (
              <div className='member-details'>
                <p>Role: {member.role}</p>
                <p>Birthday: {member.birthday}</p>
                <p>Status: {member.isMarried ? "Married" : "Single"}</p>
              </div>
            )}
          </div>
               


              ))
              :
                   
                    bts.slice(0,3).map((member,index) =>(
                <div onClick={() => handleMemberClick(index)} className='member-box' key={index}>
                  <img src={member.photo} className={selectedMember === index ? 'member-box-image-hide' : 'member-box-image'} alt={member.name}  />
                  <p className={selectedMember === index ? 'member-box-image-hide' : 'name'}>{member.name}</p>

            {selectedMember === index && (
              <div className='member-details'>
                <p>Role: {member.role}</p>
                <p>Birthday: {member.birthday}</p>
                <p>Status: {member.isMarried ? "Married" : "Single"}</p>
              </div>
            )}
          </div>
              ))
              }

            <button className= {viewAll ?  'viewAll-lower' :'viewAll' }   onClick={() => setViewAll(!viewAll)}>{viewAll ? <p>Hide</p> : <p>View all</p>}</button>

            </div>

              <div className="videoContainer">
                <div className="videoContainer-left">
                  <div className="video-fake">
                    <div className="play-video-container">
                  <a href="https://www.linkedin.com/in/baidyk-vladyslav-abb221310/"><img className='play-video' src={play} alt="play" /></a>                      
                    </div>
                  </div>
                </div>
                <div className="videoContainer-right">
                  <p className='release'>NEW RELEASE</p>
                  <p className='beyond-story'>Beyond the Story: 10th Aniversary</p>
                  <p className='text'>
                    The difinitive oral history of BTS: Explore the memories<br/>
                    challanges,and triumps of a decade together.
                  </p>
                  <p className='explore'>EXPLORE CHAPTER</p>                 
                </div>
              </div>

          </div>
          <div className="right-home">
            <div className="first-part-right-home">
                          <div className="first-part-right-home-content">
                            <h1 className='header-earth'><img className='earth' src={earth} alt="world" />World Tour Schedule</h1>
                            <div className="firt-part-container-text">
                            <div className='left-part-container-first-part'>
                              <div className='dot pink'></div>
                              <div className='line'></div>
                            </div>
                            <div className='right-part-container-first-part'><p><span style={{color:"#FF33CC"}}>LIVE NOW</span></p>
                            <h1>Seoul,South Korea</h1>
                            <p>
                              Olympic Stadium , Oct 24-26</p></div>
                            </div>
                               <div className="firt-part-container-text">
                            <div className='left-part-container-first-part'>
                              <div className='dot gray'></div>
                              <div className='line'></div>
                            </div>
                            <div className='right-part-container-first-part'><p>UPCOMMING</p>
                            <h1>Tokyo, Japan</h1>
                            <p>
                              Tokyo Dome, Nov 10-12</p></div>
                            </div>
                               <div className="firt-part-container-text">
                            <div className='left-part-container-first-part'>
                              <div className='dot gray'></div>
                              <div className='line'></div>
                            </div>
                            <div className='right-part-container-first-part'><p>UPCOMMING</p>
                            <h1>Los Angels, USA</h1>
                            <p>
                              Sofi Stadium, Dec 01-05</p></div>
                            </div>
                            <button className='view-details'>
                              VIEW DETAILS
                            </button>
                          </div>
            </div>
            <div className="second-part-right-home">
              <div className="second-part-right-home-container">
                              <p>GLOBAL MILESTONES</p>
                              <div className='bar'>
                <div className="bar-header">
                  <p>YouTube 'Dynamite' Views</p>
                  <p><span style={{color:"#7f2ad5"}}>1.8B/2B</span></p>
                </div>
                <div className="bar-background"></div>
                <div className="bar-forward"></div>
              </div>
              <div className="info-gathers">
                <div className="info-gathers-box">
                          <p>STREAMING</p>
                          <h1>42M</h1>
                          <p><span style={{color:"#FF33CC"}}>+12% Daily</span></p>
                </div>
                                <div className="info-gathers-box">
                          <p>ARMY MEMBERS</p>
                          <h1>128M</h1>
                          <p><span style={{color:"#7f2ad5"}}>+12% Daily</span></p>
                </div>  
              </div>
              </div>
              </div>            
          </div>
        </div>
      </div>
      <div className='footer'><p>hello</p></div>
    </div>
    </>
  )

}

export default App

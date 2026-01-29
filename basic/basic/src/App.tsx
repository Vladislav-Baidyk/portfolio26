import { useState } from 'react'
import {Swiper, SwiperSlide} from  "swiper/react";
import 'swiper/css';
import './App.css'
import pictures from "./assets/pictures.json";
import features from "./assets/featuresText.json" ;
import picturesBottom from "./assets/bottom.json";

function App() {
const [clickReg,setClickReg] = useState(false);
const [email,setEmail] = useState("");
const [name,setName] = useState("");
const [error,setError] = useState(false);
const [mobile,setMobile] = useState(false);
const checkTheEmail= () => {
  if(!email.includes("@") || name.trim() === ""){
    setError(true);
  }
  else{
    setError(false);
    alert("Succesfully registartion");
    setClickReg(false);
    setName("");
      setEmail("");
  }
}
  return (
    <>
  <div className="container">
    <div className="header">
      <div className="header-head">
        <img src={pictures.logo} alt="logo" className='logo-button-desktop' />
      <nav className='navigation'>
        <ul>
          <li>work</li>
          <li>about</li>
          <li>news</li>
          <li>thinking</li>
          <li>pldege</li>
          <li>careers</li>
          <li>contact</li>
        </ul>
      </nav>
      {/*mobile */}
                   < img src={pictures.logo} className='logo-mobile' alt="logo" onClick={() => setMobile(!mobile)} />
                  {mobile ? (  <nav className='navigation-mobile'>
        <ul>
          <li>work</li>
          <li>about</li>
          <li>news</li>
          <li>thinking</li>
          <li>pldege</li>
          <li>careers</li>
          <li>contact</li>
        </ul>
      </nav>) : 
      (<div></div>)
      }
          
      <div className="account">
        <img src={pictures.account} onClick={() => setClickReg(true)} alt="account" />
      </div>
      </div>
      {clickReg ? 
      <div className="registration">
        <div className="registration-container">
          <h1>Registration</h1>
          <input onChange={(e) => {setName(e.target.value); setError(false)}} type="text" className={`input ${error && name.trim() == "" ? "input-error" : "" }`} placeholder='Write here your name' />
          <input onChange={(e) => {setEmail(e.target.value); setError(false)}} type="text" className={`input ${error && !email.includes("@") ? "input-error" : ""}`} placeholder='Write here your email' />
          <button className='send-registration' onClick={checkTheEmail}>Send</button>
        </div>
        <div className="cross">
          <img src={pictures.cross} alt="cross" onClick={() => setClickReg(false)} />
        </div>
      </div>
      :
      (
        <div></div>
      )}
      <div className="play-button">
        <a href="https://www.linkedin.com/in/baidyk-vladyslav-abb221310/">Play</a>
      </div>
      <div className="bacground-picture-header">
        <img src={pictures.background} alt="background" />
      </div>
    </div>
    <div className="main">
      <div className="container-three-slides">
        <div className="header-three-slides">
          <div className="left-part-three-slides">
                      <p>BASIC/DEBT	&reg; is a global branding <br/>
           and digital design agency building <br />
           products, services, and eCommerce <br />
           experiences that turn cultural values <br />
           into company value.
          </p>
          <div className="see-the-work">
           <a href="#main-three-slides">SEE THE WORK</a> 
          </div>
          </div>
          <div className="right-part-three-slides">
            <p>B/D&reg;</p>
          </div>
        </div>
        <div id='main-three-slides' className="main-three-slides">
          <div className="big-picture">
            <img src={pictures.threePhotos[0].url} alt="pic1" />
            <p><span>PATAGONIA</span><br/>
            AN ecomerance experience <br/>
            driven by patagonia's<br/>
            brand mission
            
            </p>
          </div>
                    <div className="big-picture">
            <img src={pictures.threePhotos[1].url} alt="pic1" />
            <p><span>WILSON</span><br/>
            A centur-old sports <br/>
            brand finding its place in<br/>
            culture
            
            </p>
          </div>
                    <div className="big-picture">
            <img src={pictures.threePhotos[2].url} alt="pic1" />
            <p><span>GOOGLE STORE</span><br/>
            helping bringing its <br/>
            hardware to people<br/>
            across the globe
            
            </p>
          </div>
        </div>


      </div>
      <div className="features">
        <div className="header-features">
         FEATURED<br />
         ENGAGEMENTS
        </div>
        <Swiper 
                spaceBetween={20}
                  slidesPerView={1} 
                  
                  breakpoints={{
                    480: {
                      slidesPerView: 1.2,
                      spaceBetween: 30
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 50
                    }
                  }}
                className='swiper'
                >
                {features.text.map((text,index)=> (
                    <SwiperSlide className="feature-slide" key={index}>
                      <h1><img src={text.logo} alt="logo-feature" />{text.header}</h1>
                      <div className="feature-content-slide">
                      <h2>{text.header}</h2>
                      <p>{text.contentText}</p>
                      </div>
                    </SwiperSlide>
                ))}
                </Swiper>   
      </div>
      <div className="container-two-photo-text">
        <div className="left-part-two-photo-text">
          <p><span >It is a long established<br/> fact that a reader will<br/> </span>be distracted by the <br/>readable content of <br/> a page when looking <br/> at its layout.</p>
                <div className="about-us">
                  about us
                </div>
        </div>
        <div className="right-part-two-photo-text">
          <img src={pictures.wolf}  alt="wolf" />
          <img src={pictures.buisness} className='buisness' alt="buisness" />
          <img src={pictures.wolf2} alt="wolf2" className='wolfik' />
        </div>
      </div>
      <div className="bottom-pictures">
        {picturesBottom.text.map((product,index) => (
          <div className='bottom-container'>
            <div className="bottom-container-left">
              <img src={product.logo} alt="picture" />
            </div>
            <div className="bottom-container-right">
              <h1>{product.header}</h1>
              <p>{product.contentText}</p>
            </div>
            <img className='arrow' src={pictures.arrow} alt="arrow" />
          </div>
        ))}
      </div>
    </div>
    <div className="footer">
      <div className="left-footer-part">
        <div className="top-left-footer-part">
          <p>BASIC/DEBT	&reg;</p>
        </div>
        <div className="bottom-left-footer-part">
          <div className="footer-tag">
            STAY IN THE KNOW
          </div>
        </div>
      </div>
      <div className="right-footer-part">
        <div className="top-left-footer-part">
        <h1>We collaborate with ambitious brands <br /> and people. Let's build.<br/> <span>biz@basicagency.com</span></h1>
        </div>
        <div className="bottom-left-footer-part">
<div className="footer-tag">SOCIAL</div>
<div className="footer-tag">INITIATIVE</div>
<div className="footer-tag">OFFICES</div>   
        </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default App

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/Home";
import avatar from "./assets/cat.png";
import logo from "./assets/icons8-dungeons-and-dragons-96.png"
import imageLogo from "./assets/photo-gallery.png"
import cancel from "./assets/cancel.png"
import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [created,setCreated] = useState(false);
  const [registrationShow,setRegistration] = useState(false);
  const [image,setImage] = useState(null);
  const [name,setName] = useState("CAT");
  const [error,setError] = useState(false);
  const importImage = (event) =>
  {
    const file = event.target.files[0];
    if(file){
      setImage(URL.createObjectURL(file));
    }
  };
  const checkAllThings = () => {
    if(name.trim() === ""){
      setError(true);
    }
    else{
      setCreated(true);
      setRegistration(false);
    }
  }
  return (
    <>
    <BrowserRouter>
      <nav className='navigation'>
        <img src={logo} alt="logo" />
        <Link to={"/"}>Home</Link>
        <Link to={"/swords"}>Swords</Link>
        <Link to ={"/Armour"}>Armour</Link>
        <Link to = {"/Items"}>Magic Items</Link>
        <div className='avatar-container'>
          {created ? (
                <div className="avatar">
          <img src={image} alt="avatar" className='avatar-img' onClick={() => setRegistration(!registrationShow)}/>
          <p>{name}</p>
          </div>
          ) : (
            <div className="avatar">
          <img src={avatar} alt="avatar" onClick={() => setRegistration(!registrationShow)}/>
          <p>{name}</p>
          </div>
            
          )}
        </div>
        {registrationShow ? (
          <div className="registration-container">
            <div className="registration-content">
              <h1>Registration</h1>
            <input type="text" onChange={(e) => {setName(e.target.value),setError(false)}} className={`text ${error && name.trim() === "" ? "error-text" : "good-text"}` } placeholder='Write your name'/>
            <img className='cancel' src={cancel} alt="cancel" onClick={() => setRegistration(false)} />
          <input 
                type="file" 
                id="meme-upload" 
                accept='image/*' 
                onChange={importImage} 
                style={{ display: 'none' }} 
              />
              {image ? (
                <label htmlFor="meme-upload" className='label' style={{ cursor: 'pointer' }}>
                <img className='image-logo' src={image} alt="image" />
                <p style={{ color: 'white', textAlign: 'center' }}>Your photo</p>
              </label>
              ) : 
              (
                <label htmlFor="meme-upload" className='label' style={{ cursor: 'pointer' }}>
                <img className='image-logo' src={imageLogo} alt="image" />
                <p style={{ color: 'white', textAlign: 'center' }}>Choose file</p>
              </label>
              )}
              <button className='submit' onClick={checkAllThings}>Submit</button>
            </div>
            </div>
            
        ) : (
          <p style={{display:"none"}}></p>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

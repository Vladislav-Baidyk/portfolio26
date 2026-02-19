import { useState } from 'react'
import './App.css'
import imageLogo from "./assets/image (1).png"
import cross from "./assets/cancel.png"
{/* fonts contauiner */}
const fontsArray = [
{ name: 'Classic', value: 'font-classic' },
  { name: 'Modern', value: 'font-modern' },
  { name: 'Elegant', value: 'font-elegant' },
  { name: 'Playful', value: 'font-playful' },
  { name: 'Calibri', value: 'font-calibri' }
];
const colors = [
{name: 'white' , value : 'white-color'},
{name: 'red' , value : 'red-color'},
{name: 'green' , value : 'green-color'},
{name: 'black' , value : 'black-color'}
];
function App() {
  const [image,setImage] = useState(null);
  const [font,setFont] = useState(fontsArray[0].value);
  const [color,setColor] = useState(colors[0].value);
  const [textSize,setTextSize] = useState(10);
  const importImage = (event) =>{
    const file = event.target.files[0];
    if(file){
      setImage(URL.createObjectURL(file));
    }
  };

  const [text1,setText1] = useState('');
  const [text2,setText2] = useState('');
  return (
    <>
    <div className="container">
      <div className="header">
        <h1>Meme editor</h1>
      </div>
      <div className="main">
               <div className="texts">
      <input type="text" className='input' onChange={(e) => setText1(e.target.value)} placeholder='Write your text'/>
      <input type="text" className='input' onChange={(e) => setText2(e.target.value)}  placeholder='Write your text'/>
        </div>
      
        <div className="container-image">
          <div className="img-button">
            {image ? (
              <div className='image'>
                <p className={`meme-text ${font} ${color} top`} style={{fontSize : `${textSize}px`}}>{text1}</p>
                <p className={`meme-text ${font} ${color} bottom`} style={{fontSize : `${textSize}px`}}>{text2}</p>
                <img className='image-import' src={image} alt="image-mem" />

                <div className="hide">
                  <img className='image-logo' src={cross} onClick={() => setImage(null)} alt="hide" />
                </div>
              </div>
            ) : 
            (
            <div className='image'>
          <input 
                type="file" 
                id="meme-upload" 
                accept='image/*' 
                onChange={importImage} 
                style={{ display: 'none' }} 
              />
              
              <label htmlFor="meme-upload" className='label' style={{ cursor: 'pointer' }}>
                <img className='image-logo' src={imageLogo} alt="image" />
                <p style={{ color: 'white', textAlign: 'center' }}>Choose file</p>
              </label>
            </div>)
          }
            
          </div>
        </div>
        <div className="settings">
                      <h1>Settings</h1>
          <div className="styles">
                      {fontsArray.map((font,index) => (
            <div onClick={() => setFont(font.value)} className={`font ${font.value}`} key={index}>
              <p>{font.name}</p>
            </div>
          ))}
          </div>
          <h1>Colors</h1>
          <div className="colors">
            {colors.map((color,index) => (
              <div onClick={() => setColor(color.value)} key={index} className='color'>
                <p >{color.name}</p>
              </div>
            ))}
          </div>
          <div className="text-size-container">
            <input type="text" className='text-input' onChange={(e) => setTextSize(e.target.value)} placeholder='Font-size'/>
          </div>
        </div>
      </div>
      <div className="footer">
        <h1>All rights reserved</h1>
      </div>
    </div>
    </>
  )
}

export default App

import { useEffect, useState } from "react";
import {Swiper,SwiperSlide} from "swiper/react";
import './home.css'
import 'swiper/css';

const itemsCategory = [
    {name : "Armor",style : "armor"},
    {name: "Ammunition",style:"ammunition"},
    {name:"Wondrous Items",style: "wondrous"},

]
function Home(){
const itemsUrl = "https://www.dnd5eapi.co/api/magic-items";
const weaponUrl = "https://www.dnd5eapi.co/api/equipment-categories/weapon";
const armourUrl = "https://www.dnd5eapi.co/api/equipment-categories/armor"


const [items,setItems] = useState([]);
const [searchItem,setSearchItem] = useState("");
const [visible,setVisible] = useState(20);
useEffect(() => { 
    const loadData = async () => {
        try{
            const [resItems, resWeapons, resArmor] = await Promise.all([
                    fetch(itemsUrl),
                    fetch(weaponUrl),
                    fetch(armourUrl)
                ]);

                const dataItems = await resItems.json();
                const dataWeapons = await resWeapons.json();
                const dataArmours = await  resArmor.json();


                const dataCombined = [
          ...(dataItems.results || []),
          ...(dataWeapons.equipment || []),
          ...(dataArmours.equipment || []),
                ]
                setItems(dataCombined);
        }
        catch(error){
            console.log("Error")
        }
    };
    loadData()
}, [])

const filteredItems = items
        .filter(item => item.name.toLowerCase().includes(searchItem.toLowerCase()))
        .slice(0, visible);


const loadMore = ()=>{
    setVisible(prev => prev + 10);
}
  const [slides,setSlider] = useState([]);
  const [visibleSlider,setVisibleSlider] = useState(10);
  const url = "https://www.dnd5eapi.co/api/magic-items";
  useEffect(() =>{
    const dataFetch = async ()=>{
      try{
        const res = await fetch(url);
        const data = await res.json();
        const firstItems = data.results.slice(0, visibleSlider);
        const specificData = await Promise.all(firstItems.map(async (item)=> {
          const details = await fetch(`https://www.dnd5eapi.co${item.url}`);
          return await details.json();
        }))
          setSlider(specificData);
      }
      catch(err){
        console.log("Error");
      }
    }
    dataFetch();
  },[])
    return  (
        <>
        <div className="container">
            <div className="main">
                <div className="header-main">
                    <input type="text" onChange={(e)=> setSearchItem(e.target.value)} />
                </div>
        <Swiper
        spaceBetween={40}
        slidesPerView={1}
        style={{ width: '100%', maxWidth: '800px', height: '300px' }}
        >
            {slides.map((slide,index) => (
                <SwiperSlide key={index} className="slide">
                    <div className="slide-content">
                        <h1>{slide.name}</h1>
                        <h1>{slide.rarity.name}</h1>
                        <h1 className={itemsCategory.find(cat => cat.name === slide.equipment_category?.name)?.style || "basic"}>{slide.equipment_category.name}</h1>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
                <div className="items">
                       {filteredItems.map((item,index) => (
        <div className="general-item" key={index} >
            <p>{item.name}</p>
        </div>
       ))}
                </div>
       <button className="load-more" onClick={() => loadMore()}>Load More</button>
            </div>
            <div className="footer">
                <h1>Web page was created only for practise</h1>
            </div>
        </div>
        </>
    )
}
export default Home;
import React, {useEffect, useRef, useState} from 'react'
import './Carousel.css'

export default function Carousel() {
    const [response,setResponse]=useState(undefined);
 
    const aducInfo = () =>{
        fetch(
            `https://api.themoviedb.org/3/trending/all/week?api_key=fded240a4f53f2f753526ddbc888bc73`
          ).then(res => res.json())
          .then((data) =>{
              if(!data.errors){
                 //console.log(data);
                  setResponse(data.results);
                
              }
              else{
                  setResponse([])
              }
          });
    }
    useEffect(()=>{
        aducInfo();
    }, []);
    const [indexCarousel, setIndexCarousel] = useState(1)

    const nextItem = () => {
        if(indexCarousel !== response.length){
            setIndexCarousel(indexCarousel + 1)
        } 
        else if (indexCarousel === response.length){
            setIndexCarousel(1)
        }
    }

    const prevItem = () => {
        if(indexCarousel !== 1){
            setIndexCarousel(indexCarousel - 1)
        }
        else if (indexCarousel === 1){
            setIndexCarousel(response.length)
        }
    }

    const dotSelect = index => {
        setIndexCarousel(index)
    }
    const myRef = useRef(undefined);
const [startDrag,setStartDrag]= useState(0);
function getDragPositonStart(e) {   
    setStartDrag(e.pageX);
}
function getDragPositonEnd(e) { 
    if(startDrag>e.pageX)
    {
        nextItem();
    }
    else{
        
        prevItem();
    }
   
}
 
function getTouchPositonStart(e) {
    setStartDrag(e.changedTouches[0].pageX)
}
function getTouchPositonEnd(e) { 
    if(startDrag>e.changedTouches[0].pageX)
    {
        
        nextItem();
    }
    else{
        prevItem();
    }
    
}
  
 
    return (
        <div className="carousel-container" >
               <div 
        style={{margin:'auto'}}
        onDragStart={getDragPositonStart}
        onDragEnd={getDragPositonEnd}
        onTouchStart={getTouchPositonStart}
        onTouchEnd={getTouchPositonEnd}
        className="carousel">
            
            
            {response?.map((poza, index) => {
                return (
                    <div
                    key={index}
                    className={indexCarousel === index + 1 ? "newSlide" : "slide"}
                    >
                           <img ref={myRef} key={index} src={`https://image.tmdb.org/t/p/original/${poza.backdrop_path}`}  alt="noPhoto" />
                    </div>
                )
            })}
         

           
        </div>
        <div className="dots">
                {response?.map((x, index) => (
                    <div 
                    key={index}
                    onClick={() => dotSelect(index + 1)}
                    className={indexCarousel === index + 1 ? "dot selected" : "dot"}
                    ></div>
                ))}
            </div>
            <button className="prev button_Carousel"  onClick={prevItem} direction={"prev"}>{'<'}</button>
              <button className="next button_Carousel" onClick={nextItem} direction={"next"}>{'>'}</button>
       
         </div>
    )
}

import { useEffect, useState } from "react";
import "../Styles/Card.css" ;
import Handshake from "../assets/handshake.png" ;
import postImg from "../assets/profile.jpg" ;
import { Link } from "react-router-dom";
import ShimmerThumbnail from "./Shimmer";
const Skill = ({name})=>(
    <p className="skill poppins-light">{name}</p>
)
const Share = () =>(
    <svg className="share-opening" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.47 4.13998C12.74 4.35998 12.28 5.96 12.09 7.91C6.77997 7.91 2 13.4802 2 20.0802C4.19 14.0802 8.99995 12.45 12.14 12.45C12.34 14.21 12.79 15.6202 13.47 15.8202C15.57 16.4302 22 12.4401 22 9.98006C22 7.52006 15.57 3.52998 13.47 4.13998Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
)


const Openings = ({opening}) =>(
    <Link className="link-tag" to={"/jobdescription/"+ opening.id} >
    <div className="opening">
        <div className="skilllogo">
            <img className="skilllogoimg" src={postImg}></img>
        </div>
        <div className="openinginfo">
            <h3 className="poppins-medium">{opening.name}</h3>
            
            <p className="poppins-light">No of Openings: {opening.number_of_openings} </p>

            <div className="skillset">
            {opening.skills && JSON.parse(opening.skills).slice(0,4).map((skill, index) => (
                <p className="skill" key={index}>{skill}</p>
            ))}
  {
     opening.skills && ( JSON.parse(opening.skills ).length - 4) > 0 && (
        <p className="more-skills poppins-light">
            +{JSON.parse(opening.skills).length - 4 } More
        </p>
    )
}
</div>

        </div>
        <div className="share-apply">
            <button>{<Share />}</button>
            <button className="applybtn">Apply</button>
        </div>
    </div>
    </Link>
)

async function fetchOpenings( setOpenings ){
    const openingdatata = await fetch("http://localhost:4000/apis/v1/carreer/getallopenings") ;
    const data = await openingdatata.json() ;
    console.log(data) ;
    setOpenings(data);
    console.log(data[0].SKILLS) ;
   
    return ;
}

function filterData(searchText , openings ){
    return openings.filter((opening) => {
        console.log(opening) ;
        return opening.name.toLowerCase().includes(searchText.toLowerCase());
    });    
}

const Subscribe_div = ()=>(
    <div className="search-space-div subscribe_div">
         <input type="text" className="serach-Text"
          placeholder="Catch for new job Postings (Eg:narasimhas9490@gmail.com)" 
         ></input>
         <button 
          className="search-btn" 
         >Subscribe <span className="subscribe-bell"><i class="bi bi-bell"></i></span></button>
         </div>
)

const Card_Layout = () => {
    const [searchText,setSearchText] = useState("") ;
    const [openings, setOpenings] = useState([]);
    const [filterOpenings , setFilterOpenings] = useState(openings) ;
    useEffect(() => {
        const loadOpenings = async () => {
            await fetchOpenings(setOpenings);
        };
        loadOpenings();
    }, []);
    
    useEffect(() => {
        console.log("Fetching...");
        setFilterOpenings(openings);
    }, [openings]);
    
    
     if(openings.length === 0|| filterOpenings.length === 0 )
        return (
            <div className="shimmer-div">
            <ShimmerThumbnail  />
            <ShimmerThumbnail  />
            <ShimmerThumbnail  />
            </div>
    )

    return (
        <>
        <div className="search-heading">
            <div className="heading-text poppins-extrabold"><span className="imp-text">Careers:</span> Where Passion Meets<span><img src={Handshake}></img></span> Professtion.</div>
        <div className="search-space-div">
         <input type="text" className="serach-Text"
          placeholder="Type a keyword"
          value = {searchText}
          onChange={(e)=>{
         setSearchText(e.target.value) ;
         
         }}
         onKeyDown={(e)=>{
            if(e.key == 'Enter'){
                const data = filterData(searchText , openings ) ;
                setFilterOpenings(data) ;
            }
         }
         }
         ></input>
         <button 
          className="search-btn" 
          onClick={()=>{
            const data = filterData(searchText , openings ) ;
            setFilterOpenings(data) ;
          }}>Search</button>
          </div>
          </div>
        <div className="OpeningLayout">
            {
                filterOpenings.map((opening, index) => (
                    <Openings key={index} opening={opening} />
                ))
            }
        </div>
        <Subscribe_div />
        </>
    );
};
export default Card_Layout ;
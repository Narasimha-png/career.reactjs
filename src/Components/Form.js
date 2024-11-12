import { useState } from "react";
import "../Styles/Form.css" ;

const LinksDiv = ({link,FormData , setFormData})=> {
    console.log("LINKS") ;
    let linkcount = 0 ;
    return(
    <div key={"Link" + (linkcount++)}>
        <input key={"" + linkcount } value={link} contentEditable="false" className="addedskill"></input>
        <button onClick={()=>{
            setFormData((prevFormData)=>(
                {
                    ...prevFormData , otherlinks: prevFormData.otherlinks.filter((linkin)=>(linkin !== link ))
                }
            ))
        }}>Remove</button>
    </div>
)
}

const Form = ()=>{
    const [Resume, setResume] = useState("") ;
    const [FormData, setFormData] = useState({
        name:"" ,
        gmail:"" ,
        phonenumber:"" ,
        branch:"" ,
        github:"" ,
        otherlinks:[] ,
        resume:"" 
    }) ;
    const [Links , setLinks] = useState("") ;
    const HandleInput = (e)=>{
        const {name , value} = e.target ;
        console.log(value) ;
        setFormData((prevFormData)=>(
            {
                ...prevFormData, [name]:value 
            }
        )) 
    }
    const HandleExtra = ()=>{
        console.log(Links) ;
        setFormData((prevFormData)=>({
            ...prevFormData , otherlinks:[...prevFormData.otherlinks , Links] 
        })) ;
        setLinks("") ;
    }
    return(
        <div className="application-form">
            <div key={"1"}>
                <label for="name">Full Name</label>
                <input type="text" id="name" placeholder="Ex.Settipalli Narasimha" name="name" required onInput={HandleInput} ></input>
            </div>
            <div key={"2"}>
                <label for="">Gmail</label>
                <input type="text" id="gmail" placeholder="Ex.narasimhas9490@gmail.com" name="gmail" required  onInput={HandleInput} ></input>
            </div>
            <div key={"3"}>
                <label for="">Phone Number</label>
                <input type="text" placeholder="Ex.8008130603" name="phonenumber" required  onInput={HandleInput} ></input>
            </div>
            <div key={"4"}>
                <label for="branch"  >Branch</label>
                <select id="branch" name="branch" required  onInput={HandleInput} >
                    <option value="" disabled selected >Select Branch</option>
                    <option value={"Computer Science"}>Computer Science</option>
                    <option value={"Electrical Engineering"}>Electrical Engineering</option>
                    <option value={"Mechanical Engineering"}>Mechanical Engineering</option>
                    <option value={"Civil Engineering"}>Civil Engineering</option>
                    <option value={"Information Technology"}>Information Technology</option>
                    <option value={"Electronics and Communication"}>Electronics and Communication</option>
                    <option value={"Aerospace Engineering"}>Aerospace Engineering</option>
                    <option value={"Chemical Engineering"}>Chemical Engineering</option>
                    <option value={"Biotechnology"}>Biotechnology</option>
                </select>

            </div>
            <div key={"5"}>
                <label for="github" >GitHub Profile</label>
                <input type="text" id="github" placeholder="Ex.github.com/Narasimha-png" name="github" required  onInput={HandleInput} ></input>
            </div>
            <div key={"6"}>
                <label for="otherlinks">Other Links (Portfolio/Profiles) </label>
                <div className="otherlinks">
                <input type="text" id="otherlinks" placeholder="Ex.https://www.linkedin.com/in/slnarasimha" name="otherlinks" value={Links} onInput={(e)=>{
                    console.log("VAL " + e.target.value ) ;
                    setLinks(e.target.value) ;
                }}></input>
                <button onClick={HandleExtra} className="add-skill" >Add Link</button>
                </div>
                <div key={"Sample"}>
                    {
                        FormData.otherlinks.length > 0 && (
                            FormData.otherlinks.map((value)=>(
                                <LinksDiv link={value}  FormData={FormData} setFormData={setFormData} />
                            ))
                        )
                    }

                </div>
            </div>
            <div key={"7"}>
                <label for="resume" >Resume</label>
                <label for="resume" className="resume-upload">Upload Resume</label>
                <input type="file" id="resume" name="resume" onInput={(e)=>{
                   const file = e.target.files[0];
                   console.log(e.target.files); 
                   
                   if (file) {
                       const reader = new FileReader(); 
                       reader.onload = () => {
                           const binaryData = reader.result; 
                           console.log("Binary Data:", binaryData);
                       };        
                       reader.onerror = (err) => {
                           console.error("Error reading file:", err);
                       };         
                       reader.readAsArrayBuffer(file); 
                   }
                }} required></input>
            </div>
            <div>{Resume.length != 0 && <p>{Resume.split("\\")[Resume.split("\\").length-1]}</p> }</div>
            <button onClick={(e)=>{
                
            }} className="apply-btn">APPLY 🙌</button>
        </div>
    )
}

export default Form ;
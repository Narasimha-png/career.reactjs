import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {hiringlogo} from "../assets/profile.jpg"
import "../Styles/jobDetails.css" ;
import { JobCards } from "../CONSTANTS";
import { useNavigate } from "react-router-dom";

const Active = ()=>(
    <div className="status-tag active">Active</div>
)
const Expired = ()=>(
    <div className="status-tag expired">Expired</div>
)

const Job_Details = ({jobInfo})=>{
    const navigator = useNavigate() ;
    return(
    <div className="job-details job-text">
        
        <div className="poppins-bold">{jobInfo.name}</div>
        <div className="numberofopenings">"Number Of Openings" {jobInfo.number_of_openings}</div>
        <div className="job-status">{jobInfo.status ? <Active /> : <Expired />}</div>
        <div className="company-details">We are a blockchain R&D studio, driven by our commitment to bridging (pun intended) the divide between 
foundational blockchains like Bitcoin and the thriving DeFi ecosystem. Our core expertise lies in solving intricate <br />
blockchain challenges through rigorous research in the realms of cryptography, game theory, and protocol design.<br />
Our mission is to make web3 simple and hassle-free for everyone. No intimidating complexities, just pure potential.
We began our journey in 2022, with a previous experience of building two billion-dollar web3 projects, Ren and 
Rook under our belt. <br />
Our flagship product is the Catalog wallet , a unique implementation of a multichain wallet that lets you use native 
bitcoin directly on any app. We also help power web3 projects like garden to become cross-chain seamlessly.<br />
We are a lean and fast moving team of like-minded people and are passionate about making our mark in the DeFi 
space</div>
<button onClick={(e)=>{
                (jobInfo.status ? navigator("/jobdescription/" + jobInfo.id + "/form") : e.preventDefault() ) 
                window.scrollTo(0,0) ;
            }}  className="job-apply-btn details-div">{jobInfo.status ? "Apply" : "Expired"}</button>
    </div>
)
}
//name , number_of_openings , status ,skills, work_location, eligibility,compensaion , imp_note , responsibilities
const Job_Information = ({jobInfo})=>{
    const navigator = useNavigate() ;
    return(
    <div className="job-information job-text">
        <h2>Skills</h2>
        <div className="skillset"> {jobInfo.skills && JSON.parse(jobInfo.skills).slice(0,4).map((skill, index) => (
                <p className="skill" key={index}>{skill}</p>
            ))}</div>
        <h2>Work Location: </h2>
        <div  className="work-location">{jobInfo.work_location}</div>
        <h2>Eligibility</h2>
        <div className="job-eligibility">{jobInfo.eligibility}</div>
        <h2>Compensation:</h2>
        <div className="job-compensation">{jobInfo.compensation}</div>
        <h2>Responsibilities</h2>
        <ol className="job-responsibilities">
        {jobInfo.responsibilities.split("\n").map((value, index) => (
    <li className="raw-text" key={index}>{value}</li>
))}

            </ol>

            <button onClick={(e)=>{
                (jobInfo.status ? navigator("/jobdescription/" + jobInfo.id + "/form") : e.preventDefault() ) 
                window.scrollTo(0,0) ;
            }} className="job-apply-btn information-div">{jobInfo.status ? "Apply" : "Expired"}</button>
    </div>

)
}
const JobDetails = ()=>{
    const [jobInfo , setJobInfo] = useState(null) ;
    const {id} = useParams() ;
    useEffect(()=>{
        async function fetchDetails() {
        const data = await fetch( JobCards + id ) ;
        const jsonData = await (data).json() ;
        console.log(jsonData) ;
        setJobInfo(jsonData) ;
        }
        fetchDetails() ;
        
    } , []) ;
    if(jobInfo == null ){
        return (<h1>Fetching.......</h1>)
    }
    else
    return (
        <div className="job-full-details">
           
            <Job_Information jobInfo={jobInfo[0]} />
            <Job_Details jobInfo={jobInfo[0]} />
        </div>
    )

}

export default JobDetails ;

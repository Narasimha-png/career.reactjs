import "../Styles/Header.css"
import logo from "../assets/cataloglogo__enhanced.png"
import "bootstrap-icons/font/bootstrap-icons.css";


const Label = ({name})=>(
    <div className="poppins-semibold">
        {name}
    </div>
)

const LangNav = () =>{
    return (
        <div className="lang-nav">
        <button  className="bi bi-globe bi-nav poppins-semibold nav-btns"><Label name="EN" />
        </button>
        <button className="bi bi-brightness-high poppins-semibold nav-btns"><Label name="Change Theme" /></button>
    </div>
    )
}

const Login_SignUp = ()=>(
    <div className="login-signup">
            <button className="log-in nav-btns">Log In</button>
            <button className="sign-up nav-btns">Sign Up</button>
            
        </div>
)

const Logo = ()=>(
    <div className="nav-logo">
    <img className="mainlogo" src={logo}></img>
</div>

)

const Nav_Links = () =>(
<div className="nav-links">
    <button className="nav-btns down-hover">{<Label name="Products" />} <span className="bi bi-chevron-down bi-nav"></span></button>
    <button className="nav-btns down-hover">{<Label name="Projects" />} <span className="bi bi-chevron-down bi-nav"></span></button>
    <button className="nav-btns down-hover">{<Label name="Pricing" />}</button>
    <button className="nav-btns down-hover">{<Label name="Docs" />}</button>

 </div>)

const Inner_Nav = ()=>(
    <div className="inner-nav">
    {<Logo />}
    {<Nav_Links />}  
</div>
)

const Inner_SideNav = ()=>(
    <div className="inner-side-nav">
       {<LangNav />}
        {<Login_SignUp />}
        </div>
)

const Header = ()=>( 
    <div className="outer-nav">
        {<Inner_Nav />}
        {<Inner_SideNav />}
    </div>
)

export default Header ;
import { Link, Outlet,  } from 'react-router-dom'
import './Navbar.css'
import '../Home'

const Navbar = () => {


  return (
    <div className='main-page'>
            <div className='main-nav'>
        <div className="nav">
    <div className='logo'>
        <img  className='logo-1' src='src\assets\Nav icons/greenvibe.png'></img>
    </div>
    <div className="pages">
    <div className='home-nav'>
        <Link to={"Home"} className="link-style">HOME</Link>
    </div>
    <div className='collection'>
        <Link to="Home" className="link-style">COLLECTION</Link>

    </div>
    <div className='about'>
        <Link to="Home" className="link-style">ABOUT</Link>

    </div>
    <div className='contact'>
        <Link to="Home" className="link-style">CONTACT</Link>

    </div>  

    </div>
    <div className='icons' >
        <div className='serch'>
            <div className="search-box"><p>SERCH</p>
            <img className='serch-1' src='src\assets\Nav icons\search icon.png'></img>
            </div>
            <img className='serch-2' src='src\assets\Nav icons\search icon.png'></img>
        </div>
        <div className='profile'>
            <Link to="profile"><img className='profile-1' src='src\assets\Nav icons\profile-icon.png'></img></Link>
    
        </div>
        <div className='cart'>
            <img className='cart-1' src='src\assets\Nav icons\Vector.png'></img>                    
            
        <div className='icon-2'>
            <p>2</p>
        </div>
        </div>
        <div className='menu-list'>
        <img className='list-1' src='src\assets\Nav icons\menu_icon.png'></img>    
        </div>
    </div>

</div>

    </div>
    <div className='main-bottom'>
        <div className='main-bottom-content'>
            <Outlet/>
        </div>
    </div>
    </div>
  )
}

export default Navbar


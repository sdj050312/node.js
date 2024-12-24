import { Link } from 'react-router-dom';
import './Header.css'
const Header = () => {

    return (
        <>
            <div className='head'>
                <ul className='head-link'>
                    <li><h1><Link to = "/">DOG CAP</Link></h1></li>
                    <li><Link to = "/product">Product</Link></li>
                    <li><Link to = "/box">View to Cart</Link></li>
                    <li><button type = "button">Login</button></li>
                    
                </ul>
            </div>
        
        </>
    )

}

export default Header; 
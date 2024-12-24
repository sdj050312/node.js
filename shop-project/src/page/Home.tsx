import '../App.css';
import dogImage from '../assets/dog-removebg-preview (2).png'
import '../pagescss/Home.css'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
        <div className='container'>
                <h1>DOG CAP</h1>
            <div className='board'>
                
                    <img src={dogImage} alt="" />
                </div>
                <div className = "move-btn">
                    <Link to="/product">See more</Link>
                </div>
                <div className='enter-btn'>
                    <a href="/Login">Login</a>
                 
                    <a href="/admin">admin</a>
                </div>
            </div>
        </>
    )
}

export default Home; 
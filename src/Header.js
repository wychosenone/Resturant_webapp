import logo from './Little_Lemon.jpg';
import './App.css';



function Header(){
    return (
        <div className="header">
            <img src={logo} alt="logo" className="logo"/>
        </div>
    )

};
export default Header;
import './Promo.css';
import logo from "../../images/main-logo.svg";
import { Link } from 'react-scroll';
function Promo(props) {

  return (
    <div className="header-main">
    <div className="header-main__info">
      <h1 className="header-main__title">Учебный проект студента факультета Веб-разработки.</h1>
      <p className="header-main__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
      <Link  to="diplom" spy={true} smooth={true}><button className="header-main__button" type="button">Узнать больше</button></Link>
    </div>
    <img className="header-main__logo"src={logo} alt="Логотип" />
  </div>
  );
}

export default Promo;


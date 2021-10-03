import './Portfolio.css';
import { Link } from "react-router-dom";

function Portfolio() {
  return (
    <section className="portfolio">
    <h2 className="portfolio__title">Портфолио</h2>
    <div className="portfolio__link">
      <Link to="/" className="portfolio__link-text">Статичный сайт</Link>
      <div className="portfolio__link-image"></div>
    </div>
    <div className="portfolio__link">
      <Link to="/" className="portfolio__link-text">Адаптивный сайт</Link>
      <div className="portfolio__link-image"></div>
    </div>
    <div className="portfolio__link">
      <Link to="/" className="portfolio__link-text">Одностраничное приложение</Link>
      <div className="portfolio__link-image"></div>
    </div>
  </section>
  );
}

export default Portfolio;

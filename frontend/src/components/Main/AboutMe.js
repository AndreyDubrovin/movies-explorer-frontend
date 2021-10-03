import './AboutMe.css';
import imageMe from '../../images//me.jpg';
function AboutMe() {

  return (
    <section className="about-me">
    <h2 className="landing-title">Студент</h2>
    <div className="about-me__items">
      <div className="about-me__block">
        <h2 className="about-me__title">Виталий</h2>
        <p className="about-me__subtitle">Фронтенд-разработчик, 30 лет</p>
        <p className="about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
          и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
        <ul className="about-me__links">
          <li><a href="https://www.facebook.com/" rel="noreferrer" target="_blank" className="about-me__link">Facebook</a></li>
          <li><a href="https://github.com/" rel="noreferrer" target="_blank" className="about-me__link">Github</a></li>
        </ul>
      </div>
      <img className="about-me__photo" alt="Автор" src={imageMe} />
    </div>
  </section>
  );
}

export default AboutMe;


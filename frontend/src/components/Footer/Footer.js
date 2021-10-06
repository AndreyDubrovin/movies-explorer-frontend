import './Footer.css';

function Footer() {
  const date = new Date();
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__copyright">© {date.getFullYear()}</p>
        <ul className="footer__links">
          <li className="footer__link-container"><a className="footer__link" rel="noreferrer" target="_blank" href="https://practicum.yandex.ru/">Яндекс.Практикум</a></li>
          <li className="footer__link-container"><a className="footer__link" rel="noreferrer" target="_blank" href="https://practicum.yandex.ru/">Github</a></li>
          <li className="footer__link-container"><a className="footer__link" rel="noreferrer" target="_blank" href="https://practicum.yandex.ru/">Facebook</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

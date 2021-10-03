import './Main.css';
import Header from "../Header/Header";
import AboutProject from "../Main/AboutProject";
import Techs from "../Main/Techs";
import AboutMe from "../Main/AboutMe";
import Portfolio from "../Main/Portfolio";
import Footer from "../Footer/Footer";

function Main() {
  return (
    <>
    <Header />
    <main className="main">
    <AboutProject />
    <Techs />
    <AboutMe />
    <Portfolio />
    </main>
    <Footer />
    </>
  );
}

export default Main;

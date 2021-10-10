import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "./SearchForm";
import MoviesCardList from "./MoviesCardList";
import Footer from "../Footer/Footer";
import api from "../../utils/MoviesApi";
import filterRequest from "./FilterRequest";
import Preloader from "./Preloader";
import React from "react";

function Movies(props) {
  const [findResult, setfindResult] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [quantityCards, setQuantityCards] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [findNothing, setFindNothing] = React.useState(false);
  React.useEffect(() => {
    if (localStorage.getItem('movies')) {
      setfindResult(JSON.parse(localStorage.getItem('movies')));
      updateViewCards();
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", updateViewCards);
    return () => {
      window.removeEventListener("resize", updateViewCards);
    };
  });

  function updateViewCards() {
    if (window.innerWidth > 1279) setQuantityCards(12);
    if (window.innerWidth > 480 && window.innerWidth <1280) setQuantityCards(8);
    if (window.innerWidth > 319 && window.innerWidth < 481) setQuantityCards(5);
  }

  function handlerSearchButton(str) {
    setFindNothing(false);
    setLoading(true);
    api.getMovies()
      .then((movies) => {
        const result = filterRequest(movies,str,checked)
        localStorage.setItem('movies', JSON.stringify(result));
        setfindResult(result);
        updateViewCards();
        if (result.length === 0) {
          setFindNothing(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  function toggleChange() {
    setChecked(!checked);
   }

  function handlerMoreButton() {
    let number = 0
    if (window.innerWidth > 1279) number = 4;
    if (window.innerWidth > 480 && window.innerWidth <1280) number = 2;
    if (window.innerWidth > 319 && window.innerWidth < 481) number = 5;
    if (findResult.length < quantityCards + number) {
      setQuantityCards(findResult.length + 1)
    } else {
      setQuantityCards(quantityCards + number);
    }
  }
  return (
    <>
      <Header burger={props.burger} />
      <main className="main">
        <SearchForm checkbox={toggleChange} searchButton={handlerSearchButton} />
        <Preloader nothing={findNothing} loading={loading}/>
        <MoviesCardList more={handlerMoreButton} cardsView={quantityCards} cards={findResult} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;

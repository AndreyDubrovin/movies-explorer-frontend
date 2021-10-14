import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "./SearchForm";
import MoviesCardList from "./MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "./Preloader";

function Movies(props) {

  return (
    <>
      <Header burger={props.burger} />
      <main className="main">
        <SearchForm checkbox={props.checkbox} searchButton={props.searchButton} />
        <Preloader nothing={props.nothing} loading={props.loading}/>
        <MoviesCardList  saveMovies={props.saveMovies} onSaveCard={props.onSaveCard} more={props.more} cardsView={props.cardsView} cards={props.movies} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;

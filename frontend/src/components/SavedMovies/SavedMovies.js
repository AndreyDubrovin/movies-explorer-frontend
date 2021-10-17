import './SavedMovies.css';
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Movies/Preloader";

function SavedMovies(props) {
  return (
    <>
    <Header burger={props.burger}/>
    <main className="main">
    <SearchForm checkbox={props.checkbox} searchButton={props.searchButton} />
    <Preloader nothing={props.nothing} loading={props.loading}/>
    <MoviesCardList onSaveCard={props.onSaveCard} more={props.more} cardsView={props.cardsView} cards={props.saveMovies}/>
    </main>
    <Footer />
    </>
  );
}

export default SavedMovies;

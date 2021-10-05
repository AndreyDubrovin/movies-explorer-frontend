import './SavedMovies.css';
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList";
import Footer from "../Footer/Footer";
import image from "../../images/card-1.jpg"

function SavedMovies(props) {

  const cards = [{"_id":"test1","image":image,"delete": true},{"_id":"test2","image":image,"delete": true},{"_id":"test3","image":image,"delete": true},{"_id":"test4","image":image,"delete": true},{"_id":"test5","image":image,"delete": true},{"_id":"test6","image":image,"delete": true},];
  return (
    <>
    <Header burger={props.burger}/>
    <main className="main">
    <SearchForm />
    <MoviesCardList cards={cards}/>
    </main>
    <Footer />
    </>
  );
}

export default SavedMovies;

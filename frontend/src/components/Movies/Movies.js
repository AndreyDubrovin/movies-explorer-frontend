import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "./SearchForm";
import MoviesCardList from "./MoviesCardList";
import Footer from "../Footer/Footer";
import image from "../../images/card-1.jpg";

function Movies(props) {
  const cards = [
    { _id: "test1", image: image, save: true },
    { _id: "test2", image: image },
    { _id: "test3", image: image },
    { _id: "test4", image: image },
    { _id: "test5", image: image },
    { _id: "test6", image: image },
    { _id: "test7", image: image },
    { _id: "test9", image: image },
    { _id: "test10", image: image },
    { _id: "test11", image: image },
    { _id: "test12", image: image },
    { _id: "test13", image: image },
    { _id: "test14", image: image },
    { _id: "test15", image: image },
    { _id: "test16", image: image },
    { _id: "test17", image: image },
  ];

  return (
    <>
      <Header burger={props.burger} />
      <main className="main">
        <SearchForm />
        <MoviesCardList cards={cards} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;

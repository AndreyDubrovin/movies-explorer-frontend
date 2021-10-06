import "./MoviesCardList.css";
import MoviesCard from "../Movies/MoviesCard";

function MoviesCardList(props) {
  return (
    <>
    <section className="cards">
    {props.cards.map((data, i) => (
        <MoviesCard
          key={data._id}
          card={data}
        />
        ))}
</section>
<section className="more">
  <button className="more__button">Ещё</button>
</section>
</>
  );
}

export default MoviesCardList;

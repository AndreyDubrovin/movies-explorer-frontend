import "./MoviesCardList.css";
import MoviesCard from "../Movies/MoviesCard";
import React from "react";

function MoviesCardList(props) {
let cardsNew = [];
let tempArray = [];

    for (let index = 0; index < props.cardsView; index++) {
      if (props.cards[index] !== undefined) {
        tempArray.push(props.cards[index]);
      }
    }
    cardsNew = tempArray;
  return (
    <>
    <section className="cards">
    {cardsNew.map((data, i) => (
      <MoviesCard
        key={data.id === undefined ? data._id : data.id}
        card={data}
        onSaveCard={props.onSaveCard}
        saveMovies={props.saveMovies}
      />
      ))}
</section>
<section className={`more ${props.cards.length > props.cardsView ? 'more_active' : ''}`}>
  <button className="more__button" onClick={props.more}>Ещё</button>
</section>
</>
  );
}

export default MoviesCardList;

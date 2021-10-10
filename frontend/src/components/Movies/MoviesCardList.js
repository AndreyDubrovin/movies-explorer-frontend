import "./MoviesCardList.css";
import MoviesCard from "../Movies/MoviesCard";
import React from "react";

function MoviesCardList(props) {
let cardsNew = [];
let tepArray = [];

    for (let index = 0; index < props.cardsView; index++) {
      if (props.cards[index] !== undefined) {
        tepArray.push(props.cards[index]);
      }
    }
    cardsNew = tepArray;
console.log(cardsNew);

  return (
    <>
    <section className="cards">
    {cardsNew.map((data, i) => (
      <MoviesCard
        key={data.id}
        card={data}
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

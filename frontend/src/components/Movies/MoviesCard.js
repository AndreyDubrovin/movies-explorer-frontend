import React from "react";


function MoviesCard(props) {

  return (
<div className="card">
<img className="card__image" src={props.card.image} alt="Карточка"/>
<h2 className="card__title">33 слова о дизайне</h2>
<button className={`${props.card.delete ? "card__delete" : "card__save"} ${props.card.save ? "card__save_active" : ""}`}></button>
<p className="card__time">1ч42м</p>
</div>
  );
}

export default MoviesCard;

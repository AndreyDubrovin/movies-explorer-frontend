import React from "react";


function MoviesCard(props) {
  const hour = Math.floor(props.card.duration/60);
  const minute = (props.card.duration - hour*60);
  const trailer = props.card.trailer === undefined ? props.card.trailerLink : props.card.trailer;
  const image = props.card.trailer === undefined ? `https://api.nomoreparties.co${props.card.image.url}` : props.card.image;
  const delIcon = props.card.owner === undefined ? false : true;
  const cardIcon = props.card.owner === undefined ? props.saveMovies.filter((movie) => movie.movieId === props.card.id) : [];


  function handleSaveClick() {
    props.onSaveCard(props.card)
  }

  return (
<div className="card">
<a href={trailer} target="_blank" rel="noreferrer"><img className="card__image" src={image} alt={props.card.nameRU}/></a>
<h2 className="card__title">{props.card.nameRU}</h2>
<button className={`${delIcon ? "card__delete" : "card__save"} ${cardIcon.length > 0 ? "card__save_active" : ""}`} onClick={handleSaveClick}></button>
<p className="card__time">{`${hour}ч${minute}м`}</p>
</div>
  );
}

export default MoviesCard;


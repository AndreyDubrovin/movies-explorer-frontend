import "./SearchForm.css";
import React from "react";

function SearchForm(props) {

  const [textSearch, settextSearch] = React.useState('');
  const [check, setcheck] = React.useState(false);
   function handleClickButton() {
    props.searchButton(textSearch);
   }

   function toggleChange() {
    props.checkbox(!check);
    setcheck(!check);
   }

   function handleChange(e) {
    settextSearch(e.target.value);
   }

  return (
    <section className="search">
      <div className="search__container">
        <input className="search__form" type="search" placeholder="Фильм" value={textSearch} onChange={handleChange} required/>
        <button className="search__submit-button" type="submit" onClick={handleClickButton}></button>
        <label className="search__checkbox-label">
          <input className="search__invisible-checkbox" type="checkbox" onChange={toggleChange} checked={check}/>
          <span className="search__visible-checkbox"></span>
          Короткометражки
        </label>
      </div>
    </section>
  );
}

export default SearchForm;

import "./SearchForm.css";
import React from "react";

function SearchForm(props) {

  const [textSearch, settextSearch] = React.useState('');

   function handleClickButton() {
    props.searchButton(textSearch);
   }

   function toggleChange(e) {
    props.checkbox(e.target.checked);
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
          <input className="search__invisible-checkbox" type="checkbox" onChange={toggleChange}/>
          <span className="search__visible-checkbox"></span>
          Короткометражки
        </label>
      </div>
    </section>
  );
}

export default SearchForm;

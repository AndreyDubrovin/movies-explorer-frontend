import "./SearchForm.css";

function SearchForm() {
  return (
    <section className="search">
      <div className="search__container">
        <input className="search__form" type="search" placeholder="Фильм" required/>
        <button className="search__submit-button" type="submit"></button>
        <label className="search__checkbox-label">
          <input className="search__invisible-checkbox" type="checkbox" />
          <span className="search__visible-checkbox"></span>
          Короткометражки
        </label>
      </div>
    </section>
  );
}

export default SearchForm;

function filterRequest(movies,str,short) {
  const resultArray = [];
  const regexp = new RegExp(`${str}`, "i");

  function check(element) {
    if (regexp.test(element.country)) {
      resultArray.push(element);
    } else if (regexp.test(element.description)) {
      resultArray.push(element);
    } else if (regexp.test(element.director)) {
      resultArray.push(element);
    } else if (regexp.test(element.nameEN)) {
      resultArray.push(element);
    } else if (regexp.test(element.nameRU)) {
      resultArray.push(element);
    } else if (regexp.test(element.year)) {
      resultArray.push(element);
    }
  }

  if (short) {
    movies.forEach((element) => {
      if (element.duration <= 40) {
        check(element);
      }
    });
  } else {
    movies.forEach((element) => {
      check(element);
    });
  }
  return resultArray;
}

export default filterRequest;

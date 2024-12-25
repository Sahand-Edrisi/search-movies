// search
export const ShowSearchMoviesOff = () => {
  setTimeout(() => {
    let notFindMovieDisplayOn = document.getElementById("ShowSearchMoviesOn");
    if (notFindMovieDisplayOn !== null) {
      notFindMovieDisplayOn.setAttribute("id", "ShowSearchMoviesOff");
    }
  }, 1);
};
export const ShowSearchMoviesOn = () => {
  setTimeout(() => {
    let notFindMovieDisplayOff = document.getElementById("ShowSearchMoviesOff");
    if (notFindMovieDisplayOff !== null) {
      notFindMovieDisplayOff.setAttribute("id", "ShowSearchMoviesOn");
      notFindMovieDisplayOff.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, 1);
};

// Pagination
export const paginationReload = () => {
  let numbers = document.querySelectorAll(".numbers");
  let moviesShow = document.querySelectorAll("#displayOn");
  let movie = document.querySelectorAll(".movie");

  setTimeout(() => {
    if (numbers[0] !== undefined) {
      if (numbers[0].className !== "numbers active") {
        for (let j = 1; j < numbers.length; j++) {
          numbers[j].setAttribute("class", "numbers");
        }
        numbers[0].setAttribute("class", "numbers active");
        moviesShow[0].setAttribute("id", "displayOff");
        moviesShow[1].setAttribute("id", "displayOff");
        movie[0].setAttribute("id", "displayOn");
        movie[1].setAttribute("id", "displayOn");
      }
    }
  }, 20);
};
export const nextPage = () => {
  let numbers = document.querySelectorAll(".numbers");
  let moviesShow = document.querySelectorAll("#displayOn");
  let movie = document.querySelectorAll(".movie");
  for (let i = 0; i < numbers.length; i++) {
    if (i + 1 === numbers.length && numbers[i].className === "numbers active") {
      break;
    }
    if (numbers[i].className === "numbers active") {
      numbers[i].setAttribute("class", "numbers");
      numbers[i + 1].setAttribute("class", "numbers active");
      break;
    }
  }
  for (let j = 0; j < numbers.length; j++) {
    if (numbers[j].className === "numbers active") {
      for (let i = 0; i < moviesShow.length; i++) {
        moviesShow[i].setAttribute("id", "displayOff");
      }

      for (let i = j - 1; i < numbers[j].id; i++) {
        let index = i;
        let id = Number(numbers[j].id);
        let result = index + id;
        if (movie[result] === undefined) {
          break;
        }
        movie[result].setAttribute("id", "displayOn");
      }
    }
  }
  scrollTo();
};
export const previousPage = () => {
  let numbers = document.querySelectorAll(".numbers");
  let moviesShow = document.querySelectorAll("#displayOn");
  let movie = document.querySelectorAll(".movie");
  for (let i = 0; i < numbers.length; i++) {
    if (i === 0 && numbers[i].className === "numbers active") {
      break;
    }
    if (numbers[i].className === "numbers active") {
      numbers[i].setAttribute("class", "numbers");
      numbers[i - 1].setAttribute("class", "numbers active");
      break;
    }
  }

  for (let j = 0; j < numbers.length; j++) {
    if (numbers[j].className === "numbers active") {
      for (let i = 0; i < moviesShow.length; i++) {
        moviesShow[i].setAttribute("id", "displayOff");
      }

      for (let i = j - 1; i < numbers[j].id; i++) {
        let index = i;
        let id = Number(numbers[j].id);
        let result = index + id;
        movie[result].setAttribute("id", "displayOn");
      }
    }
  }
  scrollTo();
};
export const showPages = (e) => {
  let page = e.currentTarget;
  let numbers = document.querySelectorAll(".numbers");
  let moviesShow = document.querySelectorAll("#displayOn");
  let movie = document.querySelectorAll(".movie");

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i].className === "numbers active") {
      numbers[i].setAttribute("class", "numbers");
      page.setAttribute("class", "numbers active");
      break;
    }
  }
  for (let j = 0; j < numbers.length; j++) {
    if (numbers[j].className === "numbers active") {
      for (let i = 0; i < moviesShow.length; i++) {
        moviesShow[i].setAttribute("id", "displayOff");
      }
      for (let i = j - 1; i < numbers[j].id; i++) {
        let index = i;
        let id = Number(numbers[j].id);
        let result = index + id;
        if (movie[result] === undefined) {
          break;
        }
        movie[result].setAttribute("id", "displayOn");
      }
    }
  }
  scrollTo();
};
export const scrollTo = () => {
  window.scrollTo({ top: 700, behavior: "smooth" });
};

// Slice name
export const nameDataSlice = (name) => {
  if (name.length > 35) {
    let slice = name.slice(0, 30);
    let add = (slice += "...");
    return add;
  } else {
    return name;
  }
};

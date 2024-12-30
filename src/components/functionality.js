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
  disableBtn();
  if (numbers[numbers.length - 1].className !== "numbers active") {
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i].className === "numbers active") {
        numbers[i].setAttribute("class", "numbers");
        numbers[i + 1].setAttribute("class", "numbers active");
        break;
      }
    }
    for (let j = 0; j < numbers.length; j++) {
      if (numbers[j].className === "numbers active") {
        for (let i = 0; i < moviesShow.length; i++) {
          moviesShow[i].style =
            "translate : -3000px 0px; transition : all .6s ease-in-out";
          setTimeout(() => {
            moviesShow[i].setAttribute("id", "displayOff");
          }, 1000);
        }

        for (let i = j - 1; i < numbers[j].id; i++) {
          let index = i;
          let id = Number(numbers[j].id);
          let result = index + id;
          if (movie[result] === undefined) {
            break;
          }
          setTimeout(() => {
            movie[result].setAttribute("id", "displayOn");
            movie[result].style = "translate : +3000px 0px";
            setTimeout(() => {
              movie[result].style =
                "translate :0px 0px; transition : all .6s ease-in-out";
            }, 200);
          }, 500);
        }
      }
    }
  }
  scrollTo();
  setTimeout(() => {
    enableBtn();
  }, 1500);
};
export const previousPage = () => {
  let numbers = document.querySelectorAll(".numbers");
  let moviesShow = document.querySelectorAll("#displayOn");
  let movie = document.querySelectorAll(".movie");
  disableBtn();
  if (numbers[0].className !== "numbers active") {
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i].className === "numbers active") {
        numbers[i].setAttribute("class", "numbers");
        numbers[i - 1].setAttribute("class", "numbers active");
        break;
      }
    }

    for (let j = 0; j < numbers.length; j++) {
      if (numbers[j].className === "numbers active") {
        for (let i = 0; i < moviesShow.length; i++) {
          moviesShow[i].style =
            "translate : +3000px 0px; transition : all .6s ease-in-out";
          setTimeout(() => {
            moviesShow[i].setAttribute("id", "displayOff");
          }, 1000);
        }

        for (let i = j - 1; i < numbers[j].id; i++) {
          let index = i;
          let id = Number(numbers[j].id);
          let result = index + id;
          setTimeout(() => {
            movie[result].setAttribute("id", "displayOn");
            movie[result].style = "translate : -3000px 0px";
            setTimeout(() => {
              movie[result].style =
                "translate :0px 0px; transition : all .6s ease-in-out";
            }, 200);
          }, 500);
        }
      }
    }
    scrollTo();
  }
  setTimeout(() => {
    enableBtn();
  }, 1500);
};
export const showPages = (e) => {
  let page = e.currentTarget;
  let numbers = document.querySelectorAll(".numbers");
  let moviesShow = document.querySelectorAll("#displayOn");
  let movie = document.querySelectorAll(".movie");

  if (page.className !== "numbers active") {
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i].className === "numbers active") {
        numbers[i].setAttribute("class", "numbers");
        page.setAttribute("class", "numbers active");
        break;
      }
    }
    for (let j = 0; j < numbers.length; j++) {
      if (numbers[j].className === "numbers active") {
        moviesShow[0].style =
          "translate : -3000px 0px; transition : all .6s ease-in-out";
        moviesShow[1].style =
          "translate : +3000px 0px; transition : all .6s ease-in-out";
        setTimeout(() => {
          moviesShow[0].setAttribute("id", "displayOff");
          moviesShow[1].setAttribute("id", "displayOff");
        }, 1000);
        for (let i = j - 1; i < numbers[j].id; i++) {
          let index = i;
          let id = Number(numbers[j].id);
          let result = index + id;
          if (movie[result] === undefined) {
            break;
          }
          setTimeout(() => {
            if (result % 2 === 0) {
              movie[result].setAttribute("id", "displayOn");
              movie[result].style = "translate :-3000px 0px;";
            }
            if (result % 2 === 1) {
              movie[result].setAttribute("id", "displayOn");
              movie[result].style = "translate :3000px 0px; ";
            }
            setTimeout(() => {
              movie[result].style =
                "translate :0px 0px; ; transition : all .6s ease-in-out";
            }, 200);
          }, 500);
        }
      }
    }
    scrollTo();
  }
};
export const scrollTo = () => {
  window.scrollTo({ top: 700, behavior: "smooth" });
};
function disableBtn() {
  document.getElementById("next").disabled = true;
  document.getElementById("previous").disabled = true;
}
function enableBtn() {
  document.getElementById("next").disabled = false;
  document.getElementById("previous").disabled = false;
}

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

export function hiddenBtn() {
  document.getElementById("btnLeft").style.visibility = "hidden";
  document.getElementById("btnRight").style.visibility = "hidden";
}
export function visibleBtn() {
  document.getElementById("btnLeft").style.visibility = "visible";
  document.getElementById("btnRight").style.visibility = "visible";
}



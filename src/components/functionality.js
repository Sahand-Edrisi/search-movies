// search
export function ShowSearchMoviesOff() {
  setTimeout(() => {
    let notFindMovieDisplayOn = document.getElementById("SearchMovies");
    if (notFindMovieDisplayOn !== null) {
      notFindMovieDisplayOn.style = "  width: 0px ;  height: 0px;";
    }
  }, 1);
}
export function clearInput(){
  let input = document.getElementById("input");
  if(input.value !== ""){
    input.value = "";
  }
}
export function ShowSearchMoviesOn() {
  setTimeout(() => {
    let notFindMovieDisplayOff = document.getElementById("SearchMovies");

    if (notFindMovieDisplayOff !== null) {
      notFindMovieDisplayOff.style = "  width: 210px ;  height: 280px;";
    }
  }, 1);
}

export function goDown() {
  let hover = document.querySelectorAll("#hover");
  let input = document.getElementById("input")
  input.focus()
  if (hover[0].style.translate === "" && hover.length > 3) {
    for (let i = 0; i <= hover.length - 1; i++) {
      hover[i].style = "  translate: 0px -255px;";
    }
  } else if (
    hover[0].style.cssText === "translate: 0px -255px;" &&
    hover.length > 6
  ) {
    for (let i = 0; i <= hover.length - 1; i++) {
      hover[i].style = "  translate: 0px -510px;";
    }
  } else if (
    hover[0].style.cssText === "translate: 0px -510px;" &&
    hover.length > 9
  ) {
    for (let i = 0; i <= hover.length - 1; i++) {
      hover[i].style = "  translate: 0px -760px;";
    }
  }
}
function restActiveItem(){
  let itemsActive = document.querySelector(".items-active");
  setTimeout(() => {
    if (itemsActive !== null) {
      itemsActive.setAttribute("class", "items");
    }
  }, 1);
}
export function restSearchBoxItem() {
  restActiveItem()
  let hover = document.querySelectorAll("#hover");
  for (let i = 0; i <= hover.length - 1; i++) {
    hover[i].style = "";
  }
  
}

export function goUp() {
  let input = document.getElementById("input")
  let hover = document.querySelectorAll("#hover");
  input.focus()
  if (hover[0].style.cssText === "translate: 0px -760px;") {
    for (let i = 0; i <= hover.length - 1; i++) {
      hover[i].style = "  translate: 0px -510px;";
    }
  } else if (hover[0].style.cssText === "translate: 0px -510px;") {
    for (let i = 0; i <= hover.length - 1; i++) {
      hover[i].style = "  translate: 0px -255px;";
    }
  } else if (hover[0].style.cssText === "translate: 0px -255px;") {
    for (let i = 0; i <= hover.length - 1; i++) {
      hover[i].style.translate = "";
    }
  }
}
export function itemActive(e){
let item = e.currentTarget
restActiveItem()
if(item.lastChild.className !== "items-active"){
  item.lastChild.className = "items-active"
}
}
export function itemInactive(e){
  let item = e.currentTarget
  if(item.lastChild.className === "items-active"){
    item.lastChild.className = "items"
  }
}
// Pagination
export function paginationReload() {
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
}
export function nextPage() {
  let numbers = document.querySelectorAll(".numbers");
  let moviesShow = document.querySelectorAll("#displayOn");
  let movie = document.querySelectorAll(".movie");
  if (numbers[numbers.length - 1].className !== "numbers active") {
    hiddenBtnNext();
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
            "translate : -3000px 0px; transition : all .4s ease-in-out";
          setTimeout(() => {
            moviesShow[i].setAttribute("id", "displayOff");
          }, 300);
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
                "translate :0px 0px; transition : all .4s ease-in-out";
            }, 150);
          }, 300);
        }
      }
    }
  }
  scrollTo();
  setTimeout(() => {
    visibleBtnNext();
  }, 1000);
}
export function previousPage() {
  let numbers = document.querySelectorAll(".numbers");
  let moviesShow = document.querySelectorAll("#displayOn");
  let movie = document.querySelectorAll(".movie");
  if (numbers[0].className !== "numbers active") {
    enableBtnPrevious();
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
            "translate : +3000px 0px; transition : all .4s ease-in-out";
          setTimeout(() => {
            moviesShow[i].setAttribute("id", "displayOff");
          }, 300);
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
                "translate :0px 0px; transition : all .4s ease-in-out";
            }, 150);
          }, 300);
        }
      }
    }
    scrollTo();
  }
  setTimeout(() => {
    visibleBtnPrevious();
  }, 1000);
}
export function showPages(e) {
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
}
export function scrollTo() {
  window.scrollTo({ top: 700, behavior: "smooth" });
}
function hiddenBtnNext() {
  document.getElementById("next").style.visibility = "hidden";
}
function visibleBtnNext() {
  document.getElementById("next").style.visibility = "visible";
}

function enableBtnPrevious() {
  document.getElementById("previous").style.visibility = "hidden";
}
function visibleBtnPrevious() {
  document.getElementById("previous").style.visibility = "visible";
}

// Slice name
export function nameDataSlice(name) {
  if (name.length > 35) {
    let slice = name.slice(0, 30);
    let add = (slice += "...");
    return add;
  } else {
    return name;
  }
}

export function hiddenBtn() {
  document.getElementById("btnLeft").style.visibility = "hidden";
  document.getElementById("btnRight").style.visibility = "hidden";
}
export function visibleBtn() {
  document.getElementById("btnLeft").style.visibility = "visible";
  document.getElementById("btnRight").style.visibility = "visible";
}

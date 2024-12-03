import { useState, useEffect } from "react";
import axios from "axios";
import MoviesShow from "./moviesShow";
import NotFound from "./notFound";
import BestMovies from "./bestMovies";

const GetDataMovie = () => {
  const [Movies, setMovieData] = useState([]);
  const [vpn, setVpn] = useState(false);
  const data = Movies.map((f, index) => ({
    name: f.show.name,
    image: f.show.image ? f.show.image.medium : undefined,
    imageOriginal: f.show.image ? f.show.image.original : undefined,
    genres: f.show.genres.join(","),
    visitSite: f.show.url,
    officialSite: f.show.officialSite,
    language: f.show.language,
    rating: f.show.rating.average,
    summary: f.show.summary ? f.show.summary : undefined,
    id: index,
  }));

  useEffect(() => {
    let url = fetch("https://api.tvmaze.com/search/shows?q=breaking");
    url
      .then(async (res) => {
        const response = await axios.get(res.url);
        setMovieData(response.data);
        setVpn(true);
      })
      .catch((e) => {
        setVpn(false);
        console.log(e.message);
      });
  }, []);

  function search() {
    let input = document.getElementById("input");
    let url = fetch("https://api.tvmaze.com/search/shows?q=" + input.value);
    input.value = "";
    url
      .then(async (res) => {
        const response = await axios.get(res.url);
        if (response.data.length === 0) {
          notFindMovieDisplayOn()
        } else {
          notFindMovieDisplayOff()
          setMovieData(response.data);
          setVpn(true);
          paginationReload();
        }
      })
      .catch((e) => {
        setVpn(false);
        console.log(e.message);
      });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function searchWithWord(e) {
    let input = e.currentTarget;
    let url = fetch("https://api.tvmaze.com/search/shows?q=" + input.value);
    url
      .then(async (res) => {
        const response = await axios.get(res.url);
        if (response.data.length === 0) {
          notFindMovieDisplayOn()
        } else {
          notFindMovieDisplayOff()
          setMovieData(response.data);
          setVpn(true);
          paginationReload();
        }
      })
      .catch((e) => {
        setVpn(false);
        console.log(e.message);
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      console.log(input.value === "");
      if(input.value === ""){
     setTimeout(()=>{
       let notFindMovieDisplayOn = document.getElementById("notFindMovieDisplayOn")
       console.log(notFindMovieDisplayOn);
       notFindMovieDisplayOn.setAttribute("id","notFindMovieDisplayOff")
     },20)
      }
    }
    function pressEnter(e) {
    let enter = e.key;
    if (enter === "Enter") {
      search();
    }
  }

  function refresh() {
    window.location.reload();
  }

  return (
    <>
      <div className="header" id="header">
      <div className="buttons">
   <div className="searchIcon">
          <button className="btnSearch" onClick={search}>
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div id="homeIcon">
          <button id="btnHome" onClick={refresh}>
            <i className="fa-solid fa-house" id="HomeICon"></i>
          </button>
        </div>
   </div>
        <div className="search-box">
          <input
            id="input"
            type="text"
            onKeyDown={pressEnter}
            onChange={searchWithWord}
          />
          <div id="notFindMovieDisplayOff">
            <span>No movie found with this name</span>
          </div>
        </div>

      </div>
   
{vpn === true ? (
          data.length >= 3 ? (
            <>
              <BestMovies />
              <div id="MoviesShow">
                {data.map((i, index) => (
                  <MoviesShow
                    key={index}
                    name={i.name}
                    image={i.imageOriginal ? i.imageOriginal : i.image}
                    genres={i.genres}
                    visitSite={i.visitSite}
                    officialSite={i.officialSite}
                    language={i.language}
                    rating={i.rating}
                    id={i.id}
                    summary={i.summary}
                  />
                ))}
              </div>
              <div className="containerPagination">
                <div className="titlePagination">
                  <p>Movies pages</p>
                </div>
                <div className="paginationShow">
                  <button id="previous" onClick={previousPage}>
                    Previous
                  </button>
                  <div id="pages">{createPages()}</div>
                  <button id="next" onClick={nextPage}>
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div id="MoviesShow">
              {data.map((i, index) => (
                <MoviesShow
                  key={index}
                  name={i.name}
                  image={i.imageOriginal ? i.imageOriginal : i.image}
                  genres={i.genres}
                  visitSite={i.visitSite}
                  officialSite={i.officialSite}
                  language={i.language}
                  rating={i.rating}
                  id={i.id}
                  summary={i.summary}
                />
              ))}
            </div>
          )
        ) : (
          <NotFound />
        )}

    </>
  );
function notFindMovieDisplayOff(){
  let notFindMovieDisplayOn = document.getElementById("notFindMovieDisplayOn")
  setTimeout(()=>{
    if(notFindMovieDisplayOn !== null){
      notFindMovieDisplayOn.setAttribute("id" , "notFindMovieDisplayOff")
    }
  },1)
}
function notFindMovieDisplayOn(){
  let notFindMovieDisplayOff = document.getElementById("notFindMovieDisplayOff")
  setTimeout(()=>{
    if(notFindMovieDisplayOff !== null){
      notFindMovieDisplayOff.setAttribute("id" , "notFindMovieDisplayOn")
    }
  },1)
}
  function createPages() {
    setTimeout(() => {
      let numbers = document.querySelectorAll(".numbers");
      if (numbers.length === 0) {
        let dataLength = data.length;
        let result = dataLength / 2;
        let round = Math.round(result);
        let pages = document.getElementById("pages");
        for (let i = 0; i < round; i++) {
          let createSpan = document.createElement("span");
          createSpan.setAttribute("class", "numbers");
          createSpan.addEventListener("click", showPages);
          createSpan.setAttribute("id", i + 1);
          createSpan.innerText += [i + 1];
          pages.appendChild(createSpan);
        }
        let numbers = document.querySelectorAll(".numbers");
        numbers[0].setAttribute("class", "numbers active");
      }
    });
  }
  function paginationReload() {
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
    }, 1000);
  }
  function nextPage() {
    let numbers = document.querySelectorAll(".numbers");
    let moviesShow = document.querySelectorAll("#displayOn");
    let movie = document.querySelectorAll(".movie");
    for (let i = 0; i < numbers.length; i++) {
      if (
        i + 1 === numbers.length &&
        numbers[i].className === "numbers active"
      ) {
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function previousPage() {
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showPages(e) {
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
          movie[result].setAttribute("id", "displayOn");
        }
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

export default GetDataMovie;

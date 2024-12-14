import { useState, useEffect } from "react";
import axios from "axios";
import MoviesShow from "./moviesShow";
import Movie from "./movie";
import NotFound from "./notFound";
import BestMovies from "./bestMovies";
import notPicture from "../image/notPicture.jpg";
import { useParams, useNavigate } from "react-router-dom";

const GetDataMovie = () => {
  const params = useParams();
  const nav = useNavigate();
  const [Movies, setMovieData] = useState([]);
  const [vpn, setVpn] = useState(false);
  const [ShowSearchMovies, setShowSearchMovies] = useState([]);
  const data = Movies.map((f, index) => ({
    name: f.show.name,
    image: f.show.image ? f.show.image.medium : notPicture,
    imageOriginal: f.show.image ? f.show.image.original : notPicture,
    genres: f.show.genres ? f.show.genres.join(",") : undefined,
    visitSite: f.show.url,
    officialSite: f.show.officialSite,
    language: f.show.language,
    rating: f.show.rating.average ? f.show.rating.average : undefined,
    summary: f.show.summary ? f.show.summary : undefined,
    country: f.show.network !== null ? f.show.network.country.name : undefined,
    status: f.show.status !== null ? f.show.status : undefined,
    externals:
      f.show.externals.imdb !== null ? f.show.externals.imdb : undefined,
    id: index,
  }));
  const showMoviesInSearch = ShowSearchMovies.map((f, index) => ({
    key: index,
    name: f.show.name,
    imageOriginal: f.show.image ? f.show.image.medium : notPicture,
  }));
  useEffect(() => {
    let url = fetch("https://api.tvmaze.com/search/shows?q=breking");
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

  return (
    <>
      <div className="header" id="header">
        <div className="search">
          <div className="search-box">
            <input
              id="input"
              type="text"
              onKeyDown={pressEnter}
              onChange={searchWithWord}
            />
            <div id="ShowSearchMoviesOff">
              {showMoviesInSearch.map((i, index) => (
                <div key={index} className="items">
                  <img src={i.imageOriginal} alt="" />
                  <p className="names" key={index}>
                    {nameDataSlice(i.name)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="searchIcon">
            <button className="btnSearch" onClick={search}>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        <div id="homeIcon">
          <button id="btnHome" onClick={refresh}>
            <i className="fa-solid fa-house" id="HomeICon"></i>
          </button>
        </div>
      </div>
      {vpn === true ? (
        params.id === undefined ? (
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
                  <div id="pages">{createPagination()}</div>
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
                  language={i.language}
                  rating={i.rating}
                  id={i.id}
                  summary={i.summary}
                />
              ))}
            </div>
          )
        ) : (
          data.map((i, index) =>
            `'${params.id}'` === `'${i.id}'` ? (
              <Movie
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
                country={i.country}
                status={i.status}
                IMDb={i.externals}
              />
            ) : undefined
          )
        )
      ) : (
        <NotFound />
      )}
    </>
  );

  function refresh() {
    let movies = document.querySelectorAll(".movie");
    if (movies.length > 0) {
      for (let i = 0; i < movies.length; i++) {
        movies[i].setAttribute("id", "displayOff");
      }
      movies[0].setAttribute("id", "displayOn");
      movies[1].setAttribute("id", "displayOn");
    }
    nav("/search-movies/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // search
  function search() {
    let input = document.getElementById("input");
    let url = fetch("https://api.tvmaze.com/search/shows?q=" + input.value);
    input.value = "";
    url
      .then(async (res) => {
        const response = await axios.get(res.url);
        if (response.data.length === 0) {
          ShowSearchMoviesOff();
        } else {
          ShowSearchMoviesOn();
          setMovieData(response.data);
          setVpn(true);
          paginationReload();
          if (input.value === "") {
            setTimeout(() => {
              let notFindMovieDisplayOn =
                document.getElementById("ShowSearchMoviesOn");
              if (notFindMovieDisplayOn !== null) {
                notFindMovieDisplayOn.setAttribute("id", "ShowSearchMoviesOff");
              }
            }, 20);
          }
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
          ShowSearchMoviesOff();
        } else {
          ShowSearchMoviesOn();
          setShowSearchMovies(response.data);
          setVpn(true);
          paginationReload();
        }
      })
      .catch((e) => {
        setVpn(false);
        console.log(e.message);
      });
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (input.value === "") {
      setTimeout(() => {
        let notFindMovieDisplayOn =
          document.getElementById("ShowSearchMoviesOn");
        if (notFindMovieDisplayOn !== null) {
          notFindMovieDisplayOn.setAttribute("id", "ShowSearchMoviesOff");
        }
      }, 20);
    }
  }
  function pressEnter(e) {
    let enter = e.key;
    if (enter === "Enter") {
      search();
      nav("/search-movies/");
      setTimeout(() => {
        let notFindMovieDisplayOn =
          document.getElementById("ShowSearchMoviesOn");
        if (notFindMovieDisplayOn !== null) {
          notFindMovieDisplayOn.setAttribute("id", "ShowSearchMoviesOff");
        }
      }, 20);
    }
  }
  function ShowSearchMoviesOff() {
    let notFindMovieDisplayOn = document.getElementById("ShowSearchMoviesOn");
    setTimeout(() => {
      if (notFindMovieDisplayOn !== null) {
        notFindMovieDisplayOn.setAttribute("id", "ShowSearchMoviesOff");
      }
    }, 1);
  }
  function ShowSearchMoviesOn() {
    let notFindMovieDisplayOff = document.getElementById("ShowSearchMoviesOff");
    setTimeout(() => {
      if (notFindMovieDisplayOff !== null) {
        notFindMovieDisplayOff.setAttribute("id", "ShowSearchMoviesOn");
      }
    }, 1);
  }

  // Pagination
  function createPagination() {
    setTimeout(() => {
      let pages = document.getElementById("pages");
      let numbers = document.querySelectorAll(".numbers");
      if (numbers.length > 1) {
        for (let i = 0; i < numbers.length; i++) {
          numbers[i].remove();
        }
      }
      let dataLength = data.length;
      let result = dataLength / 2;
      let round = Math.round(result);
      for (let i = 0; i < round; i++) {
        let createSpan = document.createElement("span");
        createSpan.setAttribute("class", "numbers");
        createSpan.addEventListener("click", showPages);
        createSpan.setAttribute("id", i + 1);
        createSpan.innerText += [i + 1];
        pages.appendChild(createSpan);
      }
      let numbersActive = document.querySelectorAll(".numbers");
      numbersActive[0].setAttribute("class", "numbers active");
    }, 10);
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
          if (movie[result] === undefined) {
            break;
          }
          movie[result].setAttribute("id", "displayOn");
        }
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Slice name
  function nameDataSlice(name) {
    if (name.length > 35) {
      let slice = name.slice(0, 35);
      let add = (slice += "...");
      console.log(add);
      return add;
    } else {
      return name;
    }
  }
};

export default GetDataMovie;

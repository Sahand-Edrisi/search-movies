import { useState, useEffect, useRef } from "react";
import axios from "axios";
import MoviesShow from "./moviesShow";
import Movie from "./movie";
import NotFound from "./notFound";
import notPicture from "../image/notPicture.jpg";
import { useParams, useNavigate } from "react-router-dom";

const GetDataMovie = () => {
  const params = useParams();
  const nav = useNavigate();
  const BestMovieParentElement = useRef();

  // Movie Data
  const [Movies, setMovieData] = useState([]);
  const [vpn, setVpn] = useState(false);
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

  // best Movies data
  const [bestMovies, setBestMovies] = useState([]);
  const [ShowBestMovies, setShowBestMovies] = useState(undefined);
  const BestMoviesData = bestMovies.map((i, index) => ({
    name: i.show.name,
    image: i.show.image ? i.show.image.medium : notPicture,
    imageOriginal: i.show.image ? i.show.image.original : notPicture,
    genres: i.show.genres ? i.show.genres.join(",") : undefined,
    visitSite: i.show.url,
    officialSite: i.show.officialSite,
    language: i.show.language,
    rating: i.show.rating.average ? i.show.rating.average : undefined,
    summary: i.show.summary ? i.show.summary : undefined,
    country: i.show.network !== null ? i.show.network.country.name : undefined,
    status: i.show.status !== null ? i.show.status : undefined,
    externals:
      i.show.externals.imdb !== null ? i.show.externals.imdb : undefined,
    id: index,
  }));

  // search Movies data
  const [ShowSearchMovies, setShowSearchMovies] = useState([]);
  const showMoviesInSearch = ShowSearchMovies.map((f, index) => ({
    key: index,
    name: f.show.name,
    imageOriginal: f.show.image ? f.show.image.medium : notPicture,
  }));

  useEffect(() => {
    let url = fetch("https://api.tvmaze.com/search/shows?q=breking");
    let BestMovieUrl = fetch("https://api.tvmaze.com/search/shows?q=dark");

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

    BestMovieUrl.then(async (res) => {
      const response = await axios.get(res.url);
      setBestMovies(response.data);
    }).catch();
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
        ShowBestMovies === undefined ? (
          params.id === undefined ? (
            data.length >= 3 ? (
              <>
                {/* bestMovies */}
                <div id="bestMovies">
                  <button className="btnLeft" onClick={btnLeft}>
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                  <div id="images" ref={BestMovieParentElement}>
                    {createBestMovies()}
                  </div>
                  <button className="btnRight" onClick={btnRight}>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>

                {/* MoviesShow */}
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
                {/* Pagination */}
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
          BestMoviesData.map((i, index) =>
            `"${ShowBestMovies}"` === `"${i.id}"` ? (
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
    if (ShowBestMovies !== undefined) {
      setShowBestMovies(undefined);
    }
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

  // best Movie
  function createBestMovies() {
    let bestMoviesCount = document.querySelectorAll("#itemBestMovies");
    setTimeout(() => {
      if (bestMoviesCount.length === 0) {
        let Data = BestMoviesData;
        for (let i = 0; i < 3; i++) {
          let images = BestMovieParentElement.current;
          let createTagA = document.createElement("a");
          let createImg = document.createElement("img");
          createTagA.setAttribute("id", "itemBestMovies");
          createImg.addEventListener("click", test);
          createImg.setAttribute("src", Data[i].imageOriginal);
          createImg.setAttribute("id", Data[i].id);
          createImg.setAttribute("class", "imgShow");
          createTagA.appendChild(createImg);
          images.appendChild(createTagA);
        }
        let img = document.querySelectorAll(".imgShow");
        img[1].setAttribute("class", "imgShowCenter");
      }
    }, 10);
  }

  function test(e) {
    let item = e.currentTarget;
    setShowBestMovies(item.id);
  }

  function btnRight() {
    let Data = BestMoviesData;
    let imgShow = document.querySelectorAll(".imgShow");
    let imgShowCenter = document.querySelectorAll(".imgShowCenter");
    for (let i = 0; i <= 6; i++) {
      if (imgShow[0].currentSrc === Data[i].imageOriginal) {
        imgShow[0].setAttribute("src", Data[i + 1].imageOriginal);
        imgShowCenter[0].setAttribute("src", Data[i + 2].imageOriginal);
        imgShow[1].setAttribute("src", Data[i + 3].imageOriginal);
        imgShow[0].setAttribute("id", Data[i + 1].id);
        imgShowCenter[0].setAttribute("id", Data[i + 2].id);
        imgShow[1].setAttribute("id", Data[i + 3].id);
        break;
      } else if (imgShow[1].currentSrc === Data[9].imageOriginal) {
        imgShow[0].setAttribute("src", Data[8].imageOriginal);
        imgShowCenter[0].setAttribute("src", Data[9].imageOriginal);
        imgShow[1].setAttribute("src", Data[0].imageOriginal);
        imgShow[0].setAttribute("id", Data[8].id);
        imgShowCenter[0].setAttribute("id", Data[9].id);
        imgShow[1].setAttribute("id", Data[0].id);
        break;
      } else if (imgShow[1].currentSrc === Data[0].imageOriginal) {
        imgShow[0].setAttribute("src", Data[9].imageOriginal);
        imgShowCenter[0].setAttribute("src", Data[0].imageOriginal);
        imgShow[1].setAttribute("src", Data[1].imageOriginal);
        imgShow[0].setAttribute("id", Data[9].id);
        imgShowCenter[0].setAttribute("id", Data[0].id);
        imgShow[1].setAttribute("id", Data[1].id);
        break;
      } else if (imgShow[1].currentSrc === Data[1].imageOriginal) {
        imgShow[0].setAttribute("src", Data[0].imageOriginal);
        imgShowCenter[0].setAttribute("src", Data[1].imageOriginal);
        imgShow[1].setAttribute("src", Data[2].imageOriginal);
        imgShow[0].setAttribute("id", Data[0].id);
        imgShowCenter[0].setAttribute("id", Data[1].id);
        imgShow[1].setAttribute("id", Data[2].id);
        break;
      }
    }
  }

  function btnLeft() {
    let Data = BestMoviesData;
    let imgShow = document.querySelectorAll(".imgShow");
    let imgShowCenter = document.querySelectorAll(".imgShowCenter");
    for (let i = 7; i >= 0; i--) {
      if (imgShow[0].currentSrc === Data[0].imageOriginal) {
        imgShow[0].setAttribute("src", Data[9].imageOriginal);
        imgShowCenter[0].setAttribute("src", Data[0].imageOriginal);
        imgShow[1].setAttribute("src", Data[1].imageOriginal);
        imgShow[0].setAttribute("id", Data[9].id);
        imgShowCenter[0].setAttribute("id", Data[0].id);
        imgShow[1].setAttribute("id", Data[1].id);
        break;
      } else if (imgShow[0].currentSrc === Data[9].imageOriginal) {
        imgShow[0].setAttribute("src", Data[8].imageOriginal);
        imgShowCenter[0].setAttribute("src", Data[9].imageOriginal);
        imgShow[1].setAttribute("src", Data[0].imageOriginal);
        imgShow[0].setAttribute("id", Data[8].id);
        imgShowCenter[0].setAttribute("id", Data[9].id);
        imgShow[1].setAttribute("id", Data[0].id);
        break;
      } else if (imgShow[0].currentSrc === Data[8].imageOriginal) {
        imgShow[0].setAttribute("src", Data[7].imageOriginal);
        imgShowCenter[0].setAttribute("src", Data[8].imageOriginal);
        imgShow[1].setAttribute("src", Data[9].imageOriginal);
        imgShow[0].setAttribute("id", Data[7].id);
        imgShowCenter[0].setAttribute("id", Data[8].id);
        imgShow[1].setAttribute("id", Data[9].id);
        break;
      } else if (imgShow[0].currentSrc === Data[i].imageOriginal) {
        imgShow[0].setAttribute("src", Data[i - 1].imageOriginal);
        imgShowCenter[0].setAttribute("src", Data[i].imageOriginal);
        imgShow[1].setAttribute("src", Data[i + 1].imageOriginal);
        imgShow[0].setAttribute("id", Data[i - 1].id);
        imgShowCenter[0].setAttribute("id", Data[i].id);
        imgShow[1].setAttribute("id", Data[i + 1].id);
        break;
      }
    }
  }
};

export default GetDataMovie;

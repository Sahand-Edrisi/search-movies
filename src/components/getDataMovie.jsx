import { useState, useEffect } from "react";
import axios from "axios";
import MoviesShow from "./moviesShow";
import Movie from "./movie";
import NotFound from "./notFound";
import Background from "../image/Tommy-Shelby.avif";
import notPicture from "../image/notPicture.jpg";
import { useParams, useNavigate, Link } from "react-router-dom";

const GetDataMovie = () => {
  const params = useParams();
  const nav = useNavigate();

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
  const [showBestMovies, setShowBestMovies] = useState(undefined);
  const bestMoviesData = bestMovies.map((i, index) => ({
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
  const [showSearchMovies, setShowSearchMovies] = useState([]);
  const [showSearchMoviesItem, setShowSearchMoviesItem] = useState(undefined);
  const showMoviesInSearch = showSearchMovies.map((i, index) => ({
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
  // save search Movies data
  const [showSearchMoviesItemData, setShowSearchMoviesItemData] = useState([]);
  const SaveSearchMoviesItemData = showSearchMoviesItemData.map((i, index) => ({
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
      <div className="body">
        <img className="bac" src={Background} alt="" />
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
                  <Link key={index}>
                    <div
                      key={index}
                      className="items"
                      onClick={showItem}
                      id={index}
                    >
                      <img src={i.imageOriginal} alt="" />
                      <p className="names" key={index}>
                        {nameDataSlice(i.name)}
                      </p>
                    </div>
                  </Link>
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
          showSearchMoviesItem === undefined ? (
            showBestMovies === undefined ? (
              params.id === undefined ? (
                data.length >= 3 ? (
                  <>
                    {/* bestMovies */}
                    <div id="bestMovies">
                      <button id="btnLeft" onClick={btnLeft}>
                        <i className="fa-solid fa-arrow-left"></i>
                      </button>
                      <div id="images">{createBestMovies()}</div>
                      <button id="btnRight" onClick={btnRight}>
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
                  <>
                    {/* bestMovies */}
                    <div id="bestMovies">
                      <button id="btnLeft" onClick={btnLeft}>
                        <i className="fa-solid fa-arrow-left"></i>
                      </button>
                      <div id="images">{createBestMovies()}</div>
                      <button id="btnRight" onClick={btnRight}>
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
                          language={i.language}
                          rating={i.rating}
                          id={i.id}
                          summary={i.summary}
                        />
                      ))}
                    </div>
                  </>
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
              bestMoviesData.map((i, index) =>
                `"${showBestMovies}"` === `"${i.id}"` ? (
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
            SaveSearchMoviesItemData.map((i, index) =>
              `"${showSearchMoviesItem}"` === `"${i.id}"` ? (
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
      </div>
    </>
  );

  function refresh() {
    let movies = document.querySelectorAll(".movie");
    if (showBestMovies !== undefined) {
      setShowBestMovies(undefined);
    }
    if (showSearchMoviesItem !== undefined) {
      setShowSearchMoviesItem(undefined);
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
    if (input.value !== "") {
      input.value = "";
      if (showBestMovies !== undefined) {
        setShowBestMovies(undefined);
      }
      if (showSearchMoviesItem !== undefined) {
        setShowSearchMoviesItem(undefined);
      }
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
              ShowSearchMoviesOff();
            }
          }
        })
        .catch((e) => {
          setVpn(false);
          console.log(e.message);
        });
      nav("/search-movies/");
    }
    window.scrollTo({ top: 600, behavior: "smooth" });
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
    if (input.value === "") {
      ShowSearchMoviesOff();
    }
  }
  function pressEnter(e) {
    let enter = e.key;
    if (enter === "Enter") {
      search();
      nav("/search-movies/");
      ShowSearchMoviesOff();
      if (showSearchMoviesItem !== undefined) {
        setShowSearchMoviesItem(undefined);
      }
      window.scrollTo({ top: 600, behavior: "smooth" });
    }
  }
  function ShowSearchMoviesOff() {
    setTimeout(() => {
      let notFindMovieDisplayOn = document.getElementById("ShowSearchMoviesOn");
      if (notFindMovieDisplayOn !== null) {
        notFindMovieDisplayOn.setAttribute("id", "ShowSearchMoviesOff");
      }
    }, 1);
  }
  function ShowSearchMoviesOn() {
    setTimeout(() => {
      let notFindMovieDisplayOff = document.getElementById(
        "ShowSearchMoviesOff"
      );
      if (notFindMovieDisplayOff !== null) {
        notFindMovieDisplayOff.setAttribute("id", "ShowSearchMoviesOn");
        notFindMovieDisplayOff.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 1);
  }
  function showItem(e) {
    if (showSearchMoviesItem !== undefined) {
      setShowSearchMoviesItem(undefined);
    }
    let item = e.currentTarget;
    let input = document.getElementById("input");
    input.value = "";
    setShowSearchMoviesItem(item.id);
    ShowSearchMoviesOff();
    let saveData = [...showSearchMovies];
    setShowSearchMoviesItemData(saveData);
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
      return add;
    } else {
      return name;
    }
  }

  // best Movie
  function createBestMovies() {
    let bestMoviesCount = document.querySelectorAll("#itemBestMovies");
    if (bestMoviesCount.length > 3) {
      for (let i = 0; i < bestMoviesCount.length; i++) {
        bestMoviesCount[i].remove();
      }
    }
    setTimeout(() => {
      if (bestMoviesCount.length === 0 || bestMoviesCount.length < 3) {
        let Data = bestMoviesData;
        for (let i = 0; i < 3; i++) {
          let images = document.getElementById("images");
          let createTagA = document.createElement("a");
          let createImg = document.createElement("img");
          createTagA.setAttribute("id", "itemBestMovies");
          createImg.addEventListener("click", bestMovieShow);
          createImg.setAttribute(
            "src",
            Data[i].imageOriginal ? Data[i].imageOriginal : undefined
          );
          createImg.setAttribute("id", Data[i].id);
          createImg.setAttribute("class", "imgShow");
          createTagA.appendChild(createImg);
          images.appendChild(createTagA);
        }
        let img = document.querySelectorAll(".imgShow");
        img[1].setAttribute("class", "imgShowCenter");
      } else {
        return undefined;
      }
    }, 50);
  }
  function bestMovieShow(e) {
    let item = e.currentTarget;
    setShowBestMovies(item.id);
  }
  // btnRight

  function disableBtn() {
    document.getElementById("btnLeft").style.display = "none";
    document.getElementById("btnRight").style.display = "none";
  }
  function enableBtn() {
    document.getElementById("btnLeft").style.display = "block";
    document.getElementById("btnRight").style.display = "block";
  }

  function btnRight() {
    let Data = bestMoviesData;
    let imgShow = document.querySelectorAll(".imgShow");
    let imgShowCenter = document.querySelectorAll(".imgShowCenter");
    function translate() {
      imgShow[0].style =
        "  translate: -3000px 0px;transition: all 1s ease-in-out;";
      imgShowCenter[0].style =
        "  translate: -400px 0px;transition: all 1s ease-in-out;";
      imgShow[1].style =
        " translate: -400px 0px;transition: all 1s ease-in-out;";
    }
    for (let i = 0; i <= 6; i++) {
      if (imgShow[0].currentSrc === Data[i].imageOriginal) {
        disableBtn();
        translate();
        setTimeout(() => {
          imgShowCenter[0].setAttribute("class", "imgShow");
          imgShow[1].setAttribute("class", "imgShowCenter");
          setTimeout(() => {
            imgShow[0].style = "translate: 3000px 0px";
            imgShow[0].setAttribute("src", Data[i + 3].imageOriginal);
            setTimeout(() => {
              imgShow[0].style =
                "translate: 750px 0px ;transition: all 1s ease-in-out";
              imgShow[0].setAttribute("id", Data[i + 3].id);
            }, 200);
          }, 200);
        }, 500);

        setTimeout(() => {
          imgShow[0].style = "translate: 0px 0px";
          imgShowCenter[0].style = "translate: 0px 0px";
          imgShow[1].style = "translate: 0px 0px";
          imgShow[0].setAttribute("src", Data[i + 1].imageOriginal);
          imgShowCenter[0].setAttribute("src", Data[i + 2].imageOriginal);
          imgShowCenter[0].setAttribute("class", "imgShowCenter");
          imgShow[1].setAttribute("src", Data[i + 3].imageOriginal);
          imgShow[1].setAttribute("class", "imgShow");
          imgShow[0].setAttribute("id", Data[i + 1].id);
          imgShowCenter[0].setAttribute("id", Data[i + 2].id);
          imgShow[1].setAttribute("id", Data[i + 3].id);
          enableBtn();
        }, 2000);
        break;
      } else if (imgShow[1].currentSrc === Data[9].imageOriginal) {
        disableBtn();
        translate();
        setTimeout(() => {
          imgShowCenter[0].setAttribute("class", "imgShow");
          imgShow[1].setAttribute("class", "imgShowCenter");
          setTimeout(() => {
            imgShow[0].style = "translate: 3000px 0px";
            imgShow[0].setAttribute("src", Data[0].imageOriginal);
            setTimeout(() => {
              imgShow[0].style =
                "translate: 750px 0px ;transition: all 0.8s ease-in-out";
              imgShow[0].setAttribute("id", Data[0].id);
            }, 200);
          }, 200);
        }, 500);

        setTimeout(() => {
          imgShow[0].style = "translate: 0px 0px";
          imgShowCenter[0].style = "translate: 0px 0px";
          imgShow[1].style = "translate: 0px 0px";
          imgShow[0].setAttribute("src", Data[8].imageOriginal);
          imgShowCenter[0].setAttribute("src", Data[9].imageOriginal);
          imgShowCenter[0].setAttribute("class", "imgShowCenter");
          imgShow[1].setAttribute("src", Data[0].imageOriginal);
          imgShow[1].setAttribute("class", "imgShow");
          imgShow[0].setAttribute("id", Data[8].id);
          imgShowCenter[0].setAttribute("id", Data[9].id);
          imgShow[1].setAttribute("id", Data[0].id);
          enableBtn();
        }, 2000);
        break;
      } else if (imgShow[1].currentSrc === Data[0].imageOriginal) {
        disableBtn();
        translate();
        setTimeout(() => {
          imgShowCenter[0].setAttribute("class", "imgShow");
          imgShow[1].setAttribute("class", "imgShowCenter");
          setTimeout(() => {
            imgShow[0].style = "translate: 3000px 0px";
            imgShow[0].setAttribute("src", Data[1].imageOriginal);
            setTimeout(() => {
              imgShow[0].style =
                "translate: 750px 0px ;transition: all 0.8s ease-in-out";
              imgShow[0].setAttribute("id", Data[1].id);
            }, 200);
          }, 200);
        }, 500);

        setTimeout(() => {
          imgShow[0].style = "translate: 0px 0px";
          imgShowCenter[0].style = "translate: 0px 0px";
          imgShow[1].style = "translate: 0px 0px";
          imgShow[0].setAttribute("src", Data[9].imageOriginal);
          imgShowCenter[0].setAttribute("src", Data[0].imageOriginal);
          imgShowCenter[0].setAttribute("class", "imgShowCenter");
          imgShow[1].setAttribute("src", Data[1].imageOriginal);
          imgShow[1].setAttribute("class", "imgShow");
          imgShow[0].setAttribute("id", Data[9].id);
          imgShowCenter[0].setAttribute("id", Data[0].id);
          imgShow[1].setAttribute("id", Data[1].id);
          enableBtn();
        }, 2000);

        break;
      } else if (imgShow[1].currentSrc === Data[1].imageOriginal) {
        disableBtn();
        translate();
        setTimeout(() => {
          imgShowCenter[0].setAttribute("class", "imgShow");
          imgShow[1].setAttribute("class", "imgShowCenter");
          setTimeout(() => {
            imgShow[0].style = "translate: 3000px 0px";
            imgShow[0].setAttribute("src", Data[2].imageOriginal);
            setTimeout(() => {
              imgShow[0].style =
                "translate: 750px 0px ;transition: all 0.8s ease-in-out";
              imgShow[0].setAttribute("id", Data[2].id);
            }, 200);
          }, 200);
        }, 500);

        setTimeout(() => {
          imgShow[0].style = "translate: 0px 0px";
          imgShowCenter[0].style = "translate: 0px 0px";
          imgShow[1].style = "translate: 0px 0px";
          imgShow[0].setAttribute("src", Data[0].imageOriginal);
          imgShowCenter[0].setAttribute("src", Data[1].imageOriginal);
          imgShowCenter[0].setAttribute("class", "imgShowCenter");
          imgShow[1].setAttribute("src", Data[2].imageOriginal);
          imgShow[1].setAttribute("class", "imgShow");
          imgShow[0].setAttribute("id", Data[0].id);
          imgShowCenter[0].setAttribute("id", Data[1].id);
          imgShow[1].setAttribute("id", Data[2].id);
          enableBtn();
        }, 2000);
        break;
      }
    }
  }

  // btnLeft

  function btnLeft() {
    let Data = bestMoviesData;
    let imgShow = document.querySelectorAll(".imgShow");
    let imgShowCenter = document.querySelectorAll(".imgShowCenter");
    function translate() {
      imgShow[1].style =
        "  translate: +3000px 0px;transition: all 1s ease-in-out;";
      imgShowCenter[0].style =
        "  translate: +400px 0px;transition: all 1s ease-in-out;";
      imgShow[0].style =
        " translate: +400px 0px;transition: all 1s ease-in-out;";
    }
    for (let i = 7; i >= 0; i--) {
      if (imgShow[0].currentSrc === Data[i].imageOriginal) {
        disableBtn();
        translate();
        setTimeout(() => {
          imgShowCenter[0].setAttribute("class", "imgShow");
          imgShow[0].setAttribute("class", "imgShowCenter");
          setTimeout(() => {
            imgShow[1].style = "translate: -3000px 0px";
            imgShow[1].setAttribute("src", Data[i - 1].imageOriginal);
            setTimeout(() => {
              imgShow[1].style =
                "translate: -750px 0px ;transition: all .8s ease-in-out";
              imgShow[1].setAttribute("id", Data[i - 1].id);
            }, 200);
          }, 200);
        }, 500);

        setTimeout(() => {
          imgShow[0].style = "translate: 0px 0px";
          imgShowCenter[0].style = "translate: 0px 0px";
          imgShow[1].style = "translate: 0px 0px";

          imgShow[0].setAttribute("src", Data[i - 1].imageOriginal);
          imgShowCenter[0].setAttribute("src", Data[i].imageOriginal);
          imgShow[1].setAttribute("src", Data[i + 1].imageOriginal);

          imgShow[0].setAttribute("class", "imgShow");
          imgShowCenter[0].setAttribute("class", "imgShowCenter");
          imgShow[1].setAttribute("class", "imgShow");

          imgShow[0].setAttribute("id", Data[i - 1].id);
          imgShowCenter[0].setAttribute("id", Data[i].id);
          imgShow[1].setAttribute("id", Data[i + 1].id);
          enableBtn();
        }, 2000);
        break;
      } else if (imgShow[0].currentSrc === Data[8].imageOriginal) {
        disableBtn();
        translate();
        setTimeout(() => {
          imgShowCenter[0].setAttribute("class", "imgShow");
          imgShow[0].setAttribute("class", "imgShowCenter");
          setTimeout(() => {
            imgShow[1].style = "translate: -3000px 0px";
            imgShow[1].setAttribute("src", Data[7].imageOriginal);
            setTimeout(() => {
              imgShow[1].style =
                "translate: -750px 0px ;transition: all .8s ease-in-out";
              imgShow[1].setAttribute("id", Data[7].id);
            }, 200);
          }, 200);
        }, 500);

        setTimeout(() => {
          imgShow[0].style = "translate: 0px 0px";
          imgShowCenter[0].style = "translate: 0px 0px";
          imgShow[1].style = "translate: 0px 0px";

          imgShow[0].setAttribute("src", Data[7].imageOriginal);
          imgShowCenter[0].setAttribute("src", Data[8].imageOriginal);
          imgShow[1].setAttribute("src", Data[9].imageOriginal);

          imgShow[0].setAttribute("class", "imgShow");
          imgShowCenter[0].setAttribute("class", "imgShowCenter");
          imgShow[1].setAttribute("class", "imgShow");

          imgShow[0].setAttribute("id", Data[7].id);
          imgShowCenter[0].setAttribute("id", Data[8].id);
          imgShow[1].setAttribute("id", Data[9].id);
          enableBtn();
        }, 2000);
        break;
      } else if (imgShow[0].currentSrc === Data[9].imageOriginal) {
        disableBtn();
        translate();
        setTimeout(() => {
          imgShowCenter[0].setAttribute("class", "imgShow");
          imgShow[0].setAttribute("class", "imgShowCenter");
          setTimeout(() => {
            imgShow[1].style = "translate: -3000px 0px";
            imgShow[1].setAttribute("src", Data[8].imageOriginal);
            setTimeout(() => {
              imgShow[1].style =
                "translate: -750px 0px ;transition: all .8s ease-in-out";
              imgShow[1].setAttribute("id", Data[8].id);
            }, 200);
          }, 200);
        }, 500);
        setTimeout(() => {
          imgShow[0].style = "translate: 0px 0px";
          imgShowCenter[0].style = "translate: 0px 0px";
          imgShow[1].style = "translate: 0px 0px";

          imgShow[0].setAttribute("src", Data[8].imageOriginal);
          imgShowCenter[0].setAttribute("src", Data[9].imageOriginal);
          imgShow[1].setAttribute("src", Data[0].imageOriginal);

          imgShow[0].setAttribute("class", "imgShow");
          imgShowCenter[0].setAttribute("class", "imgShowCenter");
          imgShow[1].setAttribute("class", "imgShow");

          imgShow[0].setAttribute("id", Data[8].id);
          imgShowCenter[0].setAttribute("id", Data[9].id);
          imgShow[1].setAttribute("id", Data[0].id);
          enableBtn();
        }, 2000);
        break;
      } else if (imgShow[0].currentSrc === Data[0].imageOriginal) {
        disableBtn();
        translate();
        setTimeout(() => {
          imgShowCenter[0].setAttribute("class", "imgShow");
          imgShow[0].setAttribute("class", "imgShowCenter");
          setTimeout(() => {
            imgShow[1].style = "translate: -3000px 0px";
            imgShow[1].setAttribute("src", Data[9].imageOriginal);
            setTimeout(() => {
              imgShow[1].style =
                "translate: -750px 0px ;transition: all .8s ease-in-out";
              imgShow[1].setAttribute("id", Data[9].id);
            }, 200);
          }, 200);
        }, 500);

        setTimeout(() => {
          imgShow[0].style = "translate: 0px 0px";
          imgShowCenter[0].style = "translate: 0px 0px";
          imgShow[1].style = "translate: 0px 0px";

          imgShow[0].setAttribute("src", Data[9].imageOriginal);
          imgShowCenter[0].setAttribute("src", Data[0].imageOriginal);
          imgShow[1].setAttribute("src", Data[1].imageOriginal);

          imgShowCenter[0].setAttribute("class", "imgShowCenter");
          imgShow[0].setAttribute("class", "imgShow");
          imgShow[1].setAttribute("class", "imgShow");

          imgShow[0].setAttribute("id", Data[9].id);
          imgShowCenter[0].setAttribute("id", Data[0].id);
          imgShow[1].setAttribute("id", Data[1].id);
          enableBtn();
        }, 2000);
        break;
      }
    }

  }
};

export default GetDataMovie;

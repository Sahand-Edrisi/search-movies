import { useState, useEffect } from "react";
import axios from "axios";
import MoviesShow from "./moviesShow";
import Movie from "./movie";
import NotFound from "./notFound";
import Background from "../image/Background.jpg";
import notPicture from "../image/notPicture.jpg";
import { Link } from "react-router-dom";
import {
  ShowSearchMoviesOff,
  nameDataSlice,
  ShowSearchMoviesOn,
  paginationReload,
  nextPage,
  previousPage,
  showPages,
  scrollTo,
  hiddenBtn,
  visibleBtn,
  goDown,
  goUp,
  restSearchBoxItem,
  itemActive,
  itemInactive

} from "./functionality";

const GetDataMovie = () => {
  // Movie Data
  const [Movies, setMovieData] = useState([]);
  const [vpn, setVpn] = useState(false);
  const [showMovie, setShowMovie] = useState(undefined);
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
    imageOriginal: i.show.image
      ? i.show.image.original
        ? i.show.image.original
        : notPicture
      : notPicture,
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
    let BestMovieUrl = fetch("https://api.tvmaze.com/search/shows?q=dark");
    BestMovieUrl.then(async (res) => {
      const response = await axios.get(res.url);
      setBestMovies(response.data);
      setVpn(true);
    }).catch((e) => {
      setVpn(false);
      console.log(e.message);
    });
  }, []);
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

  if (Movies.length > 0 || vpn === false || vpn === true) {
    return (
      <>
        <img className="bac" src={Background} alt="" />
        <div className="body">
          <div className="container">
            <div className="search">
              <div className="search-box">
                <input
                  autoComplete="off"
                  id="input"
                  type="search"
                  onKeyDown={pressKey}
                  onChange={searchWithWord}
                />
                <div id="SearchMovies">
                  <button onClick={goUp} className="up">
                    <i className="fa-solid fa-arrow-up"></i>
                  </button>
                  {showMoviesInSearch.map((i, index) => (
                    <Link key={index} id="hover"  onMouseEnter={itemActive}
                    onMouseLeave={itemInactive}>
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
                  <button onClick={goDown} className="down">
                    <i className="fa-solid fa-arrow-down"></i>
                  </button>
                </div>
              </div>
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
            {vpn === true ? (
              showSearchMoviesItem === undefined ? (
                showBestMovies === undefined ? (
                  showMovie === undefined ? (
                    data.length >= 3 ? (
                      <>
                        {/* bestMovies */}
                        <div id="bestMovies">
                          <button id="btnLeft" onClick={btnLeft}>
                            <i className="fa-solid fa-arrow-left"></i>
                          </button>
                          <div id="images">
                            <img
                              src={bestMoviesData[0].imageOriginal ? bestMoviesData[0].imageOriginal : notPicture}
                              id={bestMoviesData[0].id}
                              className="imgShow"
                              alt=""
                              onClick={bestMovieShow}
                            />
                            <img
                              src={bestMoviesData[1].imageOriginal}
                              id={bestMoviesData[1].id}
                              className="imgShowCenter"
                              alt=""
                              onClick={bestMovieShow}
                            />
                            <img
                              src={bestMoviesData[2].imageOriginal}
                              id={bestMoviesData[2].id}
                              className="imgShow"
                              alt=""
                              onClick={bestMovieShow}
                            />
                          </div>
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
                              image={
                                i.imageOriginal ? i.imageOriginal : i.image
                              }
                              genres={i.genres}
                              language={i.language}
                              rating={i.rating}
                              id={i.id}
                              summary={i.summary}
                            />
                          ))}
                          {addListener()}
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
                          <div id="images">
                            <img
                              src={bestMoviesData[0].imageOriginal}
                              id={bestMoviesData[1].id}
                              className="imgShow"
                              alt=""
                              onClick={bestMovieShow}
                            />
                            <img
                              src={bestMoviesData[1].imageOriginal}
                              id={bestMoviesData[1].id}
                              className="imgShowCenter"
                              alt=""
                              onClick={bestMovieShow}
                            />
                            <img
                              src={bestMoviesData[2].imageOriginal}
                              id={bestMoviesData[1].id}
                              className="imgShow"
                              alt=""
                              onClick={bestMovieShow}
                            />
                          </div>
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
                              image={
                                i.imageOriginal ? i.imageOriginal : i.image
                              }
                              genres={i.genres}
                              language={i.language}
                              rating={i.rating}
                              id={i.id}
                              summary={i.summary}
                            />
                          ))}
                          {addListener()}
                        </div>
                      </>
                    )
                  ) : (
                    data.map((i, index) =>
                      `'${showMovie}'` === `'${i.id}'` ? (
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
        </div>
      </>
    );
  }

  // refresh
  function refresh() {
    let movies = document.querySelectorAll(".movie");
    if (showBestMovies !== undefined) {
      setShowBestMovies(undefined);
    }
    if (showMovie !== undefined) {
      setShowMovie(undefined);
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
      movies[0].style = "translate: 0px 0px ; transition:all .8s ease-in-out";
      movies[1].style = "translate: 0px 0px ; transition:all .8s ease-in-out";
    }
    paginationReload();
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
    }
    scrollTo();
  }

  function searchWithWord(e) {
    restSearchBoxItem();
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
        }
      })
      .catch((e) => {
        if (Movies.length === 0) {
          setVpn(false);
          console.log(e.message);
        }
      });
    if (input.value === "") {
      ShowSearchMoviesOff();
      setShowSearchMovies([]);
    }
  }

  function pressKey(e) {
    let key = e.key;
    let hover = document.querySelectorAll("#hover");
    let item = document.querySelectorAll(".items")

    if (key === "ArrowDown") {
      if (showSearchMovies.length > 1) {
        for (let i = 0; i <= hover.length - 1; i++) {
     
            if (hover.length === item.length) {
              if(hover[0].style.translate === ""){
                hover[0].lastChild.className = "items-active";
              break
              }
              else if(hover[0].style.translate === "0px -255px"){
                hover[3].lastChild.className = "items-active";
                break
              }
              else if(hover[0].style.translate === "0px -510px"){
                hover[6].lastChild.className = "items-active";
              break
              }
              else if(hover[0].style.translate === "0px -760px"){
                hover[9].lastChild.className = "items-active";
              break
              }
            }
  
          if (hover[i].lastChild.className === "items-active") {
            if (hover[i + 1] !== undefined) {
              hover[i].lastChild.className = "items";
              hover[i + 1].lastChild.className = "items-active";
              if (i === 2) {
                goDown();
              }
              if (i === 5) {
                goDown();
              }
              if (i === 8) {
                goDown();
              }
            }
            break;
          }
        }
      }
    }

    if (key === "ArrowUp") {

      if (showSearchMovies.length > 1) {
        for (let i = 0; i <= hover.length - 1; i++) {
          if (hover.length === item.length) {  
              if(hover[0].style.translate === "" ){
                hover[0].lastChild.className = "items-active"
                break
              }
              else if(hover[0].style.translate === "0px -255px"){
                hover[5].lastChild.className = "items-active";
                break
              }
              else if(hover[0].style.translate === "0px -510px"){
                hover[8].lastChild.className = "items-active";
                break
              }
              else if(hover[0].style.translate === "0px -760px"){
                hover[9].lastChild.className = "items-active";
                break
              }
          }
          if (hover[i].lastChild.className === "items-active"){
            if(hover[i - 1] !== undefined){
              hover[i -1 ].lastChild.className = "items-active";
              hover[i].lastChild.className = "items";
              if (i === 3) {
                goUp();
              }
              if (i === 6) {
                goUp();
              }
              if (i === 9) {
                goUp();
              }
            }
          }
        }
      }
    }

    if (key === "Enter") {
      let itemsActive = document.querySelector(".items-active");
      if (itemsActive === null) {
        search();
        refresh();
        ShowSearchMoviesOff();
        setTimeout(()=>{
          scrollTo()
        },20)
        if (showSearchMoviesItem !== undefined) {
          setShowSearchMoviesItem(undefined);
        }
      } else {
        if (showSearchMoviesItem !== undefined) {
          setShowSearchMoviesItem(undefined);
        }
        console.log(itemsActive.id);
        setShowSearchMoviesItem(itemsActive.id);
        let input = document.getElementById("input");
        input.value = "";
        ShowSearchMoviesOff();
        let saveData = [...showSearchMovies];
        setShowSearchMoviesItemData(saveData);
      }
    }
  }

  function showItem(e) {
    if (showSearchMoviesItem !== undefined) {
      setShowSearchMoviesItem(undefined);
    }
    let item = e.currentTarget;
    let input = document.getElementById("input");
    input.value = "";
    console.log(item);
    setShowSearchMoviesItem(item.id);
    ShowSearchMoviesOff();
    let saveData = [...showSearchMovies];
    setShowSearchMoviesItemData(saveData);
  }
  // other function in js file

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
  // other function in js file

  // best Movie
  function bestMovieShow(e) {
    let item = e.currentTarget;
    setShowBestMovies(item.id);
  }

  function addListener() {
    setTimeout(() => {
      let movieShow = document.querySelectorAll(".movieShow");
      for (let i = 0; i < movieShow.length; i++) {
        movieShow[i].addEventListener("click", MovieShow);
      }
    }, 10);
  }

  function MovieShow(e) {
    let movie = e.currentTarget;
    setShowMovie(movie.id);
  }
  // btn for best movie

  function btnRight() {
    let Data = bestMoviesData;
    let imgShow = document.querySelectorAll(".imgShow");
    let imgShowCenter = document.querySelectorAll(".imgShowCenter");

    function translate() {
      imgShow[0].style =
        "  translate: -3000px 0px;transition: all .5s  ease-in-out;";
      imgShowCenter[0].style =
        "  translate: -400px 0px;transition: all .5s  ease-in-out;";
      imgShow[1].style =
        " translate: -400px 0px;transition: all .5s  ease-in-out;";
    }
    for (let i = 0; i <= 6; i++) {
      if (imgShow[0].currentSrc === Data[i].imageOriginal) {
        hiddenBtn();
        translate();
        setTimeout(() => {
          imgShowCenter[0].setAttribute("class", "imgShow");
          imgShow[1].setAttribute("class", "imgShowCenter");
          setTimeout(() => {
            imgShow[0].style = "translate: 3000px 0px";
            imgShow[0].setAttribute("src", Data[i + 3].imageOriginal);
            setTimeout(() => {
              imgShow[0].style =
                "translate: 750px 0px ;transition: all .5s  ease-in-out";
              imgShow[0].setAttribute("id", Data[i + 3].id);
            }, 150);
          }, 200);
        }, 300);

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
          visibleBtn();
        }, 1500);
        break;
      } else if (imgShow[1].currentSrc === Data[9].imageOriginal) {
        hiddenBtn();
        translate();
        setTimeout(() => {
          imgShowCenter[0].setAttribute("class", "imgShow");
          imgShow[1].setAttribute("class", "imgShowCenter");
          setTimeout(() => {
            imgShow[0].style = "translate: 3000px 0px";
            imgShow[0].setAttribute("src", Data[0].imageOriginal);
            setTimeout(() => {
              imgShow[0].style =
                "translate: 750px 0px ;transition: all .5s ease-in-out";
              imgShow[0].setAttribute("id", Data[0].id);
            }, 150);
          }, 200);
        }, 300);

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

          visibleBtn();
        }, 1500);
        break;
      } else if (imgShow[1].currentSrc === Data[0].imageOriginal) {
        hiddenBtn();
        translate();
        setTimeout(() => {
          imgShowCenter[0].setAttribute("class", "imgShow");
          imgShow[1].setAttribute("class", "imgShowCenter");
          setTimeout(() => {
            imgShow[0].style = "translate: 3000px 0px";
            imgShow[0].setAttribute("src", Data[1].imageOriginal);
            setTimeout(() => {
              imgShow[0].style =
                "translate: 750px 0px ;transition: all .5s ease-in-out";
              imgShow[0].setAttribute("id", Data[1].id);
            }, 150);
          }, 200);
        }, 300);

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
          visibleBtn();
        }, 1500);

        break;
      } else if (imgShow[1].currentSrc === Data[1].imageOriginal) {
        hiddenBtn();
        translate();
        setTimeout(() => {
          imgShowCenter[0].setAttribute("class", "imgShow");
          imgShow[1].setAttribute("class", "imgShowCenter");
          setTimeout(() => {
            imgShow[0].style = "translate: 3000px 0px";
            imgShow[0].setAttribute("src", Data[2].imageOriginal);
            setTimeout(() => {
              imgShow[0].style =
                "translate: 750px 0px ;transition: all .5s ease-in-out";
              imgShow[0].setAttribute("id", Data[2].id);
            }, 150);
          }, 200);
        }, 300);

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

          visibleBtn();
        }, 1500);
        break;
      }
    }
  }
  function btnLeft() {
    let Data = bestMoviesData;
    let imgShow = document.querySelectorAll(".imgShow");
    let imgShowCenter = document.querySelectorAll(".imgShowCenter");
    function translate() {
      imgShow[1].style =
        "  translate: +3000px 0px;transition: all .5s  ease-in-out;";
      imgShowCenter[0].style =
        "  translate: +400px 0px;transition: all .5s  ease-in-out;";
      imgShow[0].style =
        " translate: +400px 0px;transition: all .5s  ease-in-out;";
    }
    for (let i = 7; i >= 0; i--) {
      if (imgShow[0].currentSrc === Data[i].imageOriginal) {
        hiddenBtn();
        translate();
        setTimeout(() => {
          imgShowCenter[0].setAttribute("class", "imgShow");
          imgShow[0].setAttribute("class", "imgShowCenter");
          setTimeout(() => {
            imgShow[1].style = "translate: -3000px 0px";
            imgShow[1].setAttribute("src", Data[i - 1].imageOriginal);
            setTimeout(() => {
              imgShow[1].style =
                "translate: -750px 0px ;transition: all .5s ease-in-out";
              imgShow[1].setAttribute("id", Data[i - 1].id);
            }, 200);
          }, 200);
        }, 300);

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
          visibleBtn();
        }, 1500);
        break;
      } else if (imgShow[0].currentSrc === Data[8].imageOriginal) {
        hiddenBtn();
        translate();
        setTimeout(() => {
          imgShowCenter[0].setAttribute("class", "imgShow");
          imgShow[0].setAttribute("class", "imgShowCenter");
          setTimeout(() => {
            imgShow[1].style = "translate: -3000px 0px";
            imgShow[1].setAttribute("src", Data[7].imageOriginal);
            setTimeout(() => {
              imgShow[1].style =
                "translate: -750px 0px ;transition: all .5s ease-in-out";
              imgShow[1].setAttribute("id", Data[7].id);
            }, 200);
          }, 200);
        }, 300);

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
          visibleBtn();
        }, 1500);
        break;
      } else if (imgShow[0].currentSrc === Data[9].imageOriginal) {
        hiddenBtn();
        translate();
        setTimeout(() => {
          imgShowCenter[0].setAttribute("class", "imgShow");
          imgShow[0].setAttribute("class", "imgShowCenter");
          setTimeout(() => {
            imgShow[1].style = "translate: -3000px 0px";
            imgShow[1].setAttribute("src", Data[8].imageOriginal);
            setTimeout(() => {
              imgShow[1].style =
                "translate: -750px 0px ;transition: all .5s ease-in-out";
              imgShow[1].setAttribute("id", Data[8].id);
            }, 200);
          }, 200);
        }, 300);
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
          visibleBtn();
        }, 1500);
        break;
      } else if (imgShow[0].currentSrc === Data[0].imageOriginal) {
        hiddenBtn();
        translate();
        setTimeout(() => {
          imgShowCenter[0].setAttribute("class", "imgShow");
          imgShow[0].setAttribute("class", "imgShowCenter");
          setTimeout(() => {
            imgShow[1].style = "translate: -3000px 0px";
            imgShow[1].setAttribute("src", Data[9].imageOriginal);
            setTimeout(() => {
              imgShow[1].style =
                "translate: -750px 0px ;transition: all .5s ease-in-out";
              imgShow[1].setAttribute("id", Data[9].id);
            }, 150);
          }, 200);
        }, 300);

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
          visibleBtn();
        }, 1500);
        break;
      }
    }
  }
};

export default GetDataMovie;

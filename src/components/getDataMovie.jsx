import { useState, useEffect } from "react";
import axios from "axios";
import MoviesShow from "./moviesShow";
import { Link, useParams } from "react-router-dom";
import Movie from "./movie";
import NotFound from "./notFound";
import NotMovie from "./notMovie";

const GetDataMovie = () => {
  const params = useParams();
  const [Movies, setMovieData] = useState([]);
  const [vpn, setVpn] = useState(false);
  const [notMovie, setNotMovie] = useState(true);

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
    let input = document.getElementById("search");
    let url = fetch("https://api.tvmaze.com/search/shows?q=" + input.value);
    input.value = "";
    url
      .then(async (res) => {
        const response = await axios.get(res.url);
        setNotMovie(true);
        if (response.data.length === 0) {
          setNotMovie(false);
        } else {
          setMovieData(response.data);
          setVpn(true);
        }
      })
      .catch((e) => {
     
          setVpn(false);

        console.log(e.message);
      });
  }
  function searchWithWord(e) {
    let input = e.currentTarget;
    console.log(input.value);
    let url = fetch("https://api.tvmaze.com/search/shows?q=" + input.value);
    url
      .then(async (res) => {
        const response = await axios.get(res.url);
        setNotMovie(true);
        if (response.data.length === 0) {
          setNotMovie(false);
        } else {
          setMovieData(response.data);
          setVpn(true);
        }
      })
      .catch((e) => {
          setVpn(false);
        console.log(e.message);
      });
  }
  function pressEnter(e) {
    let enter = e.key;
    if (enter === "Enter") {
      search();
    }
  }
  function reloadPage(){
   setTimeout(()=>{
    window.location.reload()
   },0.1)
  }
  return (
    <>
      <div className="header" id="header">
        <div className="search-box">
          <input
            id="search"
            type="text"
            onKeyDown={pressEnter}
            onChange={searchWithWord}
          />
        </div>
        <Link className="searchIcon" to={"/search-movies/"}>
          <button className="btnSearch" onClick={search}>
            <i className="fas fa-search"></i>
          </button>
        </Link>
        <Link className="homeIcon"   to={"/search-movies"}>
          <button className="btnHome" id="btnHome" >
            <i className="fa-solid fa-house" id="HomeICon"></i>
          </button>
        </Link>
      </div>

      {notMovie === true ? (
        vpn === true ? (
          params.id === undefined ? (
            data.length >= 3 ? (
              <>
                <div id="MoviesShow">
                  <>
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
                  </>
                </div>
 <div className="containerPagination">
  <div className="titlePagination">
    <p>Movies pages</p>
  </div>
 <div className="paginationShow">
                  <button id="previous" onClick={previousPage}>
                    Previous
                  </button>
                  <div id="pages">
                    {setTimeout(() => {
                      createPages();
                    },1000)}
                  </div>
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
            <div id="MovieShow">
              <Movie
                name={data[params.id].name}
                image={
                  data[params.id].imageOriginal
                    ? data[params.id].imageOriginal
                    : data[params.id].image
                }
                genres={data[params.id].genres}
                visitSite={data[params.id].visitSite}
                officialSite={data[params.id].officialSite}
                language={data[params.id].language}
                rating={data[params.id].rating}
                summary={data[params.id].summary}
              />
            </div>
          )
        ) : (
          setTimeout(()=>{
            <NotFound />
          },20)
        )
      ) : (
        setTimeout(()=>{
        <NotMovie />

        },20)
)}
    </>
  );

  function createPages() {
    let dataLength = data.length;
    let result = dataLength / 2;
    let round = Math.round(result);
    let pages = document.getElementById("pages");
    pages.innerHTML = "";
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

  function nextPage() {
    let numbers = document.querySelectorAll(".numbers");
    let moviesShow = document.querySelectorAll("#seeMAc");
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
          moviesShow[i].setAttribute("id", "notShow");
        }

        for (let i = j - 1; i < numbers[j].id; i++) {
          let index = i;
          let id = Number(numbers[j].id);
          let result = index + id;
        if( movie[result] === undefined){
          break
        }
           movie[result].setAttribute("id", "seeMAc") 
        }
      }
    }
  }

  function previousPage() {
    let numbers = document.querySelectorAll(".numbers");
    let moviesShow = document.querySelectorAll("#seeMAc");
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
          moviesShow[i].setAttribute("id", "notShow");
        }

        for (let i = j - 1; i < numbers[j].id; i++) {
          let index = i;
          let id = Number(numbers[j].id);
          let result = index + id;
          movie[result].setAttribute("id", "seeMAc");
        }
      }
    }
  }

  function showPages(e) {
    let page = e.currentTarget;
    let numbers = document.querySelectorAll(".numbers");
    let moviesShow = document.querySelectorAll("#seeMAc");
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
          moviesShow[i].setAttribute("id", "notShow");
        }
        for (let i = j - 1; i < numbers[j].id; i++) {
          let index = i;
          let id = Number(numbers[j].id);
          let result = index + id;
          movie[result].setAttribute("id", "seeMAc");
        }
      }
    }
  }
};

export default GetDataMovie;

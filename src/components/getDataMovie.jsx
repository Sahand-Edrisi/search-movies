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
        setTimeout(() => {
          setVpn(false);
        }, 1000);
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
        setTimeout(() => {
          setVpn(false);
        }, 1000);
        console.log(e.message);
      });
  }

  return (
    <>
      <div className="header" id="header">
        <div className="search-box">
          <input id="search" type="text" />
        </div>
        <Link className="searchIcon" to={"/search-movies/"}>
          <button className="btnSearch" onClick={search}>
            <i className="fas fa-search"></i>
          </button>
        </Link>
        <Link className="homeIcon" to={"/search-movies/"}>
          <button className="btnHome" id="btnHome">
            <i className="fa-solid fa-house" id="HomeICon"></i>
          </button>
        </Link>
      </div>

      {notMovie === true ? (
        vpn === true ? (
          params.id === undefined ? (
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
          <NotFound />
        )
      ) : (
        <NotMovie />
      )}
    </>
  );
};

export default GetDataMovie;

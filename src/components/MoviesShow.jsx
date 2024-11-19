import "../style/style.css";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "../fontAwesome-free-6.2.1-web/css/all.min.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Movie from "./movie";

const MoviesShow = () => {
  const [Movies, setMovieData] = useState([]);
  const params = useParams();
  let data = Movies.map((f, index) => ({
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
  let main = useRef();

  async function search() {
    let url = "https://api.tvmaze.com/search/shows?q=";
    let input = document.getElementById("search");
    let finalUrl = (url += input.value);
    input.value = "";
    const response = await axios.get(`${finalUrl}`);
    setMovieData(response.data);
  }
  useEffect(() => {
    return async () => {
      const response = await axios.get(
        "https://api.tvmaze.com/search/shows?q=dark"
      );
      setMovieData(response.data);
    };
  }, []);

  return (
    <>
      {/* search box */}
      <div className="search-box">
        <input id="search" type="text" />
        <Link className="btnSearchLink" to={"/search-movies"}>
          <button className="btnSearch" onClick={search}>
            search
          </button>
        </Link>
      </div>

      {/* movies */}
      <div id="MoviesShow" ref={main}>
        {params.id === undefined ? (
          data.map((i, index) => (
            <>
              {main.current.setAttribute("id", "MoviesShow")}
              <div className="movies" id={index}>
                <h1 id="names">{i.name}</h1>
                <img src={i.image} alt="" />
                <div className="titles">
                  <p className="title">
                    Genre : <span>{i.genres ? i.genres : "..."}</span>
                  </p>

                  <p className="title">
                    language : <span>{i.language}</span>
                  </p>
                  <p className="title">
                    rating : <span>{i.rating ? i.rating : "..."} </span>
                  </p>
                  <p className="title">
                    summary : <span>{summaryData(i.id)}...</span>
                  </p>
                </div>
                <Link className="seeMovie" to={`/${index}`}>
                  <button>
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </button>
                </Link>
              </div>
            </>
          ))
        ) : (
          <>
            {/* movie */}
            {main.current.setAttribute("id", "MovieShow")}
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
            />
          </>
        )}
      </div>
    </>
  );
  function summaryData(id) {    
    if (data[id].summary !== undefined) {
      let removeTPFirst = data[id].summary.replace("<p>", "");
      let removeTPLast = removeTPFirst.replace("</p>", "");
      let removeTBFirst = removeTPLast.replace("<b>", "");
      let removeTBlast = removeTBFirst.replace("</b>", "");
      let removeTIFirst = removeTBlast.replace("<i>", "");
      let removeTILast = removeTIFirst.replace("</i>", "");
      let slice = removeTILast.slice(0, 80);
      return slice;
    }
  }
};

export default MoviesShow;

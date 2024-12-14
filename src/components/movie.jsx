import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Movie = ({
  name,
  image,
  genres,
  visitSite,
  officialSite,
  language,
  rating,
  summary,
  country,
  status,
  IMDb,
}) => {
  const [genresTypeOf, setGenres] = useState(true);
  const [languageTypeOf, setLanguage] = useState(true);
  const [ratingTypeOf, setRating] = useState(true);
  const [countryTypeOf, setCountry] = useState(true);
  const [statusTypeOf, setStatus] = useState(true);
  let IMDbWebSite = `https://www.imdb.com/title/${IMDb}/`
    ? `https://www.imdb.com/title/${IMDb}/`
    : undefined;
    
    useEffect(() => {
    let data = [genres, language, rating, country, status];
     for (let i = 0; i < data.length; i++) {
      if (data[i] === undefined || data[i] === null || data[i] === "") {
        if (i === 0) {
          setGenres(false);
        } else if (i === 1) {
          setLanguage(false);
        } else if (i === 2) {
          setRating(false);
        } else if (i === 3) {
          setCountry(false);
        } else if (i === 4) {
          setStatus(false);
        }
      }
    }
  },[]);



  return (
    <>
      <div id="movie">
        <div id="name">
          <span>{name}</span>
        </div>
        <div className="main">
          <div className="column1">
            <img src={image} alt="" />
          </div>
          <div className="column2">
            <div className="col1">
              <p className="summary">{summaryDataSlice()}</p>
              <div className="links">
                <Link className="link" to={visitSite}>
                  visitSite
                </Link>
                <Link className="link" to={IMDbWebSite}>
                  IMDb
                </Link>
                <Link className="link" to={officialSite}>
                  officialSite
                </Link>
              </div>
            </div>
            <div className="col2">
              {languageTypeOf === true ? (
                <p>
                  language : <span>{language}</span>
                </p>
              ) : (
                ""
              )}
              {ratingTypeOf === true ? (
                <p>
                  rating : <span>{rating}</span>
                </p>
              ) : (
                ""
              )}
              {genresTypeOf === true ? (
                <p>
                  genres : <span>{genres}</span>
                </p>
              ) : (
                ""
              )}
              {countryTypeOf === true ? (
                <p>
                  country : <span>{country}</span>
                </p>
              ) : (
                ""
              )}
              {statusTypeOf === true ? (
                <p>
                  status : <span>{status}</span>
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function summaryDataSlice() {
    if (summary !== undefined) {
      let removeTPFirst = summary.replace("<p>", "");
      let removeTPLast = removeTPFirst.replace("</p>", "");
      let removeTBFirst = removeTPLast.replace("<b>", "");
      let removeTBlast = removeTBFirst.replace("</b>", "");
      let removeTIFirst = removeTBlast.replace("<i>", "");
      let removeTILast = removeTIFirst.replace("</i>", "");
      if (removeTILast.length > 500) {
        let slice = removeTILast.slice(0, 500);
        slice += "...";
        return slice;
      }
      return removeTILast;
    }
  }
};

export default Movie;

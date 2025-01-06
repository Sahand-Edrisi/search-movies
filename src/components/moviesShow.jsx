import "../style/style.css";
import "../style/responsive.css";
import "../fontAwesome-free-6.2.1-web/css/all.min.css";
import imageNotFound from "../image/notPicture.jpg";
import backgroundImageMovies from "../image/background-moviesShow.jpg";
import background from "../image/Background.jpg";
import { useEffect, useState } from "react";

const MoviesShow = ({ name, image, genres, language, rating, id, summary }) => {
  const [genresTypeOf, setGenres] = useState(true);
  const [languageTypeOf, setLanguage] = useState(true);
  const [ratingTypeOf, setRating] = useState(true);
  const [summaryTypeOf, setSummary] = useState(true);

  useEffect(() => {
    let data = [genres, language, rating];
    for (let i = 0; i < data.length; i++) {
      if (data[i] === undefined || data[i] === null || data[i] === "") {
        if (i === 0) {
          setGenres(false);
        } else if (i === 1) {
          setLanguage(false);
        } else if (i === 2) {
          setRating(false);
        }
      }
    }
  }, []);

  let bac = document.querySelector(".bac");
  bac.src = background;
  return (
    <>
      {id === 0 || id === 1 ? (
        <div id="displayOn" className="movie">
          <div className="movieShow" id={id}>
            <img id="backgroundImage" src={backgroundImageMovies} alt="" />
            <div className="name">
              <h1>{nameDataSlice()}</h1>
            </div>
            <div className="information">
              <div className="col1">
                <div className="item-lan-rat">
                  <div className="itemOne">
                    {ratingTypeOf === true ? (
                      <>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <span>{rating}</span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="itemTwo">
                    {languageTypeOf === true ? (
                      <>
                        <i className="fa-solid fa-language"></i>
                        <span>{language}</span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="genres-summary">
                  {genresTypeOf === true ? (
                    <>
                      <div className="item">
                        <span className="title">Genres</span>
                        <div className="line"></div>
                        <span className="text">{genres}</span>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {summaryTypeOf === true ? (
                    <>
                      <div className="item">
                        <span className="title">summary</span>
                        <div className="line"></div>
                        <span className="text">{summaryDataSlice()}</span>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col2">
                <div className="Picture">
                  <img src={image ? image : imageNotFound} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div id="displayOff" className="movie">
          <div className="movieShow" id={id}>
            <img id="backgroundImage" src={backgroundImageMovies} alt="" />
            <div className="name">
              <h1>{nameDataSlice()}</h1>
            </div>
            <div className="information">
              <div className="col1">
                <div className="item-lan-rat">
                  <div className="itemOne">
                    {ratingTypeOf === true ? (
                      <>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <span>{rating}</span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="itemTwo">
                    {languageTypeOf === true ? (
                      <>
                        <i className="fa-solid fa-language"></i>
                        <span>{language}</span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="genres-summary">
                    {genresTypeOf === true ? (
                      <>
                  <div className="item">
                        <span className="title">Genres</span>
                        <div className="line"></div>
                        <span className="text">{genres}</span>
                  </div>
                      </>
                    ) : (
                      ""
                    )}
                    {summaryTypeOf === true ? (
                      <>
                  <div className="item">
                        <span className="title">summary</span>
                        <div className="line"></div>
                        <span className="text">{summaryDataSlice()}</span>
                  </div>
                      </>
                    ) : (
                      ""
                    )}
                </div>
              </div>
              <div className="col2">
                <div className="Picture">
                  <img src={image ? image : imageNotFound} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  function summaryDataSlice() {
    if (summary === undefined || summary === null || summary === "") {
      setSummary(false);
    } else {
      let removeTPFirst = summary.replace("<p>", "");
      let removeTPLast = removeTPFirst.replace("</p>", "");
      let removeTBFirst = removeTPLast.replace("<b>", "");
      let removeTBlast = removeTBFirst.replace("</b>", "");
      let removeTIFirst = removeTBlast.replace("<i>", "");
      let removeTILast = removeTIFirst.replace("</i>", "");
      let slice = removeTILast.slice(0, 60);
      return slice;
    }
  }

  function nameDataSlice() {
    if (name.length > 25) {
      let slice = name.slice(0, 25);
      let add = (slice += "...");
      return add;
    } else {
      return name;
    }
  }
};
export default MoviesShow;

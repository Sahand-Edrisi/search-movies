import "../style/style.css";
import "../style/responsive.css";
import { Link } from "react-router-dom";
import "../fontAwesome-free-6.2.1-web/css/all.min.css";
import imageNotFound from "../image/notPicture.jpg";
const MoviesShow = ({ name, image, genres, language, rating, id, summary }) => {
 
 
 
  function showMovie(e) {
    // let movie = e.currentTarget;
    // let moviesShow = document.querySelectorAll("#displayOn");
    // let containerPagination = document.querySelector(".containerPagination");

    // for (let i = 0; i < moviesShow.length; i++) {
    //   moviesShow[i].setAttribute("id", "displayOff");
    // }
    // containerPagination.setAttribute("class", "containerPaginationDisplayOff");
    // movie.setAttribute("id", "Show");
  }

  return (
    <>
      {id === 0 || id === 1 ? (
        <Link id="displayOn" className="movie" onClick={showMovie}>
          <div className="movieShow">
            <div className="Picture">
              <img src={image ? image : imageNotFound} alt="" />
            </div>
            <div className="information">
            <div className="item-name">
            <h1 className="name">{nameDataSlice()}</h1>
            </div>
              <p className="item">
                <span className="itemName"> Genre : </span>{" "}
                <span className="text">{genres ? genres : "..."}</span>
              </p>
              <p className="item">
                <span className="itemName"> language : </span>{" "}
                <span className="text">{language ? language : "..."}</span>
              </p>
              <p className="item">
                <span className="itemName"> rating : </span>
                <span className="text">{rating ? rating : "..."} </span>
              </p>
              <p className="item">
                <span className="itemName"> summary : </span>{" "}
                <span className="text">{summaryDataSlice()}...</span>
              </p>
            </div>
          </div>
        </Link>
      ) : (
        <Link id="displayOff" className="movie" onClick={showMovie}>
             <div className="movieShow">
            <div className="Picture">
              <img src={image ? image : imageNotFound} alt="" />
            </div>
            <div className="information">
            <div className="item-name">
            <h1 className="name">{nameDataSlice()}</h1>
            </div>
              <p className="item">
                <span className="itemName"> Genre : </span>{" "}
                <span className="text">{genres ? genres : "..."}</span>
              </p>
              <p className="item">
                <span className="itemName"> language : </span>{" "}
                <span className="text">{language ? language : "..."}</span>
              </p>
              <p className="item">
                <span className="itemName"> rating : </span>
                <span className="text">{rating ? rating : "..."} </span>
              </p>
              <p className="item">
                <span className="itemName"> summary : </span>{" "}
                <span className="text">{summaryDataSlice()}...</span>
              </p>
            </div>
          </div>
        </Link>
      )}
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
      let slice = removeTILast.slice(0, 80);
      return slice;
    }
  }
  function nameDataSlice() {
    if (name.length > 35) {
      let slice = name.slice(0, 25);
      let add = (slice += "...");
      return add;
    } else {
      return name;
    }
  }
};

export default MoviesShow;

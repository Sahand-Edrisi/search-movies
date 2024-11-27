import "../style/style.css";
import "../style/responsive.css";
import { Link } from "react-router-dom";
import "../fontAwesome-free-6.2.1-web/css/all.min.css";
import imageNotFound from "../image/notPicture.jpg";
const MoviesShow = ({ name, image, genres, language, rating, id, summary }) => {
 
  return (
    <>
{
  id === 0 || id === 1 ?
(  <Link id="seeMAc" className="movie" to={`/search-movies/${id}`}>
  <div className="movies">
    <h1 className="names">{nameDataSlice()}</h1>
    <img src={image ? image : imageNotFound} alt="" />
    <div className="titles">
      <p className="title">
        <span className="titleName"> Genre : </span>{" "}
        <span className="text">{genres ? genres : "..."}</span>
      </p>

      <p className="title">
        <span className="titleName"> language : </span>{" "}
        <span className="text">{language ? language : "..."}</span>
      </p>
      <p className="title">
        <span className="titleName"> rating : </span>
        <span className="text">{rating ? rating : "..."} </span>
      </p>
      <p className="title">
        <span className="titleName"> summary : </span>{" "}
        <span className="text">{summaryDataSlice()}...</span>
      </p>
    </div>
  </div>
    </Link>) :
(        <Link id="notShow" className="movie" to={`/search-movies/${id}`}>
        <div className="movies">
          <h1 className="names">{nameDataSlice()}</h1>
          <img src={image ? image : imageNotFound} alt="" />
          <div className="titles">
            <p className="title">
              <span className="titleName"> Genre : </span>{" "}
              <span className="text">{genres ? genres : "..."}</span>
            </p>
  
            <p className="title">
              <span className="titleName"> language : </span>{" "}
              <span className="text">{language ? language : "..."}</span>
            </p>
            <p className="title">
              <span className="titleName"> rating : </span>
              <span className="text">{rating ? rating : "..."} </span>
            </p>
            <p className="title">
              <span className="titleName"> summary : </span>{" "}
              <span className="text">{summaryDataSlice()}...</span>
            </p>
          </div>
        </div>
          </Link>)
}
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

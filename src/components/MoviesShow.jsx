import "../style/style.css";
import { Link } from "react-router-dom";
import "../fontAwesome-free-6.2.1-web/css/all.min.css";
const MoviesShow = ({name,image,genres,visitSite,officialSite,language,rating,id,summary}) => {
  return (
    <>
              <div className="movies" id={id}>
                <h1 id="names">{name}</h1>
                <img src={image} alt="" />
                <div className="titles">
                  <p className="title">
                    Genre : <span>{genres ? genres : "..."}</span>
                  </p>

                  <p className="title">
                    language : <span>{language}</span>
                  </p>
                  <p className="title">
                    rating : <span>{rating ? rating : "..."} </span>
                  </p>
                  <p className="title">
                    summary : <span>{summaryData()}...</span>
                  </p>
                </div>
                <Link className="seeMovie" to={`/search-movies/${id}`}>
                  <button>
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </button>
                </Link>
              </div>
    </>
  );
  function summaryData() {
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
};

export default MoviesShow;

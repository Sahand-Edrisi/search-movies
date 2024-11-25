import { Link } from "react-router-dom";
import imageNotFound from "../image/notPicture.jpg"

const Movie = ({
  name,
  image,
  genres,
  visitSite,
  officialSite,
  language,
  rating,
  summary
}) => {
  return (
    <>
        <div className="item">
          <img src={image ? image : imageNotFound} alt="" />
          <div className="information">
          <p className="names"><span>{name}</span></p>
            <p>
              <span>Genre : </span>
              {genres ? genres : "..."}
            </p>
            <p>
              <span>language : </span> {language ? language : "..."}
            </p>
            <p>
              <span>rating : </span> {rating ? rating : "..."}
            </p>
            <p>
              <span>summary : </span> {summaryData()}..
            </p>
            <div className="links">
            <Link className="link" to={visitSite} target="_blank">Tv Maze</Link>
            <Link className="link" to={officialSite} target="_blank">Official Site</Link>
            </div>
          </div>
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
      let slice = removeTILast.slice(0, 180);
      return slice;
    }
  }
};

export default Movie;

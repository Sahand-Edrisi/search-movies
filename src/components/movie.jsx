import { Link } from "react-router-dom";

const Movie = ({
  name,
  image,
  genres,
  visitSite,
  officialSite,
  language,
  rating,
}) => {
  return (
    <>
      <div className="showItem">
        <div className="item">
          <h1 id="names">{name}</h1>
          <img src={image} alt="" />
          <div className="information">
            <p>
              <span>Genre : </span>
              {genres}
            </p>
            <p>
              <span>language : </span> {language}
            </p>
            <p>
              <span>rating : </span> {rating}
            </p>
            <Link className="link" to={visitSite} target="_blank">visitSite</Link>
            <Link className="link" to={officialSite} target="_blank">officialSite</Link>
          </div>
          <Link className="Home" to={"/"}>
            <button className="btnHome">
              <i className="fa-solid fa-house"></i>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Movie;

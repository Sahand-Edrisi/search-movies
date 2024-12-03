import { useEffect, useState, useRef } from "react";
import axios from "axios";

const BestMovies = () => {
  const [bestMovies, setBestMovies] = useState([]);
  const MoviesData = bestMovies.map((i, index) => ({
    key: { index },
    imageOriginal: i.show.image ? i.show.image.original : undefined,
  }));
  const element = useRef();
  useEffect(() => {
    let url = fetch("https://api.tvmaze.com/search/shows?q=dark");
    url
      .then(async (res) => {
        const response = await axios.get(res.url);
        setBestMovies(response.data);
      })
      .catch();
  }, []);

  if (bestMovies.length > 0) {
    return (
      <>
        <div className="bestMovies">
          <button className="btnLeft" onClick={btnLeft}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div className="images" ref={element}>
            {edit()}
          </div>
          <button className="btnRight" onClick={btnRight}>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </>
    );
  }
  function edit() {
    let img = document.querySelectorAll(".imgShow");
    if (img.length === 0) {
      setTimeout(() => {
        for (let i = 0; i < 3; i++) {
          let Data = MoviesData;
          let images = element.current;
          let createImg = document.createElement("img");
          createImg.setAttribute("src", Data[i].imageOriginal);
          createImg.setAttribute("class", "imgShow");
          images.appendChild(createImg);
        }
        let img = document.querySelectorAll(".imgShow");
        img[1].setAttribute("class", "imgShowCenter");
      });
    }
  }
  function btnRight() {
    let Data = MoviesData;
    let imgShow = document.querySelectorAll(".imgShow");
    let imgShowCenter = document.querySelectorAll(".imgShowCenter");
    for (let i = 0; i <= 6; i++) {
      if (imgShow[0].currentSrc === Data[i].imageOriginal) {
        console.log(i);
        imgShow[0].setAttribute("src", Data[i + 1].imageOriginal);
        imgShowCenter[0].setAttribute("src", Data[i + 2].imageOriginal);
        imgShow[1].setAttribute("src", Data[i + 3].imageOriginal);
        break;
      } else if (imgShow[1].currentSrc === Data[9].imageOriginal) {
        imgShow[0].setAttribute("src", Data[8].imageOriginal);
        imgShowCenter[0].setAttribute("src", Data[9].imageOriginal);
        imgShow[1].setAttribute("src", Data[0].imageOriginal);
        break;
      } else if (imgShow[1].currentSrc === Data[0].imageOriginal) {
        imgShow[0].setAttribute("src", Data[9].imageOriginal);
        imgShowCenter[0].setAttribute("src", Data[0].imageOriginal);
        imgShow[1].setAttribute("src", Data[1].imageOriginal);
        break;
      } else if (imgShow[1].currentSrc === Data[1].imageOriginal) {
        imgShow[0].setAttribute("src", Data[0].imageOriginal);
        imgShowCenter[0].setAttribute("src", Data[1].imageOriginal);
        imgShow[1].setAttribute("src", Data[2].imageOriginal);
        break;
      }
    }
  }
  function btnLeft() {
    let Data = MoviesData;
    let imgShow = document.querySelectorAll(".imgShow");
    let imgShowCenter = document.querySelectorAll(".imgShowCenter");

    for (let i = 7; i >= 0; i--) {
      if (imgShow[0].currentSrc === Data[0].imageOriginal) {
        imgShow[0].setAttribute("src", Data[9].imageOriginal);
        imgShowCenter[0].setAttribute("src", Data[0].imageOriginal);
        imgShow[1].setAttribute("src", Data[1].imageOriginal);
        break;
      } else if (imgShow[0].currentSrc === Data[9].imageOriginal) {
        imgShow[0].setAttribute("src", Data[8].imageOriginal);
        imgShowCenter[0].setAttribute("src", Data[9].imageOriginal);
        imgShow[1].setAttribute("src", Data[0].imageOriginal);
        break;
      } else if (imgShow[0].currentSrc === Data[8].imageOriginal) {
        imgShow[0].setAttribute("src", Data[7].imageOriginal);
        imgShowCenter[0].setAttribute("src", Data[8].imageOriginal);
        imgShow[1].setAttribute("src", Data[9].imageOriginal);
        break;
      } else if (imgShow[0].currentSrc === Data[i].imageOriginal) {
        imgShow[0].setAttribute("src", Data[i - 1].imageOriginal);
        imgShowCenter[0].setAttribute("src", Data[i].imageOriginal);
        imgShow[1].setAttribute("src", Data[i + 1].imageOriginal);
        break;
      }
    }
  }
};

export default BestMovies;

import { Route, Routes } from "react-router-dom";
import getData from "./components/getDataMovie";
// import { Navigate } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/search-movies/" Component={getData} />
        <Route path="/search-movies/Movie/:id" Component={getData} />
        <Route path="/search-movies/best-movie/:id" Component={getData} />
      </Routes>
    </>
  );
};

export default App;

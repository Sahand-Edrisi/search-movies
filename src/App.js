import { Route, Routes} from "react-router-dom";
import MoviesShow from "./components/MoviesShow";
import getData from "./components/getDataMovie";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/search-movies/" excite Component={getData} />
        <Route path="/search-movies/"  Component={MoviesShow} />
        <Route path="/search-movies/:id"  Component={getData} />
      </Routes>
    </>
  );
};

export default App;

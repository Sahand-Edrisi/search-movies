import { Route, Routes} from "react-router-dom";
import MoviesShow from "./components/MoviesShow";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/search-movies/"  Component={MoviesShow} />
        <Route path="/search-movies/:id"  Component={MoviesShow} />
      </Routes>
    </>
  );
};

export default App;

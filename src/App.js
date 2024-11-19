import { Route, Routes} from "react-router-dom";
import MoviesShow from "./components/MoviesShow";

const App = () => {
 
  return (
    <>
      <Routes>
        <Route path="search-movies"  Component={MoviesShow} />
        <Route path="/:id"  Component={MoviesShow} />
      </Routes>
    </>
  );
};

export default App;

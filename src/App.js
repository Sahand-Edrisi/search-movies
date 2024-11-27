import { Route, Routes } from "react-router-dom";
import getData from "./components/getDataMovie";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/search-movies/" Component={getData} />
        <Route path="/search-movies/:id" Component={getData} />
        <Route path="/search-movies/:id/pages" Component={getData} />
      </Routes>
    </>
  );
};

export default App;

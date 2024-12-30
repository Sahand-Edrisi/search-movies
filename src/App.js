import { Route, Routes } from "react-router-dom";
import getData from "./components/getDataMovie";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/search-movies/" Component={getData} />
      </Routes>
    </>
  );
};

export default App;

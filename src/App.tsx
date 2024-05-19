import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={process.env.PUBLIC_URL + "/tv"} element={<Tv />}>
          <Route path={process.env.PUBLIC_URL + "/tv/:tvId"} element={<Tv />} />
        </Route>
        <Route path={process.env.PUBLIC_URL + "/search"} element={<Search />} />
        <Route path={process.env.PUBLIC_URL} element={<Home />}>
          <Route
            path={process.env.PUBLIC_URL + "/movies/:movieId"}
            element={<Home />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

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
        <Route path='/tv' element={<Tv />} />
        <Route path='/search' element={<Search />} />
        <Route path='/' element={<Home />}>
          <Route path='/movies/:movieId' element={<Home />} />
          <Route path='/tvs/:tvId' element={<Tv />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

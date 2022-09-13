import './App.css';
import BottomNavbar from './Components/Navigation/BottomNavbar';
import Header from './Components/Navigation/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from '@mui/system';
import Trending from './Components/RoutingPages/Trending/Trending';
import TvSeries from './Components/RoutingPages/TvSeries';
import Movies from './Components/RoutingPages/Movies';
import Search from './Components/RoutingPages/Search';
import Just from './Components/Just'
import Detailed from './Components/RoutingPages/Detailed';

function App() {
  return (
      <BrowserRouter>
        <Header/>
        <div className="App">
          <Container sx= {{pt: 14, height: "100%"}}>
            <Routes>
            <Route path="/trending" element={<Trending/>} />
            <Route path="/movies" element={<Movies/>}/>
            <Route path="/series" element={<TvSeries/>} />
            <Route path="/search" element={<Search/>} />
            <Route path="/details/:id" element={<Detailed />} />
            </Routes>
          </Container>
          <Just/>
        </div>
       <BottomNavbar/>
      </BrowserRouter>
   
  );
}

export default App;

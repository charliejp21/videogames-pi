import './App.css';
import Inicio from './views/Inicio/Inicio';
import SearchResults from './views/SearchResults/SearchResults'
import VideogamesContainer from './views/Videogames/Videogames'
import VideogameView from './views/Videogame/Videogame'
import Nav from './components/Nav/Nav'
import {Route, Routes, useLocation} from 'react-router-dom'

function App() {

  const {pathname} = useLocation();

  return (
    <div className="App">

      {pathname !== "/" && <Nav />}
      
      <Routes>

        <Route path="/" element={<Inicio />} />

        <Route path="/videogames" element={<VideogamesContainer />} />

        <Route path='/results/:nombre' element={<SearchResults />} />

        <Route path='/videogame/:id' element={<VideogameView />} />

      </Routes>

    </div>
  );
}

export default App;

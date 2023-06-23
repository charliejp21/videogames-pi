import './App.css';
import Inicio from './views/Inicio/Inicio';
import VideogamesContainer from './views/Videogames/Videogames'
import Nav from './components/Nav/Nav'
import {Route, Routes, useLocation} from 'react-router-dom'

function App() {

  const {pathname} = useLocation();

  return (
    <div className="App">

      {pathname !== "/" && <Nav />}
      
      <Routes>

        <Route path="/" element={<Inicio />}/>

        <Route path="/videogames" element={<VideogamesContainer />} />

      </Routes>

    </div>
  );
}

export default App;

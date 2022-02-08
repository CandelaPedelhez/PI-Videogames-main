import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './Components/Landing'
import Home from './Components/Home'
/* import CreateVideogame from './Components/CreateVideogame' */
/* import Details from './Components/Details'; */

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<Home />} />
{/*           <Route path='/videogame' element={<CreateVideogame />} /> */}
{/*           <Route path='/videogame/:id' element={<Details />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
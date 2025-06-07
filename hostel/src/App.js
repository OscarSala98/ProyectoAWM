import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Habitaciones from './pages/Habitaciones';
import HabitacionesFiltradas from './pages/HabitacionesFiltradas';

import 'react-datepicker/dist/react-datepicker.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/habitaciones" element={<Habitaciones />} />
        
        <Route path="/habitaciones-filtradas" element={<HabitacionesFiltradas />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;	
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Panel from './pages/Panel';
import Torneos from './pages/Torneos';
import NuevoTorneo from './pages/NuevoTorneo';
import Jugadores from './pages/Jugadores';
import Decklists from './pages/Decklists';
import Mesas from './pages/Mesas';
import Bracket from './pages/Bracket';
import IAMazos from './pages/IAMazos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/torneos" element={<Torneos />} />
        <Route path="/nuevo-torneo" element={<NuevoTorneo />} />
        <Route path="/jugadores" element={<Jugadores />} />
        <Route path="/decklists" element={<Decklists />} />
        <Route path="/mesas" element={<Mesas />} />
        <Route path="/bracket" element={<Bracket />} />
        <Route path="/ia-mazos" element={<IAMazos />} />     
                
      </Routes>
    </BrowserRouter>
  );
}

export default App;
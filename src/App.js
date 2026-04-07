import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Panel from './pages/Panel';
import Torneos from './pages/Torneos';
import NuevoTorneo from './pages/NuevoTorneo';
import Jugadores from './pages/Jugadores';
import Decklists from './pages/Decklists';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
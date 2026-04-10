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
import TorneosPublicos from './pages/TorneosPublicos';
import PerfilJugador from './pages/PerfilJugador';
import Rankings from './pages/Rankings';
import PerfilTienda from './pages/PerfilTienda';
import Login from './pages/Login';
import Premium from './pages/Premium';
import Metricas from './pages/Metricas';
import TorneoLive from './pages/TorneoLive';
import ConstructorCommander from './pages/ConstructorCommander';

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
        <Route path="/torneos" element={<TorneosPublicos />} />  
        <Route path="/perfil" element={<PerfilJugador />} />    
        <Route path="/rankings" element={<Rankings />} /> 
        <Route path="/tienda/:id" element={<PerfilTienda />} />  
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Login />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/metricas" element={<Metricas />} />
        <Route path="/torneo/:id/live" element={<TorneoLive />} />
        <Route path="/constructor-commander" element={<ConstructorCommander />} />  
                 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
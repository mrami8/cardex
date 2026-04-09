import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TorneoLive() {
  const navigate = useNavigate();
  const [buscarJugador, setBuscarJugador] = useState('');
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);
  const [rondaVista, setRondaVista] = useState(3);

  const torneo = {
    nombre: 'Modern Showdown — Abril',
    tienda: 'Card Castle BCN',
    formato: 'Swiss · 4 rondas',
    juego: 'Magic: The Gathering',
    rondaActual: 3,
    totalRondas: 4,
    estado: 'en_curso',
    jugadores: 32,
  };

  const rondas = {
    1: [
      {mesa:1,j1:'Carlos Rueda',j2:'Ana Ferreira',res1:2,res2:0,fin:true},
      {mesa:2,j1:'Joan López',j2:'Marc Ribas',res1:2,res2:1,fin:true},
      {mesa:3,j1:'Pau Garcia',j2:'Laura Bosch',res1:0,res2:2,fin:true},
      {mesa:4,j1:'Rui Santos',j2:'Felix Weber',res1:2,res2:0,fin:true},
      {mesa:5,j1:'Sofia Nilsson',j2:'Tom Müller',res1:1,res2:2,fin:true},
      {mesa:6,j1:'Xavi Tort',j2:'Emma Koch',res1:2,res2:1,fin:true},
      {mesa:7,j1:'Pau Roca',j2:'Marie Dupont',res1:0,res2:2,fin:true},
      {mesa:8,j1:'Luca Bianchi',j2:'David Chen',res1:2,res2:0,fin:true},
    ],
    2: [
      {mesa:1,j1:'Carlos Rueda',j2:'Joan López',res1:2,res2:1,fin:true},
      {mesa:2,j1:'Laura Bosch',j2:'Rui Santos',res1:2,res2:0,fin:true},
      {mesa:3,j1:'Tom Müller',j2:'Xavi Tort',res1:1,res2:2,fin:true},
      {mesa:4,j1:'Marie Dupont',j2:'Luca Bianchi',res1:0,res2:2,fin:true},
      {mesa:5,j1:'Ana Ferreira',j2:'Marc Ribas',res1:2,res2:0,fin:true},
      {mesa:6,j1:'Felix Weber',j2:'Sofia Nilsson',res1:1,res2:2,fin:true},
      {mesa:7,j1:'Emma Koch',j2:'Pau Garcia',res1:2,res2:1,fin:true},
      {mesa:8,j1:'David Chen',j2:'Pau Roca',res1:0,res2:2,fin:true},
    ],
    3: [
      {mesa:1,j1:'Carlos Rueda',j2:'Luca Bianchi',res1:null,res2:null,fin:false},
      {mesa:2,j1:'Laura Bosch',j2:'Xavi Tort',res1:null,res2:null,fin:false},
      {mesa:3,j1:'Ana Ferreira',j2:'Sofia Nilsson',res1:null,res2:null,fin:false},
      {mesa:4,j1:'Emma Koch',j2:'Pau Roca',res1:null,res2:null,fin:false},
      {mesa:5,j1:'Joan López',j2:'Marie Dupont',res1:null,res2:null,fin:false},
      {mesa:6,j1:'Rui Santos',j2:'Tom Müller',res1:null,res2:null,fin:false},
      {mesa:7,j1:'Marc Ribas',j2:'Felix Weber',res1:null,res2:null,fin:false},
      {mesa:8,j1:'Pau Garcia',j2:'David Chen',res1:null,res2:null,fin:false},
    ],
  };

  const clasificacion = [
    {pos:1,nombre:'Carlos Rueda',pts:9,w:3,l:0,mwp:'72%'},
    {pos:2,nombre:'Laura Bosch',pts:6,w:2,l:1,mwp:'65%'},
    {pos:3,nombre:'Ana Ferreira',pts:6,w:2,l:1,mwp:'61%'},
    {pos:4,nombre:'Luca Bianchi',pts:6,w:2,l:1,mwp:'58%'},
    {pos:5,nombre:'Xavi Tort',pts:6,w:2,l:1,mwp:'55%'},
    {pos:6,nombre:'Emma Koch',pts:6,w:2,l:1,mwp:'52%'},
    {pos:7,nombre:'Joan López',pts:3,w:1,l:2,mwp:'60%'},
    {pos:8,nombre:'Pau Roca',pts:3,w:1,l:2,mwp:'58%'},
  ];

  const todosJugadores = [...new Set(Object.values(rondas).flatMap(r=>r.flatMap(m=>[m.j1,m.j2])))];

  const getMesaJugador = (nombre, ronda) => {
    const r = rondas[ronda];
    if(!r) return null;
    return r.find(m=>m.j1===nombre||m.j2===nombre);
  };

  const jugadorBuscado = todosJugadores.filter(j=>j.toLowerCase().includes(buscarJugador.toLowerCase()));

  const posColor = p => p<=4?{bg:'rgba(108,92,231,0.15)',color:'#a29bfe'}:p<=8?{bg:'rgba(0,184,148,0.1)',color:'#00b894'}:{bg:'transparent',color:'rgba(245,244,240,0.45)'};

  return (
    <div style={{background:'#0a0a0f',minHeight:'100vh',color:'#f5f4f0',fontFamily:'DM Sans, sans-serif'}}>
      {/* NAV */}
      <div style={{padding:'14px 24px',borderBottom:'0.5px solid rgba(255,255,255,0.07)',background:'rgba(10,10,15,0.95)',position:'sticky',top:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,cursor:'pointer'}} onClick={()=>navigate('/')}>
          <div style={{width:28,height:28,background:'#6c5ce7',borderRadius:7,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,color:'white'}}>C</div>
          <span style={{fontSize:16,fontWeight:700}}>Cardex</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:8,height:8,borderRadius:'50%',background:'#00b894',animation:'pulse 2s infinite'}}></div>
          <span style={{fontSize:12,color:'#00b894',fontWeight:500}}>En vivo</span>
        </div>
      </div>

      {/* HEADER TORNEO */}
      <div style={{background:'#13121a',borderBottom:'0.5px solid rgba(255,255,255,0.07)',padding:'16px 24px'}}>
        <div style={{maxWidth:900,margin:'0 auto'}}>
          <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
            <div>
              <div style={{fontSize:11,color:'rgba(245,244,240,0.45)',marginBottom:4}}>{torneo.tienda} · {torneo.juego}</div>
              <h1 style={{fontSize:20,fontWeight:700,marginBottom:6}}>{torneo.nombre}</h1>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                <span style={{fontSize:11,padding:'3px 9px',background:'rgba(108,92,231,0.15)',color:'#a29bfe',borderRadius:8}}>{torneo.formato}</span>
                <span style={{fontSize:11,padding:'3px 9px',background:'rgba(255,255,255,0.06)',color:'rgba(245,244,240,0.6)',borderRadius:8}}>{torneo.jugadores} jugadores</span>
              </div>
            </div>
            <div style={{textAlign:'center',background:'rgba(108,92,231,0.1)',border:'0.5px solid rgba(108,92,231,0.3)',borderRadius:12,padding:'12px 20px'}}>
              <div style={{fontSize:11,color:'#a29bfe',marginBottom:4}}>RONDA ACTUAL</div>
              <div style={{fontSize:28,fontWeight:800,color:'#a29bfe'}}>{torneo.rondaActual}</div>
              <div style={{fontSize:11,color:'rgba(245,244,240,0.45)'}}>de {torneo.totalRondas}</div>
            </div>
          </div>

          {/* PROGRESO RONDAS */}
          <div style={{display:'flex',gap:8,marginTop:16}}>
            {Array.from({length:torneo.totalRondas},(_,i)=>i+1).map(r=>(
              <div key={r} onClick={()=>setRondaVista(r)} style={{flex:1,padding:'8px',borderRadius:8,border:`0.5px solid ${rondaVista===r?'rgba(108,92,231,0.4)':'rgba(255,255,255,0.07)'}`,background:rondaVista===r?'rgba(108,92,231,0.1)':'transparent',cursor:'pointer',textAlign:'center'}}>
                <div style={{fontSize:11,fontWeight:500,color:r<torneo.rondaActual?'#00b894':r===torneo.rondaActual?'#a29bfe':'rgba(245,244,240,0.3)'}}>
                  {r<torneo.rondaActual?'✓ ':r===torneo.rondaActual?'▶ ':''}Ronda {r}
                </div>
                <div style={{fontSize:10,color:'rgba(245,244,240,0.3)',marginTop:2}}>{r<torneo.rondaActual?'Finalizada':r===torneo.rondaActual?'En curso':'Pendiente'}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:900,margin:'0 auto',padding:'20px 24px'}}>

        {/* BUSCAR MI MESA */}
        <div style={{background:'rgba(108,92,231,0.08)',border:'0.5px solid rgba(108,92,231,0.2)',borderRadius:12,padding:16,marginBottom:20}}>
          <div style={{fontSize:13,fontWeight:500,marginBottom:10,color:'#a29bfe'}}>🔍 Busca tu mesa</div>
          <input
            value={buscarJugador}
            onChange={e=>{setBuscarJugador(e.target.value);setJugadorSeleccionado(null);}}
            placeholder="Escribe tu nombre..."
            style={{width:'100%',padding:'10px 14px',background:'#1e1c2a',border:'0.5px solid rgba(108,92,231,0.3)',borderRadius:8,color:'white',fontSize:13,outline:'none',marginBottom:8}}
          />
          {buscarJugador && !jugadorSeleccionado && (
            <div style={{background:'#1e1c2a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:8,overflow:'hidden'}}>
              {jugadorBuscado.slice(0,5).map((j,i)=>(
                <div key={i} onClick={()=>{setJugadorSeleccionado(j);setBuscarJugador(j);}} style={{padding:'10px 14px',cursor:'pointer',fontSize:13,borderBottom:i<Math.min(jugadorBuscado.length,5)-1?'0.5px solid rgba(255,255,255,0.07)':'none'}}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.05)'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  {j}
                </div>
              ))}
              {jugadorBuscado.length===0 && <div style={{padding:'10px 14px',fontSize:13,color:'rgba(245,244,240,0.45)'}}>No encontrado</div>}
            </div>
          )}
          {jugadorSeleccionado && (()=>{
            const mesa = getMesaJugador(jugadorSeleccionado, torneo.rondaActual);
            if(!mesa) return null;
            const esJ1 = mesa.j1===jugadorSeleccionado;
            const rival = esJ1?mesa.j2:mesa.j1;
            return (
              <div style={{background:'rgba(0,184,148,0.08)',border:'0.5px solid rgba(0,184,148,0.3)',borderRadius:10,padding:14,marginTop:8}}>
                <div style={{fontSize:11,color:'#00b894',fontWeight:600,marginBottom:8}}>TU MESA — RONDA {torneo.rondaActual}</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr auto 1fr',gap:12,alignItems:'center'}}>
                  <div style={{textAlign:'center'}}>
                    <div style={{fontSize:16,fontWeight:700,color:'#a29bfe',marginBottom:2}}>{jugadorSeleccionado}</div>
                    <div style={{fontSize:11,color:'rgba(245,244,240,0.45)'}}>Tú</div>
                  </div>
                  <div style={{textAlign:'center'}}>
                    <div style={{fontSize:22,fontWeight:800,color:'rgba(245,244,240,0.2)'}}>VS</div>
                    <div style={{fontSize:11,color:'#00b894',fontWeight:500}}>Mesa {mesa.mesa}</div>
                  </div>
                  <div style={{textAlign:'center'}}>
                    <div style={{fontSize:16,fontWeight:700,marginBottom:2}}>{rival}</div>
                    <div style={{fontSize:11,color:'rgba(245,244,240,0.45)'}}>Rival</div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:16}}>
          {/* MESAS RONDA */}
          <div>
            <div style={{fontSize:13,fontWeight:500,marginBottom:12,display:'flex',alignItems:'center',gap:8}}>
              Mesas — Ronda {rondaVista}
              {rondaVista===torneo.rondaActual && <span style={{fontSize:10,padding:'2px 8px',background:'rgba(0,184,148,0.15)',color:'#00b894',borderRadius:6,fontWeight:600}}>En curso</span>}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {(rondas[rondaVista]||[]).map((m,i)=>(
                <div key={i} style={{background:'#13121a',border:`0.5px solid ${!m.fin?'rgba(108,92,231,0.2)':'rgba(255,255,255,0.07)'}`,borderRadius:10,padding:12}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
                    <span style={{fontSize:11,fontWeight:600,color:'rgba(245,244,240,0.45)'}}>Mesa {m.mesa}</span>
                    <span style={{fontSize:10,padding:'2px 6px',background:m.fin?'rgba(255,255,255,0.06)':'rgba(0,184,148,0.12)',color:m.fin?'rgba(245,244,240,0.3)':'#00b894',borderRadius:6}}>{m.fin?'Finalizada':'En curso'}</span>
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr auto 1fr',gap:8,alignItems:'center'}}>
                    <div style={{textAlign:'left'}}>
                      <div style={{fontSize:12,fontWeight:m.fin&&m.res1>m.res2?600:400,color:m.fin&&m.res1>m.res2?'#a29bfe':'rgba(245,244,240,0.8)'}}>{m.j1}</div>
                    </div>
                    <div style={{textAlign:'center',fontSize:14,fontWeight:700,color:m.fin?'white':'rgba(245,244,240,0.2)'}}>
                      {m.fin?`${m.res1}-${m.res2}`:'?-?'}
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div style={{fontSize:12,fontWeight:m.fin&&m.res2>m.res1?600:400,color:m.fin&&m.res2>m.res1?'#a29bfe':'rgba(245,244,240,0.8)'}}>{m.j2}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CLASIFICACIÓN */}
          <div>
            <div style={{fontSize:13,fontWeight:500,marginBottom:12}}>Clasificación parcial</div>
            <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,overflow:'hidden'}}>
              <div style={{display:'grid',gridTemplateColumns:'30px 1fr 40px 50px',padding:'6px 12px',borderBottom:'0.5px solid rgba(255,255,255,0.07)'}}>
                {['#','Jugador','Pts','W/L'].map((h,i)=>(
                  <div key={i} style={{fontSize:10,color:'rgba(245,244,240,0.45)',fontWeight:600}}>{h}</div>
                ))}
              </div>
              {clasificacion.map((j,i)=>(
                <div key={i} style={{display:'grid',gridTemplateColumns:'30px 1fr 40px 50px',padding:'9px 12px',borderBottom:i<clasificacion.length-1?'0.5px solid rgba(255,255,255,0.07)':'none',alignItems:'center',background:jugadorSeleccionado===j.nombre?'rgba(108,92,231,0.08)':'transparent'}}>
                  <div style={{fontSize:12,fontWeight:600,...posColor(j.pos),width:22,height:22,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',...posColor(j.pos)}}>{j.pos}</div>
                  <div style={{fontSize:12,fontWeight:jugadorSeleccionado===j.nombre?600:400,color:jugadorSeleccionado===j.nombre?'#a29bfe':'rgba(245,244,240,0.8)'}}>{j.nombre}</div>
                  <div style={{fontSize:12,fontWeight:600,color:'#a29bfe'}}>{j.pts}</div>
                  <div style={{fontSize:11,color:'rgba(245,244,240,0.45)'}}>{j.w}/{j.l}</div>
                </div>
              ))}
              <div style={{padding:'10px 12px',fontSize:11,color:'rgba(245,244,240,0.45)',textAlign:'center',borderTop:'0.5px solid rgba(255,255,255,0.07)'}}>
                Top 8 clasifican al corte
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {0%,100%{opacity:1}50%{opacity:0.4}}
      `}</style>
    </div>
  );
}
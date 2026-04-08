import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Bracket() {
  const navigate = useNavigate();

  const [jugadores, setJugadores] = useState([
    'Carlos Rueda','Ana Ferreira','Joan López','Pau Garcia',
    'Marc Ribas','Laura Bosch','Xavi Tort','Rui Santos'
  ]);
  const [inputJugadores, setInputJugadores] = useState(jugadores.join('\n'));
  const [rondas, setRondas] = useState([]);
  const [generado, setGenerado] = useState(false);
  const [rondaActual, setRondaActual] = useState(0);

  const shuffle = arr => {
    const a=[...arr];
    for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
    return a;
  };

  const generarBracket = () => {
    const lista = inputJugadores.split('\n').map(j=>j.trim()).filter(Boolean);
    if(lista.length < 2){alert('Añade al menos 2 jugadores');return;}
    
    // Rellenar hasta potencia de 2
    let n = 1;
    while(n < lista.length) n *= 2;
    const mezclados = shuffle(lista);
    while(mezclados.length < n) mezclados.push('BYE');

    const partidos = [];
    for(let i=0;i<mezclados.length;i+=2){
      partidos.push({j1:mezclados[i],j2:mezclados[i+1],ganador:mezclados[i+1]==='BYE'?mezclados[i]:null,score1:null,score2:null});
    }

    setJugadores(lista);
    setRondas([partidos]);
    setGenerado(true);
    setRondaActual(0);
  };

  const registrarGanador = (rondaIdx, partidoIdx, ganador, s1, s2) => {
    const nuevasRondas = rondas.map((r,ri)=>
      ri!==rondaIdx ? r : r.map((p,pi)=>
        pi!==partidoIdx ? p : {...p, ganador, score1:s1, score2:s2}
      )
    );

    // Si todos los partidos de la ronda tienen ganador, generar siguiente ronda
    const rondaCompleta = nuevasRondas[rondaIdx].every(p=>p.ganador);
    if(rondaCompleta && nuevasRondas[rondaIdx].length > 1){
      const ganadores = nuevasRondas[rondaIdx].map(p=>p.ganador);
      const nuevosPartidos = [];
      for(let i=0;i<ganadores.length;i+=2){
        nuevosPartidos.push({j1:ganadores[i],j2:ganadores[i+1]||'BYE',ganador:ganadores[i+1]==='BYE'?ganadores[i]:null,score1:null,score2:null});
      }
      nuevasRondas.push(nuevosPartidos);
      setRondaActual(nuevasRondas.length-1);
    }

    setRondas(nuevasRondas);
  };

  const campeон = rondas.length>0 && rondas[rondas.length-1].length===1 && rondas[rondas.length-1][0].ganador;

  const nombreRonda = (idx, total) => {
    const restantes = total - idx;
    if(restantes===1) return 'Final';
    if(restantes===2) return 'Semifinales';
    if(restantes===3) return 'Cuartos';
    return `Ronda ${idx+1}`;
  };

  return (
    <div style={{background:'#0a0a0f',minHeight:'100vh',color:'#f5f4f0',fontFamily:'DM Sans, sans-serif',padding:'24px'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <button onClick={()=>navigate('/panel')} style={{background:'transparent',color:'rgba(245,244,240,0.45)',border:'none',cursor:'pointer',fontSize:13,marginBottom:6,padding:0}}>← Panel</button>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24,flexWrap:'wrap',gap:12}}>
          <div>
            <h1 style={{fontSize:22,fontWeight:700}}>Bracket eliminatorio</h1>
            <div style={{fontSize:13,color:'rgba(245,244,240,0.45)',marginTop:4}}>
              {generado ? `${jugadores.length} jugadores · ${rondas.length} rondas jugadas` : 'Configura y genera el bracket'}
            </div>
          </div>
          {campeон && (
            <div style={{background:'rgba(253,203,110,0.15)',border:'0.5px solid rgba(253,203,110,0.3)',borderRadius:12,padding:'12px 20px',textAlign:'center'}}>
              <div style={{fontSize:11,color:'#fdcb6e',fontWeight:600,marginBottom:4}}>🏆 CAMPEÓN</div>
              <div style={{fontSize:18,fontWeight:700,color:'#fdcb6e'}}>{campeон}</div>
            </div>
          )}
        </div>

        {!generado ? (
          /* SETUP */
          <div style={{maxWidth:500}}>
            <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:20}}>
              <div style={{fontSize:13,fontWeight:500,marginBottom:14}}>Jugadores del torneo</div>
              <textarea
                style={{background:'#1e1c2a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:7,padding:'10px 12px',color:'white',fontSize:12,fontFamily:'monospace',outline:'none',width:'100%',resize:'vertical',minHeight:200}}
                value={inputJugadores}
                onChange={e=>setInputJugadores(e.target.value)}
                placeholder={'Carlos Rueda\nAna Ferreira\nJoan López\n...'}
              />
              <div style={{fontSize:11,color:'rgba(245,244,240,0.45)',marginTop:4,marginBottom:16}}>
                {inputJugadores.split('\n').filter(j=>j.trim()).length} jugadores · Un nombre por línea
              </div>
              <button onClick={generarBracket} style={{width:'100%',padding:'11px',background:'#6c5ce7',color:'white',border:'none',borderRadius:8,fontSize:14,cursor:'pointer',fontWeight:500}}>
                ⚡ Generar bracket
              </button>
            </div>
          </div>
        ) : (
          /* BRACKET */
          <div style={{overflowX:'auto',paddingBottom:20}}>
            <div style={{display:'flex',gap:0,alignItems:'flex-start',minWidth:'max-content'}}>
              {rondas.map((ronda,ri)=>(
                <div key={ri} style={{display:'flex',flexDirection:'column',minWidth:200}}>
                  {/* Cabecera ronda */}
                  <div style={{textAlign:'center',padding:'8px 16px',fontSize:11,fontWeight:600,color:ri===rondaActual?'#a29bfe':'rgba(245,244,240,0.45)',letterSpacing:1,textTransform:'uppercase',borderBottom:'0.5px solid rgba(255,255,255,0.07)',marginBottom:8,background:ri===rondaActual?'rgba(108,92,231,0.08)':'transparent',borderRadius:'8px 8px 0 0'}}>
                    {nombreRonda(ri, rondas.length + (rondas[rondas.length-1].length>1?1:0))}
                  </div>
                  {/* Partidos */}
                  <div style={{display:'flex',flexDirection:'column',justifyContent:'space-around',flex:1,gap:Math.pow(2,ri)*8,padding:'0 8px'}}>
                    {ronda.map((partido,pi)=>(
                      <PartidoCard
                        key={pi}
                        partido={partido}
                        activo={ri===rondaActual&&!partido.ganador}
                        onGanar={(g,s1,s2)=>registrarGanador(ri,pi,g,s1,s2)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{marginTop:20,display:'flex',gap:10}}>
              <button onClick={()=>{setGenerado(false);setRondas([]);setRondaActual(0);}} style={{padding:'8px 16px',background:'rgba(255,255,255,0.06)',color:'white',border:'none',borderRadius:8,fontSize:12,cursor:'pointer'}}>
                ↺ Reiniciar bracket
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PartidoCard({partido, activo, onGanar}){
  const [s1,setS1] = useState('');
  const [s2,setS2] = useState('');

  const inputNum = {width:40,background:'#0a0a0f',border:'0.5px solid rgba(255,255,255,0.15)',borderRadius:5,padding:'4px 6px',color:'white',fontSize:12,textAlign:'center',outline:'none'};

  if(partido.j2==='BYE') return (
    <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:10,padding:12,opacity:0.6}}>
      <div style={{fontSize:12,fontWeight:500,color:'#00b894'}}>{partido.j1}</div>
      <div style={{fontSize:10,color:'rgba(245,244,240,0.45)',marginTop:4}}>BYE — pasa automáticamente</div>
    </div>
  );

  return (
    <div style={{background:'#13121a',border:`0.5px solid ${activo?'rgba(108,92,231,0.4)':'rgba(255,255,255,0.07)'}`,borderRadius:10,padding:12,transition:'border-color 0.2s'}}>
      {/* Jugador 1 */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'6px 0',borderBottom:'0.5px solid rgba(255,255,255,0.07)'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          {partido.ganador && <span style={{fontSize:10}}>{partido.ganador===partido.j1?'🏆':''}</span>}
          <span style={{fontSize:12,fontWeight:partido.ganador===partido.j1?600:400,color:partido.ganador===partido.j1?'#a29bfe':partido.ganador&&partido.ganador!==partido.j1?'rgba(245,244,240,0.3)':'white'}}>
            {partido.j1}
          </span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:6}}>
          {activo && <input type="number" min="0" max="9" style={inputNum} value={s1} onChange={e=>setS1(e.target.value)} placeholder="0"/>}
          {partido.score1!==null && <span style={{fontSize:13,fontWeight:600,color:'#a29bfe',minWidth:20,textAlign:'center'}}>{partido.score1}</span>}
          {activo && <button onClick={()=>onGanar(partido.j1,s1||0,s2||0)} style={{padding:'4px 10px',background:'rgba(0,184,148,0.15)',color:'#00b894',border:'none',borderRadius:6,fontSize:11,cursor:'pointer',fontWeight:500,whiteSpace:'nowrap'}}>Ganó</button>}
        </div>
      </div>
      {/* Jugador 2 */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'6px 0'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          {partido.ganador && <span style={{fontSize:10}}>{partido.ganador===partido.j2?'🏆':''}</span>}
          <span style={{fontSize:12,fontWeight:partido.ganador===partido.j2?600:400,color:partido.ganador===partido.j2?'#a29bfe':partido.ganador&&partido.ganador!==partido.j2?'rgba(245,244,240,0.3)':'white'}}>
            {partido.j2}
          </span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:6}}>
          {activo && <input type="number" min="0" max="9" style={inputNum} value={s2} onChange={e=>setS2(e.target.value)} placeholder="0"/>}
          {partido.score2!==null && <span style={{fontSize:13,fontWeight:600,color:'#a29bfe',minWidth:20,textAlign:'center'}}>{partido.score2}</span>}
          {activo && <button onClick={()=>onGanar(partido.j2,s2||0,s1||0)} style={{padding:'4px 10px',background:'rgba(0,184,148,0.15)',color:'#00b894',border:'none',borderRadius:6,fontSize:11,cursor:'pointer',fontWeight:500,whiteSpace:'nowrap'}}>Ganó</button>}
        </div>
      </div>
      {partido.ganador && (
        <div style={{fontSize:10,color:'rgba(245,244,240,0.45)',marginTop:6,textAlign:'center'}}>Finalizado</div>
      )}
    </div>
  );
}
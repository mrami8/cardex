import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Mesas() {
  const navigate = useNavigate();
  const [jugadores, setJugadores] = useState('');
  const [porMesa, setPorMesa] = useState(2);
  const [formato, setFormato] = useState('Swiss');
  const [rondas, setRondas] = useState(4);
  const [mesas, setMesas] = useState([]);
  const [rondaActual, setRondaActual] = useState(1);
  const [historial, setHistorial] = useState({});
  const [generado, setGenerado] = useState(false);
  const [puntos, setPuntos] = useState({});

  const parsearJugadores = () => jugadores.split('\n').map(j=>j.trim()).filter(Boolean);

  const shuffle = arr => {
    const a = [...arr];
    for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
    return a;
  };

  const generarMesas = () => {
    const lista = parsearJugadores();
    if(lista.length < 2){alert('Añade al menos 2 jugadores');return;}
    
    const pts = puntos;
    let ordenados;
    if(Object.keys(pts).length === 0){
      ordenados = shuffle(lista);
    } else {
      ordenados = [...lista].sort((a,b)=>(pts[b]||0)-(pts[a]||0));
      // Mezclar jugadores con mismos puntos
      let i = 0;
      while(i < ordenados.length){
        let j = i;
        while(j < ordenados.length && (pts[ordenados[j]]||0) === (pts[ordenados[i]]||0)) j++;
        const grupo = ordenados.slice(i,j);
        const mezclado = shuffle(grupo);
        for(let k=0;k<mezclado.length;k++) ordenados[i+k]=mezclado[k];
        i = j;
      }
    }

    const nuevasMesas = [];
    for(let i=0;i<ordenados.length;i+=porMesa){
      const grupo = ordenados.slice(i,i+porMesa);
      if(grupo.length===1 && nuevasMesas.length>0){
        nuevasMesas[nuevasMesas.length-1].jugadores.push(grupo[0]);
      } else {
        nuevasMesas.push({mesa:nuevasMesas.length+1,jugadores:grupo});
      }
    }

    setMesas(nuevasMesas);
    setGenerado(true);
  };

  const registrarResultado = (mesa, ganadorIdx) => {
    const nuevos = {...puntos};
    mesas[mesa].jugadores.forEach((j,i)=>{
      if(!nuevos[j]) nuevos[j]=0;
      if(i===ganadorIdx) nuevos[j]+=3;
    });
    setPuntos(nuevos);

    const h = {...historial};
    mesas[mesa].jugadores.forEach(j=>{
      if(!h[j]) h[j]=[];
      h[j].push(...mesas[mesa].jugadores.filter(x=>x!==j));
    });
    setHistorial(h);
  };

  const siguienteRonda = () => {
    if(rondaActual >= rondas){alert('Torneo finalizado');return;}
    setRondaActual(r=>r+1);
    setGenerado(false);
    setMesas([]);
  };

  const ranking = parsearJugadores()
    .map(j=>({name:j,pts:puntos[j]||0}))
    .sort((a,b)=>b.pts-a.pts);

  const inputStyle = {background:'#1e1c2a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:7,padding:'9px 12px',color:'white',fontSize:13,fontFamily:'DM Sans, sans-serif',outline:'none',width:'100%'};

  return (
    <div style={{background:'#0a0a0f',minHeight:'100vh',color:'#f5f4f0',fontFamily:'DM Sans, sans-serif',padding:'24px'}}>
      <div style={{maxWidth:1000,margin:'0 auto'}}>
        <button onClick={()=>navigate('/panel')} style={{background:'transparent',color:'rgba(245,244,240,0.45)',border:'none',cursor:'pointer',fontSize:13,marginBottom:6,padding:0}}>← Panel</button>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
          <div>
            <h1 style={{fontSize:22,fontWeight:700}}>Distribución de mesas</h1>
            <div style={{fontSize:13,color:'rgba(245,244,240,0.45)',marginTop:4}}>
              Ronda <strong style={{color:'#a29bfe'}}>{rondaActual}</strong> de <strong style={{color:'white'}}>{rondas}</strong>
            </div>
          </div>
          {generado && rondaActual < rondas && (
            <button onClick={siguienteRonda} style={{padding:'9px 18px',background:'#00b894',color:'white',border:'none',borderRadius:8,fontSize:13,cursor:'pointer',fontWeight:500}}>
              Siguiente ronda →
            </button>
          )}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'320px 1fr',gap:20}}>
          
          {/* CONFIGURACIÓN */}
          <div>
            <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:16,marginBottom:16}}>
              <div style={{fontSize:13,fontWeight:500,marginBottom:14}}>Configuración</div>
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                <div>
                  <label style={{fontSize:11,color:'rgba(245,244,240,0.45)',fontWeight:600,marginBottom:5,display:'block'}}>Jugadores por mesa</label>
                  <select style={inputStyle} value={porMesa} onChange={e=>setPorMesa(Number(e.target.value))}>
                    <option value={2}>2 — Enfrentamiento 1vs1</option>
                    <option value={4}>4 — Pod Commander</option>
                    <option value={3}>3 — Pod de 3</option>
                    <option value={8}>8 — Mesa grande</option>
                  </select>
                </div>
                <div>
                  <label style={{fontSize:11,color:'rgba(245,244,240,0.45)',fontWeight:600,marginBottom:5,display:'block'}}>Formato</label>
                  <select style={inputStyle} value={formato} onChange={e=>setFormato(e.target.value)}>
                    {['Swiss','Eliminatoria','Round Robin','Pods Commander'].map(f=><option key={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{fontSize:11,color:'rgba(245,244,240,0.45)',fontWeight:600,marginBottom:5,display:'block'}}>Número de rondas</label>
                  <select style={inputStyle} value={rondas} onChange={e=>setRondas(Number(e.target.value))}>
                    {[3,4,5,6,7,8].map(r=><option key={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{fontSize:11,color:'rgba(245,244,240,0.45)',fontWeight:600,marginBottom:5,display:'block'}}>
                    Lista de jugadores ({parsearJugadores().length})
                  </label>
                  <textarea
                    style={{...inputStyle,resize:'vertical',minHeight:160,fontFamily:'monospace',fontSize:12}}
                    placeholder={'Carlos Rueda\nAna Ferreira\nJoan López\nPau Garcia\nMarc Ribas\nLaura Bosch\n...'}
                    value={jugadores}
                    onChange={e=>setJugadores(e.target.value)}
                  />
                  <div style={{fontSize:11,color:'rgba(245,244,240,0.45)',marginTop:4}}>Un jugador por línea</div>
                </div>
                <button onClick={generarMesas} style={{padding:'10px',background:'#6c5ce7',color:'white',border:'none',borderRadius:8,fontSize:13,cursor:'pointer',fontWeight:500,width:'100%'}}>
                  {generado ? '↺ Regenerar mesas' : '⚡ Generar mesas'}
                </button>
              </div>
            </div>

            {/* RANKING */}
            {ranking.some(r=>r.pts>0) && (
              <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:16}}>
                <div style={{fontSize:13,fontWeight:500,marginBottom:12}}>Clasificación</div>
                {ranking.map((r,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'6px 0',borderBottom:i<ranking.length-1?'0.5px solid rgba(255,255,255,0.07)':'none'}}>
                    <span style={{fontSize:12,color:i===0?'#fdcb6e':i===1?'rgba(245,244,240,0.45)':i===2?'#e17055':'rgba(245,244,240,0.3)',fontWeight:600,width:20}}>{i+1}</span>
                    <span style={{flex:1,fontSize:12}}>{r.name}</span>
                    <span style={{fontSize:12,fontWeight:600,color:'#a29bfe'}}>{r.pts} pts</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* MESAS GENERADAS */}
          <div>
            {!generado ? (
              <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:40,textAlign:'center',color:'rgba(245,244,240,0.45)'}}>
                <div style={{fontSize:32,marginBottom:12}}>⚡</div>
                <div style={{fontSize:14,fontWeight:500,marginBottom:6}}>Listo para generar</div>
                <div style={{fontSize:12}}>Añade los jugadores y pulsa "Generar mesas"</div>
              </div>
            ) : (
              <div>
                <div style={{fontSize:13,color:'rgba(245,244,240,0.45)',marginBottom:12}}>
                  {mesas.length} mesas · {parsearJugadores().length} jugadores · Ronda {rondaActual}
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12}}>
                  {mesas.map((m,mi)=>(
                    <div key={mi} style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:14}}>
                      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
                        <span style={{fontSize:12,fontWeight:600,color:'#a29bfe'}}>Mesa {m.mesa}</span>
                        <span style={{fontSize:10,color:'rgba(245,244,240,0.45)'}}>{m.jugadores.length} jugadores</span>
                      </div>
                      {m.jugadores.map((j,ji)=>(
                        <div key={ji} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 0',borderBottom:ji<m.jugadores.length-1?'0.5px solid rgba(255,255,255,0.07)':'none'}}>
                          <div style={{display:'flex',alignItems:'center',gap:8}}>
                            <div style={{width:24,height:24,borderRadius:'50%',background:'rgba(108,92,231,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:600,color:'#a29bfe'}}>
                              {j.charAt(0).toUpperCase()}
                            </div>
                            <span style={{fontSize:12}}>{j}</span>
                          </div>
                          <button
                            onClick={()=>registrarResultado(mi,ji)}
                            style={{padding:'3px 8px',background:'rgba(0,184,148,0.15)',color:'#00b894',border:'none',borderRadius:6,fontSize:10,cursor:'pointer',fontWeight:500}}
                          >
                            Ganó
                          </button>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
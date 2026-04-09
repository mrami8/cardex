import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TorneosPublicos() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');
  const [juegoFiltro, setJuegoFiltro] = useState('Todos');
  const [distancia, setDistancia] = useState(50);
  const [soloGratis, setSoloGratis] = useState(false);
  const [soloBeginner, setSoloBeginner] = useState(false);
  const [torneo, setTorneo] = useState(null);

  const torneos = [
    {id:1,nombre:'Modern Showdown — Abril',juego:'Magic: The Gathering',formato:'Modern',fecha:'Sáb 12 Abr',hora:'10:00',tienda:'Card Castle BCN',ciudad:'Barcelona',dist:2.1,precio:12,plazas:32,inscritos:28,premio:'€180 crédito tienda',beginner:false,online:false,descripcion:'Torneo Swiss de 4 rondas. Se permite mazo de préstamo previa petición. Premio para top 4.'},
    {id:2,nombre:'Spring Regional Qualifier',juego:'Pokémon TCG',formato:'Standard',fecha:'Sáb 12 Abr',hora:'09:00',tienda:'GameZone Madrid',ciudad:'Madrid',dist:620,precio:15,plazas:128,inscritos:64,premio:'€1.200',beginner:false,online:false,descripcion:'Clasificatorio regional oficial. Trae tu lista validada. Check-in desde las 8:30.'},
    {id:3,nombre:'EDH Commander Night',juego:'Magic: The Gathering',formato:'EDH',fecha:'Sáb 12 Abr',hora:'19:00',tienda:'Espai de Joc BCN',ciudad:'Barcelona',dist:3.0,precio:0,plazas:12,inscritos:8,premio:'Solo por diversión',beginner:true,online:false,descripcion:'Noche de Commander casual. Bienvenidos todos los niveles. Mazos de 100 cartas.'},
    {id:4,nombre:'OP-09 Release Event',juego:'One Piece TCG',formato:'Sealed',fecha:'Sáb 12 Abr',hora:'11:00',tienda:"Dragon's Lair BCN",ciudad:'Barcelona',dist:4.2,precio:0,plazas:24,inscritos:16,premio:'Promos exclusivas',beginner:true,online:false,descripcion:'Evento de lanzamiento OP-09. Sellado incluido en la entrada. Apto para todos.'},
    {id:5,nombre:'Galactic Cup — Premier',juego:'Star Wars Unlimited',formato:'Premier',fecha:'Dom 13 Abr',hora:'13:00',tienda:'Online — Discord',ciudad:'Online',dist:0,precio:5,plazas:64,inscritos:44,premio:'€350',beginner:false,online:true,descripcion:'Torneo online en Tabletop Simulator. Link de Discord al confirmar inscripción.'},
    {id:6,nombre:'Yu-Gi-Oh! Advanced Weekly',juego:'Yu-Gi-Oh!',formato:'Advanced',fecha:'Dom 13 Abr',hora:'12:00',tienda:'La Guarida del Rol',ciudad:'Barcelona',dist:1.8,precio:8,plazas:32,inscritos:12,premio:'Boosters',beginner:false,online:false,descripcion:'Formato Advanced oficial. Lista de baneos actualizada. Swiss 4 rondas.'},
    {id:7,nombre:'Legacy Open — Abril',juego:'Magic: The Gathering',formato:'Legacy',fecha:'Dom 20 Abr',hora:'11:00',tienda:'TCG Valencia',ciudad:'Valencia',dist:350,precio:20,plazas:64,inscritos:4,premio:'€800',beginner:false,online:false,descripcion:'Swiss + Top 8 eliminatoria. Premio en metálico para top 3. Hotel recomendado en descripción.'},
    {id:8,nombre:'Pokémon Casual League',juego:'Pokémon TCG',formato:'Expanded',fecha:'Dom 20 Abr',hora:'10:30',tienda:'Norma Comics BCN',ciudad:'Barcelona',dist:2.8,precio:0,plazas:16,inscritos:10,premio:'Puntos de liga',beginner:true,online:false,descripcion:'Liga semanal casual. Perfecto para aprender. Préstamo de mazos disponible.'},
  ];

  const juegos = ['Todos','Magic: The Gathering','Pokémon TCG','Yu-Gi-Oh!','One Piece TCG','Star Wars Unlimited'];

  const filtrados = torneos.filter(t => {
    if(juegoFiltro !== 'Todos' && t.juego !== juegoFiltro) return false;
    if(soloGratis && t.precio > 0) return false;
    if(soloBeginner && !t.beginner) return false;
    if(busqueda && !t.nombre.toLowerCase().includes(busqueda.toLowerCase()) && !t.ciudad.toLowerCase().includes(busqueda.toLowerCase()) && !t.tienda.toLowerCase().includes(busqueda.toLowerCase())) return false;
    return true;
  });

  const badgeColor = j => {
    if(j.includes('Magic')) return {bg:'rgba(108,92,231,0.15)',color:'#a29bfe'};
    if(j.includes('Pokémon')) return {bg:'rgba(253,203,110,0.15)',color:'#fdcb6e'};
    if(j.includes('Yu-Gi')) return {bg:'rgba(0,184,148,0.15)',color:'#00b894'};
    if(j.includes('One Piece')) return {bg:'rgba(116,185,255,0.15)',color:'#74b9ff'};
    if(j.includes('Star Wars')) return {bg:'rgba(162,155,254,0.15)',color:'#a29bfe'};
    return {bg:'rgba(255,255,255,0.1)',color:'white'};
  };

  const pct = t => Math.round(t.inscritos/t.plazas*100);

  if(torneo) return (
    <div style={{background:'#0a0a0f',minHeight:'100vh',color:'#f5f4f0',fontFamily:'DM Sans, sans-serif',padding:'24px'}}>
      <div style={{maxWidth:700,margin:'0 auto'}}>
        <button onClick={()=>setTorneo(null)} style={{background:'transparent',color:'rgba(245,244,240,0.45)',border:'none',cursor:'pointer',fontSize:13,marginBottom:16,padding:0}}>← Volver a torneos</button>
        <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:14,overflow:'hidden'}}>
          <div style={{padding:'24px',borderBottom:'0.5px solid rgba(255,255,255,0.07)'}}>
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:12,marginBottom:16}}>
              <div>
                <span style={{fontSize:10,padding:'2px 8px',borderRadius:8,...badgeColor(torneo.juego),fontWeight:600,display:'inline-block',marginBottom:8}}>{torneo.juego}</span>
                <h1 style={{fontSize:20,fontWeight:700,marginBottom:4}}>{torneo.nombre}</h1>
                <div style={{fontSize:13,color:'rgba(245,244,240,0.45)'}}>{torneo.tienda} · {torneo.ciudad}</div>
              </div>
              {torneo.beginner && <span style={{fontSize:11,padding:'4px 10px',background:'rgba(0,184,148,0.15)',color:'#00b894',borderRadius:8,fontWeight:500,whiteSpace:'nowrap'}}>Beginner friendly</span>}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:16}}>
              {[
                {label:'Fecha',val:`${torneo.fecha} · ${torneo.hora}`},
                {label:'Formato',val:torneo.formato},
                {label:'Entrada',val:torneo.precio===0?'Gratuita':`€${torneo.precio}`},
                {label:'Premio',val:torneo.premio},
                {label:'Distancia',val:torneo.online?'Online':`${torneo.dist} km`},
                {label:'Plazas',val:`${torneo.inscritos}/${torneo.plazas}`},
              ].map((d,i)=>(
                <div key={i} style={{background:'rgba(255,255,255,0.04)',borderRadius:8,padding:'10px 12px'}}>
                  <div style={{fontSize:10,color:'rgba(245,244,240,0.45)',marginBottom:3}}>{d.label}</div>
                  <div style={{fontSize:13,fontWeight:500}}>{d.val}</div>
                </div>
              ))}
            </div>
            <div style={{marginBottom:16}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'rgba(245,244,240,0.45)',marginBottom:4}}>
                <span>Plazas ocupadas</span><span>{pct(torneo)}%</span>
              </div>
              <div style={{height:6,background:'rgba(255,255,255,0.08)',borderRadius:3,overflow:'hidden'}}>
                <div style={{height:'100%',background:pct(torneo)>85?'#e17055':'#6c5ce7',borderRadius:3,width:pct(torneo)+'%'}}></div>
              </div>
            </div>
            <div style={{fontSize:13,color:'rgba(245,244,240,0.6)',lineHeight:1.7,marginBottom:20}}>{torneo.descripcion}</div>
            <button onClick={()=>{alert('Para inscribirte necesitas crear una cuenta en Cardex. ¡Es gratis!');navigate('/');}} style={{width:'100%',padding:'13px',background:'#6c5ce7',color:'white',border:'none',borderRadius:10,fontSize:15,cursor:'pointer',fontWeight:500}}>
              {torneo.precio===0?'Inscribirme gratis':'Inscribirme · €'+torneo.precio}
            </button>
            <div style={{fontSize:11,color:'rgba(245,244,240,0.45)',textAlign:'center',marginTop:8}}>Necesitas una cuenta gratuita de Cardex para inscribirte</div>
          </div>
          <div style={{padding:'16px 24px'}}>
            <div style={{fontSize:12,fontWeight:500,marginBottom:10}}>Organizado por</div>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{width:40,height:40,borderRadius:10,background:'rgba(108,92,231,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:700,color:'#a29bfe'}}>{torneo.tienda.charAt(0)}</div>
              <div>
                <div style={{fontSize:13,fontWeight:500}}>{torneo.tienda}</div>
                <div style={{fontSize:11,color:'rgba(245,244,240,0.45)'}}>{torneo.ciudad}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{background:'#0a0a0f',minHeight:'100vh',color:'#f5f4f0',fontFamily:'DM Sans, sans-serif'}}>
      <div style={{padding:'14px 24px',borderBottom:'0.5px solid rgba(255,255,255,0.07)',background:'rgba(10,10,15,0.92)',position:'sticky',top:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,cursor:'pointer'}} onClick={()=>navigate('/')}>
          <div style={{width:28,height:28,background:'#6c5ce7',borderRadius:7,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,color:'white'}}>C</div>
          <span style={{fontSize:16,fontWeight:700,letterSpacing:'-0.5px'}}>Cardex</span>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button onClick={()=>navigate('/decklists')} style={{padding:'6px 12px',background:'transparent',color:'rgba(245,244,240,0.45)',border:'none',cursor:'pointer',fontSize:13}}>Decklists</button>
          <button onClick={()=>navigate('/rankings')} style={{padding:'6px 12px',background:'transparent',color:'rgba(245,244,240,0.45)',border:'none',cursor:'pointer',fontSize:13}}>Rankings</button>
          <button onClick={()=>navigate('/panel')} style={{padding:'6px 14px',background:'#6c5ce7',color:'white',border:'none',borderRadius:8,cursor:'pointer',fontSize:13,fontWeight:500}}>Panel tienda</button>
          <button onClick={()=>navigate('/login')} style={{padding:'7px 14px',background:'transparent',color:'rgba(245,244,240,0.45)',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:8,cursor:'pointer',fontSize:13}}>Iniciar sesión</button>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'280px 1fr',minHeight:'calc(100vh - 57px)'}}>
        <div style={{borderRight:'0.5px solid rgba(255,255,255,0.07)',padding:16,background:'#13121a'}}>
          <div style={{fontSize:11,fontWeight:600,color:'rgba(245,244,240,0.45)',letterSpacing:1,marginBottom:10,textTransform:'uppercase'}}>Buscar</div>
          <input value={busqueda} onChange={e=>setBusqueda(e.target.value)} placeholder="Torneo, tienda o ciudad..." style={{width:'100%',padding:'9px 12px',background:'#1e1c2a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:8,color:'white',fontSize:13,outline:'none',marginBottom:16}} />

          <div style={{fontSize:11,fontWeight:600,color:'rgba(245,244,240,0.45)',letterSpacing:1,marginBottom:10,textTransform:'uppercase'}}>Juego</div>
          <div style={{display:'flex',flexDirection:'column',gap:2,marginBottom:16}}>
            {juegos.map(j=>(
              <div key={j} onClick={()=>setJuegoFiltro(j)} style={{padding:'8px 10px',borderRadius:7,cursor:'pointer',fontSize:12,background:juegoFiltro===j?'rgba(108,92,231,0.15)':'transparent',color:juegoFiltro===j?'#a29bfe':'rgba(245,244,240,0.45)'}}>
                {j}
              </div>
            ))}
          </div>

          <div style={{fontSize:11,fontWeight:600,color:'rgba(245,244,240,0.45)',letterSpacing:1,marginBottom:10,textTransform:'uppercase'}}>Distancia</div>
          <div style={{marginBottom:4,fontSize:12,color:'rgba(245,244,240,0.6)'}}>Hasta <strong style={{color:'white'}}>{distancia} km</strong></div>
          <input type="range" min="5" max="1000" value={distancia} step="5" onChange={e=>setDistancia(Number(e.target.value))} style={{width:'100%',marginBottom:16}} />

          <div style={{fontSize:11,fontWeight:600,color:'rgba(245,244,240,0.45)',letterSpacing:1,marginBottom:10,textTransform:'uppercase'}}>Filtros</div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',fontSize:12,color:'rgba(245,244,240,0.6)'}}>
              <input type="checkbox" checked={soloGratis} onChange={e=>setSoloGratis(e.target.checked)} />
              Solo torneos gratuitos
            </label>
            <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',fontSize:12,color:'rgba(245,244,240,0.6)'}}>
              <input type="checkbox" checked={soloBeginner} onChange={e=>setSoloBeginner(e.target.checked)} />
              Beginner friendly
            </label>
          </div>
        </div>

        <div style={{padding:'16px 20px'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
            <div>
              <h1 style={{fontSize:18,fontWeight:700}}>Torneos</h1>
              <div style={{fontSize:12,color:'rgba(245,244,240,0.45)',marginTop:2}}>{filtrados.length} eventos encontrados</div>
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:12}}>
            {filtrados.map(t=>(
              <div key={t.id} onClick={()=>setTorneo(t)} style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:14,cursor:'pointer',transition:'border-color 0.15s'}}
                onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(108,92,231,0.4)'}
                onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
                  <span style={{fontSize:10,padding:'2px 7px',borderRadius:7,...badgeColor(t.juego),fontWeight:600}}>{t.juego.split(':')[0].split(' ')[0]}</span>
                  <div style={{display:'flex',gap:4}}>
                    {t.beginner && <span style={{fontSize:10,padding:'2px 7px',background:'rgba(0,184,148,0.12)',color:'#00b894',borderRadius:7,fontWeight:500}}>Beginner</span>}
                    {t.precio===0 && <span style={{fontSize:10,padding:'2px 7px',background:'rgba(0,184,148,0.12)',color:'#00b894',borderRadius:7,fontWeight:500}}>Gratis</span>}
                  </div>
                </div>
                <h3 style={{fontSize:13,fontWeight:500,marginBottom:6,lineHeight:1.3}}>{t.nombre}</h3>
                <div style={{fontSize:11,color:'rgba(245,244,240,0.45)',marginBottom:2}}>{t.fecha} · {t.hora}</div>
                <div style={{fontSize:11,color:'rgba(245,244,240,0.45)',marginBottom:8}}>{t.online?'Online':t.tienda+' · '+t.dist+' km'}</div>
                <div style={{marginBottom:10}}>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'rgba(245,244,240,0.45)',marginBottom:3}}>
                    <span>{t.inscritos}/{t.plazas} jugadores</span>
                    <span>{pct(t)}%</span>
                  </div>
                  <div style={{height:3,background:'rgba(255,255,255,0.08)',borderRadius:2,overflow:'hidden'}}>
                    <div style={{height:'100%',background:pct(t)>85?'#e17055':'#6c5ce7',borderRadius:2,width:pct(t)+'%'}}></div>
                  </div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:8,borderTop:'0.5px solid rgba(255,255,255,0.07)'}}>
                  <span style={{fontSize:11,color:'rgba(245,244,240,0.45)'}}>Entrada: {t.precio===0?'Gratis':'€'+t.precio}</span>
                  <span style={{fontSize:10,padding:'2px 8px',background:'rgba(0,184,148,0.12)',color:'#00b894',borderRadius:7}}>Premio: {t.premio}</span>
                </div>
              </div>
            ))}
          </div>

          {filtrados.length===0 && (
            <div style={{textAlign:'center',padding:'60px 20px',color:'rgba(245,244,240,0.45)'}}>
              <div style={{fontSize:32,marginBottom:12}}>🔍</div>
              <div style={{fontSize:14,fontWeight:500,marginBottom:6}}>No hay torneos con esos filtros</div>
              <div style={{fontSize:12}}>Prueba a cambiar el juego o la distancia</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
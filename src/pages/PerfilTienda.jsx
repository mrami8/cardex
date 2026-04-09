import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PerfilTienda() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('torneos');

  const tienda = {
    nombre: 'Card Castle BCN',
    avatar: 'CC',
    ciudad: 'Barcelona',
    direccion: 'Carrer de Sants 42, Barcelona',
    horario: 'Lun-Vie 10:00-21:00 · Sáb-Dom 10:00-22:00',
    telefono: '+34 932 45 67 89',
    web: 'cardcastlebcn.com',
    descripcion: 'Tienda especializada en TCG desde 2015. Organizamos torneos semanales de Magic, Pokémon y Yu-Gi-Oh. Somos tienda oficial WPN Premium y organizadores certificados de Pokémon.',
    juegos: ['Magic: The Gathering','Pokémon TCG','Yu-Gi-Oh!','One Piece TCG'],
    rating: 4.9,
    reviews: 124,
    torneos_mes: 12,
    jugadores: 284,
    abierto: true,
  };

  const torneos = [
    {nombre:'Modern Showdown — Mayo',fecha:'Sáb 3 May · 10:00',juego:'MTG',formato:'Modern',precio:12,plazas:32,inscritos:18,premio:'€180'},
    {nombre:'EDH Commander Night',fecha:'Sáb 3 May · 19:00',juego:'MTG',formato:'EDH',precio:0,plazas:12,inscritos:6,premio:'Fun'},
    {nombre:'Pokémon League Cup',fecha:'Dom 4 May · 10:00',juego:'Pokémon',formato:'Standard',precio:15,plazas:32,inscritos:24,premio:'€200'},
    {nombre:'Legacy Open — Mayo',fecha:'Dom 11 May · 11:00',juego:'MTG',formato:'Legacy',precio:20,plazas:64,inscritos:8,premio:'€500'},
  ];

  const pasados = [
    {nombre:'Modern Showdown — Abril',fecha:'Sáb 12 Abr',jugadores:32,ganador:'Carlos Rueda',juego:'MTG'},
    {nombre:'EDH Night',fecha:'Sáb 12 Abr',jugadores:12,ganador:'Joan López',juego:'MTG'},
    {nombre:'Pokémon Spring Cup',fecha:'Dom 6 Abr',jugadores:28,ganador:'Ana García',juego:'Pokémon'},
  ];

  const reseñas = [
    {autor:'Carlos R.',avatar:'CR',nota:5,texto:'Los mejores torneos de Barcelona. Ambiente increíble y organización perfecta.',fecha:'Hace 2 días'},
    {autor:'Ana F.',avatar:'AF',nota:5,texto:'Tienda imprescindible para cualquier jugador de MTG en BCN. Staff muy profesional.',fecha:'Hace 1 semana'},
    {autor:'Joan L.',avatar:'JL',nota:5,texto:'Llevo 3 años viniendo a los torneos y siempre es una experiencia genial.',fecha:'Hace 2 semanas'},
    {autor:'Marc R.',avatar:'MR',nota:4,texto:'Muy buena tienda, el único pero es que a veces se llena mucho. Pero los torneos son top.',fecha:'Hace 1 mes'},
  ];

  const badgeColor = j => {
    if(j==='MTG') return {bg:'rgba(108,92,231,0.2)',color:'#a29bfe'};
    if(j==='Pokémon') return {bg:'rgba(253,203,110,0.15)',color:'#fdcb6e'};
    if(j==='Yu-Gi-Oh!') return {bg:'rgba(0,184,148,0.15)',color:'#00b894'};
    return {bg:'rgba(116,185,255,0.15)',color:'#74b9ff'};
  };

  const pct = t => Math.round(t.inscritos/t.plazas*100);

  return (
    <div style={{background:'#0a0a0f',minHeight:'100vh',color:'#f5f4f0',fontFamily:'DM Sans, sans-serif'}}>
      <div style={{padding:'14px 24px',borderBottom:'0.5px solid rgba(255,255,255,0.07)',background:'rgba(10,10,15,0.92)',position:'sticky',top:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,cursor:'pointer'}} onClick={()=>navigate('/')}>
          <div style={{width:28,height:28,background:'#6c5ce7',borderRadius:7,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,color:'white'}}>C</div>
          <span style={{fontSize:16,fontWeight:700,letterSpacing:'-0.5px'}}>Cardex</span>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button onClick={()=>navigate('/torneos')} style={{padding:'6px 12px',background:'transparent',color:'rgba(245,244,240,0.45)',border:'none',cursor:'pointer',fontSize:13}}>Torneos</button>
          <button onClick={()=>navigate('/rankings')} style={{padding:'6px 12px',background:'transparent',color:'rgba(245,244,240,0.45)',border:'none',cursor:'pointer',fontSize:13}}>Rankings</button>
          <button onClick={()=>navigate('/panel')} style={{padding:'6px 14px',background:'#6c5ce7',color:'white',border:'none',borderRadius:8,cursor:'pointer',fontSize:13,fontWeight:500}}>Panel tienda</button>
        </div>
      </div>

      <div style={{maxWidth:960,margin:'0 auto',padding:'24px 20px'}}>

        {/* HEADER */}
        <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:14,padding:24,marginBottom:16}}>
          <div style={{display:'grid',gridTemplateColumns:'auto 1fr auto',gap:20,alignItems:'start'}}>
            <div style={{width:72,height:72,borderRadius:14,background:'rgba(108,92,231,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,fontWeight:700,color:'#a29bfe'}}>{tienda.avatar}</div>
            <div>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
                <h1 style={{fontSize:22,fontWeight:700}}>{tienda.nombre}</h1>
                <span style={{fontSize:10,padding:'2px 8px',background:tienda.abierto?'rgba(0,184,148,0.15)':'rgba(225,112,85,0.15)',color:tienda.abierto?'#00b894':'#e17055',borderRadius:8,fontWeight:600}}>{tienda.abierto?'Abierto ahora':'Cerrado'}</span>
              </div>
              <div style={{fontSize:13,color:'rgba(245,244,240,0.45)',marginBottom:8}}>📍 {tienda.direccion}</div>
              <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:10}}>
                {tienda.juegos.map((j,i)=>(
                  <span key={i} style={{fontSize:11,padding:'3px 9px',borderRadius:8,...badgeColor(j.includes('Magic')?'MTG':j.includes('Pokémon')?'Pokémon':j.includes('Yu')?'Yu-Gi-Oh!':'OP')}}>{j}</span>
                ))}
              </div>
              <div style={{fontSize:13,color:'rgba(245,244,240,0.6)',lineHeight:1.6,maxWidth:500}}>{tienda.descripcion}</div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8,alignItems:'flex-end'}}>
              <div style={{display:'flex',alignItems:'center',gap:6}}>
                <span style={{fontSize:20,color:'#fdcb6e'}}>★</span>
                <span style={{fontSize:18,fontWeight:700}}>{tienda.rating}</span>
                <span style={{fontSize:12,color:'rgba(245,244,240,0.45)'}}>({tienda.reviews} reseñas)</span>
              </div>
              <button onClick={()=>navigate('/torneos')} style={{padding:'9px 18px',background:'#6c5ce7',color:'white',border:'none',borderRadius:8,fontSize:13,cursor:'pointer',fontWeight:500}}>Ver torneos →</button>
              <button style={{padding:'9px 18px',background:'transparent',color:'rgba(245,244,240,0.45)',border:'0.5px solid rgba(255,255,255,0.1)',borderRadius:8,fontSize:13,cursor:'pointer'}}>Seguir tienda</button>
            </div>
          </div>

          {/* STATS */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginTop:20}}>
            {[
              {num:tienda.torneos_mes,label:'Torneos este mes'},
              {num:tienda.jugadores,label:'Jugadores únicos'},
              {num:'4.9★',label:'Valoración media'},
              {num:'WPN Premium',label:'Nivel organizador'},
            ].map((s,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,0.04)',borderRadius:10,padding:12,textAlign:'center'}}>
                <div style={{fontSize:18,fontWeight:700,color:'#a29bfe',marginBottom:2}}>{s.num}</div>
                <div style={{fontSize:11,color:'rgba(245,244,240,0.45)'}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:16}}>
          <div>
            {/* TABS */}
            <div style={{display:'flex',gap:4,borderBottom:'0.5px solid rgba(255,255,255,0.07)',marginBottom:16}}>
              {['torneos','pasados','reseñas'].map(t=>(
                <button key={t} onClick={()=>setTab(t)} style={{padding:'8px 16px',background:'transparent',border:'none',borderBottom:`2px solid ${tab===t?'#6c5ce7':'transparent'}`,color:tab===t?'#a29bfe':'rgba(245,244,240,0.45)',cursor:'pointer',fontSize:13,fontWeight:tab===t?500:400,textTransform:'capitalize'}}>
                  {t==='torneos'?'Próximos torneos':t==='pasados'?'Torneos pasados':'Reseñas'}
                </button>
              ))}
            </div>

            {/* PRÓXIMOS TORNEOS */}
            {tab==='torneos' && (
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {torneos.map((t,i)=>(
                  <div key={i} onClick={()=>navigate('/torneos')} style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:14,cursor:'pointer',transition:'border-color 0.15s'}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(108,92,231,0.4)'}
                    onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'}>
                    <div style={{display:'flex',alignItems:'center',gap:12}}>
                      <div style={{flex:1}}>
                        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
                          <span style={{fontSize:11,padding:'2px 7px',borderRadius:7,...badgeColor(t.juego),fontWeight:600}}>{t.juego}</span>
                          <span style={{fontSize:11,color:'rgba(245,244,240,0.45)'}}>{t.formato}</span>
                          {t.precio===0 && <span style={{fontSize:10,padding:'2px 7px',background:'rgba(0,184,148,0.12)',color:'#00b894',borderRadius:6}}>Gratis</span>}
                        </div>
                        <div style={{fontSize:14,fontWeight:500,marginBottom:4}}>{t.nombre}</div>
                        <div style={{fontSize:12,color:'rgba(245,244,240,0.45)'}}>{t.fecha}</div>
                        <div style={{marginTop:8}}>
                          <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'rgba(245,244,240,0.45)',marginBottom:3}}>
                            <span>{t.inscritos}/{t.plazas} jugadores</span><span>{pct(t)}%</span>
                          </div>
                          <div style={{height:3,background:'rgba(255,255,255,0.08)',borderRadius:2,overflow:'hidden'}}>
                            <div style={{height:'100%',background:pct(t)>85?'#e17055':'#6c5ce7',borderRadius:2,width:pct(t)+'%'}}></div>
                          </div>
                        </div>
                      </div>
                      <div style={{textAlign:'right',flexShrink:0}}>
                        <div style={{fontSize:12,color:'rgba(245,244,240,0.45)',marginBottom:4}}>Entrada</div>
                        <div style={{fontSize:16,fontWeight:600,marginBottom:8}}>{t.precio===0?'Gratis':'€'+t.precio}</div>
                        <div style={{fontSize:10,padding:'3px 8px',background:'rgba(0,184,148,0.12)',color:'#00b894',borderRadius:6}}>Premio: {t.premio}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TORNEOS PASADOS */}
            {tab==='pasados' && (
              <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,overflow:'hidden'}}>
                {pasados.map((t,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'14px 16px',borderBottom:i<pasados.length-1?'0.5px solid rgba(255,255,255,0.07)':'none'}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:500,marginBottom:3}}>{t.nombre}</div>
                      <div style={{fontSize:11,color:'rgba(245,244,240,0.45)'}}>{t.fecha} · {t.jugadores} jugadores</div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div style={{fontSize:11,color:'rgba(245,244,240,0.45)',marginBottom:2}}>Ganador</div>
                      <div style={{fontSize:12,fontWeight:500,color:'#fdcb6e'}}>🏆 {t.ganador}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* RESEÑAS */}
            {tab==='reseñas' && (
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {reseñas.map((r,i)=>(
                  <div key={i} style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:14}}>
                    <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
                      <div style={{width:32,height:32,borderRadius:'50%',background:'rgba(108,92,231,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:600,color:'#a29bfe'}}>{r.avatar}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13,fontWeight:500}}>{r.autor}</div>
                        <div style={{fontSize:10,color:'rgba(245,244,240,0.45)'}}>{r.fecha}</div>
                      </div>
                      <div style={{color:'#fdcb6e',fontSize:13}}>{'★'.repeat(r.nota)}{'☆'.repeat(5-r.nota)}</div>
                    </div>
                    <div style={{fontSize:13,color:'rgba(245,244,240,0.7)',lineHeight:1.6}}>{r.texto}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SIDEBAR INFO */}
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:14}}>
              <div style={{fontSize:12,fontWeight:500,marginBottom:12,color:'rgba(245,244,240,0.6)'}}>Información</div>
              {[
                {icon:'📍',label:'Dirección',val:tienda.direccion},
                {icon:'🕐',label:'Horario',val:tienda.horario},
                {icon:'📞',label:'Teléfono',val:tienda.telefono},
                {icon:'🌐',label:'Web',val:tienda.web},
              ].map((info,i)=>(
                <div key={i} style={{padding:'8px 0',borderBottom:i<3?'0.5px solid rgba(255,255,255,0.07)':'none'}}>
                  <div style={{fontSize:10,color:'rgba(245,244,240,0.45)',marginBottom:2}}>{info.icon} {info.label}</div>
                  <div style={{fontSize:12,color:'rgba(245,244,240,0.7)'}}>{info.val}</div>
                </div>
              ))}
            </div>

            <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:14}}>
              <div style={{fontSize:12,fontWeight:500,marginBottom:12,color:'rgba(245,244,240,0.6)'}}>Juegos disponibles</div>
              <div style={{display:'flex',flexDirection:'column',gap:6}}>
                {tienda.juegos.map((j,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:8,fontSize:12}}>
                    <div style={{width:6,height:6,borderRadius:'50%',background:'#6c5ce7'}}></div>
                    {j}
                  </div>
                ))}
              </div>
            </div>

            <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:14}}>
              <div style={{fontSize:12,fontWeight:500,marginBottom:12,color:'rgba(245,244,240,0.6)'}}>Mapa</div>
              <div style={{background:'rgba(255,255,255,0.04)',borderRadius:8,height:120,display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(245,244,240,0.3)',fontSize:12,flexDirection:'column',gap:6}}>
                <div style={{fontSize:24}}>🗺️</div>
                <div>Ver en Google Maps</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
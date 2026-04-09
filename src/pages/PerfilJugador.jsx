import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PerfilJugador() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('historial');

  const jugador = {
    nombre: 'Joan López',
    ciudad: 'Barcelona',
    pais: 'España',
    miembro: 'Enero 2023',
    avatar: 'JL',
    color: '#a29bfe',
    bg: 'rgba(108,92,231,0.2)',
    plan: 'Premium',
    elo: 1847,
    torneos: 102,
    wins: 64,
    losses: 38,
    wr: 63,
    prize: '€2.340',
    ranking_nacional: 48,
    ranking_ciudad: 4,
  };

  const historial = [
    {pos:1,nombre:'Modern Showdown BCN',fecha:'22 Mar 2026',juego:'MTG',formato:'Modern',jugadores:32,prize:'€120'},
    {pos:2,nombre:'Pioneer Regional Valencia',fecha:'15 Feb 2026',juego:'MTG',formato:'Pioneer',jugadores:64,prize:'€80'},
    {pos:4,nombre:'Legacy Open Madrid',fecha:'28 Ene 2026',juego:'MTG',formato:'Legacy',jugadores:48,prize:'€40'},
    {pos:1,nombre:'FNM Card Castle BCN',fecha:'10 Ene 2026',juego:'MTG',formato:'Modern',jugadores:16,prize:'€30'},
    {pos:8,nombre:'Championship Series Q3',fecha:'2 Dic 2025',juego:'MTG',formato:'Modern',jugadores:128,prize:'€0'},
    {pos:3,nombre:'Modern Showdown BCN',fecha:'8 Nov 2025',juego:'MTG',formato:'Modern',jugadores:32,prize:'€60'},
  ];

  const decks = [
    {nombre:'Grixis Shadow',color:'#a29bfe',eventos:42,wr:64,resultado:'1er puesto x3'},
    {nombre:'Amulet Titan',color:'#00b894',eventos:31,wr:58,resultado:'Top 4 x5'},
    {nombre:'Murktide Regent',color:'#74b9ff',eventos:18,wr:51,resultado:'Top 8 x2'},
    {nombre:'Living End',color:'#e17055',eventos:11,wr:71,resultado:'1er puesto x1'},
  ];

  const eloHistorial = [1580,1620,1690,1710,1760,1800,1830,1847];
  const meses = ['Sep','Oct','Nov','Dic','Ene','Feb','Mar','Abr'];
  const maxElo = Math.max(...eloHistorial);
  const minElo = Math.min(...eloHistorial);

  const posColor = p => p===1?{bg:'rgba(253,203,110,0.15)',color:'#fdcb6e'}:p===2?{bg:'rgba(180,178,169,0.2)',color:'#B4B2A9'}:p===3?{bg:'rgba(208,85,56,0.15)',color:'#D05538'}:{bg:'rgba(255,255,255,0.06)',color:'rgba(245,244,240,0.45)'};
  const posLabel = p => p===1?'1er':p===2?'2do':p===3?'3ro':`${p}to`;

  const achievements = [
    {nombre:'First blood',desc:'Gana tu primer torneo',done:true,color:'rgba(0,184,148,0.15)',tc:'#00b894'},
    {nombre:'Hat trick',desc:'3 victorias seguidas',done:true,color:'rgba(108,92,231,0.15)',tc:'#a29bfe'},
    {nombre:'Road warrior',desc:'Viaja 500+ km a un torneo',done:true,color:'rgba(116,185,255,0.15)',tc:'#74b9ff'},
    {nombre:'Spike',desc:'Top 8 en un Regional+',done:true,color:'rgba(253,203,110,0.15)',tc:'#fdcb6e'},
    {nombre:'Campeón',desc:'Gana un Regional o superior',done:false,color:'rgba(255,255,255,0.05)',tc:'rgba(245,244,240,0.3)'},
    {nombre:'Globe trotter',desc:'Juega en 5 países',done:false,color:'rgba(255,255,255,0.05)',tc:'rgba(245,244,240,0.3)'},
  ];

  const s = (style) => ({...style});

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

      <div style={{maxWidth:900,margin:'0 auto',padding:'24px 20px'}}>
        {/* HEADER */}
        <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:14,padding:24,marginBottom:16}}>
          <div style={{display:'grid',gridTemplateColumns:'auto 1fr auto',gap:20,alignItems:'start',marginBottom:20}}>
            <div style={{width:72,height:72,borderRadius:'50%',background:jugador.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,fontWeight:700,color:jugador.color}}>{jugador.avatar}</div>
            <div>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:4}}>
                <h1 style={{fontSize:22,fontWeight:700}}>{jugador.nombre}</h1>
                <span style={{fontSize:10,padding:'2px 10px',background:'rgba(108,92,231,0.2)',color:'#a29bfe',borderRadius:10,fontWeight:600}}>{jugador.plan} ✦</span>
              </div>
              <div style={{fontSize:13,color:'rgba(245,244,240,0.45)',marginBottom:10}}>{jugador.ciudad}, {jugador.pais} · Miembro desde {jugador.miembro}</div>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {['Modern specialist','102 torneos','Top 50 España','Championship qualified'].map((b,i)=>(
                  <span key={i} style={{fontSize:11,padding:'3px 10px',border:'0.5px solid rgba(255,255,255,0.15)',borderRadius:10,color:'rgba(245,244,240,0.6)'}}>{b}</span>
                ))}
              </div>
            </div>
            <button style={{padding:'8px 16px',background:'rgba(255,255,255,0.06)',color:'white',border:'0.5px solid rgba(255,255,255,0.1)',borderRadius:8,cursor:'pointer',fontSize:12}}>Editar perfil</button>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
            {[
              {num:jugador.elo,label:'ELO rating',color:'#a29bfe'},
              {num:jugador.wr+'%',label:'Win rate',color:'#00b894'},
              {num:jugador.torneos,label:'Torneos jugados',color:'white'},
              {num:jugador.prize,label:'Premios ganados',color:'#fdcb6e'},
            ].map((s,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,0.04)',borderRadius:10,padding:12,textAlign:'center'}}>
                <div style={{fontSize:22,fontWeight:700,color:s.color,marginBottom:2}}>{s.num}</div>
                <div style={{fontSize:11,color:'rgba(245,244,240,0.45)'}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TABS */}
        <div style={{display:'flex',gap:4,borderBottom:'0.5px solid rgba(255,255,255,0.07)',marginBottom:16}}>
          {['historial','decks','elo','logros'].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{padding:'8px 16px',background:'transparent',border:'none',borderBottom:`2px solid ${tab===t?'#6c5ce7':'transparent'}`,color:tab===t?'#a29bfe':'rgba(245,244,240,0.45)',cursor:'pointer',fontSize:13,fontWeight:tab===t?500:400,textTransform:'capitalize'}}>
              {t==='elo'?'ELO':t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          ))}
        </div>

        {/* HISTORIAL */}
        {tab==='historial' && (
          <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,overflow:'hidden'}}>
            <div style={{display:'grid',gridTemplateColumns:'60px 1fr 120px 100px 80px 80px',padding:'8px 16px',borderBottom:'0.5px solid rgba(255,255,255,0.07)'}}>
              {['Pos.','Torneo','Fecha','Formato','Jugadores','Premio'].map((h,i)=>(
                <div key={i} style={{fontSize:10,color:'rgba(245,244,240,0.45)',fontWeight:600,letterSpacing:0.5}}>{h}</div>
              ))}
            </div>
            {historial.map((h,i)=>(
              <div key={i} style={{display:'grid',gridTemplateColumns:'60px 1fr 120px 100px 80px 80px',padding:'12px 16px',borderBottom:i<historial.length-1?'0.5px solid rgba(255,255,255,0.07)':'none',alignItems:'center'}}>
                <div style={{width:32,height:32,borderRadius:'50%',...posColor(h.pos),display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:600}}>{posLabel(h.pos)}</div>
                <div style={{fontSize:13,fontWeight:500}}>{h.nombre}</div>
                <div style={{fontSize:12,color:'rgba(245,244,240,0.45)'}}>{h.fecha}</div>
                <div style={{fontSize:12,color:'rgba(245,244,240,0.45)'}}>{h.formato}</div>
                <div style={{fontSize:12,color:'rgba(245,244,240,0.45)'}}>{h.jugadores} jugadores</div>
                <div style={{fontSize:12,color:h.prize!=='€0'?'#00b894':'rgba(245,244,240,0.3)',fontWeight:h.prize!=='€0'?500:400}}>{h.prize}</div>
              </div>
            ))}
          </div>
        )}

        {/* DECKS */}
        {tab==='decks' && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:12}}>
            {decks.map((d,i)=>(
              <div key={i} style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:16}}>
                <div style={{width:8,height:8,borderRadius:'50%',background:d.color,marginBottom:10}}></div>
                <div style={{fontSize:15,fontWeight:600,marginBottom:4,color:d.color}}>{d.nombre}</div>
                <div style={{fontSize:11,color:'rgba(245,244,240,0.45)',marginBottom:12}}>{d.resultado}</div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:12}}>
                  <span style={{color:'rgba(245,244,240,0.45)'}}>{d.eventos} eventos</span>
                  <span style={{color:'#00b894',fontWeight:500}}>{d.wr}% WR</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ELO */}
        {tab==='elo' && (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:16}}>
              <div style={{fontSize:13,fontWeight:500,marginBottom:16}}>Progresión ELO</div>
              <svg viewBox={`0 0 300 120`} style={{width:'100%',height:120}}>
                <polyline
                  points={eloHistorial.map((v,i)=>`${i*(300/7)},${120-((v-minElo)/(maxElo-minElo))*100}`).join(' ')}
                  fill="none" stroke="#6c5ce7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                />
                {eloHistorial.map((v,i)=>(
                  <circle key={i} cx={i*(300/7)} cy={120-((v-minElo)/(maxElo-minElo))*100} r="3" fill="#6c5ce7" />
                ))}
              </svg>
              <div style={{display:'flex',justifyContent:'space-between',marginTop:6}}>
                {meses.map((m,i)=><span key={i} style={{fontSize:9,color:'rgba(245,244,240,0.45)'}}>{m}</span>)}
              </div>
            </div>
            <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:16}}>
              <div style={{fontSize:13,fontWeight:500,marginBottom:16}}>Rankings</div>
              {[
                {label:'ELO actual',val:jugador.elo,color:'#a29bfe'},
                {label:'Ranking nacional',val:`#${jugador.ranking_nacional}`,color:'white'},
                {label:'Ranking Barcelona',val:`#${jugador.ranking_ciudad}`,color:'white'},
                {label:'Mejor racha',val:'7 victorias',color:'#00b894'},
                {label:'Torneos top 3',val:'4',color:'#fdcb6e'},
              ].map((r,i)=>(
                <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:i<4?'0.5px solid rgba(255,255,255,0.07)':'none'}}>
                  <span style={{fontSize:12,color:'rgba(245,244,240,0.45)'}}>{r.label}</span>
                  <span style={{fontSize:13,fontWeight:500,color:r.color}}>{r.val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LOGROS */}
        {tab==='logros' && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:10}}>
            {achievements.map((a,i)=>(
              <div key={i} style={{background:a.color,borderRadius:12,padding:14,opacity:a.done?1:0.5}}>
                <div style={{fontSize:20,marginBottom:8}}>{a.done?'✓':'○'}</div>
                <div style={{fontSize:13,fontWeight:500,color:a.tc,marginBottom:4}}>{a.nombre}</div>
                <div style={{fontSize:11,color:a.tc,opacity:0.8}}>{a.desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
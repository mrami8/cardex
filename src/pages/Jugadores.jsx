import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Jugadores() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');

  const jugadores = [
    {ini:'CR',bg:'rgba(108,92,231,0.2)',fc:'#a29bfe',name:'Carlos Rueda',loc:'Madrid',torneos:42,wr:79,elo:2104},
    {ini:'AF',bg:'rgba(0,184,148,0.15)',fc:'#00b894',name:'Ana Ferreira',loc:'Barcelona',torneos:38,wr:74,elo:2088},
    {ini:'JL',bg:'rgba(116,185,255,0.15)',fc:'#74b9ff',name:'Joan López',loc:'Barcelona',torneos:31,wr:64,elo:1847},
    {ini:'PG',bg:'rgba(253,203,110,0.15)',fc:'#fdcb6e',name:'Pau Garcia',loc:'Barcelona',torneos:24,wr:58,elo:1720},
    {ini:'MR',bg:'rgba(225,112,85,0.15)',fc:'#e17055',name:'Marc Ribas',loc:'Sabadell',torneos:19,wr:51,elo:1640},
    {ini:'LB',bg:'rgba(108,92,231,0.15)',fc:'#a29bfe',name:'Laura Bosch',loc:'Girona',torneos:14,wr:47,elo:1580},
  ];

  const filtrados = jugadores.filter(j=>j.name.toLowerCase().includes(busqueda.toLowerCase())||j.loc.toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <div style={{background:'#0a0a0f',minHeight:'100vh',color:'#f5f4f0',fontFamily:'DM Sans, sans-serif',padding:'24px'}}>
      <div style={{maxWidth:900,margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
          <div>
            <button onClick={()=>navigate('/panel')} style={{background:'transparent',color:'rgba(245,244,240,0.45)',border:'none',cursor:'pointer',fontSize:13,marginBottom:6,padding:0}}>← Panel</button>
            <h1 style={{fontSize:22,fontWeight:700}}>Jugadores</h1>
          </div>
          <button style={{padding:'9px 18px',background:'rgba(255,255,255,0.06)',color:'white',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:8,fontSize:13,cursor:'pointer'}}>Exportar CSV</button>
        </div>
        <input value={busqueda} onChange={e=>setBusqueda(e.target.value)} placeholder="Buscar jugador o ciudad..." style={{width:'100%',marginBottom:16,padding:'10px 14px',background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:8,color:'white',fontSize:13,outline:'none'}} />
        <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:10,overflow:'hidden'}}>
          <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr',padding:'8px 16px',borderBottom:'0.5px solid rgba(255,255,255,0.07)'}}>
            {['Jugador','Torneos','Win rate','ELO',''].map((h,i)=>(
              <div key={i} style={{fontSize:10,color:'rgba(245,244,240,0.45)',fontWeight:600,letterSpacing:0.5}}>{h}</div>
            ))}
          </div>
          {filtrados.map((j,i)=>(
            <div key={i} style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr',padding:'12px 16px',borderBottom:i<filtrados.length-1?'0.5px solid rgba(255,255,255,0.07)':'none',alignItems:'center'}}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <div style={{width:30,height:30,borderRadius:'50%',background:j.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:600,color:j.fc,flexShrink:0}}>{j.ini}</div>
                <div>
                  <div style={{fontSize:12,fontWeight:500}}>{j.name}</div>
                  <div style={{fontSize:10,color:'rgba(245,244,240,0.45)'}}>{j.loc}</div>
                </div>
              </div>
              <div style={{fontSize:12}}>{j.torneos}</div>
              <div><span style={{fontSize:10,padding:'2px 8px',background:j.wr>=65?'rgba(0,184,148,0.15)':j.wr>=52?'rgba(253,203,110,0.12)':'rgba(225,112,85,0.15)',color:j.wr>=65?'#00b894':j.wr>=52?'#fdcb6e':'#e17055',borderRadius:8,fontWeight:600}}>{j.wr}%</span></div>
              <div style={{fontSize:12,fontWeight:500,color:'#a29bfe'}}>{j.elo}</div>
              <div><button style={{padding:'4px 10px',background:'rgba(255,255,255,0.06)',color:'white',border:'none',borderRadius:6,fontSize:11,cursor:'pointer'}}>Ver perfil</button></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
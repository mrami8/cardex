import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Torneos() {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState('todos');

  const torneos = [
    {id:1,status:'activo',color:'#00b894',name:'Modern Showdown — Abril',meta:'Sáb 12 Abr · 10:00 · Swiss 4 rondas · €12',badge:'MTG',players:28,cap:32},
    {id:2,status:'activo',color:'#fdcb6e',name:'EDH Commander Night',meta:'Sáb 12 Abr · 19:00 · Pods · Gratis',badge:'MTG',players:8,cap:12},
    {id:3,status:'proximo',color:'rgba(255,255,255,0.2)',name:'Legacy Open — Abril',meta:'Dom 20 Abr · 11:00 · Swiss + Top 8 · €20',badge:'MTG',players:4,cap:64},
    {id:4,status:'finalizado',color:'rgba(255,255,255,0.1)',name:'Modern Showdown — Marzo',meta:'Sáb 22 Mar · Finalizado · 32/32',badge:'MTG',players:32,cap:32},
  ];

  const filtrados = filtro === 'todos' ? torneos : torneos.filter(t => t.status === filtro);

  return (
    <div style={{background:'#0a0a0f',minHeight:'100vh',color:'#f5f4f0',fontFamily:'DM Sans, sans-serif',padding:'24px'}}>
      <div style={{maxWidth:900,margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
          <div>
            <button onClick={()=>navigate('/panel')} style={{background:'transparent',color:'rgba(245,244,240,0.45)',border:'none',cursor:'pointer',fontSize:13,marginBottom:6,padding:0}}>← Panel</button>
            <h1 style={{fontSize:22,fontWeight:700}}>Mis torneos</h1>
          </div>
          <button onClick={()=>navigate('/nuevo-torneo')} style={{padding:'9px 18px',background:'#6c5ce7',color:'white',border:'none',borderRadius:8,fontSize:13,cursor:'pointer',fontWeight:500}}>+ Crear torneo</button>
        </div>

        {/* FILTROS */}
        <div style={{display:'flex',gap:8,marginBottom:20}}>
          {['todos','activo','proximo','finalizado'].map(f=>(
            <button key={f} onClick={()=>setFiltro(f)} style={{padding:'6px 14px',borderRadius:20,fontSize:12,border:'0.5px solid rgba(255,255,255,0.07)',cursor:'pointer',background:filtro===f?'#EEEDFE':' transparent',color:filtro===f?'#534AB7':'rgba(245,244,240,0.45)'}}>
              {f.charAt(0).toUpperCase()+f.slice(1)}
            </button>
          ))}
        </div>

        {/* LISTA */}
        <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:10}}>
          {filtrados.map((t,i)=>{
            const pct = Math.round(t.players/t.cap*100);
            return (
              <div key={t.id} style={{display:'flex',alignItems:'center',gap:12,padding:'14px 16px',borderBottom:i<filtrados.length-1?'0.5px solid rgba(255,255,255,0.07)':'none',opacity:t.status==='finalizado'?0.5:1}}>
                <div style={{width:8,height:8,borderRadius:'50%',background:t.color,flexShrink:0}}></div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:500,marginBottom:2}}>{t.name}</div>
                  <div style={{fontSize:11,color:'rgba(245,244,240,0.45)',marginBottom:6}}>{t.meta}</div>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <div style={{flex:1,height:3,background:'rgba(255,255,255,0.08)',borderRadius:2,overflow:'hidden',maxWidth:120}}>
                      <div style={{height:'100%',background:'#6c5ce7',borderRadius:2,width:pct+'%'}}></div>
                    </div>
                    <span style={{fontSize:10,color:'rgba(245,244,240,0.45)'}}>{t.players}/{t.cap}</span>
                  </div>
                </div>
                <span style={{fontSize:10,padding:'2px 8px',background:'rgba(108,92,231,0.2)',color:'#a29bfe',borderRadius:8,fontWeight:600}}>{t.badge}</span>
                <div style={{display:'flex',gap:6}}>
                  <button onClick={()=>navigate('/nuevo-torneo')} style={{padding:'5px 10px',background:'rgba(255,255,255,0.06)',color:'white',border:'none',borderRadius:6,fontSize:11,cursor:'pointer'}}>Editar</button>
                  {t.status!=='finalizado' && <button style={{padding:'5px 10px',background:'rgba(108,92,231,0.2)',color:'#a29bfe',border:'none',borderRadius:6,fontSize:11,cursor:'pointer'}}>Bracket</button>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
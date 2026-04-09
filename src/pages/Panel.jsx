import { useNavigate } from 'react-router-dom';

export default function Panel() {
  const navigate = useNavigate();
  return (
    <div style={{background:'#0a0a0f',minHeight:'100vh',color:'#f5f4f0',fontFamily:'DM Sans, sans-serif',display:'flex'}}>
      
      {/* SIDEBAR */}
      <div style={{width:220,background:'#13121a',borderRight:'0.5px solid rgba(255,255,255,0.07)',display:'flex',flexDirection:'column',flexShrink:0}}>
        <div style={{padding:'18px 16px',borderBottom:'0.5px solid rgba(255,255,255,0.07)',display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:28,height:28,background:'#6c5ce7',borderRadius:7,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,color:'white'}}>C</div>
          <span style={{fontSize:16,fontWeight:700,letterSpacing:'-0.5px'}}>Cardex</span>
        </div>
        <div style={{margin:12,background:'#1e1c2a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:8,padding:'10px 12px'}}>
          <div style={{fontSize:12,fontWeight:500}}>Card Castle BCN</div>
          <div style={{fontSize:10,color:'#a29bfe',marginTop:2}}>Plan piloto · Gratis</div>
        </div>
        {[
          {label:'Dashboard',path:'/panel'},
          {label:'Mis torneos',path:'/torneos'},
          {label:'Nuevo torneo',path:'/nuevo-torneo'},
          {label:'Jugadores',path:'/jugadores'},
          {label:'Decklists',path:'/decklists'},
          {label:'Distribución mesas',path:'/mesas'},
          {label:'Bracket',path:'/bracket'},
          {label:'IA para mazos ✦',path:'/ia-mazos'},
          {label:'Métricas',path:'/metricas'},
          {label:'Mi tienda',path:'/tienda/1'},
          {label:'Premium',path:'/premium'},
        ].map((item,i)=>(
          <div key={i} onClick={()=>navigate(item.path)} style={{padding:'9px 16px',cursor:'pointer',color:'rgba(245,244,240,0.45)',fontSize:13,margin:'1px 6px',borderRadius:7,transition:'all 0.15s'}}
            onMouseEnter={e=>e.target.style.background='rgba(255,255,255,0.05)'}
            onMouseLeave={e=>e.target.style.background='transparent'}>
            {item.label}
          </div>
        ))}
        <div style={{marginTop:'auto',padding:12,borderTop:'0.5px solid rgba(255,255,255,0.07)'}}>
          <button onClick={()=>navigate('/')} style={{width:'100%',padding:'8px',background:'transparent',color:'rgba(245,244,240,0.45)',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:7,cursor:'pointer',fontSize:12}}>← Volver a la web</button>
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>
        <div style={{padding:'14px 24px',borderBottom:'0.5px solid rgba(255,255,255,0.07)',background:'#13121a',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <span style={{fontSize:16,fontWeight:700}}>Dashboard</span>
          <button onClick={()=>navigate('/nuevo-torneo')} style={{padding:'7px 14px',background:'#6c5ce7',color:'white',border:'none',borderRadius:7,fontSize:12,cursor:'pointer',fontWeight:500}}>+ Nuevo torneo</button>
        </div>
        <div style={{padding:'20px 24px',overflowY:'auto',flex:1}}>
          {/* STATS */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:20}}>
            {[
              {num:'12',label:'Torneos este mes',color:'#a29bfe'},
              {num:'284',label:'Jugadores únicos',color:'#00b894'},
              {num:'€840',label:'Inscripciones',color:'#fdcb6e'},
              {num:'94%',label:'Tasa asistencia',color:'#00b894'},
            ].map((s,i)=>(
              <div key={i} style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:10,padding:14}}>
                <div style={{fontSize:22,fontWeight:700,color:s.color,marginBottom:2}}>{s.num}</div>
                <div style={{fontSize:11,color:'rgba(245,244,240,0.45)'}}>{s.label}</div>
              </div>
            ))}
          </div>
          {/* TORNEOS */}
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
            <span style={{fontSize:14,fontWeight:500}}>Próximos torneos</span>
            <button onClick={()=>navigate('/torneos')} style={{padding:'5px 12px',background:'rgba(255,255,255,0.06)',color:'white',border:'none',borderRadius:6,fontSize:12,cursor:'pointer'}}>Ver todos →</button>
          </div>
          <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:10,marginBottom:20}}>
            {[
              {status:'#00b894',name:'Modern Showdown — Abril',meta:'Sáb 12 Abr · 10:00 · €12',badge:'MTG',players:'28/32'},
              {status:'#fdcb6e',name:'EDH Commander Night',meta:'Sáb 12 Abr · 19:00 · Gratis',badge:'MTG',players:'8/12'},
              {status:'rgba(255,255,255,0.2)',name:'Legacy Open — Abril',meta:'Dom 20 Abr · 11:00 · €20',badge:'MTG',players:'4/64'},
            ].map((t,i)=>(
              <div key={i} onClick={()=>navigate('/torneos')} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 14px',borderBottom:i<2?'0.5px solid rgba(255,255,255,0.07)':'none',cursor:'pointer'}}>
                <div style={{width:8,height:8,borderRadius:'50%',background:t.status,flexShrink:0}}></div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:500,marginBottom:2}}>{t.name}</div>
                  <div style={{fontSize:11,color:'rgba(245,244,240,0.45)'}}>{t.meta}</div>
                </div>
                <span style={{fontSize:10,padding:'2px 8px',background:'rgba(108,92,231,0.2)',color:'#a29bfe',borderRadius:8,fontWeight:600}}>{t.badge}</span>
                <span style={{fontSize:11,color:'rgba(245,244,240,0.45)',width:50,textAlign:'right'}}>{t.players}</span>
              </div>
            ))}
          </div>
          {/* ULTIMAS INSCRIPCIONES */}
          <div style={{fontSize:14,fontWeight:500,marginBottom:12}}>Últimas inscripciones</div>
          <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:10}}>
            {[
              {ini:'CR',color:'#a29bfe',bg:'rgba(108,92,231,0.2)',name:'Carlos Rueda',loc:'Madrid',torneo:'Modern Showdown',pago:'€12',ok:true},
              {ini:'AF',color:'#00b894',bg:'rgba(0,184,148,0.15)',name:'Ana Ferreira',loc:'Barcelona',torneo:'Modern Showdown',pago:'€12',ok:true},
              {ini:'PG',color:'#fdcb6e',bg:'rgba(253,203,110,0.15)',name:'Pau Garcia',loc:'Barcelona',torneo:'EDH Night',pago:'Gratis',ok:true},
              {ini:'LB',color:'#e17055',bg:'rgba(225,112,85,0.15)',name:'Luca Bianchi',loc:'Girona',torneo:'Modern Showdown',pago:'Pendiente',ok:false},
            ].map((p,i,arr)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 14px',borderBottom:i<arr.length-1?'0.5px solid rgba(255,255,255,0.07)':'none'}}>
                <div style={{width:28,height:28,borderRadius:'50%',background:p.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:600,color:p.color,flexShrink:0}}>{p.ini}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:500}}>{p.name}</div>
                  <div style={{fontSize:10,color:'rgba(245,244,240,0.45)'}}>{p.loc} · {p.torneo}</div>
                </div>
                <span style={{fontSize:10,padding:'2px 8px',background:p.ok?'rgba(0,184,148,0.15)':'rgba(253,203,110,0.12)',color:p.ok?'#00b894':'#fdcb6e',borderRadius:8,fontWeight:600}}>{p.pago}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
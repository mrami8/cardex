import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Metricas() {
  const navigate = useNavigate();
  const [periodo, setPeriodo] = useState('mes');

  const stats = [
    {num:'284',label:'Jugadores únicos',delta:'+42',up:true},
    {num:'12',label:'Torneos realizados',delta:'+3',up:true},
    {num:'€840',label:'Inscripciones cobradas',delta:'+18%',up:true},
    {num:'94%',label:'Tasa asistencia',delta:'+16pp',up:true},
  ];

  const juegoData = [
    {juego:'Magic: TG',torneos:7,jugadores:186,ingresos:480,pct:65},
    {juego:'Pokémon TCG',torneos:3,jugadores:72,ingresos:240,pct:28},
    {juego:'Yu-Gi-Oh!',torneos:2,jugadores:26,ingresos:120,pct:7},
  ];

  const diasData = [
    {dia:'Lun',jugadores:8},
    {dia:'Mar',jugadores:12},
    {dia:'Mié',jugadores:6},
    {dia:'Jue',jugadores:10},
    {dia:'Vie',jugadores:22},
    {dia:'Sáb',jugadores:84},
    {dia:'Dom',jugadores:31},
  ];

  const maxDia = Math.max(...diasData.map(d=>d.jugadores));

  const torneoTop = [
    {nombre:'Modern Showdown — Abr',jugadores:32,ingresos:'€384',asistencia:'94%'},
    {nombre:'Pokémon League Cup',jugadores:28,ingresos:'€420',asistencia:'100%'},
    {nombre:'EDH Commander Night',jugadores:12,ingresos:'€0',asistencia:'83%'},
    {nombre:'Legacy Open',jugadores:18,ingresos:'€360',asistencia:'90%'},
  ];

  const jugadoresNuevos = [
    {mes:'Nov',num:18},
    {mes:'Dic',num:24},
    {mes:'Ene',num:31},
    {mes:'Feb',num:28},
    {mes:'Mar',num:42},
    {mes:'Abr',num:38},
  ];
  const maxNuevos = Math.max(...jugadoresNuevos.map(j=>j.num));

  return (
    <div style={{background:'#0a0a0f',minHeight:'100vh',color:'#f5f4f0',fontFamily:'DM Sans, sans-serif',display:'flex'}}>
      {/* SIDEBAR */}
      <div style={{width:220,background:'#13121a',borderRight:'0.5px solid rgba(255,255,255,0.07)',display:'flex',flexDirection:'column',flexShrink:0}}>
        <div style={{padding:'18px 16px',borderBottom:'0.5px solid rgba(255,255,255,0.07)',display:'flex',alignItems:'center',gap:10,cursor:'pointer'}} onClick={()=>navigate('/')}>
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
          {label:'Métricas',path:'/metricas',active:true},
        ].map((item,i)=>(
          <div key={i} onClick={()=>navigate(item.path)} style={{padding:'9px 16px',cursor:'pointer',color:item.active?'white':'rgba(245,244,240,0.45)',fontSize:13,margin:'1px 6px',borderRadius:7,background:item.active?'rgba(108,92,231,0.15)':'transparent'}}
            onMouseEnter={e=>!item.active&&(e.target.style.background='rgba(255,255,255,0.05)')}
            onMouseLeave={e=>!item.active&&(e.target.style.background='transparent')}>
            {item.label}
          </div>
        ))}
        <div style={{marginTop:'auto',padding:12,borderTop:'0.5px solid rgba(255,255,255,0.07)'}}>
          <button onClick={()=>navigate('/')} style={{width:'100%',padding:'8px',background:'transparent',color:'rgba(245,244,240,0.45)',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:7,cursor:'pointer',fontSize:12}}>← Volver a la web</button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{flex:1,overflow:'auto'}}>
        <div style={{padding:'16px 24px',borderBottom:'0.5px solid rgba(255,255,255,0.07)',background:'#13121a',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <span style={{fontSize:16,fontWeight:700}}>Métricas</span>
          <div style={{display:'flex',gap:6}}>
            {['semana','mes','trimestre'].map(p=>(
              <button key={p} onClick={()=>setPeriodo(p)} style={{padding:'6px 12px',background:periodo===p?'rgba(108,92,231,0.2)':'transparent',color:periodo===p?'#a29bfe':'rgba(245,244,240,0.45)',border:`0.5px solid ${periodo===p?'rgba(108,92,231,0.4)':'rgba(255,255,255,0.07)'}`,borderRadius:7,cursor:'pointer',fontSize:12,textTransform:'capitalize'}}>
                {p.charAt(0).toUpperCase()+p.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div style={{padding:'20px 24px'}}>
          {/* STATS */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:20}}>
            {stats.map((s,i)=>(
              <div key={i} style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:10,padding:14}}>
                <div style={{fontSize:22,fontWeight:700,color:'#a29bfe',marginBottom:4}}>{s.num}</div>
                <div style={{fontSize:11,color:'rgba(245,244,240,0.45)',marginBottom:6}}>{s.label}</div>
                <div style={{fontSize:11,color:s.up?'#00b894':'#e17055',fontWeight:500}}>↑ {s.delta} vs mes anterior</div>
              </div>
            ))}
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
            {/* ASISTENCIA POR DÍA */}
            <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:16}}>
              <div style={{fontSize:13,fontWeight:500,marginBottom:4}}>Jugadores por día de la semana</div>
              <div style={{fontSize:11,color:'rgba(245,244,240,0.45)',marginBottom:16}}>El sábado es tu día estrella</div>
              <div style={{display:'flex',alignItems:'flex-end',gap:8,height:100,marginBottom:8}}>
                {diasData.map((d,i)=>(
                  <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                    <div style={{fontSize:10,color:'rgba(245,244,240,0.45)'}}>{d.jugadores}</div>
                    <div style={{width:'100%',background:i===5?'#6c5ce7':'rgba(108,92,231,0.3)',borderRadius:'3px 3px 0 0',height:Math.round(d.jugadores/maxDia*80)+'px',transition:'height 0.3s'}}></div>
                  </div>
                ))}
              </div>
              <div style={{display:'flex',gap:8}}>
                {diasData.map((d,i)=>(
                  <div key={i} style={{flex:1,textAlign:'center',fontSize:9,color:'rgba(245,244,240,0.45)'}}>{d.dia}</div>
                ))}
              </div>
            </div>

            {/* JUGADORES NUEVOS */}
            <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:16}}>
              <div style={{fontSize:13,fontWeight:500,marginBottom:4}}>Jugadores nuevos por mes</div>
              <div style={{fontSize:11,color:'rgba(245,244,240,0.45)',marginBottom:16}}>Crecimiento constante desde noviembre</div>
              <div style={{display:'flex',alignItems:'flex-end',gap:8,height:100,marginBottom:8}}>
                {jugadoresNuevos.map((d,i)=>(
                  <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                    <div style={{fontSize:10,color:'rgba(245,244,240,0.45)'}}>{d.num}</div>
                    <div style={{width:'100%',background:i===jugadoresNuevos.length-1?'#00b894':'rgba(0,184,148,0.3)',borderRadius:'3px 3px 0 0',height:Math.round(d.num/maxNuevos*80)+'px'}}></div>
                  </div>
                ))}
              </div>
              <div style={{display:'flex',gap:8}}>
                {jugadoresNuevos.map((d,i)=>(
                  <div key={i} style={{flex:1,textAlign:'center',fontSize:9,color:'rgba(245,244,240,0.45)'}}>{d.mes}</div>
                ))}
              </div>
            </div>
          </div>

          {/* JUEGOS */}
          <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:16,marginBottom:16}}>
            <div style={{fontSize:13,fontWeight:500,marginBottom:14}}>Rendimiento por juego</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
              {juegoData.map((j,i)=>(
                <div key={i} style={{background:'rgba(255,255,255,0.03)',borderRadius:10,padding:12}}>
                  <div style={{fontSize:13,fontWeight:500,marginBottom:10,color:i===0?'#a29bfe':i===1?'#fdcb6e':'#00b894'}}>{j.juego}</div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:10}}>
                    {[{label:'Torneos',val:j.torneos},{label:'Jugadores',val:j.jugadores},{label:'Ingresos',val:'€'+j.ingresos}].map((s,si)=>(
                      <div key={si} style={{textAlign:'center'}}>
                        <div style={{fontSize:16,fontWeight:600}}>{s.val}</div>
                        <div style={{fontSize:10,color:'rgba(245,244,240,0.45)'}}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{height:4,background:'rgba(255,255,255,0.08)',borderRadius:2,overflow:'hidden'}}>
                    <div style={{height:'100%',background:i===0?'#a29bfe':i===1?'#fdcb6e':'#00b894',borderRadius:2,width:j.pct+'%'}}></div>
                  </div>
                  <div style={{fontSize:10,color:'rgba(245,244,240,0.45)',marginTop:4,textAlign:'right'}}>{j.pct}% del total</div>
                </div>
              ))}
            </div>
          </div>

          {/* TOP TORNEOS */}
          <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:16}}>
            <div style={{fontSize:13,fontWeight:500,marginBottom:14}}>Top torneos del mes</div>
            <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',padding:'6px 12px',marginBottom:4}}>
              {['Torneo','Jugadores','Ingresos','Asistencia'].map((h,i)=>(
                <div key={i} style={{fontSize:10,color:'rgba(245,244,240,0.45)',fontWeight:600,letterSpacing:0.5}}>{h}</div>
              ))}
            </div>
            {torneoTop.map((t,i)=>(
              <div key={i} style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',padding:'10px 12px',borderTop:'0.5px solid rgba(255,255,255,0.07)',alignItems:'center'}}>
                <div style={{fontSize:13,fontWeight:500}}>{t.nombre}</div>
                <div style={{fontSize:12,color:'rgba(245,244,240,0.6)'}}>{t.jugadores}</div>
                <div style={{fontSize:12,color:'#00b894',fontWeight:500}}>{t.ingresos}</div>
                <div style={{fontSize:12}}><span style={{padding:'2px 8px',background:parseInt(t.asistencia)>=90?'rgba(0,184,148,0.15)':'rgba(253,203,110,0.12)',color:parseInt(t.asistencia)>=90?'#00b894':'#fdcb6e',borderRadius:6,fontSize:11,fontWeight:500}}>{t.asistencia}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
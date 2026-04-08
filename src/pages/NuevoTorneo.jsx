import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function NuevoTorneo() {
  const navigate = useNavigate();
  const [form, setForm] = useState({nombre:'',juego:'Magic: The Gathering',formato:'Modern',fecha:'',hora:'10:00',plazas:'32',precio:'',estructura:'Swiss',rondas:'4',premio:'',descripcion:'',pago:'En tienda',visibilidad:'Público'});
  const [guardado, setGuardado] = useState(false);

  const update = (k,v) => setForm(f=>({...f,[k]:v}));

  const publicar = () => {
    if(!form.nombre||!form.fecha){alert('Rellena el nombre y la fecha del torneo');return;}
    setGuardado(true);
    setTimeout(()=>navigate('/torneos'),2000);
  };

  const inputStyle = {background:'#1e1c2a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:7,padding:'9px 12px',color:'white',fontSize:13,fontFamily:'DM Sans, sans-serif',outline:'none',width:'100%'};
  const labelStyle = {fontSize:11,color:'rgba(245,244,240,0.45)',fontWeight:600,letterSpacing:0.3,marginBottom:5,display:'block'};

  if(guardado) return (
    <div style={{background:'#0a0a0f',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontFamily:'DM Sans, sans-serif',flexDirection:'column',gap:16}}>
      <div style={{fontSize:40}}>✓</div>
      <div style={{fontSize:18,fontWeight:500}}>¡Torneo publicado!</div>
      <div style={{fontSize:14,color:'rgba(245,244,240,0.45)'}}>Ya aparece en Cardex. Redirigiendo...</div>
    </div>
  );

  return (
    <div style={{background:'#0a0a0f',minHeight:'100vh',color:'#f5f4f0',fontFamily:'DM Sans, sans-serif',padding:'24px'}}>
      <div style={{maxWidth:700,margin:'0 auto'}}>
        <button onClick={()=>navigate('/torneos')} style={{background:'transparent',color:'rgba(245,244,240,0.45)',border:'none',cursor:'pointer',fontSize:13,marginBottom:6,padding:0}}>← Mis torneos</button>
        <h1 style={{fontSize:22,fontWeight:700,marginBottom:24}}>Nuevo torneo</h1>
        <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:20}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
            <div style={{gridColumn:'1/-1'}}>
              <label style={labelStyle}>Nombre del torneo *</label>
              <input style={inputStyle} placeholder="Ej: Modern Showdown Mayo 2025" value={form.nombre} onChange={e=>update('nombre',e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Juego</label>
              <select style={inputStyle} value={form.juego} onChange={e=>update('juego',e.target.value)}>
                {['Magic: The Gathering','Pokémon TCG','Yu-Gi-Oh!','One Piece TCG','Star Wars Unlimited','Disney Lorcana'].map(g=><option key={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Formato</label>
              <select style={inputStyle} value={form.formato} onChange={e=>update('formato',e.target.value)}>
                {['Modern','Pioneer','Standard','Legacy','EDH / Commander','Draft','Sealed','Pauper'].map(f=><option key={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Fecha *</label>
              <input style={inputStyle} type="date" value={form.fecha} onChange={e=>update('fecha',e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Hora</label>
              <input style={inputStyle} type="time" value={form.hora} onChange={e=>update('hora',e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Plazas máximas</label>
              <input style={inputStyle} type="number" value={form.plazas} onChange={e=>update('plazas',e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Precio inscripción (€)</label>
              <input style={inputStyle} type="number" placeholder="0 = gratuito" value={form.precio} onChange={e=>update('precio',e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Estructura</label>
              <select style={inputStyle} value={form.estructura} onChange={e=>update('estructura',e.target.value)}>
                {['Swiss','Swiss + Top 8','Eliminatoria directa','Round Robin','Pods (Commander)'].map(e=><option key={e}>{e}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Número de rondas</label>
              <input style={inputStyle} type="number" value={form.rondas} onChange={e=>update('rondas',e.target.value)} />
            </div>
            <div style={{gridColumn:'1/-1'}}>
              <label style={labelStyle}>Premio</label>
              <input style={inputStyle} placeholder="Ej: €180 en crédito de tienda, boosters..." value={form.premio} onChange={e=>update('premio',e.target.value)} />
            </div>
            <div style={{gridColumn:'1/-1'}}>
              <label style={labelStyle}>Descripción</label>
              <textarea style={{...inputStyle,resize:'vertical',minHeight:80}} placeholder="Reglas especiales, qué traer..." value={form.descripcion} onChange={e=>update('descripcion',e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Método de pago</label>
              <select style={inputStyle} value={form.pago} onChange={e=>update('pago',e.target.value)}>
                {['En tienda el día del torneo','Bizum al confirmar','MB Way (Portugal)','Stripe (tarjeta online)'].map(p=><option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Visibilidad</label>
              <select style={inputStyle} value={form.visibilidad} onChange={e=>update('visibilidad',e.target.value)}>
                {['Público en Cardex','Solo con enlace','Privado'].map(v=><option key={v}>{v}</option>)}
              </select>
            </div>
            <div style={{gridColumn:'1/-1',display:'flex',gap:10,justifyContent:'flex-end',marginTop:8}}>
              <button onClick={()=>navigate('/torneos')} style={{padding:'9px 18px',background:'rgba(255,255,255,0.06)',color:'white',border:'none',borderRadius:8,fontSize:13,cursor:'pointer'}}>Cancelar</button>
              <button onClick={publicar} style={{padding:'9px 18px',background:'#6c5ce7',color:'white',border:'none',borderRadius:8,fontSize:13,cursor:'pointer',fontWeight:500}}>Publicar torneo</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
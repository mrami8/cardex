import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [modo, setModo] = useState('login');
  const [tipo, setTipo] = useState('jugador');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [tienda, setTienda] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [paso, setPaso] = useState(1);
  const [cargando, setCargando] = useState(false);

  const inputStyle = {
    width:'100%',padding:'11px 14px',background:'#1e1c2a',
    border:'0.5px solid rgba(255,255,255,0.1)',borderRadius:9,
    color:'white',fontSize:14,fontFamily:'DM Sans, sans-serif',
    outline:'none',transition:'border-color 0.2s'
  };

  const handleSubmit = () => {
    if(!email||!password){alert('Rellena todos los campos');return;}
    setCargando(true);
    setTimeout(()=>{
      setCargando(false);
      if(tipo==='tienda') navigate('/panel');
      else navigate('/perfil');
    },1200);
  };

  const handleRegistro = () => {
    if(paso===1){
      if(!email||!password||!nombre){alert('Rellena todos los campos');return;}
      setPaso(2);return;
    }
    setCargando(true);
    setTimeout(()=>{
      setCargando(false);
      if(tipo==='tienda') navigate('/panel');
      else navigate('/perfil');
    },1500);
  };

  return (
    <div style={{background:'#0a0a0f',minHeight:'100vh',color:'#f5f4f0',fontFamily:'DM Sans, sans-serif',display:'flex',flexDirection:'column'}}>
      <div style={{padding:'14px 24px',borderBottom:'0.5px solid rgba(255,255,255,0.07)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,cursor:'pointer'}} onClick={()=>navigate('/')}>
          <div style={{width:28,height:28,background:'#6c5ce7',borderRadius:7,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,color:'white'}}>C</div>
          <span style={{fontSize:16,fontWeight:700,letterSpacing:'-0.5px'}}>Cardex</span>
        </div>
        <button onClick={()=>navigate('/torneos')} style={{padding:'6px 14px',background:'transparent',color:'rgba(245,244,240,0.45)',border:'0.5px solid rgba(255,255,255,0.1)',borderRadius:8,cursor:'pointer',fontSize:13}}>Ver torneos</button>
      </div>

      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'40px 20px'}}>
        <div style={{width:'100%',maxWidth:420}}>

          {/* LOGO */}
          <div style={{textAlign:'center',marginBottom:28}}>
            <div style={{width:48,height:48,background:'#6c5ce7',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:22,color:'white',margin:'0 auto 12px'}}>C</div>
            <h1 style={{fontSize:22,fontWeight:700,marginBottom:4}}>
              {modo==='login'?'Bienvenido de nuevo':'Únete a Cardex'}
            </h1>
            <p style={{fontSize:13,color:'rgba(245,244,240,0.45)'}}>
              {modo==='login'?'Inicia sesión en tu cuenta':'Crea tu cuenta gratis en menos de 1 minuto'}
            </p>
          </div>

          {/* CARD */}
          <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:14,padding:24}}>

            {/* TIPO USUARIO (solo registro) */}
            {modo==='registro' && paso===1 && (
              <div style={{marginBottom:20}}>
                <div style={{fontSize:12,color:'rgba(245,244,240,0.45)',marginBottom:8}}>Soy...</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                  {['jugador','tienda'].map(t=>(
                    <div key={t} onClick={()=>setTipo(t)} style={{padding:'12px',border:`1.5px solid ${tipo===t?'#6c5ce7':'rgba(255,255,255,0.07)'}`,borderRadius:10,cursor:'pointer',textAlign:'center',background:tipo===t?'rgba(108,92,231,0.1)':'transparent',transition:'all 0.15s'}}>
                      <div style={{fontSize:20,marginBottom:4}}>{t==='jugador'?'🃏':'🏪'}</div>
                      <div style={{fontSize:13,fontWeight:500,color:tipo===t?'#a29bfe':'rgba(245,244,240,0.6)',textTransform:'capitalize'}}>{t}</div>
                      <div style={{fontSize:10,color:'rgba(245,244,240,0.35)',marginTop:2}}>{t==='jugador'?'Busco torneos':'Organizo torneos'}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PASO 1 — DATOS BÁSICOS */}
            {(modo==='login' || (modo==='registro' && paso===1)) && (
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                {modo==='registro' && (
                  <div>
                    <label style={{fontSize:11,color:'rgba(245,244,240,0.45)',fontWeight:600,display:'block',marginBottom:5}}>Nombre completo</label>
                    <input style={inputStyle} placeholder="Joan López" value={nombre} onChange={e=>setNombre(e.target.value)} onFocus={e=>e.target.style.borderColor='#6c5ce7'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'} />
                  </div>
                )}
                <div>
                  <label style={{fontSize:11,color:'rgba(245,244,240,0.45)',fontWeight:600,display:'block',marginBottom:5}}>Email</label>
                  <input style={inputStyle} type="email" placeholder="tu@email.com" value={email} onChange={e=>setEmail(e.target.value)} onFocus={e=>e.target.style.borderColor='#6c5ce7'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'} />
                </div>
                <div>
                  <label style={{fontSize:11,color:'rgba(245,244,240,0.45)',fontWeight:600,display:'block',marginBottom:5}}>Contraseña</label>
                  <input style={inputStyle} type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} onFocus={e=>e.target.style.borderColor='#6c5ce7'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'} />
                </div>
                {modo==='login' && (
                  <div style={{textAlign:'right'}}>
                    <span style={{fontSize:12,color:'#a29bfe',cursor:'pointer'}}>¿Olvidaste tu contraseña?</span>
                  </div>
                )}
                <button onClick={modo==='login'?handleSubmit:handleRegistro} disabled={cargando} style={{width:'100%',padding:'12px',background:cargando?'rgba(108,92,231,0.5)':'#6c5ce7',color:'white',border:'none',borderRadius:9,fontSize:14,cursor:cargando?'not-allowed':'pointer',fontWeight:500,marginTop:4,transition:'background 0.2s'}}>
                  {cargando?'Cargando...':(modo==='login'?'Iniciar sesión':'Continuar →')}
                </button>
              </div>
            )}

            {/* PASO 2 — DATOS EXTRA (registro) */}
            {modo==='registro' && paso===2 && (
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                <div style={{background:'rgba(108,92,231,0.1)',border:'0.5px solid rgba(108,92,231,0.2)',borderRadius:8,padding:'10px 12px',fontSize:12,color:'#a29bfe',marginBottom:4}}>
                  ✓ Cuenta creada para <strong>{email}</strong>
                </div>
                {tipo==='tienda' ? (
                  <>
                    <div>
                      <label style={{fontSize:11,color:'rgba(245,244,240,0.45)',fontWeight:600,display:'block',marginBottom:5}}>Nombre de la tienda</label>
                      <input style={inputStyle} placeholder="Card Castle BCN" value={tienda} onChange={e=>setTienda(e.target.value)} onFocus={e=>e.target.style.borderColor='#6c5ce7'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'} />
                    </div>
                    <div>
                      <label style={{fontSize:11,color:'rgba(245,244,240,0.45)',fontWeight:600,display:'block',marginBottom:5}}>Ciudad</label>
                      <input style={inputStyle} placeholder="Barcelona" value={ciudad} onChange={e=>setCiudad(e.target.value)} onFocus={e=>e.target.style.borderColor='#6c5ce7'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'} />
                    </div>
                    <div>
                      <label style={{fontSize:11,color:'rgba(245,244,240,0.45)',fontWeight:600,display:'block',marginBottom:5}}>Juegos que organizas</label>
                      <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                        {['Magic: TG','Pokémon','Yu-Gi-Oh!','One Piece','Star Wars'].map(j=>(
                          <span key={j} style={{fontSize:11,padding:'4px 10px',border:'0.5px solid rgba(255,255,255,0.1)',borderRadius:8,cursor:'pointer',color:'rgba(245,244,240,0.6)'}}>{j}</span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label style={{fontSize:11,color:'rgba(245,244,240,0.45)',fontWeight:600,display:'block',marginBottom:5}}>Ciudad</label>
                      <input style={inputStyle} placeholder="Barcelona" value={ciudad} onChange={e=>setCiudad(e.target.value)} onFocus={e=>e.target.style.borderColor='#6c5ce7'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'} />
                    </div>
                    <div>
                      <label style={{fontSize:11,color:'rgba(245,244,240,0.45)',fontWeight:600,display:'block',marginBottom:5}}>Juego principal</label>
                      <select style={{...inputStyle,cursor:'pointer'}}>
                        {['Magic: The Gathering','Pokémon TCG','Yu-Gi-Oh!','One Piece TCG','Star Wars Unlimited'].map(j=><option key={j}>{j}</option>)}
                      </select>
                    </div>
                  </>
                )}
                <button onClick={handleRegistro} disabled={cargando} style={{width:'100%',padding:'12px',background:cargando?'rgba(108,92,231,0.5)':'#6c5ce7',color:'white',border:'none',borderRadius:9,fontSize:14,cursor:cargando?'not-allowed':'pointer',fontWeight:500,transition:'background 0.2s'}}>
                  {cargando?'Creando cuenta...':'Crear cuenta y entrar'}
                </button>
                <button onClick={()=>setPaso(1)} style={{width:'100%',padding:'10px',background:'transparent',color:'rgba(245,244,240,0.45)',border:'none',cursor:'pointer',fontSize:13}}>← Volver</button>
              </div>
            )}

            {/* DIVISOR */}
            <div style={{display:'flex',alignItems:'center',gap:10,margin:'16px 0'}}>
              <div style={{flex:1,height:'0.5px',background:'rgba(255,255,255,0.07)'}}></div>
              <span style={{fontSize:11,color:'rgba(245,244,240,0.3)'}}>o</span>
              <div style={{flex:1,height:'0.5px',background:'rgba(255,255,255,0.07)'}}></div>
            </div>

            {/* CAMBIO MODO */}
            <div style={{textAlign:'center',fontSize:13,color:'rgba(245,244,240,0.45)'}}>
              {modo==='login'?(
                <>¿No tienes cuenta? <span onClick={()=>{setModo('registro');setPaso(1);}} style={{color:'#a29bfe',cursor:'pointer',fontWeight:500}}>Regístrate gratis</span></>
              ):(
                <>¿Ya tienes cuenta? <span onClick={()=>{setModo('login');setPaso(1);}} style={{color:'#a29bfe',cursor:'pointer',fontWeight:500}}>Inicia sesión</span></>
              )}
            </div>
          </div>

          <div style={{textAlign:'center',marginTop:16,fontSize:11,color:'rgba(245,244,240,0.3)'}}>
            Al registrarte aceptas los <span style={{color:'rgba(245,244,240,0.5)',cursor:'pointer'}}>Términos de uso</span> y la <span style={{color:'rgba(245,244,240,0.5)',cursor:'pointer'}}>Política de privacidad</span>
          </div>
        </div>
      </div>
    </div>
  );
}
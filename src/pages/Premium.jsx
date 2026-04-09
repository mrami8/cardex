import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Premium() {
  const navigate = useNavigate();
  const [plan, setPlan] = useState('mensual');
  const [cargando, setCargando] = useState(false);

  const handleSuscribir = () => {
    setCargando(true);
    setTimeout(()=>{
      setCargando(false);
      navigate('/ia-mazos');
    },1500);
  };

  return (
    <div style={{background:'#0a0a0f',minHeight:'100vh',color:'#f5f4f0',fontFamily:'DM Sans, sans-serif'}}>
      <div style={{padding:'14px 24px',borderBottom:'0.5px solid rgba(255,255,255,0.07)',background:'rgba(10,10,15,0.92)',position:'sticky',top:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,cursor:'pointer'}} onClick={()=>navigate('/')}>
          <div style={{width:28,height:28,background:'#6c5ce7',borderRadius:7,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,color:'white'}}>C</div>
          <span style={{fontSize:16,fontWeight:700,letterSpacing:'-0.5px'}}>Cardex</span>
        </div>
        <button onClick={()=>navigate('/torneos')} style={{padding:'6px 14px',background:'transparent',color:'rgba(245,244,240,0.45)',border:'0.5px solid rgba(255,255,255,0.1)',borderRadius:8,cursor:'pointer',fontSize:13}}>Ver torneos</button>
      </div>

      <div style={{maxWidth:860,margin:'0 auto',padding:'48px 20px'}}>

        {/* HEADER */}
        <div style={{textAlign:'center',marginBottom:40}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(108,92,231,0.15)',border:'0.5px solid rgba(108,92,231,0.3)',borderRadius:20,padding:'6px 14px',fontSize:12,color:'#a29bfe',marginBottom:16,fontWeight:600}}>
            ✦ Cardex Premium
          </div>
          <h1 style={{fontSize:36,fontWeight:800,letterSpacing:'-1px',marginBottom:12}}>Lleva tu juego al siguiente nivel</h1>
          <p style={{fontSize:16,color:'rgba(245,244,240,0.45)',maxWidth:480,margin:'0 auto',lineHeight:1.7}}>Accede a la IA para optimizar tus mazos, estadísticas avanzadas y mucho más.</p>
        </div>

        {/* TOGGLE MENSUAL/ANUAL */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:12,marginBottom:32}}>
          <span style={{fontSize:13,color:plan==='mensual'?'white':'rgba(245,244,240,0.45)',fontWeight:plan==='mensual'?500:400}}>Mensual</span>
          <div onClick={()=>setPlan(p=>p==='mensual'?'anual':'mensual')} style={{width:44,height:24,background:plan==='anual'?'#6c5ce7':'rgba(255,255,255,0.1)',borderRadius:12,cursor:'pointer',position:'relative',transition:'background 0.2s'}}>
            <div style={{position:'absolute',top:3,left:plan==='anual'?22:3,width:18,height:18,background:'white',borderRadius:'50%',transition:'left 0.2s'}}></div>
          </div>
          <span style={{fontSize:13,color:plan==='anual'?'white':'rgba(245,244,240,0.45)',fontWeight:plan==='anual'?500:400}}>
            Anual <span style={{fontSize:11,padding:'2px 7px',background:'rgba(0,184,148,0.15)',color:'#00b894',borderRadius:6,marginLeft:4}}>-27%</span>
          </span>
        </div>

        {/* PLANES */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16,marginBottom:40}}>

          {/* FREE */}
          <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:14,padding:24}}>
            <div style={{fontSize:12,color:'rgba(245,244,240,0.45)',fontWeight:600,letterSpacing:1,marginBottom:8,textTransform:'uppercase'}}>Gratis</div>
            <div style={{fontSize:32,fontWeight:800,marginBottom:4}}>€0<span style={{fontSize:14,fontWeight:400,color:'rgba(245,244,240,0.45)'}}>/mes</span></div>
            <div style={{fontSize:12,color:'rgba(245,244,240,0.45)',marginBottom:20}}>Para siempre</div>
            <div style={{height:'0.5px',background:'rgba(255,255,255,0.07)',marginBottom:16}}></div>
            <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:24}}>
              {[
                {ok:true,text:'Explorar torneos'},
                {ok:true,text:'Inscribirse a eventos'},
                {ok:true,text:'Perfil básico'},
                {ok:true,text:'ELO y rankings'},
                {ok:false,text:'IA para optimizar mazos'},
                {ok:false,text:'Estadísticas avanzadas'},
                {ok:false,text:'Sin anuncios'},
              ].map((f,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:8,fontSize:13}}>
                  <span style={{color:f.ok?'#00b894':'rgba(245,244,240,0.2)',flexShrink:0}}>{f.ok?'✓':'✗'}</span>
                  <span style={{color:f.ok?'rgba(245,244,240,0.7)':'rgba(245,244,240,0.3)'}}>{f.text}</span>
                </div>
              ))}
            </div>
            <button onClick={()=>navigate('/registro')} style={{width:'100%',padding:'11px',background:'transparent',color:'rgba(245,244,240,0.6)',border:'0.5px solid rgba(255,255,255,0.1)',borderRadius:9,fontSize:13,cursor:'pointer'}}>
              Crear cuenta gratis
            </button>
          </div>

          {/* PREMIUM */}
          <div style={{background:'rgba(108,92,231,0.08)',border:'2px solid #6c5ce7',borderRadius:14,padding:24,position:'relative'}}>
            <div style={{position:'absolute',top:-12,left:'50%',transform:'translateX(-50%)',background:'#6c5ce7',color:'white',fontSize:11,fontWeight:600,padding:'4px 14px',borderRadius:10,whiteSpace:'nowrap'}}>MÁS POPULAR</div>
            <div style={{fontSize:12,color:'#a29bfe',fontWeight:600,letterSpacing:1,marginBottom:8,textTransform:'uppercase'}}>Premium ✦</div>
            <div style={{fontSize:32,fontWeight:800,marginBottom:4,color:'#a29bfe'}}>
              {plan==='mensual'?'€8.99':'€7.99'}<span style={{fontSize:14,fontWeight:400,color:'rgba(245,244,240,0.45)'}}>/mes</span>
            </div>
            <div style={{fontSize:12,color:'rgba(245,244,240,0.45)',marginBottom:20}}>
              {plan==='anual'?'€95.88/año — ahorras €12':'Cancela cuando quieras'}
            </div>
            <div style={{height:'0.5px',background:'rgba(108,92,231,0.3)',marginBottom:16}}></div>
            <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:24}}>
              {[
                'Todo lo del plan gratis',
                'IA para optimizar mazos',
                'Análisis por budget y nivel',
                'Estadísticas avanzadas',
                'Historial completo de mazos',
                'Sin anuncios',
                'Soporte prioritario',
              ].map((f,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:8,fontSize:13}}>
                  <span style={{color:'#a29bfe',flexShrink:0}}>✓</span>
                  <span style={{color:'rgba(245,244,240,0.8)'}}>{f}</span>
                </div>
              ))}
            </div>
            <button onClick={handleSuscribir} disabled={cargando} style={{width:'100%',padding:'12px',background:cargando?'rgba(108,92,231,0.5)':'#6c5ce7',color:'white',border:'none',borderRadius:9,fontSize:14,cursor:cargando?'not-allowed':'pointer',fontWeight:500,transition:'background 0.2s'}}>
              {cargando ? 'Procesando...' : 'Suscribirse ' + (plan === 'mensual' ? 'por €8.99/mes' : 'por €7.99/mes')}
            </button>
            <div style={{fontSize:11,color:'rgba(245,244,240,0.35)',textAlign:'center',marginTop:8}}>Sin permanencia · Cancela cuando quieras</div>
          </div>

          {/* TIENDA PRO */}
          <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:14,padding:24}}>
            <div style={{fontSize:12,color:'rgba(245,244,240,0.45)',fontWeight:600,letterSpacing:1,marginBottom:8,textTransform:'uppercase'}}>Tienda Pro</div>
            <div style={{fontSize:32,fontWeight:800,marginBottom:4}}>€29<span style={{fontSize:14,fontWeight:400,color:'rgba(245,244,240,0.45)'}}>/mes</span></div>
            <div style={{fontSize:12,color:'rgba(245,244,240,0.45)',marginBottom:20}}>Para organizadores</div>
            <div style={{height:'0.5px',background:'rgba(255,255,255,0.07)',marginBottom:16}}></div>
            <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:24}}>
              {[
                'Torneos ilimitados',
                'Gestión de inscripciones',
                'Brackets automáticos',
                'Distribución de mesas IA',
                'Dashboard con métricas',
                'Perfil público de tienda',
                'Soporte en español',
              ].map((f,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:8,fontSize:13}}>
                  <span style={{color:'#00b894',flexShrink:0}}>✓</span>
                  <span style={{color:'rgba(245,244,240,0.7)'}}>{f}</span>
                </div>
              ))}
            </div>
            <button onClick={()=>navigate('/registro')} style={{width:'100%',padding:'11px',background:'transparent',color:'white',border:'0.5px solid rgba(255,255,255,0.2)',borderRadius:9,fontSize:13,cursor:'pointer',fontWeight:500}}>
              Empezar piloto gratis →
            </button>
            <div style={{fontSize:11,color:'rgba(245,244,240,0.35)',textAlign:'center',marginTop:8}}>3 meses gratis para las primeras 20 tiendas</div>
          </div>
        </div>

        {/* FAQ */}
        <div style={{maxWidth:580,margin:'0 auto'}}>
          <h2 style={{fontSize:18,fontWeight:700,marginBottom:20,textAlign:'center'}}>Preguntas frecuentes</h2>
          {[
            {q:'¿Puedo cancelar cuando quiera?',a:'Sí, sin permanencia ni penalizaciones. Cancelas desde tu perfil en cualquier momento.'},
            {q:'¿Cómo funciona la IA de mazos?',a:'Analizas tu decklist y la IA te da una puntuación, fortalezas, debilidades y cambios concretos adaptados a tu budget y nivel.'},
            {q:'¿Hay diferencia entre mensual y anual?',a:'El precio anual equivale a €7.99/mes — ahorras €12 al año. El contenido es idéntico.'},
            {q:'¿La tienda Pro incluye el Premium de jugador?',a:'No, son planes separados. Tienda Pro es para organizar torneos, Premium es para jugadores que quieren la IA de mazos.'},
          ].map((f,i)=>(
            <div key={i} style={{padding:'16px 0',borderBottom:'0.5px solid rgba(255,255,255,0.07)'}}>
              <div style={{fontSize:14,fontWeight:500,marginBottom:6}}>{f.q}</div>
              <div style={{fontSize:13,color:'rgba(245,244,240,0.5)',lineHeight:1.7}}>{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
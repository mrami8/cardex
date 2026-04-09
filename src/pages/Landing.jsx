import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{background:'#0a0a0f',minHeight:'100vh',color:'#f5f4f0',fontFamily:'DM Sans, sans-serif'}}>
      
      {/* NAV */}
      <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 40px',borderBottom:'0.5px solid rgba(255,255,255,0.07)',background:'rgba(10,10,15,0.92)',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:30,height:30,background:'#6c5ce7',borderRadius:7,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:14,color:'white'}}>C</div>
          <span style={{fontSize:17,fontWeight:700,letterSpacing:'-0.5px'}}>Cardex</span>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button onClick={()=>navigate('/torneos')} style={{padding:'7px 14px',background:'transparent',color:'rgba(245,244,240,0.45)',border:'none',borderRadius:8,cursor:'pointer',fontSize:13}}>Torneos</button>
          <button onClick={()=>navigate('/decklists')} style={{padding:'7px 14px',background:'transparent',color:'rgba(245,244,240,0.45)',border:'none',borderRadius:8,cursor:'pointer',fontSize:13}}>Decklists</button>
          <button onClick={()=>navigate('/jugadores')} style={{padding:'7px 14px',background:'transparent',color:'rgba(245,244,240,0.45)',border:'none',borderRadius:8,cursor:'pointer',fontSize:13}}>Jugadores</button>
          <button onClick={()=>navigate('/panel')} style={{padding:'7px 16px',background:'#6c5ce7',color:'white',border:'none',borderRadius:8,cursor:'pointer',fontSize:13,fontWeight:500}}>Panel tienda</button>
          <button onClick={()=>navigate('/login')} style={{padding:'7px 14px',background:'transparent',color:'rgba(245,244,240,0.45)',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:8,cursor:'pointer',fontSize:13}}>Iniciar sesión</button>
          <button onClick={()=>navigate('/ia-mazos')} style={{padding:'7px 14px',background:'transparent',color:'rgba(245,244,240,0.45)',border:'none',borderRadius:8,cursor:'pointer',fontSize:13}}>IA Mazos ✦</button>
          </div>
      </nav>

      {/* HERO */}
      <section style={{minHeight:'88vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'60px 20px'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(108,92,231,0.15)',border:'0.5px solid rgba(108,92,231,0.4)',borderRadius:20,padding:'6px 14px',fontSize:12,color:'#a29bfe',marginBottom:24,fontWeight:600}}>
          <span style={{width:6,height:6,borderRadius:'50%',background:'#00b894',display:'inline-block'}}></span>
          Piloto cerrado · España &amp; Portugal
        </div>
        <h1 style={{fontSize:'clamp(34px,7vw,68px)',fontWeight:800,lineHeight:1.06,letterSpacing:'-2px',marginBottom:20,maxWidth:720}}>
          La plataforma TCG que <em style={{fontStyle:'normal',color:'#a29bfe'}}>Europa merecía</em>
        </h1>
        <p style={{fontSize:17,color:'rgba(245,244,240,0.45)',maxWidth:480,margin:'0 auto 36px',fontWeight:300,lineHeight:1.7}}>
          Gestiona torneos, encuentra eventos cerca y compite con jugadores de toda Iberia. En español. Desde el primer día.
        </p>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:40}}>
          <button onClick={()=>document.getElementById('cta').scrollIntoView({behavior:'smooth'})} style={{padding:'13px 28px',background:'#6c5ce7',color:'white',border:'none',borderRadius:10,fontSize:15,fontWeight:500,cursor:'pointer'}}>
            Quiero el acceso piloto
          </button>
          <button onClick={()=>navigate('/panel')} style={{padding:'13px 28px',background:'rgba(255,255,255,0.06)',color:'white',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:10,fontSize:15,cursor:'pointer'}}>
            Soy organizador →
          </button>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:16,color:'rgba(245,244,240,0.45)',fontSize:12,flexWrap:'wrap',justifyContent:'center'}}>
          <span><strong style={{color:'white'}}>100%</strong> en español</span>
          <span style={{width:1,height:14,background:'rgba(255,255,255,0.07)'}}></span>
          <span>Piloto gratuito</span>
          <span style={{width:1,height:14,background:'rgba(255,255,255,0.07)'}}></span>
          <span>España &amp; Portugal</span>
        </div>
      </section>

      {/* PROBLEMAS */}
      <section style={{padding:'60px 40px',maxWidth:900,margin:'0 auto'}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:2,color:'#a29bfe',marginBottom:14,textTransform:'uppercase'}}>El problema</div>
        <h2 style={{fontSize:'clamp(26px,5vw,40px)',fontWeight:800,letterSpacing:'-1px',marginBottom:14}}>Organizar torneos en España sigue siendo un caos</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:12,marginTop:32}}>
          {[
            {icon:'📋',title:'Inscripciones por WhatsApp',desc:'Sin confirmaciones ni cobro automático.'},
            {icon:'🌐',title:'Solo en inglés',desc:'TopDeck, Challonge. Ninguna piensa en España.'},
            {icon:'📊',title:'Sin rankings locales',desc:'No hay ELO fiable ni historial de partidas.'},
            {icon:'📍',title:'Torneos invisibles',desc:'La info está dispersa en Facebook y Discord.'},
          ].map((p,i)=>(
            <div key={i} style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:16,display:'flex',gap:12}}>
              <div style={{fontSize:20,flexShrink:0}}>{p.icon}</div>
              <div>
                <div style={{fontSize:13,fontWeight:500,marginBottom:4}}>{p.title}</div>
                <div style={{fontSize:12,color:'rgba(245,244,240,0.45)',lineHeight:1.6}}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PARA TIENDAS */}
      <section style={{padding:'60px 40px',background:'#13121a',borderTop:'0.5px solid rgba(255,255,255,0.07)',borderBottom:'0.5px solid rgba(255,255,255,0.07)'}}>
        <div style={{maxWidth:900,margin:'0 auto'}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:2,color:'#a29bfe',marginBottom:14,textTransform:'uppercase'}}>Para tiendas y organizadores</div>
          <h2 style={{fontSize:'clamp(22px,4vw,36px)',fontWeight:800,letterSpacing:'-1px',marginBottom:32}}>Tu torneo, gestionado en minutos</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:12}}>
            {[
              {icon:'💳',title:'Cobro integrado',desc:'Stripe, Bizum y MB Way. El dinero llega solo.'},
              {icon:'⚡',title:'Brackets automáticos',desc:'Swiss, eliminatoria, Round Robin. Sin esfuerzo.'},
              {icon:'🗺️',title:'En el mapa de Cardex',desc:'Jugadores de toda España descubren tus eventos.'},
              {icon:'📊',title:'Dashboard métricas',desc:'Asistencia, juegos más populares, ingresos.'},
              {icon:'🤖',title:'Distribución de mesas',desc:'La IA distribuye jugadores por mesas automáticamente.'},
              {icon:'🇪🇸',title:'Soporte en español',desc:'Una persona real que entiende el mundo TCG.'},
            ].map((f,i)=>(
              <div key={i} style={{background:'#0a0a0f',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:16}}>
                <div style={{fontSize:22,marginBottom:10}}>{f.icon}</div>
                <div style={{fontSize:13,fontWeight:500,marginBottom:4}}>{f.title}</div>
                <div style={{fontSize:12,color:'rgba(245,244,240,0.45)',lineHeight:1.6}}>{f.desc}</div>
              </div>
            ))}
          </div>
          <button onClick={()=>navigate('/panel')} style={{marginTop:28,padding:'13px 28px',background:'#6c5ce7',color:'white',border:'none',borderRadius:10,fontSize:14,fontWeight:500,cursor:'pointer'}}>
            Ver el panel de gestión →
          </button>
        </div>
      </section>

      {/* PARA JUGADORES */}
      <section style={{padding:'60px 40px',maxWidth:900,margin:'0 auto'}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:2,color:'#a29bfe',marginBottom:14,textTransform:'uppercase'}}>Para jugadores</div>
        <h2 style={{fontSize:'clamp(22px,4vw,36px)',fontWeight:800,letterSpacing:'-1px',marginBottom:32}}>Encuentra tu torneo. Compite. Sube en el ranking.</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:12}}>
          {[
            {icon:'🗺️',title:'Torneos cerca de ti',desc:'Por juego, formato y distancia.'},
            {icon:'📈',title:'Tu ranking ELO',desc:'Historial, win rate y posición local.'},
            {icon:'⚡',title:'Inscríbete en segundos',desc:'Un clic, pago integrado, confirmación automática.'},
            {icon:'🏆',title:'Meta reports',desc:'Qué mazos ganan en España. Datos reales.'},
            {icon:'🃏',title:'Decklists',desc:'Sube tu mazo, compártelo y descubre los mejores.'},
            {icon:'🤖',title:'IA para mazos',desc:'Optimiza tu deck con inteligencia artificial. Premium.'},
          ].map((f,i)=>(
            <div key={i} style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:16}}>
              <div style={{fontSize:22,marginBottom:10}}>{f.icon}</div>
              <div style={{fontSize:13,fontWeight:500,marginBottom:4}}>{f.title}</div>
              <div style={{fontSize:12,color:'rgba(245,244,240,0.45)',lineHeight:1.6}}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="cta" style={{padding:'80px 40px',textAlign:'center',borderTop:'0.5px solid rgba(255,255,255,0.07)'}}>
        <h2 style={{fontSize:'clamp(28px,6vw,52px)',fontWeight:800,letterSpacing:'-1.5px',marginBottom:14}}>¿Organizas torneos?<br/>Únete al piloto.</h2>
        <p style={{fontSize:15,color:'rgba(245,244,240,0.45)',marginBottom:32,fontWeight:300}}>Las primeras 20 tiendas tienen acceso gratuito.<br/>Sin tarjeta. Sin compromiso.</p>
        <div style={{display:'flex',gap:8,maxWidth:420,margin:'0 auto',flexWrap:'wrap'}}>
          <input type="email" placeholder="tu@tienda.es" style={{flex:1,minWidth:180,padding:'13px 16px',background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:10,color:'white',fontSize:14,outline:'none'}} />
          <button style={{padding:'13px 20px',background:'#6c5ce7',color:'white',border:'none',borderRadius:10,fontSize:14,fontWeight:500,cursor:'pointer'}}>Quiero acceso</button>
        </div>
        <p style={{fontSize:12,color:'rgba(245,244,240,0.45)',marginTop:10}}>Te contactamos en menos de 24h.</p>
      </section>

      <footer style={{padding:'24px 40px',borderTop:'0.5px solid rgba(255,255,255,0.07)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:22,height:22,background:'#6c5ce7',borderRadius:5,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:800,color:'white'}}>C</div>
          <span style={{fontSize:12,color:'rgba(245,244,240,0.45)'}}>© 2025 Cardex · España &amp; Portugal</span>
        </div>
        <div style={{display:'flex',gap:16}}>
          <span style={{fontSize:12,color:'rgba(245,244,240,0.45)',cursor:'pointer'}}>Privacidad</span>
          <span style={{fontSize:12,color:'rgba(245,244,240,0.45)',cursor:'pointer'}}>Contacto</span>
        </div>
      </footer>
    </div>
  );
}
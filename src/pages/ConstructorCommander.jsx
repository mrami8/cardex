import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ConstructorCommander() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');
  const [sugerencias, setSugerencias] = useState([]);
  const [comandante, setComandante] = useState(null);
  const [cargandoCarta, setCargandoCarta] = useState(false);
  const [cargandoIA, setCargandoIA] = useState(false);
  const [enfoques, setEnfoques] = useState(null);
  const [enfoqueSeleccionado, setEnfoqueSeleccionado] = useState(null);
  const [mazoIA, setMazoIA] = useState(null);
  const [budget, setBudget] = useState('100');
  const [nivel, setNivel] = useState('Casual');
  const [preciosReales, setPreciosReales] = useState(null);
  const [cargandoPrecios, setCargandoPrecios] = useState(false);

  useEffect(() => {
    if(busqueda.length < 2){setSugerencias([]);return;}
    const timer = setTimeout(async () => {
      try {
        const res = await fetch('https://api.scryfall.com/cards/autocomplete?q='+encodeURIComponent(busqueda)+'&include_extras=false');
        const data = await res.json();
        setSugerencias(data.data || []);
      } catch(e){ setSugerencias([]); }
    }, 300);
    return () => clearTimeout(timer);
  }, [busqueda]);

  const buscarComandante = async (nombre) => {
    setCargandoCarta(true);
    setBusqueda(nombre);
    setSugerencias([]);
    setEnfoques(null);
    setEnfoqueSeleccionado(null);
    setMazoIA(null);
    setPreciosReales(null);
    try {
      const res = await fetch('https://api.scryfall.com/cards/named?fuzzy='+encodeURIComponent(nombre));
      const data = await res.json();
      if(data.object === 'error'){ alert('Carta no encontrada.'); setCargandoCarta(false); return; }
      setComandante(data);
    } catch(e){ alert('Error buscando la carta.'); }
    setCargandoCarta(false);
  };

  const callClaude = async (content, maxTokens=1500) => {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: maxTokens, messages: [{ role: 'user', content }] })
    });
    const d = await r.json();
    return JSON.parse(d.content[0].text.replace(/```json\n?/g,'').replace(/```\n?/g,'').trim());
  };

  const verificarPrecios = async (categorias) => {
    setCargandoPrecios(true);
    try {
      const todas = [...new Set(categorias.flatMap(c => c.cartas))];
      const chunks = [];
      for(let i=0;i<todas.length;i+=75) chunks.push(todas.slice(i,i+75));
      let respuestas = [];
      for(const chunk of chunks){
        const res = await fetch('https://api.scryfall.com/cards/collection',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({identifiers:chunk.map(name=>({name}))})});
        const data = await res.json();
        if(data.data) respuestas = [...respuestas,...data.data];
        await new Promise(r=>setTimeout(r,100));
      }
      const precios = {};
      let total = 0;
      respuestas.forEach(carta => {
        const p = parseFloat(carta.prices?.eur || carta.prices?.eur_foil || 0);
        precios[carta.name] = p;
        total += p;
      });
      setPreciosReales({precios, total: total.toFixed(2)});
    } catch(e){ console.error(e); }
    setCargandoPrecios(false);
  };

  const generarEnfoques = async () => {
    if(!comandante) return;
    setCargandoIA(true);
    setEnfoques(null);
    setEnfoqueSeleccionado(null);
    setMazoIA(null);
    setPreciosReales(null);
    try {
      const oracle = comandante.oracle_text || comandante.card_faces?.[0]?.oracle_text || '';
      const colores = comandante.color_identity?.join('') || '';
      const prompt = 'Eres experto en Commander/EDH. Genera 3 enfoques distintos para: Comandante: '+comandante.name+', Colores: '+colores+', Texto: '+oracle+', Budget: €'+budget+', Nivel: '+nivel+'. IMPORTANTE: identidad de color ESTRICTAMENTE '+colores+', cartas clave max €'+Math.round(Number(budget)*0.15)+' c/u. JSON: {"enfoques":[{"nombre":"x","descripcion":"x","estilo":"Aggro/Control/Combo/Midrange","dificultad":"Principiante/Intermedio/Avanzado","precio_estimado":"€x-y","cartas_clave":["a","b","c","d","e"],"ventaja":"x","desventaja":"x"}]}';
      const json = await callClaude(prompt);
      setEnfoques(json.enfoques);
    } catch(e){ alert('Error generando enfoques.'); }
    setCargandoIA(false);
  };

  const generarMazo = async (enfoque) => {
    setEnfoqueSeleccionado(enfoque);
    setCargandoIA(true);
    setMazoIA(null);
    setPreciosReales(null);
    try {
      const colores = comandante.color_identity?.join(', ') || '';
      const prompt = 'Genera 99 cartas Commander para: '+comandante.name+', Colores: '+colores+', Enfoque: '+enfoque.nombre+' - '+enfoque.descripcion+', Budget: €'+budget+', Nivel: '+nivel+'. REGLAS: solo colores '+colores+' o incoloras, legal Commander, sin el comandante, precio total max €'+budget+', max €'+Math.round(Number(budget)/10)+' por carta individual, sin Necropotence/Demonic Tutor/Mana Crypt si superan budget. JSON: {"categorias":[{"nombre":"Aceleración de maná","cartas":["Sol Ring","Arcane Signet"]},{"nombre":"Sinergia con el comandante","cartas":["a","b"]},{"nombre":"Remoción y control","cartas":["a"]},{"nombre":"Robo de cartas","cartas":["a"]},{"nombre":"Win conditions","cartas":["a"]},{"nombre":"Tierras","cartas":["Command Tower","Plains","Plains","Swamp"]}],"precio_total":"€xx","consejo":"x"}'+'. NUNCA incluyas cartas fuera de la identidad de color '+colores+'. Propaganda es azul ilegal sin U. Rhystic Study es azul ilegal sin U. Comprueba el color de identidad de cada carta antes de incluirla.' +'. REGLA FUNDAMENTAL Commander: NO puedes repetir ninguna carta excepto tierras básicas (Plains, Island, Swamp, Mountain, Forest, Wastes). Cada carta no básica debe aparecer exactamente 1 vez en el mazo. Esto es una regla absoluta del formato.';
      const json = await callClaude(prompt, 2000);
      setMazoIA(json);
      await verificarPrecios(json.categorias);
    } catch(e){ alert('Error generando el mazo.'); }
    setCargandoIA(false);
  };

  const ajustarAlBudget = async () => {
    if(!preciosReales) return;
    setCargandoIA(true);
    try {
      const cartasCaras = Object.entries(preciosReales.precios)
        .filter(([,p]) => p > parseFloat(budget) * 0.1)
        .map(([c,p]) => c + ': €' + p.toFixed(2))
        .join(', ');
      const maxPorCarta = Math.round(parseFloat(budget) * 0.05);
      const colores = comandante.color_identity?.join(', ') || '';
      const prompt = 'Sustituye estas cartas caras por alternativas económicas de max €'+maxPorCarta+' cada una, misma función, identidad de color '+colores+', legales en Commander. REGLAS ABSOLUTAS: 1) Solo colores '+colores+' o incoloras. 2) NO repitas ninguna carta que ya esté en el mazo. 3) Cada carta no básica aparece exactamente 1 vez. 4) Las cartas de sustitución deben ser DISTINTAS entre sí y distintas de todas las cartas del mazo actual. Mazo actual: '+mazoIA.categorias.flatMap(c=>c.cartas).join(', ')+'. Cartas a sustituir: '+cartasCaras+'. JSON: {"sustituciones":[{"quitar":"carta cara","poner":"alternativa barata","razon":"motivo"}]}';const json = await callClaude(prompt, 2000);
      const nuevoMazo = {
        ...mazoIA,
        categorias: mazoIA.categorias.map(cat => ({
          ...cat,
          cartas: cat.cartas.map(c => {
            const s = json.sustituciones.find(s => s.quitar === c);
            return s ? s.poner : c;
          })
        }))
      };
      setMazoIA(nuevoMazo);
      setPreciosReales(null);
      await verificarPrecios(nuevoMazo.categorias);
    } catch(e){ alert('Error ajustando el budget.'); }
    setCargandoIA(false);
  };

  const coloresMap = {W:'⬜',U:'🔵',B:'⚫',R:'🔴',G:'🟢'};
  const superaBudget = preciosReales && parseFloat(preciosReales.total) > parseFloat(budget);

  const agrupar = (cartas) => {
    const conteo = {};
    cartas.forEach(c => conteo[c] = (conteo[c]||0) + 1);
    return Object.entries(conteo).map(([c,n]) => n+' '+c).join('\n');
  };

  return (
    <div style={{background:'#0a0a0f',minHeight:'100vh',color:'#f5f4f0',fontFamily:'DM Sans, sans-serif'}}>
      <div style={{padding:'14px 24px',borderBottom:'0.5px solid rgba(255,255,255,0.07)',background:'rgba(10,10,15,0.92)',position:'sticky',top:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,cursor:'pointer'}} onClick={()=>navigate('/')}>
          <div style={{width:28,height:28,background:'#6c5ce7',borderRadius:7,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,color:'white'}}>C</div>
          <span style={{fontSize:16,fontWeight:700}}>Cardex</span>
        </div>
        <span style={{fontSize:11,padding:'3px 10px',background:'rgba(108,92,231,0.15)',color:'#a29bfe',borderRadius:10,fontWeight:600}}>✦ Premium</span>
      </div>

      <div style={{maxWidth:1000,margin:'0 auto',padding:'28px 20px'}}>
        <div style={{marginBottom:24}}>
          <h1 style={{fontSize:22,fontWeight:800,marginBottom:6}}>Constructor de mazos Commander</h1>
          <p style={{fontSize:13,color:'rgba(245,244,240,0.45)'}}>Busca tu comandante y la IA genera el mazo completo adaptado a tu budget.</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20}}>
          <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:16}}>
            <div style={{fontSize:11,fontWeight:600,color:'rgba(245,244,240,0.45)',marginBottom:10,letterSpacing:0.5}}>CONFIGURACIÓN</div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              <div>
                <label style={{fontSize:11,color:'rgba(245,244,240,0.45)',display:'block',marginBottom:5}}>Budget máximo (€)</label>
                <input type="number" value={budget} onChange={e=>setBudget(e.target.value)} style={{width:'100%',padding:'9px 12px',background:'#1e1c2a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:7,color:'white',fontSize:13,outline:'none'}} />
              </div>
              <div>
                <label style={{fontSize:11,color:'rgba(245,244,240,0.45)',display:'block',marginBottom:5}}>Nivel de juego</label>
                <select value={nivel} onChange={e=>setNivel(e.target.value)} style={{width:'100%',padding:'9px 12px',background:'#1e1c2a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:7,color:'white',fontSize:13,outline:'none'}}>
                  {['Casual','FNM / Local','Intermedio','Competitivo (cEDH)'].map(n=><option key={n}>{n}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:16}}>
            <div style={{fontSize:11,fontWeight:600,color:'rgba(245,244,240,0.45)',marginBottom:10,letterSpacing:0.5}}>BUSCA TU COMANDANTE</div>
            <div style={{position:'relative'}}>
              <input value={busqueda} onChange={e=>setBusqueda(e.target.value)} placeholder="Ej: Atraxa, Praetors' Voice..." style={{width:'100%',padding:'9px 12px',background:'#1e1c2a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:7,color:'white',fontSize:13,outline:'none'}} />
              {sugerencias.length>0 && (
                <div style={{position:'absolute',top:'110%',left:0,right:0,background:'#1e1c2a',border:'0.5px solid rgba(255,255,255,0.15)',borderRadius:8,zIndex:50,overflow:'hidden'}}>
                  {sugerencias.slice(0,8).map((s,i)=>(
                    <div key={i} onClick={()=>buscarComandante(s)} style={{padding:'9px 12px',cursor:'pointer',fontSize:13,borderBottom:i<7?'0.5px solid rgba(255,255,255,0.07)':'none'}}
                      onMouseEnter={e=>e.currentTarget.style.background='rgba(108,92,231,0.1)'}
                      onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cargandoCarta && <div style={{fontSize:12,color:'rgba(245,244,240,0.45)',marginTop:8}}>Buscando carta...</div>}
          </div>
        </div>

        {comandante && (
          <div style={{background:'#13121a',border:'0.5px solid rgba(108,92,231,0.3)',borderRadius:14,padding:20,marginBottom:20}}>
            <div style={{display:'grid',gridTemplateColumns:'auto 1fr auto',gap:20,alignItems:'start'}}>
              {(comandante.image_uris?.normal||comandante.card_faces?.[0]?.image_uris?.normal) && (
                <img src={comandante.image_uris?.normal||comandante.card_faces?.[0]?.image_uris?.normal} alt={comandante.name} style={{width:130,borderRadius:10}} />
              )}
              <div>
                <h2 style={{fontSize:18,fontWeight:700,marginBottom:4}}>{comandante.name}</h2>
                <div style={{fontSize:12,color:'rgba(245,244,240,0.45)',marginBottom:8}}>{comandante.type_line}</div>
                <div style={{display:'flex',gap:6,marginBottom:10}}>
                  {(comandante.color_identity||[]).map(c=><span key={c} style={{fontSize:16}}>{coloresMap[c]||c}</span>)}
                  {comandante.mana_cost && <span style={{fontSize:12,color:'rgba(245,244,240,0.45)',marginLeft:4}}>{comandante.mana_cost}</span>}
                </div>
                <div style={{fontSize:12,color:'rgba(245,244,240,0.6)',lineHeight:1.7,maxWidth:500}}>{comandante.oracle_text||comandante.card_faces?.[0]?.oracle_text}</div>
                {comandante.power && <div style={{fontSize:11,color:'rgba(245,244,240,0.45)',marginTop:6}}>P/T: {comandante.power}/{comandante.toughness}</div>}
              </div>
              <button onClick={generarEnfoques} disabled={cargandoIA} style={{padding:'11px 18px',background:cargandoIA?'rgba(108,92,231,0.4)':'#6c5ce7',color:'white',border:'none',borderRadius:10,fontSize:13,cursor:cargandoIA?'not-allowed':'pointer',fontWeight:500,whiteSpace:'nowrap'}}>
                {cargandoIA&&!enfoques?'Analizando...':'🤖 Generar enfoques'}
              </button>
            </div>
          </div>
        )}

        {enfoques && (
          <div style={{marginBottom:20}}>
            <div style={{fontSize:14,fontWeight:500,marginBottom:12}}>Elige un enfoque para tu mazo</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
              {enfoques.map((e,i)=>(
                <div key={i} onClick={()=>!cargandoIA&&generarMazo(e)}
                  style={{background:enfoqueSeleccionado?.nombre===e.nombre?'rgba(108,92,231,0.12)':'#13121a',border:enfoqueSeleccionado?.nombre===e.nombre?'2px solid #6c5ce7':'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:16,cursor:'pointer'}}
                  onMouseEnter={el=>el.currentTarget.style.borderColor='rgba(108,92,231,0.4)'}
                  onMouseLeave={el=>el.currentTarget.style.borderColor=enfoqueSeleccionado?.nombre===e.nombre?'#6c5ce7':'rgba(255,255,255,0.07)'}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                    <span style={{fontSize:11,padding:'2px 8px',background:'rgba(108,92,231,0.15)',color:'#a29bfe',borderRadius:6,fontWeight:600}}>{e.estilo}</span>
                    <span style={{fontSize:10,padding:'2px 7px',background:e.dificultad==='Principiante'?'rgba(0,184,148,0.15)':e.dificultad==='Intermedio'?'rgba(253,203,110,0.12)':'rgba(225,112,85,0.15)',color:e.dificultad==='Principiante'?'#00b894':e.dificultad==='Intermedio'?'#fdcb6e':'#e17055',borderRadius:6}}>{e.dificultad}</span>
                  </div>
                  <div style={{fontSize:14,fontWeight:600,marginBottom:6}}>{e.nombre}</div>
                  <div style={{fontSize:12,color:'rgba(245,244,240,0.5)',lineHeight:1.6,marginBottom:10}}>{e.descripcion}</div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:4,marginBottom:10}}>
                    {e.cartas_clave?.slice(0,4).map((c,ci)=>(
                      <span key={ci} style={{fontSize:10,padding:'2px 7px',background:'rgba(255,255,255,0.06)',borderRadius:5,color:'rgba(245,244,240,0.7)'}}>{c}</span>
                    ))}
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'rgba(245,244,240,0.45)',paddingTop:8,borderTop:'0.5px solid rgba(255,255,255,0.07)'}}>
                    <span>~{e.precio_estimado}</span>
                    <span style={{color:'#6c5ce7',fontWeight:500}}>Seleccionar →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {cargandoIA && enfoqueSeleccionado && !mazoIA && (
          <div style={{background:'#13121a',border:'0.5px solid rgba(108,92,231,0.2)',borderRadius:12,padding:32,textAlign:'center'}}>
            <div style={{fontSize:28,marginBottom:12}}>⚙️</div>
            <div style={{fontSize:14,fontWeight:500,color:'#a29bfe',marginBottom:6}}>Generando tu mazo de 99 cartas...</div>
            <div style={{fontSize:12,color:'rgba(245,244,240,0.45)'}}>La IA está seleccionando las mejores cartas para {enfoqueSeleccionado.nombre}</div>
          </div>
        )}

        {mazoIA && (
          <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:14,padding:20}}>
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16,gap:12}}>
              <div>
                <h3 style={{fontSize:16,fontWeight:700,marginBottom:8}}>{enfoqueSeleccionado.nombre} — {comandante.name}</h3>
                {cargandoPrecios && <div style={{fontSize:12,color:'#fdcb6e'}}>⏳ Verificando precios reales con Scryfall...</div>}
                {preciosReales && (
                  <div>
                    <div style={{fontSize:13,marginBottom:4}}>
                      Precio real (Scryfall): <strong style={{color:superaBudget?'#e17055':'#00b894'}}>€{preciosReales.total}</strong>
                      <span style={{fontSize:11,color:'rgba(245,244,240,0.35)',marginLeft:8}}>vs budget €{budget}</span>
                    </div>
                    {superaBudget && (
                      <div>
                        <div style={{fontSize:11,color:'#fdcb6e',marginBottom:8}}>⚠ El mazo supera tu budget — las cartas en rojo son las más caras</div>
                        <button onClick={ajustarAlBudget} disabled={cargandoIA} style={{padding:'8px 16px',background:'rgba(108,92,231,0.2)',color:'#a29bfe',border:'0.5px solid rgba(108,92,231,0.3)',borderRadius:8,fontSize:12,cursor:cargandoIA?'not-allowed':'pointer',fontWeight:500}}>
                          {cargandoIA?'Ajustando...':'⚡ Ajustar automáticamente al budget'}
                        </button>
                      </div>
                    )}
                    {!superaBudget && <div style={{fontSize:11,color:'#00b894'}}>✓ Dentro del budget</div>}
                  </div>
                )}
                <div style={{fontSize:11,color:'rgba(245,244,240,0.35)',marginTop:6}}>* Precios orientativos — pueden variar según edición</div>
              </div>
              <button onClick={()=>{
                const lista = '// Commander\n1 '+comandante.name+'\n\n'+mazoIA.categorias.map(c=>'// '+c.nombre+'\n'+agrupar(c.cartas)).join('\n\n');
                navigator.clipboard.writeText(lista);
                alert('Lista copiada — pégala en Moxfield o Archidekt');
              }} style={{padding:'9px 16px',background:'rgba(0,184,148,0.15)',color:'#00b894',border:'0.5px solid rgba(0,184,148,0.3)',borderRadius:8,fontSize:12,cursor:'pointer',fontWeight:500,whiteSpace:'nowrap',flexShrink:0}}>
                Copiar lista →
              </button>
            </div>

            {mazoIA.consejo && (
              <div style={{background:'rgba(108,92,231,0.08)',border:'0.5px solid rgba(108,92,231,0.2)',borderRadius:8,padding:12,marginBottom:16,fontSize:12,color:'rgba(245,244,240,0.7)',lineHeight:1.6}}>
                💡 <strong style={{color:'#a29bfe'}}>Consejo:</strong> {mazoIA.consejo}
              </div>
            )}

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              {mazoIA.categorias?.map((cat,i)=>(
                <div key={i} style={{background:'rgba(255,255,255,0.03)',borderRadius:10,padding:12}}>
                  <div style={{fontSize:11,fontWeight:600,color:'#a29bfe',marginBottom:8,letterSpacing:0.5}}>{cat.nombre.toUpperCase()} ({cat.cartas.length})</div>
                  {Object.entries(cat.cartas.reduce((acc,c)=>({...acc,[c]:(acc[c]||0)+1}),{})).map(([c,n],ci,arr)=>(
                    <div key={ci} style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:12,color:'rgba(245,244,240,0.7)',padding:'3px 0',borderBottom:ci<arr.length-1?'0.5px solid rgba(255,255,255,0.05)':'none'}}>
                      <span>{n} {c}</span>
                      {preciosReales?.precios[c]!==undefined && (
                        <span style={{fontSize:10,color:preciosReales.precios[c]>parseFloat(budget)*0.15?'#e17055':'rgba(245,244,240,0.35)',marginLeft:8,flexShrink:0}}>
                          €{(preciosReales.precios[c]*n).toFixed(2)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

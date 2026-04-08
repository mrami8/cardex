import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IAMazos() {
  const navigate = useNavigate();
  const [decklist, setDecklist] = useState('');
  const [juego, setJuego] = useState('Magic: The Gathering');
  const [formato, setFormato] = useState('Modern');
  const [objetivo, setObjetivo] = useState('Optimizar para torneos competitivos');
  const [analisis, setAnalisis] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [budget, setBudget] = useState('');
  const [nivel, setNivel] = useState('Competitivo');  

  const analizar = async () => {
    if(!decklist.trim()){alert('Añade tu decklist primero');return;}
    setCargando(true);
    setError('');
    setAnalisis(null);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.REACT_APP_ANTHROPIC_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1500,
          messages: [{
            role: 'user',
            content: `Eres un experto en TCG especializado en construcción de mazos competitivos.

Analiza esta decklist de ${juego} formato ${formato} con el objetivo: ${objetivo}
${budget ? `Budget máximo: €${budget}` : 'Sin límite de presupuesto'}
Nivel competitivo objetivo: ${nivel}

DECKLIST:
${decklist}

Responde ÚNICAMENTE en este formato JSON exacto, sin texto adicional:
{
  "resumen": "2-3 frases describiendo el mazo y su estrategia principal",
  "puntuacion": 75,
  "precio_estimado": "€150-200",
  "fortalezas": ["fortaleza 1", "fortaleza 2", "fortaleza 3"],
  "debilidades": ["debilidad 1", "debilidad 2", "debilidad 3"],
  "sugerencias": [
    {"carta_quitar": "Nombre carta", "cantidad_quitar": 2, "carta_añadir": "Carta sugerida", "cantidad_añadir": 2, "precio_aprox": "€5", "razon": "Explicación breve"},
    {"carta_quitar": "Otra carta", "cantidad_quitar": 1, "carta_añadir": "Sustituto", "cantidad_añadir": 1, "precio_aprox": "€2", "razon": "Razón"}
  ],
  "consejo_general": "Consejo estratégico clave teniendo en cuenta el budget y nivel competitivo"
}`
          }]
        })
      });

      const data = await response.json();
      if(data.error){throw new Error(data.error.message);}
      const texto = data.content[0].text;
      const limpio = texto.replace(/```json\n?/g,'').replace(/```\n?/g,'').trim();
      const json = JSON.parse(limpio);
      setAnalisis(json);
    } catch(e) {
      setError('Error al analizar el mazo. Comprueba tu API key y vuelve a intentarlo.');
      console.error(e);
    }
    setCargando(false);
  };

  const inputStyle = {background:'#1e1c2a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:7,padding:'9px 12px',color:'white',fontSize:13,fontFamily:'DM Sans, sans-serif',outline:'none',width:'100%'};

  return (
    <div style={{background:'#0a0a0f',minHeight:'100vh',color:'#f5f4f0',fontFamily:'DM Sans, sans-serif',padding:'24px'}}>
      <div style={{maxWidth:1000,margin:'0 auto'}}>
        <button onClick={()=>navigate('/')} style={{background:'transparent',color:'rgba(245,244,240,0.45)',border:'none',cursor:'pointer',fontSize:13,marginBottom:6,padding:0}}>← Inicio</button>
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:24,flexWrap:'wrap',gap:12}}>
          <div>
            <h1 style={{fontSize:22,fontWeight:700}}>IA para mazos</h1>
            <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(108,92,231,0.15)',border:'0.5px solid rgba(108,92,231,0.3)',borderRadius:20,padding:'4px 12px',fontSize:11,color:'#a29bfe',marginTop:6,fontWeight:600}}>
              ✦ Premium · €8.99/mes
            </div>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
          {/* INPUT */}
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:16}}>
              <div style={{fontSize:13,fontWeight:500,marginBottom:14}}>Tu decklist</div>
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                <div>
                  <label style={{fontSize:11,color:'rgba(245,244,240,0.45)',fontWeight:600,marginBottom:5,display:'block'}}>Juego</label>
                  <select style={inputStyle} value={juego} onChange={e=>setJuego(e.target.value)}>
                    {['Magic: The Gathering','Pokémon TCG','Yu-Gi-Oh!','One Piece TCG','Star Wars Unlimited'].map(g=><option key={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{fontSize:11,color:'rgba(245,244,240,0.45)',fontWeight:600,marginBottom:5,display:'block'}}>Formato</label>
                  <select style={inputStyle} value={formato} onChange={e=>setFormato(e.target.value)}>
                    {['Modern','Pioneer','Standard','Legacy','EDH / Commander','Draft','Pauper'].map(f=><option key={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{fontSize:11,color:'rgba(245,244,240,0.45)',fontWeight:600,marginBottom:5,display:'block'}}>Objetivo</label>
                  <select style={inputStyle} value={objetivo} onChange={e=>setObjetivo(e.target.value)}>
                    {['Optimizar para torneos competitivos','Reducir el coste del mazo','Mejorar la consistencia','Aumentar la velocidad del mazo','Mejorar el late game'].map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                    <label style={{fontSize:11,color:'rgba(245,244,240,0.45)',fontWeight:600,marginBottom:5,display:'block'}}>Budget máximo del mazo (€)</label>
                    <input style={inputStyle} type="number" placeholder="Ej: 200 (deja vacío si no hay límite)" value={budget} onChange={e=>setBudget(e.target.value)} />
                </div>
                <div>
                    <label style={{fontSize:11,color:'rgba(245,244,240,0.45)',fontWeight:600,marginBottom:5,display:'block'}}>Nivel competitivo</label>
                    <select style={inputStyle} value={nivel} onChange={e=>setNivel(e.target.value)}>
                        {['Casual','FNM / Local','Regional','Nacional','Pro Tour / Alta competición'].map(n=><option key={n}>{n}</option>)}
                    </select>
                </div>
                <div>
                  <label style={{fontSize:11,color:'rgba(245,244,240,0.45)',fontWeight:600,marginBottom:5,display:'block'}}>Lista de cartas</label>
                  <textarea
                    style={{...inputStyle,resize:'vertical',minHeight:220,fontFamily:'monospace',fontSize:12}}
                    placeholder={'4 Lightning Bolt\n4 Ragavan, Nimble Pilferer\n3 Dragon\'s Rage Channeler\n2 Murktide Regent\n4 Mishra\'s Bauble\n...\n\nSideboard:\n2 Surgical Extraction\n...'}
                    value={decklist}
                    onChange={e=>setDecklist(e.target.value)}
                  />
                </div>
                <button
                  onClick={analizar}
                  disabled={cargando}
                  style={{padding:'11px',background:cargando?'rgba(108,92,231,0.4)':'#6c5ce7',color:'white',border:'none',borderRadius:8,fontSize:14,cursor:cargando?'not-allowed':'pointer',fontWeight:500,transition:'background 0.2s'}}
                >
                  {cargando ? '🤖 Analizando tu mazo...' : '🤖 Analizar con IA'}
                </button>
                {error && <div style={{fontSize:12,color:'#e17055',background:'rgba(225,112,85,0.1)',borderRadius:8,padding:'10px 12px'}}>{error}</div>}
              </div>
            </div>
          </div>

          {/* OUTPUT */}
          <div>
            {!analisis && !cargando && (
              <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:40,textAlign:'center',color:'rgba(245,244,240,0.45)',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:12}}>
                <div style={{fontSize:40}}>🤖</div>
                <div style={{fontSize:14,fontWeight:500}}>Análisis IA de tu mazo</div>
                <div style={{fontSize:12,maxWidth:260,lineHeight:1.6}}>Pega tu decklist, selecciona el formato y objetivo, y la IA analizará tu mazo con recomendaciones específicas.</div>
              </div>
            )}
            {cargando && (
              <div style={{background:'#13121a',border:'0.5px solid rgba(108,92,231,0.3)',borderRadius:12,padding:40,textAlign:'center',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16}}>
                <div style={{fontSize:36,animation:'spin 2s linear infinite'}}>⚙️</div>
                <div style={{fontSize:14,fontWeight:500,color:'#a29bfe'}}>Analizando tu mazo...</div>
                <div style={{fontSize:12,color:'rgba(245,244,240,0.45)'}}>La IA está revisando tu lista carta por carta</div>
              </div>
            )}
            {analisis && (
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                {/* Puntuación */}
                <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:16,display:'flex',alignItems:'center',gap:16}}>
                  <div style={{textAlign:'center'}}>
                    <div style={{fontSize:42,fontWeight:800,color:analisis.puntuacion>=70?'#00b894':analisis.puntuacion>=50?'#fdcb6e':'#e17055'}}>{analisis.puntuacion}</div>
                    <div style={{fontSize:10,color:'rgba(245,244,240,0.45)'}}>/ 100</div>
                  </div>
                  <div>
                    <div style={{fontSize:13,fontWeight:500,marginBottom:6}}>Análisis general</div>
                    <div style={{fontSize:12,color:'rgba(245,244,240,0.6)',lineHeight:1.6}}>{analisis.resumen}</div>
                  </div>
                </div>

                {/* Fortalezas y debilidades */}
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                  <div style={{background:'rgba(0,184,148,0.08)',border:'0.5px solid rgba(0,184,148,0.2)',borderRadius:10,padding:12}}>
                    <div style={{fontSize:11,fontWeight:600,color:'#00b894',marginBottom:8}}>✓ FORTALEZAS</div>
                    {analisis.fortalezas?.map((f,i)=>(
                      <div key={i} style={{fontSize:12,color:'rgba(245,244,240,0.7)',marginBottom:4,paddingLeft:8,borderLeft:'2px solid rgba(0,184,148,0.4)'}}>{f}</div>
                    ))}
                  </div>
                  <div style={{background:'rgba(225,112,85,0.08)',border:'0.5px solid rgba(225,112,85,0.2)',borderRadius:10,padding:12}}>
                    <div style={{fontSize:11,fontWeight:600,color:'#e17055',marginBottom:8}}>✗ DEBILIDADES</div>
                    {analisis.debilidades?.map((d,i)=>(
                      <div key={i} style={{fontSize:12,color:'rgba(245,244,240,0.7)',marginBottom:4,paddingLeft:8,borderLeft:'2px solid rgba(225,112,85,0.4)'}}>{d}</div>
                    ))}
                  </div>
                </div>

                {/* Sugerencias */}
                <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:14}}>
                  <div style={{fontSize:12,fontWeight:600,color:'#a29bfe',marginBottom:10}}>CAMBIOS SUGERIDOS</div>
                  {analisis.sugerencias?.map((s,i)=>(
                    <div key={i} style={{display:'flex',alignItems:'flex-start',gap:10,padding:'8px 0',borderBottom:i<analisis.sugerencias.length-1?'0.5px solid rgba(255,255,255,0.07)':'none'}}>
                      <div style={{flex:1}}>
                        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4,flexWrap:'wrap'}}>
                          <span style={{fontSize:11,padding:'2px 8px',background:'rgba(225,112,85,0.15)',color:'#e17055',borderRadius:6}}>- {s.cantidad_quitar}x {s.carta_quitar}</span>
                          <span style={{fontSize:11,color:'rgba(245,244,240,0.3)'}}>→</span>
                          <span style={{fontSize:11,padding:'2px 8px',background:'rgba(0,184,148,0.15)',color:'#00b894',borderRadius:6}}>+ {s.cantidad_añadir}x {s.carta_añadir}</span>
                        </div>
                        <div style={{fontSize:11,color:'rgba(245,244,240,0.5)',lineHeight:1.5}}>{s.razon}
                            <span style={{fontSize:10,color:'#fdcb6e',marginLeft:6}}>~{s.precio_aprox}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Consejo general */}
                <div style={{background:'rgba(108,92,231,0.08)',border:'0.5px solid rgba(108,92,231,0.2)',borderRadius:10,padding:14}}>
                  <div style={{fontSize:11,fontWeight:600,color:'#a29bfe',marginBottom:6}}>💡 CONSEJO CLAVE</div>
                  <div style={{fontSize:12,color:'rgba(245,244,240,0.7)',lineHeight:1.6}}>{analisis.consejo_general}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
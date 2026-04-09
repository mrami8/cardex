import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Rankings() {
  const navigate = useNavigate();
  const [juego, setJuego] = useState('Magic: The Gathering');
  const [formato, setFormato] = useState('Modern');
  const [region, setRegion] = useState('España');
  const [tab, setTab] = useState('global');

  const jugadores = [
    {rank:1,ini:'CR',bg:'rgba(253,203,110,0.2)',fc:'#fdcb6e',nombre:'Carlos Rueda',ciudad:'Madrid',elo:2104,w:87,l:23,wr:79,torneos:48,streak:7,pts:1840,delta:'+12'},
    {rank:2,ini:'AF',bg:'rgba(0,184,148,0.15)',fc:'#00b894',nombre:'Ana Ferreira',ciudad:'Porto',elo:2088,w:92,l:31,wr:74,torneos:52,streak:3,pts:1720,delta:'+5'},
    {rank:3,ini:'LB',bg:'rgba(108,92,231,0.2)',fc:'#a29bfe',nombre:'Luca Bianchi',ciudad:'Milano',elo:2071,w:78,l:29,wr:71,torneos:44,streak:-2,pts:1680,delta:'-3'},
    {rank:4,ini:'JL',bg:'rgba(116,185,255,0.15)',fc:'#74b9ff',nombre:'Joan López',ciudad:'Barcelona',elo:1847,w:64,l:38,wr:63,torneos:102,streak:4,pts:1240,delta:'+8'},
    {rank:5,ini:'MD',bg:'rgba(212,83,126,0.15)',fc:'#ED93B1',nombre:'Marie Dupont',ciudad:'Lyon',elo:1831,w:71,l:44,wr:61,torneos:38,streak:-1,pts:1190,delta:'-2'},
    {rank:6,ini:'FW',bg:'rgba(0,184,148,0.15)',fc:'#00b894',nombre:'Felix Weber',ciudad:'Berlin',elo:1802,w:55,l:39,wr:58,torneos:33,streak:2,pts:1050,delta:'+4'},
    {rank:7,ini:'SN',bg:'rgba(108,92,231,0.2)',fc:'#a29bfe',nombre:'Sofia Nilsson',ciudad:'Stockholm',elo:1788,w:60,l:48,wr:55,torneos:41,streak:0,pts:980,delta:'0'},
    {rank:8,ini:'TM',bg:'rgba(253,203,110,0.2)',fc:'#fdcb6e',nombre:'Tom Müller',ciudad:'Wien',elo:1765,w:49,l:41,wr:54,torneos:29,streak:1,pts:910,delta:'+1'},
    {rank:9,ini:'PR',bg:'rgba(116,185,255,0.15)',fc:'#74b9ff',nombre:'Pau Roca',ciudad:'Barcelona',elo:1742,w:44,l:38,wr:53,torneos:26,streak:5,pts:870,delta:'+15'},
    {rank:10,ini:'RS',bg:'rgba(212,83,126,0.15)',fc:'#ED93B1',nombre:'Rui Santos',ciudad:'Lisboa',elo:1718,w:41,l:37,wr:52,torneos:22,streak:2,pts:820,delta:'+9'},
  ];

  const rising = jugadores.filter(j=>parseInt(j.delta)>0).sort((a,b)=>parseInt(b.delta)-parseInt(a.delta)).slice(0,5);

  const juegos = ['Magic: The Gathering','Pokémon TCG','Yu-Gi-Oh!','One Piece TCG','Star Wars Unlimited'];
  const formatos = {
    'Magic: The Gathering':['Modern','Pioneer','Standard','Legacy','EDH','Pauper'],
    'Pokémon TCG':['Standard','Expanded'],
    'Yu-Gi-Oh!':['Advanced','Edison','Goat'],
    'One Piece TCG':['Standard'],
    'Star Wars Unlimited':['Premier','Draft'],
  };
  const regiones = ['Global','España','Portugal','Italia','Francia','Alemania'];

  const rankColor = r => r===1?'#fdcb6e':r===2?'#B4B2A9':r===3?'#D05538':'rgba(245,244,240,0.3)';

  return (
    <div style={{background:'#0a0a0f',minHeight:'100vh',color:'#f5f4f0',fontFamily:'DM Sans, sans-serif'}}>
      <div style={{padding:'14px 24px',borderBottom:'0.5px solid rgba(255,255,255,0.07)',background:'rgba(10,10,15,0.92)',position:'sticky',top:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,cursor:'pointer'}} onClick={()=>navigate('/')}>
          <div style={{width:28,height:28,background:'#6c5ce7',borderRadius:7,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,color:'white'}}>C</div>
          <span style={{fontSize:16,fontWeight:700,letterSpacing:'-0.5px'}}>Cardex</span>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button onClick={()=>navigate('/torneos')} style={{padding:'6px 12px',background:'transparent',color:'rgba(245,244,240,0.45)',border:'none',cursor:'pointer',fontSize:13}}>Torneos</button>
          <button onClick={()=>navigate('/decklists')} style={{padding:'6px 12px',background:'transparent',color:'rgba(245,244,240,0.45)',border:'none',cursor:'pointer',fontSize:13}}>Decklists</button>
          <button onClick={()=>navigate('/panel')} style={{padding:'6px 14px',background:'#6c5ce7',color:'white',border:'none',borderRadius:8,cursor:'pointer',fontSize:13,fontWeight:500}}>Panel tienda</button>
        </div>
      </div>

      <div style={{maxWidth:1000,margin:'0 auto',padding:'24px 20px'}}>
        <h1 style={{fontSize:22,fontWeight:700,marginBottom:6}}>Rankings ELO</h1>
        <div style={{fontSize:13,color:'rgba(245,244,240,0.45)',marginBottom:20}}>Clasificación oficial de jugadores por juego y formato</div>

        {/* FILTROS */}
        <div style={{display:'flex',gap:10,marginBottom:20,flexWrap:'wrap'}}>
          <select value={juego} onChange={e=>{setJuego(e.target.value);setFormato(formatos[e.target.value][0]);}} style={{padding:'8px 12px',background:'#13121a',border:'0.5px solid rgba(255,255,255,0.15)',borderRadius:8,color:'white',fontSize:13,outline:'none',cursor:'pointer'}}>
            {juegos.map(j=><option key={j}>{j}</option>)}
          </select>
          <select value={formato} onChange={e=>setFormato(e.target.value)} style={{padding:'8px 12px',background:'#13121a',border:'0.5px solid rgba(255,255,255,0.15)',borderRadius:8,color:'white',fontSize:13,outline:'none',cursor:'pointer'}}>
            {(formatos[juego]||[]).map(f=><option key={f}>{f}</option>)}
          </select>
          <select value={region} onChange={e=>setRegion(e.target.value)} style={{padding:'8px 12px',background:'#13121a',border:'0.5px solid rgba(255,255,255,0.15)',borderRadius:8,color:'white',fontSize:13,outline:'none',cursor:'pointer'}}>
            {regiones.map(r=><option key={r}>{r}</option>)}
          </select>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:16}}>
          <div>
            {/* TABS */}
            <div style={{display:'flex',gap:4,borderBottom:'0.5px solid rgba(255,255,255,0.07)',marginBottom:14}}>
              {['global','local','rising'].map(t=>(
                <button key={t} onClick={()=>setTab(t)} style={{padding:'7px 16px',background:'transparent',border:'none',borderBottom:`2px solid ${tab===t?'#6c5ce7':'transparent'}`,color:tab===t?'#a29bfe':'rgba(245,244,240,0.45)',cursor:'pointer',fontSize:13,fontWeight:tab===t?500:400}}>
                  {t==='global'?'Global':t==='local'?'Mi región':'En alza'}
                </button>
              ))}
            </div>

            {/* TABLA */}
            <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,overflow:'hidden'}}>
              <div style={{display:'grid',gridTemplateColumns:'50px 1fr 80px 80px 80px 60px 70px',padding:'8px 16px',borderBottom:'0.5px solid rgba(255,255,255,0.07)'}}>
                {['#','Jugador','ELO','W/L','WR','Racha','Puntos'].map((h,i)=>(
                  <div key={i} style={{fontSize:10,color:'rgba(245,244,240,0.45)',fontWeight:600,letterSpacing:0.5}}>{h}</div>
                ))}
              </div>
              {(tab==='rising'?rising:jugadores).map((j,i)=>(
                <div key={i} onClick={()=>navigate('/perfil')} style={{display:'grid',gridTemplateColumns:'50px 1fr 80px 80px 80px 60px 70px',padding:'12px 16px',borderBottom:i<jugadores.length-1?'0.5px solid rgba(255,255,255,0.07)':'none',alignItems:'center',cursor:'pointer',transition:'background 0.15s'}}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.03)'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <div style={{fontSize:15,fontWeight:700,color:rankColor(j.rank)}}>{j.rank}</div>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <div style={{width:32,height:32,borderRadius:'50%',background:j.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:600,color:j.fc,flexShrink:0}}>{j.ini}</div>
                    <div>
                      <div style={{fontSize:13,fontWeight:500}}>{j.nombre}</div>
                      <div style={{fontSize:10,color:'rgba(245,244,240,0.45)'}}>{j.ciudad}</div>
                    </div>
                  </div>
                  <div style={{fontSize:14,fontWeight:600,color:'#a29bfe'}}>{j.elo}</div>
                  <div style={{fontSize:12,color:'rgba(245,244,240,0.45)'}}>{j.w}/{j.l}</div>
                  <div>
                    <span style={{fontSize:11,padding:'2px 7px',background:j.wr>=65?'rgba(0,184,148,0.15)':j.wr>=55?'rgba(253,203,110,0.12)':'rgba(255,255,255,0.06)',color:j.wr>=65?'#00b894':j.wr>=55?'#fdcb6e':'rgba(245,244,240,0.6)',borderRadius:6,fontWeight:500}}>{j.wr}%</span>
                  </div>
                  <div style={{fontSize:12,color:j.streak>0?'#00b894':j.streak<0?'#e17055':'rgba(245,244,240,0.45)',fontWeight:500}}>
                    {j.streak>0?`+${j.streak}↑`:j.streak<0?`${j.streak}↓`:'—'}
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:6}}>
                    <span style={{fontSize:13,fontWeight:500,color:'#a29bfe'}}>{j.pts}</span>
                    <span style={{fontSize:10,color:parseInt(j.delta)>0?'#00b894':parseInt(j.delta)<0?'#e17055':'rgba(245,244,240,0.3)'}}>{parseInt(j.delta)>0?'+':''}{j.delta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {/* Top 3 */}
            <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:14}}>
              <div style={{fontSize:12,fontWeight:500,marginBottom:12,color:'rgba(245,244,240,0.6)'}}>Top 3 del mes</div>
              {jugadores.slice(0,3).map((j,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:i<2?'0.5px solid rgba(255,255,255,0.07)':'none'}}>
                  <div style={{fontSize:18}}>{i===0?'🥇':i===1?'🥈':'🥉'}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,fontWeight:500}}>{j.nombre}</div>
                    <div style={{fontSize:10,color:'rgba(245,244,240,0.45)'}}>{j.ciudad}</div>
                  </div>
                  <div style={{fontSize:13,fontWeight:600,color:'#a29bfe'}}>{j.elo}</div>
                </div>
              ))}
            </div>

            {/* En alza */}
            <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:14}}>
              <div style={{fontSize:12,fontWeight:500,marginBottom:12,color:'rgba(245,244,240,0.6)'}}>Jugadores en alza</div>
              {rising.map((j,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'7px 0',borderBottom:i<rising.length-1?'0.5px solid rgba(255,255,255,0.07)':'none'}}>
                  <div style={{width:28,height:28,borderRadius:'50%',background:j.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:600,color:j.fc}}>{j.ini}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,fontWeight:500}}>{j.nombre}</div>
                    <div style={{fontSize:10,color:'rgba(245,244,240,0.45)'}}>{j.ciudad}</div>
                  </div>
                  <span style={{fontSize:11,padding:'2px 7px',background:'rgba(0,184,148,0.15)',color:'#00b894',borderRadius:6,fontWeight:600}}>{j.delta} ELO</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:14}}>
              <div style={{fontSize:12,fontWeight:500,marginBottom:12,color:'rgba(245,244,240,0.6)'}}>Stats del formato</div>
              {[
                {label:'Jugadores rankeados',val:'1.284'},
                {label:'Torneos este mes',val:'48'},
                {label:'ELO medio',val:'1.621'},
                {label:'ELO más alto',val:'2.104'},
              ].map((s,i)=>(
                <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:i<3?'0.5px solid rgba(255,255,255,0.07)':'none',fontSize:12}}>
                  <span style={{color:'rgba(245,244,240,0.45)'}}>{s.label}</span>
                  <span style={{fontWeight:500}}>{s.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
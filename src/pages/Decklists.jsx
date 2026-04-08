import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Decklists() {
  const navigate = useNavigate();
  const [vista, setVista] = useState('explorar');
  const [nombre, setNombre] = useState('');
  const [juego, setJuego] = useState('Magic: The Gathering');
  const [formato, setFormato] = useState('Modern');
  const [lista, setLista] = useState('');
  const [publicado, setPublicado] = useState(false);

  const decklists = [
    {autor:'Carlos Rueda',deck:'Grixis Shadow',formato:'Modern',juego:'MTG',wr:'79%',torneos:12,color:'#a29bfe'},
    {autor:'Ana Ferreira',deck:'Amulet Titan',formato:'Modern',juego:'MTG',wr:'61%',torneos:8,color:'#00b894'},
    {autor:'Joan López',deck:'Living End',formato:'Modern',juego:'MTG',wr:'54%',torneos:6,color:'#fdcb6e'},
    {autor:'Pau Garcia',deck:'Charizard ex',formato:'Standard',juego:'Pokémon',wr:'68%',torneos:9,color:'#e17055'},
    {autor:'Marc Ribas',deck:'Blue-Eyes',formato:'Advanced',juego:'Yu-Gi-Oh!',wr:'52%',torneos:4,color:'#74b9ff'},
  ];

  const publicar = () => {
    if(!nombre||!lista){alert('Rellena el nombre y la lista del mazo');return;}
    setPublicado(true);
    setTimeout(()=>{setPublicado(false);setVista('explorar');setNombre('');setLista('');},2000);
  };

  const inputStyle = {background:'#1e1c2a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:7,padding:'9px 12px',color:'white',fontSize:13,fontFamily:'DM Sans, sans-serif',outline:'none',width:'100%'};

  return (
    <div style={{background:'#0a0a0f',minHeight:'100vh',color:'#f5f4f0',fontFamily:'DM Sans, sans-serif',padding:'24px'}}>
      <div style={{maxWidth:900,margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
          <div>
            <button onClick={()=>navigate('/')} style={{background:'transparent',color:'rgba(245,244,240,0.45)',border:'none',cursor:'pointer',fontSize:13,marginBottom:6,padding:0}}>← Inicio</button>
            <h1 style={{fontSize:22,fontWeight:700}}>Decklists</h1>
          </div>
          <div style={{display:'flex',gap:8}}>
            <button onClick={()=>setVista('explorar')} style={{padding:'7px 14px',background:vista==='explorar'?'#6c5ce7':'rgba(255,255,255,0.06)',color:'white',border:'none',borderRadius:8,fontSize:12,cursor:'pointer'}}>Explorar</button>
            <button onClick={()=>setVista('subir')} style={{padding:'7px 14px',background:vista==='subir'?'#6c5ce7':'rgba(255,255,255,0.06)',color:'white',border:'none',borderRadius:8,fontSize:12,cursor:'pointer'}}>+ Subir decklist</button>
          </div>
        </div>

        {vista==='explorar' && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:12}}>
            {decklists.map((d,i)=>(
              <div key={i} style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:16,cursor:'pointer'}}
                onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(108,92,231,0.4)'}
                onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
                  <span style={{fontSize:10,padding:'2px 8px',background:'rgba(108,92,231,0.2)',color:'#a29bfe',borderRadius:8,fontWeight:600}}>{d.juego}</span>
                  <span style={{fontSize:10,color:'rgba(245,244,240,0.45)'}}>{d.formato}</span>
                </div>
                <div style={{fontSize:15,fontWeight:600,marginBottom:4,color:d.color}}>{d.deck}</div>
                <div style={{fontSize:12,color:'rgba(245,244,240,0.45)',marginBottom:12}}>por {d.autor}</div>
                <div style={{display:'flex',gap:12,fontSize:11,color:'rgba(245,244,240,0.45)'}}>
                  <span>WR: <strong style={{color:'#00b894'}}>{d.wr}</strong></span>
                  <span>{d.torneos} torneos</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {vista==='subir' && (
          <div style={{background:'#13121a',border:'0.5px solid rgba(255,255,255,0.07)',borderRadius:12,padding:20}}>
            {publicado ? (
              <div style={{textAlign:'center',padding:'40px 0'}}>
                <div style={{fontSize:40,marginBottom:12}}>✓</div>
                <div style={{fontSize:16,fontWeight:500}}>¡Decklist publicada!</div>
              </div>
            ) : (
              <div style={{display:'grid',gap:14}}>
                <div>
                  <label style={{fontSize:11,color:'rgba(245,244,240,0.45)',fontWeight:600,marginBottom:5,display:'block'}}>Nombre del mazo *</label>
                  <input style={inputStyle} placeholder="Ej: Grixis Shadow" value={nombre} onChange={e=>setNombre(e.target.value)} />
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                  <div>
                    <label style={{fontSize:11,color:'rgba(245,244,240,0.45)',fontWeight:600,marginBottom:5,display:'block'}}>Juego</label>
                    <select style={inputStyle} value={juego} onChange={e=>setJuego(e.target.value)}>
                      {['Magic: The Gathering','Pokémon TCG','Yu-Gi-Oh!','One Piece TCG'].map(g=><option key={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{fontSize:11,color:'rgba(245,244,240,0.45)',fontWeight:600,marginBottom:5,display:'block'}}>Formato</label>
                    <select style={inputStyle} value={formato} onChange={e=>setFormato(e.target.value)}>
                      {['Modern','Pioneer','Standard','Legacy','EDH','Draft'].map(f=><option key={f}>{f}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{fontSize:11,color:'rgba(245,244,240,0.45)',fontWeight:600,marginBottom:5,display:'block'}}>Lista de cartas *</label>
                  <textarea style={{...inputStyle,resize:'vertical',minHeight:200,fontFamily:'monospace'}}
                    placeholder={'4 Lightning Bolt\n4 Ragavan, Nimble Pilferer\n3 Dragon\'s Rage Channeler\n...'}
                    value={lista} onChange={e=>setLista(e.target.value)} />
                  <div style={{fontSize:11,color:'rgba(245,244,240,0.45)',marginTop:4}}>Formato: cantidad + nombre de carta, una por línea</div>
                </div>
                <div style={{display:'flex',gap:10,justifyContent:'flex-end'}}>
                  <button onClick={()=>setVista('explorar')} style={{padding:'9px 18px',background:'rgba(255,255,255,0.06)',color:'white',border:'none',borderRadius:8,fontSize:13,cursor:'pointer'}}>Cancelar</button>
                  <button onClick={publicar} style={{padding:'9px 18px',background:'#6c5ce7',color:'white',border:'none',borderRadius:8,fontSize:13,cursor:'pointer',fontWeight:500}}>Publicar decklist</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
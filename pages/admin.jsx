import { useState, useEffect, useCallback } from "react";
import Head from "next/head";

// ===== CONFIGURAÇÃO =====
const ADMIN_PASSWORD = "gatinhos2026";
const STORAGE_KEY = "casadosgatinhos_admin_v4";
const PIX_KEY = "casadosgatinhos22@gmail.com";

// ===== DADOS INICIAIS (59 gatos reais) =====
const INITIAL_CATS = [
{id:"g01",nome:"Belinha",idade:"15 anos",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:120,status:"residente",emoji:"👵"},
{id:"g02",nome:"Paçoca",idade:"9 anos",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:100,status:"residente",emoji:"🍫"},
{id:"g03",nome:"Lua",idade:"5 anos",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🌙"},
{id:"g04",nome:"Lian",idade:"5 anos",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🦁"},
{id:"g05",nome:"Gabi",idade:"4 anos",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🌸"},
{id:"g06",nome:"Tobby",idade:"4 anos",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🐾"},
{id:"g07",nome:"Melinda",idade:"4 anos",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🎀"},
{id:"g08",nome:"Fofucho",idade:"4 anos",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🧸"},
{id:"g09",nome:"Adelly",idade:"5 anos",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"💎"},
{id:"g10",nome:"Ricky",idade:"4 anos",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🎸"},
{id:"g11",nome:"Ruan",idade:"4 anos",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"⚽"},
{id:"g12",nome:"Layla",idade:"2 anos",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🌺"},
{id:"g13",nome:"Napoleão",idade:"4 anos",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"👑"},
{id:"g14",nome:"Selena",idade:"4 anos",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"⭐"},
{id:"g15",nome:"Cristal",idade:"3 anos",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"💠"},
{id:"g16",nome:"Leo",idade:"3 anos",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🦁"},
{id:"g17",nome:"Evora",idade:"3 anos",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🏰"},
{id:"g18",nome:"Brownie",idade:"3 anos",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🍫"},
{id:"g19",nome:"Estela",idade:"3 anos",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"✨"},
{id:"g20",nome:"Esmeralda",idade:"4 anos",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"💚"},
{id:"g21",nome:"Amora",idade:"4 anos",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🫐"},
{id:"g22",nome:"Babuino",idade:"3 anos",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🐒"},
{id:"g23",nome:"Princesa",idade:"3 anos",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"👸"},
{id:"g24",nome:"Catarina",idade:"3 anos",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🦋"},
{id:"g25",nome:"Rebeca",idade:"3 anos",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🌹"},
{id:"g26",nome:"Igor",idade:"3 anos",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🎯"},
{id:"g27",nome:"Bianca",idade:"3 anos",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🤍"},
{id:"g28",nome:"Gael",idade:"3 anos",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🌊"},
{id:"g29",nome:"Brisa",idade:"3 anos",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🍃",mascote:true},
{id:"g30",nome:"Ivy",idade:"2 anos",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🌿"},
{id:"g31",nome:"Emilia",idade:"2 anos",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🎭"},
{id:"g32",nome:"Sininho",idade:"2 anos",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🔔"},
{id:"g33",nome:"Ariel",idade:"2 anos",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🧜"},
{id:"g34",nome:"Tacha",idade:"2 anos",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"📌"},
{id:"g35",nome:"Romeu",idade:"2 anos",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"💕"},
{id:"g36",nome:"Joly",idade:"2 anos",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🎪"},
{id:"g37",nome:"Nutella",idade:"2 anos",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🍫"},
{id:"g38",nome:"Tom",idade:"2 anos",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🎵"},
{id:"g39",nome:"Jojo",idade:"1 ano",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🌀"},
{id:"g40",nome:"Pantufa",idade:"1 ano",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🧦"},
{id:"g41",nome:"Avelã",idade:"1 ano",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🌰"},
{id:"g42",nome:"Mônica",idade:"1 ano",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"📘"},
{id:"g43",nome:"Traquina",idade:"1 ano",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"😈"},
{id:"g44",nome:"Miguel",idade:"1 ano",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🎩"},
{id:"g45",nome:"Luck",idade:"1 ano",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🍀"},
{id:"g46",nome:"Nico",idade:"1 ano",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🎲"},
{id:"g47",nome:"Theo",idade:"1 ano",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🧩"},
{id:"g48",nome:"Boris",idade:"Filhote",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🐻"},
{id:"g49",nome:"Ziggy",idade:"Filhote",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"⚡"},
{id:"g50",nome:"Safira",idade:"Filhote",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"💙"},
{id:"g51",nome:"Estrela",idade:"1 ano",sexo:"F",castrado:false,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🌟"},
{id:"g52",nome:"Cocada",idade:"Filhote",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🥥"},
{id:"g53",nome:"Alpino",idade:"Filhote",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🏔️"},
{id:"g54",nome:"Juma",idade:"Filhote",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🐆"},
{id:"g55",nome:"Luiza",idade:"Filhote",sexo:"F",castrado:false,vacinas:"V4+AR",condicao:"Paraplégica",custoMensal:250,status:"residente",emoji:"🐯",mascote:true},
{id:"g56",nome:"Milk",idade:"1 ano",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🥛"},
{id:"g57",nome:"Pudim",idade:"Filhote",sexo:"M",castrado:false,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🍮"},
{id:"g58",nome:"Anne",idade:"3 anos",sexo:"F",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🌷"},
{id:"g59",nome:"Tigrinho",idade:"2 anos",sexo:"M",castrado:true,vacinas:"V4+AR",condicao:"",custoMensal:80,status:"residente",emoji:"🐅"},
];

const INITIAL_STATE = {
  gatos: INITIAL_CATS,
  padrinhos: [],
  lancamentos: [],
  eventos: [],
  config: { nome:"Casa dos Gatinhos", telefone:"(11) 99999-9999", email:"casadosgatinhos22@gmail.com", pix:PIX_KEY },
  nextId: 100
};

// ===== UTILS =====
const fmtR = v => new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(v||0);
const fmtD = d => d ? new Date(d+"T12:00:00").toLocaleDateString("pt-BR") : "-";
const curMonth = () => { const n=new Date(); return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`; };
const genId = (app) => { app.nextId = (app.nextId||100)+1; return "id_"+app.nextId+"_"+Date.now(); };

// ===== STYLES =====
const S = {
  page: { fontFamily:"'Nunito',sans-serif", minHeight:"100vh", background:"#F8F9FA" },
  loginWrap: { minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg,#FFF5F8,#FFE4ED,#F8B4C8)" },
  loginBox: { background:"#fff", borderRadius:24, padding:40, maxWidth:380, width:"100%", boxShadow:"0 20px 60px rgba(232,84,140,0.15)", textAlign:"center" },
  header: { background:"linear-gradient(135deg,#E8548C,#C41E5C)", padding:"12px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 },
  nav: { display:"flex", gap:4, overflowX:"auto", padding:"12px 16px", background:"#fff", borderBottom:"1px solid #eee" },
  navBtn: (active) => ({ padding:"8px 16px", border:"none", borderRadius:20, cursor:"pointer", fontFamily:"'Nunito',sans-serif", fontSize:13, fontWeight:active?800:600, background:active?"#E8548C":"#f5f5f5", color:active?"#fff":"#666", whiteSpace:"nowrap", transition:"all .2s" }),
  main: { padding:20, maxWidth:1200, margin:"0 auto" },
  card: { background:"#fff", borderRadius:16, padding:24, marginBottom:20, boxShadow:"0 2px 12px rgba(0,0,0,0.04)" },
  cardTitle: { fontFamily:"'Quicksand',sans-serif", fontWeight:700, fontSize:"1.2rem", color:"#C41E5C", marginBottom:16, display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" },
  statsGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:12, marginBottom:20 },
  statCard: (color) => ({ background:"#fff", borderRadius:16, padding:16, textAlign:"center", boxShadow:"0 2px 10px rgba(0,0,0,0.04)", borderTop:`4px solid ${color}` }),
  table: { width:"100%", borderCollapse:"collapse", fontSize:"0.85rem" },
  th: { background:"#E8548C", color:"#fff", padding:"10px 8px", textAlign:"left", fontWeight:600 },
  td: { padding:"8px", borderBottom:"1px solid #f0f0f0" },
  btn: (bg,color) => ({ padding:"8px 16px", border:"none", borderRadius:20, fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:"0.85rem", cursor:"pointer", background:bg, color:color||"#fff", transition:"all .2s" }),
  btnSm: (bg,color) => ({ padding:"4px 10px", border:"none", borderRadius:12, fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:"0.75rem", cursor:"pointer", background:bg, color:color||"#fff" }),
  input: { width:"100%", padding:"8px 12px", border:"2px solid #eee", borderRadius:10, fontFamily:"'Nunito',sans-serif", fontSize:"0.85rem", outline:"none" },
  select: { width:"100%", padding:"8px 12px", border:"2px solid #eee", borderRadius:10, fontFamily:"'Nunito',sans-serif", fontSize:"0.85rem", outline:"none", background:"#fff" },
  formGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:12 },
  modal: { position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:20 },
  modalBox: { background:"#fff", borderRadius:20, padding:28, maxWidth:600, width:"100%", maxHeight:"85vh", overflowY:"auto" },
  badge: (bg,color) => ({ padding:"3px 10px", borderRadius:16, fontSize:"0.7rem", fontWeight:700, background:bg, color:color }),
  alertWarn: { padding:"12px 16px", borderRadius:10, background:"#FFF3CD", color:"#856404", borderLeft:"4px solid #FFD93D", marginBottom:16, fontSize:"0.85rem" },
  alertDanger: { padding:"12px 16px", borderRadius:10, background:"#F8D7DA", color:"#721C24", borderLeft:"4px solid #FF6B6B", marginBottom:16, fontSize:"0.85rem" },
  alertSuccess: { padding:"12px 16px", borderRadius:10, background:"#D4EDDA", color:"#155724", borderLeft:"4px solid #6BCB77", marginBottom:16, fontSize:"0.85rem" },
  progressBar: { height:16, background:"#eee", borderRadius:8, overflow:"hidden" },
  progressFill: (pct,color) => ({ height:"100%", width:`${Math.min(pct,100)}%`, background:color||"#E8548C", borderRadius:8, transition:"width .5s", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:"0.65rem", fontWeight:700 }),
};

// ===== LOGIN SCREEN =====
function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { onLogin(); setErr(false); }
    else { setErr(true); setPw(""); }
  };
  return (
    <div style={S.loginWrap}>
      <form onSubmit={handleSubmit} style={S.loginBox}>
        <div style={{fontSize:56,marginBottom:12}}>🐱</div>
        <h1 style={{fontFamily:"'Quicksand',sans-serif",fontSize:24,color:"#C41E5C",marginBottom:4}}>Casa dos Gatinhos</h1>
        <p style={{color:"#888",fontSize:13,marginBottom:24}}>Painel Administrativo</p>
        <input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="Senha de acesso" style={{...S.input,textAlign:"center",marginBottom:12,borderColor:err?"#FF6B6B":"#eee"}} autoFocus />
        {err && <p style={{color:"#FF6B6B",fontSize:12,marginBottom:8}}>Senha incorreta</p>}
        <button type="submit" style={{...S.btn("#E8548C"),width:"100%",padding:"12px 0",fontSize:16}}>Entrar</button>
        <a href="/" style={{display:"block",marginTop:16,color:"#888",fontSize:12,textDecoration:"none"}}>← Voltar ao site público</a>
      </form>
    </div>
  );
}

// ===== TOAST =====
function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return ()=>clearTimeout(t); }, [onClose]);
  const colors = { success:"#6BCB77", error:"#FF6B6B", info:"#4ECDC4" };
  return (
    <div style={{position:"fixed",top:20,right:20,zIndex:300,background:"#fff",padding:"12px 20px",borderRadius:10,boxShadow:"0 4px 15px rgba(0,0,0,0.15)",borderLeft:`4px solid ${colors[type]||colors.info}`,display:"flex",gap:8,alignItems:"center",animation:"slideIn .3s ease"}}>
      <span>{type==="success"?"✅":type==="error"?"❌":"ℹ️"}</span><span style={{fontSize:13}}>{msg}</span>
      <style>{`@keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>
    </div>
  );
}

// ===== MODAL WRAPPER =====
function Modal({ show, onClose, title, children }) {
  if (!show) return null;
  return (
    <div style={S.modal} onClick={onClose}>
      <div style={S.modalBox} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h3 style={{color:"#C41E5C",fontFamily:"'Quicksand',sans-serif",fontWeight:700,fontSize:18}}>{title}</h3>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:"#999"}}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ===== DASHBOARD =====
function Dashboard({ app }) {
  const gatos = app.gatos || [];
  const padrinhos = (app.padrinhos||[]).filter(p=>p.status==="ativo");
  const mes = curMonth();
  const lancMes = (app.lancamentos||[]).filter(l=>l.data?.startsWith(mes));
  const receitas = lancMes.filter(l=>l.tipo==="receita").reduce((s,l)=>s+l.valor,0);
  const despesas = lancMes.filter(l=>l.tipo==="despesa").reduce((s,l)=>s+l.valor,0);
  const saldo = receitas - despesas;
  const totalCusto = gatos.reduce((s,g)=>s+(g.custoMensal||80),0);
  const recPadrinhos = padrinhos.reduce((s,p)=>s+p.valor,0);
  const castrados = gatos.filter(g=>g.castrado).length;
  const pctCast = gatos.length ? Math.round(castrados/gatos.length*100) : 0;

  return (
    <div>
      <div style={S.statsGrid}>
        {[
          ["🐱",gatos.length,"Gatos no Lar","#E8548C"],
          ["💝",padrinhos.length,"Padrinhos Ativos","#6BCB77"],
          ["📈",fmtR(receitas),"Receita do Mês","#4ECDC4"],
          ["📉",fmtR(despesas),"Despesa do Mês","#FF6B6B"],
          ["💰",fmtR(saldo),"Saldo do Mês",saldo>=0?"#6BCB77":"#FF6B6B"],
          ["🏥",fmtR(totalCusto),"Custo Estimado/Mês","#9B59B6"],
        ].map(([icon,val,label,color])=>(
          <div key={label} style={S.statCard(color)}>
            <div style={{fontSize:24}}>{icon}</div>
            <div style={{fontSize:20,fontWeight:800,color:"#333"}}>{val}</div>
            <div style={{fontSize:11,color:"#888",marginTop:2}}>{label}</div>
          </div>
        ))}
      </div>

      {saldo < 0 && <div style={S.alertDanger}>⚠️ Déficit no mês atual: {fmtR(Math.abs(saldo))}. Receita não cobre despesas.</div>}

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div style={S.card}>
          <div style={S.cardTitle}>📊 Indicadores</div>
          <div style={{marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
              <span>Castração</span><span>{pctCast}% ({castrados}/{gatos.length})</span>
            </div>
            <div style={S.progressBar}><div style={S.progressFill(pctCast,"#6BCB77")}>{pctCast>10?pctCast+"%":""}</div></div>
          </div>
          <div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
              <span>Cobertura Padrinhos</span><span>{fmtR(recPadrinhos)} / {fmtR(totalCusto)}</span>
            </div>
            <div style={S.progressBar}><div style={S.progressFill(totalCusto?recPadrinhos/totalCusto*100:0,"#E8548C")}></div></div>
          </div>
        </div>
        <div style={S.card}>
          <div style={S.cardTitle}>📋 Resumo Rápido</div>
          <div style={{fontSize:13,lineHeight:2,color:"#555"}}>
            <div>• Fêmeas: <b>{gatos.filter(g=>g.sexo==="F").length}</b> | Machos: <b>{gatos.filter(g=>g.sexo==="M").length}</b></div>
            <div>• Para adoção: <b>{gatos.filter(g=>g.status==="adocao").length}</b></div>
            <div>• Quarentena: <b>{gatos.filter(g=>g.status==="quarentena").length}</b></div>
            <div>• Com condição especial: <b>{gatos.filter(g=>g.condicao).length}</b></div>
            <div>• Receita padrinhos/mês: <b>{fmtR(recPadrinhos)}</b></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== GESTÃO DE GATOS =====
function GatosSection({ app, setApp, showToast: toast }) {
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const gatos = (app.gatos||[]).filter(g => {
    if (filter && g.status !== filter) return false;
    if (search && !g.nome.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const emptyGato = {nome:"",idade:"",sexo:"F",castrado:false,vacinas:"",condicao:"",custoMensal:80,status:"residente",emoji:"🐱"};

  const openNew = () => { setEditing({...emptyGato}); setModal(true); };
  const openEdit = (g) => { setEditing({...g}); setModal(true); };

  const save = () => {
    if (!editing.nome.trim()) { toast("Nome é obrigatório","error"); return; }
    const newApp = {...app};
    if (editing.id) {
      newApp.gatos = newApp.gatos.map(g=>g.id===editing.id?editing:g);
      toast("Gatinho atualizado!","success");
    } else {
      editing.id = genId(newApp);
      newApp.gatos = [...newApp.gatos, editing];
      toast("Gatinho cadastrado!","success");
    }
    setApp(newApp);
    setModal(false);
  };

  const remove = (id) => {
    if (!confirm("Excluir este gatinho?")) return;
    setApp({...app, gatos: app.gatos.filter(g=>g.id!==id)});
    toast("Gatinho removido","info");
  };

  const statusLabels = {residente:"Residente",adocao:"Para Adoção",quarentena:"Quarentena",adotado:"Adotado",obito:"Óbito"};
  const statusColors = {residente:["#D4EDDA","#155724"],adocao:["#FFF3CD","#856404"],quarentena:["#F8D7DA","#721C24"],adotado:["#D1ECF1","#0C5460"],obito:["#E2E3E5","#383D41"]};

  return (
    <div>
      <div style={S.card}>
        <div style={S.cardTitle}>
          🐱 Gatinhos ({gatos.length})
          <button onClick={openNew} style={{...S.btn("#E8548C"),marginLeft:"auto"}}>+ Novo Gatinho</button>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
          <input placeholder="🔍 Buscar..." value={search} onChange={e=>setSearch(e.target.value)} style={{...S.input,width:200}} />
          {["","residente","adocao","quarentena","adotado"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={S.navBtn(filter===f)}>{f?statusLabels[f]:"Todos"}</button>
          ))}
        </div>
        <div style={{overflowX:"auto"}}>
          <table style={S.table}>
            <thead><tr>{["","Nome","Idade","Sexo","Castrado","Vacinas","Condição","Custo/Mês","Status","Ações"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
            <tbody>
              {gatos.map(g=>(
                <tr key={g.id} style={{cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background="#FFF5F8"} onMouseLeave={e=>e.currentTarget.style.background=""}>
                  <td style={S.td}>{g.emoji}</td>
                  <td style={{...S.td,fontWeight:700}}>{g.nome}</td>
                  <td style={S.td}>{g.idade}</td>
                  <td style={S.td}>{g.sexo==="F"?"♀":"♂"}</td>
                  <td style={S.td}>{g.castrado?"✅":"❌"}</td>
                  <td style={S.td}>{g.vacinas||"-"}</td>
                  <td style={S.td}>{g.condicao||"-"}</td>
                  <td style={S.td}>{fmtR(g.custoMensal)}</td>
                  <td style={S.td}><span style={S.badge(...(statusColors[g.status]||["#eee","#333"]))}>{statusLabels[g.status]||g.status}</span></td>
                  <td style={S.td}>
                    <div style={{display:"flex",gap:4}}>
                      <button onClick={()=>openEdit(g)} style={S.btnSm("#E8548C")}>✏️</button>
                      <button onClick={()=>remove(g.id)} style={S.btnSm("#FF6B6B")}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {gatos.length===0 && <p style={{textAlign:"center",color:"#999",padding:30}}>Nenhum gatinho encontrado.</p>}
      </div>

      <Modal show={modal} onClose={()=>setModal(false)} title={editing?.id?"✏️ Editar Gatinho":"🐱 Novo Gatinho"}>
        {editing && (
          <div>
            <div style={S.formGrid}>
              <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Nome *</label><input style={S.input} value={editing.nome} onChange={e=>setEditing({...editing,nome:e.target.value})} /></div>
              <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Idade</label><input style={S.input} value={editing.idade} onChange={e=>setEditing({...editing,idade:e.target.value})} /></div>
              <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Sexo</label><select style={S.select} value={editing.sexo} onChange={e=>setEditing({...editing,sexo:e.target.value})}><option value="F">Fêmea</option><option value="M">Macho</option></select></div>
              <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Castrado</label><select style={S.select} value={editing.castrado?"sim":"nao"} onChange={e=>setEditing({...editing,castrado:e.target.value==="sim"})}><option value="sim">Sim</option><option value="nao">Não</option></select></div>
              <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Vacinas</label><select style={S.select} value={editing.vacinas} onChange={e=>setEditing({...editing,vacinas:e.target.value})}><option value="">Nenhuma</option><option value="V3">V3</option><option value="V4">V4</option><option value="V4+AR">V4+Antirrábica</option></select></div>
              <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Status</label><select style={S.select} value={editing.status} onChange={e=>setEditing({...editing,status:e.target.value})}><option value="residente">Residente</option><option value="adocao">Para Adoção</option><option value="quarentena">Quarentena</option><option value="adotado">Adotado</option><option value="obito">Óbito</option></select></div>
              <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Condição Especial</label><input style={S.input} value={editing.condicao} onChange={e=>setEditing({...editing,condicao:e.target.value})} placeholder="Ex: Paraplégica, FIV+" /></div>
              <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Custo Mensal (R$)</label><input style={S.input} type="number" value={editing.custoMensal} onChange={e=>setEditing({...editing,custoMensal:parseFloat(e.target.value)||0})} /></div>
              <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Emoji</label><input style={S.input} value={editing.emoji} onChange={e=>setEditing({...editing,emoji:e.target.value})} /></div>
            </div>
            <div style={{display:"flex",gap:10,marginTop:20}}>
              <button onClick={()=>setModal(false)} style={{...S.btn("#eee","#666"),flex:1}}>Cancelar</button>
              <button onClick={save} style={{...S.btn("#E8548C"),flex:1}}>💾 Salvar</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ===== PADRINHOS =====
function PadrinhosSection({ app, setApp, showToast: toast }) {
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const padrinhos = app.padrinhos || [];
  const ativos = padrinhos.filter(p=>p.status==="ativo");

  const emptyP = {nome:"",telefone:"",email:"",gatoId:"",valor:30,dia:"5",forma:"PIX",status:"ativo"};
  const openNew = () => { setEditing({...emptyP}); setModal(true); };
  const openEdit = (p) => { setEditing({...p}); setModal(true); };

  const save = () => {
    if (!editing.nome.trim()) { toast("Nome é obrigatório","error"); return; }
    const newApp = {...app};
    if (editing.id) {
      newApp.padrinhos = newApp.padrinhos.map(p=>p.id===editing.id?editing:p);
      toast("Padrinho atualizado!","success");
    } else {
      editing.id = genId(newApp);
      editing.dataCadastro = new Date().toISOString();
      newApp.padrinhos = [...(newApp.padrinhos||[]), editing];
      toast("Padrinho cadastrado!","success");
    }
    setApp(newApp);
    setModal(false);
  };

  const remove = (id) => {
    if (!confirm("Excluir este padrinho?")) return;
    setApp({...app, padrinhos: app.padrinhos.filter(p=>p.id!==id)});
    toast("Padrinho removido","info");
  };

  return (
    <div>
      <div style={S.statsGrid}>
        <div style={S.statCard("#6BCB77")}><div style={{fontSize:24}}>💝</div><div style={{fontSize:24,fontWeight:800}}>{ativos.length}</div><div style={{fontSize:11,color:"#888"}}>Padrinhos Ativos</div></div>
        <div style={S.statCard("#E8548C")}><div style={{fontSize:24}}>💰</div><div style={{fontSize:24,fontWeight:800}}>{fmtR(ativos.reduce((s,p)=>s+p.valor,0))}</div><div style={{fontSize:11,color:"#888"}}>Receita Padrinhos/Mês</div></div>
        <div style={S.statCard("#9B59B6")}><div style={{fontSize:24}}>🎯</div><div style={{fontSize:24,fontWeight:800}}>{fmtR(app.gatos.reduce((s,g)=>s+(g.custoMensal||80),0))}</div><div style={{fontSize:11,color:"#888"}}>Meta p/ Sustentabilidade</div></div>
      </div>

      <div style={S.card}>
        <div style={S.cardTitle}>💝 Padrinhos <button onClick={openNew} style={{...S.btn("#E8548C"),marginLeft:"auto"}}>+ Novo Padrinho</button></div>
        <div style={{overflowX:"auto"}}>
          <table style={S.table}>
            <thead><tr>{["Nome","Telefone","Gatinho","Valor/Mês","Dia","Forma","Status","Ações"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
            <tbody>
              {padrinhos.map(p=>{
                const gato = app.gatos.find(g=>g.id===p.gatoId);
                return (
                  <tr key={p.id}>
                    <td style={{...S.td,fontWeight:700}}>{p.nome}</td>
                    <td style={S.td}>{p.telefone}</td>
                    <td style={S.td}>{gato?`${gato.emoji} ${gato.nome}`:"Geral"}</td>
                    <td style={S.td}>{fmtR(p.valor)}</td>
                    <td style={S.td}>Dia {p.dia}</td>
                    <td style={S.td}>{p.forma}</td>
                    <td style={S.td}><span style={S.badge(p.status==="ativo"?"#D4EDDA":"#E2E3E5",p.status==="ativo"?"#155724":"#383D41")}>{p.status==="ativo"?"Ativo":"Inativo"}</span></td>
                    <td style={S.td}><div style={{display:"flex",gap:4}}><button onClick={()=>openEdit(p)} style={S.btnSm("#E8548C")}>✏️</button><button onClick={()=>remove(p.id)} style={S.btnSm("#FF6B6B")}>🗑️</button></div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {padrinhos.length===0 && <p style={{textAlign:"center",color:"#999",padding:30}}>Nenhum padrinho cadastrado ainda.</p>}
      </div>

      <Modal show={modal} onClose={()=>setModal(false)} title={editing?.id?"✏️ Editar Padrinho":"💝 Novo Padrinho"}>
        {editing && (
          <div>
            <div style={S.formGrid}>
              <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Nome *</label><input style={S.input} value={editing.nome} onChange={e=>setEditing({...editing,nome:e.target.value})} /></div>
              <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Telefone</label><input style={S.input} value={editing.telefone} onChange={e=>setEditing({...editing,telefone:e.target.value})} /></div>
              <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>E-mail</label><input style={S.input} value={editing.email} onChange={e=>setEditing({...editing,email:e.target.value})} /></div>
              <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Gatinho</label><select style={S.select} value={editing.gatoId} onChange={e=>setEditing({...editing,gatoId:e.target.value})}><option value="">Geral</option>{app.gatos.map(g=><option key={g.id} value={g.id}>{g.emoji} {g.nome}</option>)}</select></div>
              <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Valor Mensal (R$)</label><input style={S.input} type="number" value={editing.valor} onChange={e=>setEditing({...editing,valor:parseFloat(e.target.value)||0})} /></div>
              <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Dia do Pagamento</label><select style={S.select} value={editing.dia} onChange={e=>setEditing({...editing,dia:e.target.value})}>{[1,5,10,15,20,25].map(d=><option key={d} value={d}>Dia {d}</option>)}</select></div>
              <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Forma</label><select style={S.select} value={editing.forma} onChange={e=>setEditing({...editing,forma:e.target.value})}><option>PIX</option><option>Transferência</option><option>Boleto</option></select></div>
              <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Status</label><select style={S.select} value={editing.status} onChange={e=>setEditing({...editing,status:e.target.value})}><option value="ativo">Ativo</option><option value="inativo">Inativo</option></select></div>
            </div>
            <div style={{display:"flex",gap:10,marginTop:20}}>
              <button onClick={()=>setModal(false)} style={{...S.btn("#eee","#666"),flex:1}}>Cancelar</button>
              <button onClick={save} style={{...S.btn("#E8548C"),flex:1}}>💾 Salvar</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ===== FINANCEIRO =====
function FinanceiroSection({ app, setApp, showToast: toast }) {
  const [modalR, setModalR] = useState(false);
  const [modalD, setModalD] = useState(false);
  const [editingR, setEditingR] = useState(null);
  const [editingD, setEditingD] = useState(null);
  const [filtroMes, setFiltroMes] = useState(curMonth());
  const [filtroTipo, setFiltroTipo] = useState("");

  const lancs = (app.lancamentos||[]).filter(l => {
    if (filtroMes && !l.data?.startsWith(filtroMes)) return false;
    if (filtroTipo && l.tipo !== filtroTipo) return false;
    return true;
  }).sort((a,b)=>new Date(b.data)-new Date(a.data));

  const receitas = lancs.filter(l=>l.tipo==="receita").reduce((s,l)=>s+l.valor,0);
  const despesas = lancs.filter(l=>l.tipo==="despesa").reduce((s,l)=>s+l.valor,0);
  const saldo = receitas - despesas;

  const emptyR = {data:"",categoria:"Doações",valor:0,doador:"",descricao:""};
  const emptyD = {data:"",categoria:"Ração",valor:0,gatoId:"",descricao:""};

  const saveR = () => {
    if (!editingR.data||!editingR.valor) { toast("Data e valor obrigatórios","error"); return; }
    const newApp = {...app};
    const l = {...editingR, tipo:"receita"};
    if (l.id) { newApp.lancamentos = newApp.lancamentos.map(x=>x.id===l.id?l:x); }
    else { l.id = genId(newApp); newApp.lancamentos = [...(newApp.lancamentos||[]),l]; }
    setApp(newApp); setModalR(false); toast("Receita registrada!","success");
  };

  const saveD = () => {
    if (!editingD.data||!editingD.valor) { toast("Data e valor obrigatórios","error"); return; }
    const newApp = {...app};
    const l = {...editingD, tipo:"despesa"};
    if (l.id) { newApp.lancamentos = newApp.lancamentos.map(x=>x.id===l.id?l:x); }
    else { l.id = genId(newApp); newApp.lancamentos = [...(newApp.lancamentos||[]),l]; }
    setApp(newApp); setModalD(false); toast("Despesa registrada!","success");
  };

  const remove = (id) => {
    if (!confirm("Excluir este lançamento?")) return;
    setApp({...app, lancamentos: app.lancamentos.filter(l=>l.id!==id)});
    toast("Lançamento removido","info");
  };

  // Gráfico de categorias de despesa
  const despCats = {};
  (app.lancamentos||[]).filter(l=>l.tipo==="despesa"&&l.data?.startsWith(filtroMes)).forEach(l=>{
    despCats[l.categoria] = (despCats[l.categoria]||0)+l.valor;
  });
  const totalDesp = Object.values(despCats).reduce((s,v)=>s+v,0);

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20}}>
        <div style={{background:"linear-gradient(135deg,#D4EDDA,#C3E6CB)",borderRadius:16,padding:20,textAlign:"center"}}>
          <div style={{fontSize:11,fontWeight:700,color:"#155724"}}>RECEITAS</div>
          <div style={{fontSize:22,fontWeight:800,color:"#155724"}}>{fmtR(receitas)}</div>
        </div>
        <div style={{background:"linear-gradient(135deg,#F8D7DA,#F5C6CB)",borderRadius:16,padding:20,textAlign:"center"}}>
          <div style={{fontSize:11,fontWeight:700,color:"#721C24"}}>DESPESAS</div>
          <div style={{fontSize:22,fontWeight:800,color:"#721C24"}}>{fmtR(despesas)}</div>
        </div>
        <div style={{background:saldo>=0?"linear-gradient(135deg,#D1ECF1,#BEE5EB)":"linear-gradient(135deg,#F8D7DA,#F5C6CB)",borderRadius:16,padding:20,textAlign:"center"}}>
          <div style={{fontSize:11,fontWeight:700,color:saldo>=0?"#0C5460":"#721C24"}}>SALDO</div>
          <div style={{fontSize:22,fontWeight:800,color:saldo>=0?"#0C5460":"#721C24"}}>{fmtR(saldo)}</div>
        </div>
      </div>

      <div style={S.card}>
        <div style={S.cardTitle}>
          💰 Lançamentos
          <div style={{marginLeft:"auto",display:"flex",gap:8}}>
            <button onClick={()=>{setEditingR({...emptyR});setModalR(true);}} style={S.btn("#6BCB77")}>+ Receita</button>
            <button onClick={()=>{setEditingD({...emptyD});setModalD(true);}} style={S.btn("#FF6B6B")}>+ Despesa</button>
          </div>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
          <input type="month" value={filtroMes} onChange={e=>setFiltroMes(e.target.value)} style={{...S.input,width:180}} />
          <select value={filtroTipo} onChange={e=>setFiltroTipo(e.target.value)} style={{...S.select,width:140}}>
            <option value="">Todos</option><option value="receita">Receitas</option><option value="despesa">Despesas</option>
          </select>
        </div>
        <div style={{overflowX:"auto"}}>
          <table style={S.table}>
            <thead><tr>{["Data","Tipo","Categoria","Descrição","Valor","Ações"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
            <tbody>
              {lancs.map(l=>(
                <tr key={l.id}>
                  <td style={S.td}>{fmtD(l.data)}</td>
                  <td style={S.td}><span style={S.badge(l.tipo==="receita"?"#D4EDDA":"#F8D7DA",l.tipo==="receita"?"#155724":"#721C24")}>{l.tipo==="receita"?"💰 Receita":"💸 Despesa"}</span></td>
                  <td style={S.td}>{l.categoria}</td>
                  <td style={S.td}>{[l.descricao,l.doador].filter(Boolean).join(" - ")||"-"}</td>
                  <td style={{...S.td,fontWeight:700,color:l.tipo==="receita"?"#155724":"#721C24"}}>{l.tipo==="receita"?"+":"-"}{fmtR(l.valor)}</td>
                  <td style={S.td}><button onClick={()=>remove(l.id)} style={S.btnSm("#FF6B6B")}>🗑️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {lancs.length===0 && <p style={{textAlign:"center",color:"#999",padding:30}}>Nenhum lançamento encontrado.</p>}
      </div>

      {totalDesp > 0 && (
        <div style={S.card}>
          <div style={S.cardTitle}>📊 Despesas por Categoria</div>
          {Object.entries(despCats).sort((a,b)=>b[1]-a[1]).map(([cat,val])=>{
            const pct = totalDesp?(val/totalDesp*100):0;
            return (
              <div key={cat} style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}>
                  <span>{cat}</span><span>{fmtR(val)} ({pct.toFixed(0)}%)</span>
                </div>
                <div style={S.progressBar}><div style={S.progressFill(pct,"#E8548C")}>{pct>10?pct.toFixed(0)+"%":""}</div></div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Receita */}
      <Modal show={modalR} onClose={()=>setModalR(false)} title="💰 Registrar Receita">
        {editingR && (
          <div>
            <div style={S.formGrid}>
              <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Data *</label><input type="date" style={S.input} value={editingR.data} onChange={e=>setEditingR({...editingR,data:e.target.value})} /></div>
              <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Categoria</label><select style={S.select} value={editingR.categoria} onChange={e=>setEditingR({...editingR,categoria:e.target.value})}>{["Padrinhos","Doações","Rifas/Bazares","Parcerias","Eventos","Loja","Outros"].map(c=><option key={c}>{c}</option>)}</select></div>
              <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Valor (R$) *</label><input type="number" style={S.input} value={editingR.valor} onChange={e=>setEditingR({...editingR,valor:parseFloat(e.target.value)||0})} /></div>
              <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Doador/Origem</label><input style={S.input} value={editingR.doador} onChange={e=>setEditingR({...editingR,doador:e.target.value})} /></div>
            </div>
            <div style={{marginTop:12}}><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Descrição</label><input style={S.input} value={editingR.descricao} onChange={e=>setEditingR({...editingR,descricao:e.target.value})} /></div>
            <div style={{display:"flex",gap:10,marginTop:20}}>
              <button onClick={()=>setModalR(false)} style={{...S.btn("#eee","#666"),flex:1}}>Cancelar</button>
              <button onClick={saveR} style={{...S.btn("#6BCB77"),flex:1}}>💾 Registrar</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Despesa */}
      <Modal show={modalD} onClose={()=>setModalD(false)} title="💸 Registrar Despesa">
        {editingD && (
          <div>
            <div style={S.formGrid}>
              <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Data *</label><input type="date" style={S.input} value={editingD.data} onChange={e=>setEditingD({...editingD,data:e.target.value})} /></div>
              <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Categoria</label><select style={S.select} value={editingD.categoria} onChange={e=>setEditingD({...editingD,categoria:e.target.value})}>{["Ração","Areia","Veterinário","Medicamentos","Vacinas","Castração","Emergências","Limpeza","Infraestrutura","Fraldas","Transporte","Outros"].map(c=><option key={c}>{c}</option>)}</select></div>
              <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Valor (R$) *</label><input type="number" style={S.input} value={editingD.valor} onChange={e=>setEditingD({...editingD,valor:parseFloat(e.target.value)||0})} /></div>
              <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Gatinho</label><select style={S.select} value={editingD.gatoId} onChange={e=>setEditingD({...editingD,gatoId:e.target.value})}><option value="">Geral</option>{app.gatos.map(g=><option key={g.id} value={g.id}>{g.emoji} {g.nome}</option>)}</select></div>
            </div>
            <div style={{marginTop:12}}><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Descrição</label><input style={S.input} value={editingD.descricao} onChange={e=>setEditingD({...editingD,descricao:e.target.value})} /></div>
            <div style={{display:"flex",gap:10,marginTop:20}}>
              <button onClick={()=>setModalD(false)} style={{...S.btn("#eee","#666"),flex:1}}>Cancelar</button>
              <button onClick={saveD} style={{...S.btn("#FF6B6B"),flex:1}}>💾 Registrar</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ===== BACKUP / CONFIG =====
function ConfigSection({ app, setApp, showToast: toast }) {
  const exportData = () => {
    const blob = new Blob([JSON.stringify(app,null,2)],{type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `casadosgatinhos_backup_${new Date().toISOString().split("T")[0]}.json`;
    a.click(); URL.revokeObjectURL(url);
    toast("Backup exportado!","success");
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (confirm("Substituir todos os dados pelo backup importado?")) {
          setApp(data);
          toast("Dados importados!","success");
        }
      } catch { toast("Erro ao ler arquivo","error"); }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const clearData = () => {
    if (confirm("ATENÇÃO: Isso apagará TODOS os dados e voltará ao estado inicial!")) {
      setApp(JSON.parse(JSON.stringify(INITIAL_STATE)));
      toast("Dados resetados","info");
    }
  };

  return (
    <div>
      <div style={S.card}>
        <div style={S.cardTitle}>⚙️ Configurações</div>
        <div style={S.formGrid}>
          <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Nome da Organização</label><input style={S.input} value={app.config?.nome||""} onChange={e=>setApp({...app,config:{...app.config,nome:e.target.value}})} /></div>
          <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Telefone/WhatsApp</label><input style={S.input} value={app.config?.telefone||""} onChange={e=>setApp({...app,config:{...app.config,telefone:e.target.value}})} /></div>
          <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>E-mail</label><input style={S.input} value={app.config?.email||""} onChange={e=>setApp({...app,config:{...app.config,email:e.target.value}})} /></div>
          <div><label style={{fontSize:12,fontWeight:600,color:"#555"}}>Chave PIX</label><input style={S.input} value={app.config?.pix||""} onChange={e=>setApp({...app,config:{...app.config,pix:e.target.value}})} /></div>
        </div>
      </div>

      <div style={S.card}>
        <div style={S.cardTitle}>💾 Backup e Restauração</div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <button onClick={exportData} style={S.btn("#6BCB77")}>📥 Exportar JSON</button>
          <button onClick={()=>document.getElementById("import-file").click()} style={S.btn("#4ECDC4")}>📤 Importar JSON</button>
          <input id="import-file" type="file" accept=".json" style={{display:"none"}} onChange={importData} />
          <button onClick={clearData} style={S.btn("#FF6B6B")}>🗑️ Resetar Tudo</button>
        </div>
        <p style={{fontSize:11,color:"#999",marginTop:12}}>Os dados são salvos automaticamente no navegador (localStorage). Faça backups regulares exportando o JSON.</p>
      </div>

      <div style={S.card}>
        <div style={S.cardTitle}>📊 Estatísticas do Sistema</div>
        <div style={{fontSize:13,lineHeight:2,color:"#555"}}>
          <div>Gatos cadastrados: <b>{(app.gatos||[]).length}</b></div>
          <div>Padrinhos cadastrados: <b>{(app.padrinhos||[]).length}</b></div>
          <div>Lançamentos financeiros: <b>{(app.lancamentos||[]).length}</b></div>
          <div>Eventos cadastrados: <b>{(app.eventos||[]).length}</b></div>
          <div>Última atualização: <b>{new Date().toLocaleString("pt-BR")}</b></div>
        </div>
      </div>
    </div>
  );
}

// ===== MAIN APP =====
export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [app, setAppState] = useState(null);
  const [section, setSection] = useState("dashboard");
  const [toastData, setToastData] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) { setAppState(JSON.parse(saved)); }
        else { setAppState(JSON.parse(JSON.stringify(INITIAL_STATE))); }
        const auth = sessionStorage.getItem("cdg_auth");
        if (auth === "true") setAuthenticated(true);
      } catch { setAppState(JSON.parse(JSON.stringify(INITIAL_STATE))); }
    }
  }, []);

  const setApp = useCallback((newApp) => {
    setAppState(newApp);
    if (typeof window !== "undefined") {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(newApp)); } catch {}
    }
  }, []);

  const handleLogin = () => {
    setAuthenticated(true);
    if (typeof window !== "undefined") sessionStorage.setItem("cdg_auth", "true");
  };

  const handleLogout = () => {
    setAuthenticated(false);
    if (typeof window !== "undefined") sessionStorage.removeItem("cdg_auth");
  };

  const toast = (msg, type) => setToastData({msg,type,key:Date.now()});

  if (!app) return <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",fontFamily:"'Nunito',sans-serif"}}>Carregando...</div>;

  if (!authenticated) return (
    <>
      <Head><title>Admin — Casa dos Gatinhos</title><link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet"/></Head>
      <LoginScreen onLogin={handleLogin} />
    </>
  );

  const tabs = [
    {id:"dashboard",label:"Dashboard",icon:"🏠"},
    {id:"gatos",label:"Gatinhos",icon:"🐱"},
    {id:"padrinhos",label:"Padrinhos",icon:"💝"},
    {id:"financeiro",label:"Financeiro",icon:"💰"},
    {id:"config",label:"Config",icon:"⚙️"},
  ];

  return (
    <div style={S.page}>
      <Head>
        <title>Admin — Casa dos Gatinhos</title>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      </Head>

      <header style={S.header}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:28}}>🐱</span>
          <div>
            <div style={{color:"#fff",fontFamily:"'Quicksand',sans-serif",fontWeight:700,fontSize:16}}>Casa dos Gatinhos</div>
            <div style={{color:"rgba(255,255,255,0.8)",fontSize:11}}>Painel Administrativo</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <a href="/" style={{color:"rgba(255,255,255,0.8)",fontSize:12,textDecoration:"none"}}>🌐 Site Público</a>
          <button onClick={handleLogout} style={{...S.btn("rgba(255,255,255,0.15)","#fff"),fontSize:12,border:"1px solid rgba(255,255,255,0.3)"}}>Sair</button>
        </div>
      </header>

      <nav style={S.nav}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setSection(t.id)} style={S.navBtn(section===t.id)}>
            <span style={{marginRight:4}}>{t.icon}</span>{t.label}
          </button>
        ))}
      </nav>

      <main style={S.main}>
        {section==="dashboard" && <Dashboard app={app} />}
        {section==="gatos" && <GatosSection app={app} setApp={setApp} showToast={toast} />}
        {section==="padrinhos" && <PadrinhosSection app={app} setApp={setApp} showToast={toast} />}
        {section==="financeiro" && <FinanceiroSection app={app} setApp={setApp} showToast={toast} />}
        {section==="config" && <ConfigSection app={app} setApp={setApp} showToast={toast} />}
      </main>

      {toastData && <Toast msg={toastData.msg} type={toastData.type} onClose={()=>setToastData(null)} key={toastData.key} />}
    </div>
  );
}

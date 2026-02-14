import { useState, useEffect, useRef } from "react";
import Head from "next/head";

// === DATA ===
const MEMORIAL = [
  { name: "Vitória", emoji: "👑", story: "Sobreviveu a abuso e tiro de chumbinho. Resgatada, reabilitada, virou embaixadora da Casa. Ia a todas as festas vestida a caráter, fazia fisioterapia regularmente. Paraplégica e guerreira. Símbolo de força e resiliência.", color: "#E8548C", cause: "Evoluiu a óbito após procedimento clínico — ausência de rastreamento de tratamento na clínica." },
  { name: "Sucrilhos", emoji: "🌟", story: "Lutou bravamente contra a PIF (Peritonite Infecciosa Felina). Recebeu todo o carinho e cuidado que merecia. Não resistiu ao vírus, mas foi amado até o fim.", color: "#F4A460", cause: "PIF — Peritonite Infecciosa Felina." },
  { name: "Bernardo", emoji: "💙", story: "Enfrentou a FIV (Imunodeficiência Felina) com apoio dedicado. Cada dia era uma conquista. Seu tratamento foi acompanhado de perto até o final.", color: "#6495ED", cause: "FIV — evoluiu a óbito sob cuidados." },
  { name: "Ozzy", emoji: "🎸", story: "Chegou com quadro de FeLV (Leucemia Felina). Apesar da gravidade, merecia tratamento digno. A investigação de seu caso revelou falhas graves na clínica anterior.", color: "#9370DB", cause: "FeLV — ausência de rastreamento de tratamento identificada." },
  { name: "Chico", emoji: "🍀", story: "Assim como Ozzy, chegou com FeLV. Seu caso, junto com os demais, foi o ponto de virada: a solicitação de prontuários revelou negligência e motivou a mudança de clínica.", color: "#2E8B57", cause: "FeLV — caso que motivou a intervenção e mudança de clínica." },
];

const RESIDENTS = [
  { name: "Luna", status: "saudável", emoji: "🌙", needs: "Ração especial + vacinas em dia", personality: "Tímida no início, depois vira grude", sponsorSlots: 3, sponsored: 1 },
  { name: "Pipoca", status: "tratamento", emoji: "🍿", needs: "Medicação diária + acompanhamento veterinário", personality: "Brincalhona e curiosa, adora caixas de papelão", sponsorSlots: 3, sponsored: 0 },
  { name: "Mel", status: "saudável", emoji: "🍯", needs: "Ração + cuidados básicos", personality: "A mais carinhosa, ronrona ao menor toque", sponsorSlots: 3, sponsored: 2 },
  { name: "Thor", status: "paraplégico", emoji: "⚡", needs: "Fraldas + fisioterapia quinzenal + ração especial", personality: "Guerreiro! Não se deixa abater, adora brincar", sponsorSlots: 3, sponsored: 1 },
  { name: "Amora", status: "FIV+", emoji: "🫐", needs: "Medicação + ração premium + ambiente isolado", personality: "Serena e amorosa, gosta de colo", sponsorSlots: 3, sponsored: 0 },
  { name: "Caramelo", status: "saudável", emoji: "🧡", needs: "Ração + castração pendente", personality: "O palhaço da casa, sempre aprontando", sponsorSlots: 3, sponsored: 1 },
];

const EVENTS = [
  { date: "15 Fev", title: "Campanha Carnaval", desc: "Copos térmicos e combos especiais com desconto!", type: "venda", active: true },
  { date: "22 Fev", title: "Live: Conheça os Gatinhos", desc: "Tour virtual pela Casa dos Gatinhos no Instagram", type: "evento", active: true },
  { date: "01 Mar", title: "Prestação de Contas", desc: "Relatório financeiro aberto de fevereiro", type: "transparência", active: true },
  { date: "08 Mar", title: "Feira de Adoção", desc: "Encontre seu novo melhor amigo!", type: "adoção", active: false },
  { date: "15 Mar", title: "Bazar Solidário", desc: "Produtos da Casa dos Gatinhos + doações de parceiros", type: "venda", active: false },
];

const PRODUCTS = [
  { name: "Copo Térmico 600ml", price: 60, impact: "Custeia 3 dias de ração para todos os gatinhos", emoji: "🥤", colors: ["Rosa", "Preto", "Lilás", "Verde", "Branco"] },
  { name: "Combo 2 Copos", price: 110, impact: "1 semana de ração + economia de R$10", emoji: "🥤🥤", colors: [] },
  { name: "Combo 3 Copos", price: 150, impact: "10 dias de ração + economia de R$30", emoji: "🎁", colors: [] },
  { name: "Ecobag Personalizada", price: 35, impact: "1 consulta veterinária básica", emoji: "👜", colors: [] },
  { name: "Kit 3 Adesivos", price: 18, impact: "1 dose de vermífugo", emoji: "✨", colors: [] },
  { name: "Combo Folião (Copo + Ecobag)", price: 85, impact: "4 dias de ração + 1 consulta", emoji: "🎉", colors: [] },
];

const SPONSOR_TIERS = [
  { name: "Amigo Felino", price: 15, emoji: "🐱", color: "#F8B4C8", benefits: ["Foto semanal do seu afilhado", "Nome no mural digital de apoiadores", "Grupo exclusivo WhatsApp"] },
  { name: "Protetor", price: 30, emoji: "🛡️", color: "#E8548C", benefits: ["Tudo do Amigo Felino", "Vídeo mensal personalizado do gatinho", "10% desconto na loja", "Atualizações de saúde prioritárias"] },
  { name: "Anjo Protetor", price: 60, emoji: "👼", color: "#C41E5C", benefits: ["Tudo do Protetor", "Apadrinhamento nominal de um gato", "Kit exclusivo anual", "Visita à Casa dos Gatinhos", "Certificado digital de Anjo"] },
];

// === COMPONENTS ===

function Nav({ active, setActive }) {
  const tabs = [
    { id: "home", label: "Início", icon: "🏠" },
    { id: "animals", label: "Nossos Gatos", icon: "🐱" },
    { id: "memorial", label: "In Memoriam", icon: "🕊️" },
    { id: "sponsor", label: "Seja Padrinho", icon: "💝" },
    { id: "shop", label: "Loja", icon: "🛍️" },
    { id: "events", label: "Eventos", icon: "📅" },
    { id: "transparency", label: "Contas", icon: "📊" },
  ];
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,245,248,0.95)", backdropFilter: "blur(12px)", borderBottom: "2px solid #E8548C", padding: "0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", overflowX: "auto", gap: 0 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)}
            style={{
              flex: "0 0 auto", padding: "12px 16px", border: "none", cursor: "pointer",
              background: active === t.id ? "#E8548C" : "transparent",
              color: active === t.id ? "#fff" : "#666",
              fontFamily: "'Nunito', sans-serif", fontWeight: active === t.id ? 800 : 600,
              fontSize: 13, transition: "all 0.3s", whiteSpace: "nowrap",
              borderBottom: active === t.id ? "3px solid #C41E5C" : "3px solid transparent"
            }}>
            <span style={{ marginRight: 4 }}>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <div style={{
      background: "linear-gradient(135deg, #FFF5F8 0%, #FFE4ED 30%, #F8B4C8 70%, #E8548C 100%)",
      padding: "60px 24px 50px", textAlign: "center", position: "relative", overflow: "hidden"
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.06, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10 C25 2 15 2 12 8 C9 14 18 18 30 28 C42 18 51 14 48 8 C45 2 35 2 30 10Z' fill='%23E8548C'/%3E%3C/svg%3E\")", backgroundSize: "60px 60px" }} />
      <div style={{ position: "relative" }}>
        <div style={{ fontSize: 64, marginBottom: 8 }}>🐱</div>
        <h1 style={{ fontFamily: "'Baloo 2', cursive", fontSize: "clamp(32px, 6vw, 52px)", color: "#C41E5C", margin: "0 0 8px", letterSpacing: -1 }}>
          Casa dos Gatinhos
        </h1>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 18, color: "#8B3A62", maxWidth: 500, margin: "0 auto 24px", lineHeight: 1.5 }}>
          Resgate. Cuidado. Dignidade.<br/>
          <em style={{ fontSize: 15, opacity: 0.8 }}>Todo animal merece tratamento digno, independente da doença.</em>
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <StatBadge number="15+" label="Gatos resgatados" />
          <StatBadge number="R$3k" label="Meta mensal" />
          <StatBadge number="80+" label="Apoiadores" />
        </div>
      </div>
    </div>
  );
}

function StatBadge({ number, label }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.85)", borderRadius: 16, padding: "12px 20px", minWidth: 100, backdropFilter: "blur(8px)" }}>
      <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: 24, color: "#E8548C", fontWeight: 800 }}>{number}</div>
      <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color: "#8B3A62", fontWeight: 600 }}>{label}</div>
    </div>
  );
}

function SectionTitle({ emoji, title, subtitle }) {
  return (
    <div style={{ textAlign: "center", padding: "40px 24px 20px" }}>
      <div style={{ fontSize: 36, marginBottom: 8 }}>{emoji}</div>
      <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 32, color: "#C41E5C", margin: "0 0 6px" }}>{title}</h2>
      {subtitle && <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, color: "#8B3A62", margin: 0, opacity: 0.8 }}>{subtitle}</p>}
    </div>
  );
}

function AnimalCard({ animal, onClick }) {
  const statusColors = { "saudável": "#2E8B57", "tratamento": "#E8548C", "paraplégico": "#9370DB", "FIV+": "#E07020" };
  const statusColor = statusColors[animal.status] || "#666";
  const sponsorPct = (animal.sponsored / animal.sponsorSlots) * 100;

  return (
    <div onClick={onClick} style={{
      background: "#fff", borderRadius: 20, padding: 20, cursor: "pointer",
      boxShadow: "0 4px 20px rgba(232,84,140,0.1)", border: "2px solid transparent",
      transition: "all 0.3s", minWidth: 220, flex: "1 1 250px", maxWidth: 320,
      position: "relative", overflow: "hidden"
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = "#E8548C"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(232,84,140,0.2)"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(232,84,140,0.1)"; }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 36 }}>{animal.emoji}</div>
        <span style={{ background: statusColor, color: "#fff", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>{animal.status}</span>
      </div>
      <h3 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 22, color: "#2D2D2D", margin: "0 0 4px" }}>{animal.name}</h3>
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#666", margin: "0 0 12px", lineHeight: 1.4 }}>{animal.personality}</p>
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color: "#8B3A62", fontWeight: 700 }}>Padrinhos</span>
          <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color: "#8B3A62" }}>{animal.sponsored}/{animal.sponsorSlots}</span>
        </div>
        <div style={{ background: "#F0F0F0", borderRadius: 10, height: 8, overflow: "hidden" }}>
          <div style={{ background: "linear-gradient(90deg, #F8B4C8, #E8548C)", width: `${sponsorPct}%`, height: "100%", borderRadius: 10, transition: "width 0.5s" }} />
        </div>
      </div>
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, color: "#E8548C", margin: 0, fontWeight: 600 }}>
        {animal.sponsorSlots - animal.sponsored > 0 ? `${animal.sponsorSlots - animal.sponsored} vaga(s) de padrinho disponível!` : "Todos os padrinhos preenchidos ✨"}
      </p>
    </div>
  );
}

function AnimalModal({ animal, onClose }) {
  if (!animal) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 24, padding: 32, maxWidth: 480, width: "100%", maxHeight: "80vh", overflow: "auto", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 12, right: 16, background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#999" }}>×</button>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 56, marginBottom: 8 }}>{animal.emoji}</div>
          <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 28, color: "#C41E5C", margin: 0 }}>{animal.name}</h2>
        </div>
        <div style={{ background: "#FFF5F8", borderRadius: 16, padding: 16, marginBottom: 16 }}>
          <h4 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#E8548C", margin: "0 0 6px", fontWeight: 800 }}>PERSONALIDADE</h4>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "#444", margin: 0, lineHeight: 1.5 }}>{animal.personality}</p>
        </div>
        <div style={{ background: "#F0F8FF", borderRadius: 16, padding: 16, marginBottom: 16 }}>
          <h4 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#4A90D9", margin: "0 0 6px", fontWeight: 800 }}>NECESSIDADES</h4>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "#444", margin: 0, lineHeight: 1.5 }}>{animal.needs}</p>
        </div>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button style={{ background: "linear-gradient(135deg, #E8548C, #C41E5C)", color: "#fff", border: "none", borderRadius: 30, padding: "14px 36px", fontFamily: "'Nunito', sans-serif", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 15px rgba(232,84,140,0.3)" }}>
            💝 Apadrinhar {animal.name}
          </button>
        </div>
      </div>
    </div>
  );
}

function MemorialSection() {
  const [expanded, setExpanded] = useState(null);
  return (
    <div style={{ background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)", padding: "0 0 50px" }}>
      <div style={{ textAlign: "center", padding: "40px 24px 20px" }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🕊️</div>
        <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 32, color: "#F8B4C8", margin: "0 0 6px" }}>In Memoriam</h2>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.6)", margin: "0 0 8px" }}>
          Eles partiram, mas suas histórias continuam salvando vidas.
        </p>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0, fontStyle: "italic", maxWidth: 500, margin: "0 auto" }}>
          A investigação dos prontuários destes animais revelou a ausência de rastreamento de tratamento — e mudou para sempre a forma como a Casa dos Gatinhos cuida de seus protegidos.
        </p>
      </div>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
        {MEMORIAL.map((m, i) => (
          <div key={m.name} onClick={() => setExpanded(expanded === i ? null : i)} style={{
            background: expanded === i ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
            borderRadius: 16, padding: "20px 24px", marginBottom: 12, cursor: "pointer",
            borderLeft: `4px solid ${m.color}`, transition: "all 0.3s",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: 20, marginRight: 8 }}>{m.emoji}</span>
                <span style={{ fontFamily: "'Baloo 2', cursive", fontSize: 20, color: m.color }}>{m.name}</span>
              </div>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 20, transition: "transform 0.3s", transform: expanded === i ? "rotate(180deg)" : "rotate(0)" }}>▼</span>
            </div>
            {expanded === i && (
              <div style={{ marginTop: 16, animation: "fadeIn 0.3s ease" }}>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, margin: "0 0 12px" }}>{m.story}</p>
                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: 12 }}>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                    <strong style={{ color: m.color }}>Causa:</strong> {m.cause}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>
          "Resistir aos vírus depende do organismo. Direito ao tratamento digno, não."
        </p>
      </div>
    </div>
  );
}

function SponsorSection() {
  return (
    <div style={{ background: "linear-gradient(135deg, #FFF5F8 0%, #FFE4ED 100%)", padding: "0 0 50px" }}>
      <SectionTitle emoji="💝" title="Seja Padrinho" subtitle="Escolha como fazer parte da vida de um gatinho" />
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", padding: "0 24px", maxWidth: 900, margin: "0 auto" }}>
        {SPONSOR_TIERS.map((tier, i) => (
          <div key={tier.name} style={{
            background: "#fff", borderRadius: 24, padding: 28, flex: "1 1 250px", maxWidth: 280,
            boxShadow: i === 1 ? "0 8px 40px rgba(232,84,140,0.2)" : "0 4px 20px rgba(0,0,0,0.06)",
            border: i === 1 ? "3px solid #E8548C" : "2px solid #f0f0f0",
            transform: i === 1 ? "scale(1.04)" : "scale(1)", position: "relative",
          }}>
            {i === 1 && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#E8548C", color: "#fff", padding: "4px 16px", borderRadius: 20, fontSize: 11, fontFamily: "'Nunito', sans-serif", fontWeight: 800 }}>MAIS POPULAR</div>}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>{tier.emoji}</div>
              <h3 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 22, color: tier.color, margin: "0 0 4px" }}>{tier.name}</h3>
              <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: 32, color: "#2D2D2D" }}>
                R$ {tier.price}<span style={{ fontSize: 14, color: "#999", fontWeight: 400 }}>/mês</span>
              </div>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
              {tier.benefits.map((b, j) => (
                <li key={j} style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#555", padding: "6px 0", borderBottom: "1px solid #f5f5f5", display: "flex", gap: 8, alignItems: "start" }}>
                  <span style={{ color: "#E8548C", flexShrink: 0 }}>✓</span>{b}
                </li>
              ))}
            </ul>
            <button style={{
              width: "100%", background: `linear-gradient(135deg, ${tier.color}, ${tier.color}dd)`,
              color: "#fff", border: "none", borderRadius: 14, padding: "12px 0",
              fontFamily: "'Nunito', sans-serif", fontSize: 15, fontWeight: 800, cursor: "pointer",
              boxShadow: `0 4px 15px ${tier.color}40`
            }}>
              Quero ser {tier.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShopSection() {
  return (
    <div style={{ padding: "0 0 50px", background: "#fff" }}>
      <SectionTitle emoji="🛍️" title="Loja Solidária" subtitle="Cada produto vendido sustenta a Casa dos Gatinhos" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, padding: "0 24px", maxWidth: 900, margin: "0 auto" }}>
        {PRODUCTS.map(p => (
          <div key={p.name} style={{ background: "#FFF5F8", borderRadius: 20, padding: 20, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
              <span style={{ fontSize: 32 }}>{p.emoji}</span>
              <span style={{ fontFamily: "'Baloo 2', cursive", fontSize: 24, color: "#E8548C" }}>R$ {p.price}</span>
            </div>
            <h3 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 16, fontWeight: 800, color: "#2D2D2D", margin: "0 0 6px" }}>{p.name}</h3>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, color: "#888", margin: "0 0 12px", lineHeight: 1.4, flex: 1 }}>
              <span style={{ color: "#E8548C", fontWeight: 700 }}>Impacto:</span> {p.impact}
            </p>
            {p.colors.length > 0 && (
              <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
                {p.colors.map(c => (
                  <span key={c} style={{ fontFamily: "'Nunito', sans-serif", fontSize: 10, background: "#fff", padding: "2px 8px", borderRadius: 10, color: "#666" }}>{c}</span>
                ))}
              </div>
            )}
            <button style={{ background: "#E8548C", color: "#fff", border: "none", borderRadius: 12, padding: "10px 0", fontFamily: "'Nunito', sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer", width: "100%" }}>
              Comprar via Pix
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventsSection() {
  const typeColors = { venda: "#E8548C", evento: "#4A90D9", transparência: "#2E8B57", adoção: "#F4A460" };
  return (
    <div style={{ padding: "0 0 50px", background: "#FAFAFA" }}>
      <SectionTitle emoji="📅" title="Eventos & Campanhas" subtitle="Participe, compre, ajude, interaja!" />
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px" }}>
        {EVENTS.map((e, i) => (
          <div key={i} style={{
            display: "flex", gap: 16, padding: 20, marginBottom: 12,
            background: e.active ? "#fff" : "#f5f5f5", borderRadius: 16,
            border: e.active ? `2px solid ${typeColors[e.type]}` : "2px solid #e0e0e0",
            opacity: e.active ? 1 : 0.6
          }}>
            <div style={{ minWidth: 60, textAlign: "center" }}>
              <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: 18, color: typeColors[e.type], fontWeight: 800 }}>{e.date.split(" ")[0]}</div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color: "#999" }}>{e.date.split(" ")[1]}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                <h3 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 16, fontWeight: 800, color: "#2D2D2D", margin: 0 }}>{e.title}</h3>
                <span style={{ background: typeColors[e.type], color: "#fff", padding: "2px 8px", borderRadius: 10, fontSize: 10, fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>{e.type}</span>
                {e.active && <span style={{ background: "#2E8B57", color: "#fff", padding: "2px 8px", borderRadius: 10, fontSize: 10, fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>ATIVO</span>}
              </div>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#666", margin: 0 }}>{e.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TransparencySection() {
  const months = [
    { month: "Jan/26", income: 1200, expense: 3100, deficit: -1900 },
    { month: "Fev/26", income: 1800, expense: 3200, deficit: -1400 },
  ];
  const categories = [
    { name: "Veterinário/Clínica", value: 1400, pct: 44 },
    { name: "Ração e alimentação", value: 800, pct: 25 },
    { name: "Medicamentos", value: 500, pct: 16 },
    { name: "Fraldas e higiene", value: 300, pct: 9 },
    { name: "Outros (transporte, etc)", value: 200, pct: 6 },
  ];
  const barColors = ["#E8548C", "#F8B4C8", "#C41E5C", "#9370DB", "#ccc"];

  return (
    <div style={{ padding: "0 0 50px", background: "#fff" }}>
      <SectionTitle emoji="📊" title="Prestação de Contas" subtitle="Transparência total — cada centavo importa" />
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ background: "#FFF5F8", borderRadius: 20, padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, fontWeight: 800, color: "#E8548C", margin: "0 0 16px" }}>GASTOS MENSAIS POR CATEGORIA</h3>
          {categories.map((c, i) => (
            <div key={c.name} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#444" }}>{c.name}</span>
                <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#666", fontWeight: 700 }}>R$ {c.value} ({c.pct}%)</span>
              </div>
              <div style={{ background: "#f0f0f0", borderRadius: 6, height: 10, overflow: "hidden" }}>
                <div style={{ background: barColors[i], width: `${c.pct}%`, height: "100%", borderRadius: 6, transition: "width 0.8s ease" }} />
              </div>
            </div>
          ))}
          <div style={{ borderTop: "2px solid #E8548C", marginTop: 16, paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, fontWeight: 800, color: "#C41E5C" }}>TOTAL MENSAL NECESSÁRIO</span>
            <span style={{ fontFamily: "'Baloo 2', cursive", fontSize: 22, color: "#C41E5C" }}>R$ 3.200</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {months.map(m => (
            <div key={m.month} style={{ background: "#FAFAFA", borderRadius: 16, padding: 20, textAlign: "center" }}>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#999", fontWeight: 700, marginBottom: 8 }}>{m.month}</div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#2E8B57" }}>Recebido: <strong>R$ {m.income.toLocaleString()}</strong></div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#E8548C" }}>Gasto: <strong>R$ {m.expense.toLocaleString()}</strong></div>
              <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: 20, color: "#C41E5C", marginTop: 8 }}>
                Déficit: R$ {Math.abs(m.deficit).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 24, background: "#FFF5F8", borderRadius: 16, padding: 20 }}>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "#666", margin: "0 0 12px" }}>
            Se cada um dos 80 membros do grupo contribuir com:
          </p>
          <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: 36, color: "#E8548C" }}>R$ 40/mês</div>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "#2E8B57", fontWeight: 700, margin: "8px 0 0" }}>
            Cobrimos 100% das despesas dos gatinhos.
          </p>
        </div>
      </div>
    </div>
  );
}

function InteractionSection({ setActive }) {
  const actions = [
    { emoji: "📸", title: "Envie uma foto", desc: "Mande sua foto com produtos da Casa e apareça aqui!", color: "#E8548C" },
    { emoji: "💬", title: "Sugira um nome", desc: "Próximo resgatado terá o nome escolhido pelos padrinhos!", color: "#4A90D9" },
    { emoji: "🎂", title: "Aniversários", desc: "Saiba quando é o aniversário do seu afilhado e mande mimos!", color: "#F4A460" },
    { emoji: "🏥", title: "Boletim de saúde", desc: "Acompanhe a evolução clínica de cada animal em tempo real", color: "#2E8B57" },
  ];
  return (
    <div style={{ background: "linear-gradient(135deg, #FFF5F8, #FFE4ED)", padding: "40px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 28, color: "#C41E5C", margin: "0 0 6px" }}>Interaja com os Gatinhos</h2>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "#8B3A62", margin: 0 }}>Não é só doar — é fazer parte da família!</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16, maxWidth: 900, margin: "0 auto" }}>
        {actions.map(a => (
          <div key={a.title} style={{
            background: "#fff", borderRadius: 16, padding: 20, textAlign: "center",
            cursor: "pointer", transition: "transform 0.2s", borderTop: `4px solid ${a.color}`
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{a.emoji}</div>
            <h3 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, fontWeight: 800, color: "#2D2D2D", margin: "0 0 4px" }}>{a.title}</h3>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, color: "#888", margin: 0, lineHeight: 1.4 }}>{a.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CtaBar() {
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
      background: "linear-gradient(135deg, #E8548C, #C41E5C)", padding: "12px 24px",
      display: "flex", justifyContent: "center", gap: 12, alignItems: "center",
      boxShadow: "0 -4px 20px rgba(0,0,0,0.15)"
    }}>
      <button style={{ background: "#fff", color: "#E8548C", border: "none", borderRadius: 25, padding: "10px 24px", fontFamily: "'Nunito', sans-serif", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
        🛍️ Loja
      </button>
      <button style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "2px solid rgba(255,255,255,0.4)", borderRadius: 25, padding: "10px 24px", fontFamily: "'Nunito', sans-serif", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
        💝 Apadrinhar
      </button>
      <button style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "2px solid rgba(255,255,255,0.4)", borderRadius: 25, padding: "10px 24px", fontFamily: "'Nunito', sans-serif", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
        PIX Direto
      </button>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#1a1a2e", padding: "40px 24px 80px", textAlign: "center" }}>
      <div style={{ fontSize: 36, marginBottom: 12 }}>🐱</div>
      <h3 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 24, color: "#F8B4C8", margin: "0 0 8px" }}>Casa dos Gatinhos</h3>
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 16px", maxWidth: 400, margin: "0 auto 16px" }}>
        Resgate, cuidado e dignidade para cada animal. Porque nenhum gato deveria sofrer sozinho.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 16 }}>
        <a href="https://www.instagram.com/_casadosgatinhos" target="_blank" rel="noreferrer"
          style={{ background: "rgba(255,255,255,0.1)", color: "#F8B4C8", padding: "8px 16px", borderRadius: 20, textDecoration: "none", fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 700 }}>
          📸 Instagram
        </a>
        <span style={{ background: "rgba(255,255,255,0.1)", color: "#F8B4C8", padding: "8px 16px", borderRadius: 20, fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 700 }}>
          💬 WhatsApp
        </span>
      </div>
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
        Em memória de Vitória 👑 Sucrilhos 🌟 Bernardo 💙 Ozzy 🎸 Chico 🍀
      </p>
    </footer>
  );
}

// === MAIN APP ===
export default function App() {
  const [active, setActive] = useState("home");
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", minHeight: "100vh", background: "#fff" }}>
      <Head>
        <title>Casa dos Gatinhos — Resgate, Cuidado e Dignidade</title>
        <meta name="description" content="Projeto de proteção animal. Resgate, cuidado e dignidade para gatos em situação de vulnerabilidade. Ajude com doações, apadrinhamento ou compras solidárias." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Casa dos Gatinhos" />
        <meta property="og:description" content="Todo animal merece tratamento digno, independente da doença. Ajude a Casa dos Gatinhos!" />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700;800&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet" />
      </Head>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-x: hidden; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        ::-webkit-scrollbar { height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #E8548C; border-radius: 4px; }
      `}</style>

      <Nav active={active} setActive={setActive} />

      {active === "home" && (
        <>
          <Hero />
          <InteractionSection setActive={setActive} />
          <div style={{ padding: "0 0 20px", background: "#fff" }}>
            <SectionTitle emoji="🐱" title="Conheça Nossos Gatinhos" subtitle="Clique em cada um para saber mais e apadrinhar" />
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", padding: "0 24px", maxWidth: 1000, margin: "0 auto" }}>
              {RESIDENTS.slice(0, 3).map(a => <AnimalCard key={a.name} animal={a} onClick={() => setSelectedAnimal(a)} />)}
            </div>
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <button onClick={() => setActive("animals")} style={{ background: "none", border: "2px solid #E8548C", color: "#E8548C", borderRadius: 25, padding: "10px 28px", fontFamily: "'Nunito', sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                Ver todos os gatinhos →
              </button>
            </div>
          </div>
          <div style={{ background: "#FAFAFA", padding: "30px 24px", textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 24, color: "#C41E5C", margin: "0 0 8px" }}>🎉 Campanha de Carnaval</h2>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, color: "#666", margin: "0 0 16px" }}>Copos térmicos da Casa dos Gatinhos — o copo mais bonito da folia!</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              {[{ n: "1 copo", p: "R$ 60" }, { n: "2 copos", p: "R$ 110" }, { n: "3 copos", p: "R$ 150" }].map(c => (
                <div key={c.n} style={{ background: "#fff", borderRadius: 16, padding: "16px 24px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                  <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 700, color: "#666" }}>{c.n}</div>
                  <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: 24, color: "#E8548C" }}>{c.p}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {active === "animals" && (
        <div style={{ padding: "0 0 50px" }}>
          <SectionTitle emoji="🐱" title="Nossos Gatinhos" subtitle="Cada um com sua história, personalidade e necessidades" />
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", padding: "0 24px", maxWidth: 1000, margin: "0 auto" }}>
            {RESIDENTS.map(a => <AnimalCard key={a.name} animal={a} onClick={() => setSelectedAnimal(a)} />)}
          </div>
        </div>
      )}

      {active === "memorial" && <MemorialSection />}
      {active === "sponsor" && <SponsorSection />}
      {active === "shop" && <ShopSection />}
      {active === "events" && <EventsSection />}
      {active === "transparency" && <TransparencySection />}

      <Footer />
      <CtaBar />

      {selectedAnimal && <AnimalModal animal={selectedAnimal} onClose={() => setSelectedAnimal(null)} />}
    </div>
  );
}

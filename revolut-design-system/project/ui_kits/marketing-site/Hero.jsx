// Phone mockup — a recreated Revolut-style app home screen used as the hero object.
function PhoneMockup() {
  const tx = [
    { name: "Apple", sub: "Today, 09:24", amt: "-£4.99", color: "var(--ink)", icon: "card" },
    { name: "Salary", sub: "Yesterday", amt: "+£2,400.00", color: "var(--accent-light-green)", icon: "request", pos: true },
    { name: "Tesco", sub: "Yesterday", amt: "-£38.20", color: "var(--accent-teal)", icon: "card" },
    { name: "Transfer to Sam", sub: "Mon", amt: "-£25.00", color: "var(--accent-pink)", icon: "send" },
  ];
  return (
    <div className="phone">
      <div className="phone-notch"></div>
      <div className="phone-screen">
        <div className="scr-top">
          <div className="scr-ava">A</div>
          <div className="scr-top-icons">
            <Icon name="search" size={20} />
            <Icon name="settings" size={20} />
          </div>
        </div>
        <div className="scr-bal">
          <div className="cur">Personal · GBP</div>
          <div className="amt">£2,540.00</div>
        </div>
        <div className="scr-actions">
          {[["plus", "Add"], ["exchange", "Exchange"], ["send", "Send"], ["chart", "More"]].map(([ic, lab]) => (
            <div className="scr-act" key={lab}>
              <div className="ic"><Icon name={ic} size={20} /></div>
              <div className="lab">{lab}</div>
            </div>
          ))}
        </div>
        <div className="scr-card">
          <div className="brand">Revolut</div>
          <div className="chip"></div>
          <div className="num">•••• •••• •••• 4827</div>
        </div>
        <div className="scr-list">
          <h4>Recent</h4>
          {tx.map((t, i) => (
            <div className="scr-tx" key={i}>
              <div className="dot" style={{ background: t.color }}><Icon name={t.icon} size={18} color="#fff" /></div>
              <div className="m"><div className="t">{t.name}</div><div className="s">{t.sub}</div></div>
              <div className={"v" + (t.pos ? " pos" : "")}>{t.amt}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Hero band — content switches with the active nav tab.
const HERO_CONTENT = {
  Personal: {
    h1: "Banking & Beyond",
    lead: "Spend, save, exchange and invest — all in one app. Join the 70+ million people already using Revolut.",
    cta: "Get started",
  },
  Business: {
    h1: "Business, simplified",
    lead: "Multi-currency accounts, expense management and global payments built for teams of every size.",
    cta: "Open a business account",
  },
  Company: {
    h1: "Building the future of finance",
    lead: "We're on a mission to build the world's first truly global financial superapp. Come build it with us.",
    cta: "View open roles",
  },
};

function Hero({ tab, onGetStarted }) {
  const c = HERO_CONTENT[tab] || HERO_CONTENT.Personal;
  return (
    <section className="band band-dark hero">
      <div className="inner">
        <div className="hero-copy">
          <h1 className="t-display-xl">{c.h1}</h1>
          <p className="lead t-body-lg">{c.lead}</p>
          <div className="hero-ctas">
            <Button variant="primary" onClick={onGetStarted}>{c.cta}</Button>
            <Button variant="outline-dark">See all plans</Button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><div className="n">70M+</div><div className="l">customers worldwide</div></div>
            <div className="hero-stat"><div className="n">150+</div><div className="l">currencies supported</div></div>
            <div className="hero-stat"><div className="n">30+</div><div className="l">countries</div></div>
          </div>
        </div>
        <div className="hero-art"><PhoneMockup /></div>
      </div>
    </section>
  );
}
Object.assign(window, { Hero, PhoneMockup });

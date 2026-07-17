// Feature grid — white catalogue band, 3-up cards. Accent colors used on icons only.
function FeatureGrid() {
  const feats = [
    { icon: "exchange", color: "var(--accent-teal)", t: "Exchange 150+ currencies", p: "Hold and convert money at great rates with no hidden fees, in 150+ currencies." },
    { icon: "stocks", color: "var(--accent-light-green)", t: "Invest from £1", p: "Buy and sell stocks, ETFs and commodities directly from the app, commission-free." },
    { icon: "crypto", color: "var(--accent-warning)", t: "Explore crypto", p: "Discover 100+ tokens and track the market 24/7, all from one place." },
    { icon: "shield", color: "var(--accent-light-blue)", t: "Security you control", p: "Freeze your card, set spending limits and get instant alerts on every transaction." },
    { icon: "savings", color: "var(--accent-pink)", t: "Save with Vaults", p: "Set money aside automatically and earn interest with flexible savings Vaults." },
    { icon: "globe", color: "var(--primary)", t: "Spend anywhere", p: "Pay like a local in 30+ countries with no markup on weekday exchange." },
  ];
  return (
    <section className="band band-light features">
      <div className="inner">
        <h2 className="t-display-lg">One app, all things money</h2>
        <p className="sub t-body-lg">Everything you need to manage your money — spending, saving, investing and more.</p>
        <div className="feat-grid">
          {feats.map((f, i) => (
            <div className="feat-card" key={i}>
              <div className="ic" style={{ background: "color-mix(in srgb, " + f.color + " 12%, #fff)", color: f.color }}>
                <Icon name={f.icon} size={26} />
              </div>
              <h3>{f.t}</h3>
              <p>{f.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Plan grid — dark band, 4-up cards with cobalt featured tier + billing toggle.
const PLANS = [
  { name: "Standard", m: "Free", a: "Free", sub: "", feats: ["Spend in 150+ currencies", "Fee-free everyday banking", "1 free card"] },
  { name: "Plus", m: "£3.99", a: "£2.99", sub: "per month", feats: ["Everything in Standard", "Purchase protection", "Priority support"] },
  { name: "Premium", m: "£7.99", a: "£6.99", sub: "per month", featured: true, badge: "Most popular",
    feats: ["Everything in Plus", "Higher exchange limits", "Global express delivery", "Airport lounge access"] },
  { name: "Metal", m: "£14.99", a: "£12.99", sub: "per month", feats: ["Everything in Premium", "Exclusive metal card", "1% cashback abroad"] },
];

function PlanGrid({ onChoose }) {
  const [annual, setAnnual] = React.useState(true);
  return (
    <section className="band band-dark plans">
      <div className="inner">
        <div className="plans-head">
          <h2 className="t-display-lg">Choose your subscription</h2>
          <div className="billing-toggle">
            <button className={annual ? "active" : ""} onClick={() => setAnnual(true)}>Annual</button>
            <button className={!annual ? "active" : ""} onClick={() => setAnnual(false)}>Monthly</button>
          </div>
        </div>
        <div className="plan-grid">
          {PLANS.map((p) => (
            <div className={"plan-card" + (p.featured ? " featured" : "")} key={p.name}>
              {p.badge && <span className="plan-badge">{p.badge}</span>}
              <h3>{p.name}</h3>
              <div className="plan-price">
                {p.m === "Free" ? <b>Free</b> : <><b>{annual ? p.a : p.m}</b></>}
              </div>
              <div className="plan-sub">{p.m === "Free" ? "No monthly fee" : p.sub + (annual ? ", billed annually" : "")}</div>
              <ul className="plan-feats">
                {p.feats.map((f, i) => (
                  <li key={i}><Icon name="check" size={18} />{f}</li>
                ))}
              </ul>
              <Button variant={p.featured ? "primary" : "outline-dark"} onClick={onChoose}>
                {p.name === "Standard" ? "Get started" : "Choose " + p.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ — white band accordion.
const FAQS = [
  { q: "How do I open an account?", a: "Download the app, enter your details and verify your identity with a photo of your ID and a selfie. Most accounts are ready in minutes — no branch visit, no paperwork." },
  { q: "Is my money safe with Revolut?", a: "Your money is held with regulated partner banks and protected by industry-standard security. You can freeze your card, set limits and get instant alerts on every transaction." },
  { q: "What does it cost?", a: "The Standard plan is free forever. Paid plans — Plus, Premium and Metal — add higher limits, perks and protections. You can change or cancel your plan at any time." },
  { q: "Can I use Revolut abroad?", a: "Yes. Spend like a local in 30+ countries and exchange 150+ currencies at great rates, with no markup on weekday exchange up to your plan's monthly limit." },
];

function FAQ() {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="band band-light faq">
      <div className="inner">
        <h2 className="t-display-md">Frequently asked questions</h2>
        {FAQS.map((f, i) => (
          <div className={"faq-item" + (open === i ? " open" : "")} key={i}>
            <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
              {f.q}<Icon name="chevron-down" size={22} />
            </button>
            <div className="faq-a"><p>{f.a}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Footer — dark, download tiles + link columns + regulatory disclosure.
function Footer() {
  const cols = {
    Company: ["About", "Careers", "Newsroom", "Investors"],
    Products: ["Personal", "Business", "Cards", "Savings"],
    Help: ["Support", "Status", "Community", "Security"],
    Legal: ["Privacy", "Terms", "Cookies", "Licences"],
  };
  return (
    <footer className="footer">
      <div className="inner">
        <div className="footer-cols">
          <div className="footer-col">
            <span className="nav-logo" style={{ marginBottom: 20 }}>
              <img src={(window.__resources && window.__resources.logoWordmark) || "../../assets/logo-wordmark.svg"} alt="Revolut" />
            </span>
            <div className="dl-tiles">
              <div className="dl-tile"><Icon name="arrow-up-right" size={22} /><div className="tt"><div className="s">Download on the</div><div className="b">App Store</div></div></div>
              <div className="dl-tile"><Icon name="arrow-up-right" size={22} /><div className="tt"><div className="s">Get it on</div><div className="b">Google Play</div></div></div>
            </div>
          </div>
          {Object.entries(cols).map(([h, links]) => (
            <div className="footer-col" key={h}>
              <h5>{h}</h5>
              {links.map(l => <a key={l}>{l}</a>)}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p className="footer-disc">
            This is a design-system recreation of the Revolut marketing canvas for prototyping purposes
            and is not affiliated with Revolut Ltd. Revolut is a trademark of its respective owner.
            © {new Date().getFullYear()} Revolut Design System.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Signup modal — email + password using the text-input component, then a success state.
function SignupModal({ onClose }) {
  const [done, setDone] = React.useState(false);
  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="close" size={22} /></button>
        {done ? (
          <div className="modal-done">
            <div className="ic"><Icon name="check" size={32} /></div>
            <h3>You're in</h3>
            <p className="sub">Check your inbox to verify your email and finish setting up your account.</p>
            <Button variant="dark" onClick={onClose}>Done</Button>
          </div>
        ) : (
          <>
            <h3>Get started</h3>
            <p className="sub">Create your free account in minutes.</p>
            <div className="field"><label>Email</label><input type="email" placeholder="you@example.com" defaultValue="" /></div>
            <div className="field"><label>Create a password</label><input type="password" placeholder="••••••••" /></div>
            <Button variant="dark" onClick={() => setDone(true)}>Create account</Button>
          </>
        )}
      </div>
    </div>
  );
}
Object.assign(window, { FeatureGrid, PlanGrid, FAQ, Footer, SignupModal });
